const Order = require('../models/Order');
const Product = require('../models/Product');
const Coupon = require('../models/Coupon');
const UserCoupon = require('../models/UserCoupon');
const { createAndSendNotification } = require('./notificationController');

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('items.product', 'name price');
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get user orders
// @route   GET /api/orders/my-orders
// @access  Private
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.product', 'name price image');
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate('items.product', 'name price image');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, notes, appliedCoupon: couponCode, shippingFee } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(400).json({ message: `Product with ID ${item.product} not found` });
      }

      const variant = product.variants.id(item.variantId);
      if (!variant) {
        return res.status(400).json({ message: `Variant with ID ${item.variantId} not found for product ${product.name}` });
      }

      if (variant.stock === 0) {
        return res.status(400).json({
          message: `Product "${product.name}" - Variant "${variant.variantName}" is out of stock`
        });
      }

      if (variant.stock < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for "${product.name}" - Variant "${variant.variantName}". Requested: ${item.quantity}, Available: ${variant.stock}`
        });
      }

      orderItems.push({
        product: item.product,
        variantId: item.variantId, 
        quantity: item.quantity,
        price: variant.price 
      });

      totalAmount += variant.price * item.quantity;

      variant.stock -= item.quantity;
      await product.save(); 
    }

    let appliedCoupon = null;
    let discountAmount = 0;
    let isFreeShipping = false;
    let finalShippingFee = shippingFee || 0;

    if (couponCode) {
      const coupon = await Coupon.findOne({ code: couponCode });

      if (!coupon) {
        return res.status(400).json({ message: 'Invalid coupon code' });
      }

      if (!coupon.isValid()) {
        return res.status(400).json({ message: 'Coupon is not valid or expired' });
      }
      const userCouponCount = await UserCoupon.countDocuments({ userId: req.user._id, couponId: coupon._id });
      if (coupon.usageLimitPerUser !== null && userCouponCount >= coupon.usageLimitPerUser) {
        return res.status(400).json({ message: 'You have reached the usage limit for this coupon' });
      }

      if (coupon.minOrderValue && totalAmount < coupon.minOrderValue) {
        return res.status(400).json({ message: `Minimum order value for this coupon is ${coupon.minOrderValue}` });
      }
      if (coupon.type === 'PERCENTAGE_DISCOUNT') {
        discountAmount = totalAmount * (coupon.value / 100);
        if (coupon.maxDiscountValue && discountAmount > coupon.maxDiscountValue) {
          discountAmount = coupon.maxDiscountValue;
        }
      } else if (coupon.type === 'FIXED_AMOUNT_DISCOUNT') {
        discountAmount = coupon.value;
      } else if (coupon.type === 'FREE_SHIPPING') {
        isFreeShipping = true;
        finalShippingFee = 0;
      }
    appliedCoupon = coupon.code;

      const userCoupon = new UserCoupon({
        userId: req.user._id,
        couponId: coupon._id
      });
      await userCoupon.save();
    }

    const order = new Order({
      user: req.user._id,
      items: orderItems,
      shippingAddress,
      paymentMethod,
      paymentStatus: paymentMethod === 'COD' || paymentMethod === 'ZaloPay' ? 'PENDING' : 'PENDING',
      totalAmount,
      shippingFee: finalShippingFee,
      isFreeShipping,
      appliedCoupon,
      discountAmount,
      notes,
      finalAmount: totalAmount - discountAmount + finalShippingFee
    });

    const createdOrder = await order.save();

    // Send order confirmation notification
    try {
        
      const io = req.app.get('socketio');
      await createAndSendNotification(io, {
        recipientId: createdOrder.user.toString(),
        title: 'Xác nhận đặt hàng thành công',
        body: `Đơn hàng #${createdOrder._id.toString().slice(-6)} của bạn đã được đặt thành công.`,
        data: {
          orderId: createdOrder._id.toString(),
          type: 'ORDER_CONFIRMATION',
        },
      });
    } catch (notificationError) {
      console.error('Error sending order confirmation notification:', notificationError);
    }

    res.status(201).json(createdOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id
// @access  Private/Admin
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus, paymentStatus } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (orderStatus) order.orderStatus = orderStatus;
    if (paymentStatus) order.paymentStatus = paymentStatus;

    const updatedOrder = await order.save();

    // Send notification based on order status
    let notificationTitle = '';
    let notificationBody = '';
    let notificationType = '';

    if (updatedOrder.orderStatus === 'SHIPPED') {
      notificationTitle = '🚚 Đơn hàng đang được giao';
      notificationBody = `Đơn hàng #${updatedOrder._id.toString().slice(-6)} của bạn đang trên đường giao đến bạn.`;
      notificationType = 'ORDER_SHIPPED';
    } else if (updatedOrder.orderStatus === 'DELIVERED') {
      notificationTitle = '📦 Đơn hàng đã giao thành công';
      notificationBody = `Đơn hàng #${updatedOrder._id.toString().slice(-6)} của bạn đã được giao thành công.`;
      notificationType = 'ORDER_DELIVERED';
    } else if (updatedOrder.orderStatus === 'CANCELLED') {
      notificationTitle = '❌ Đơn hàng bị hủy';
      notificationBody = `Đơn hàng #${updatedOrder._id.toString().slice(-6)} của bạn đã bị hủy.`;
      notificationType = 'ORDER_CANCELLED';
    } else if (updatedOrder.paymentStatus === 'FAILED') {
      notificationTitle = '❌ Lỗi thanh toán';
      notificationBody = `Thanh toán cho đơn hàng #${updatedOrder._id.toString().slice(-6)} của bạn đã thất bại. Vui lòng kiểm tra lại.`;
      notificationType = 'PAYMENT_FAILED';
    }

    if (notificationTitle && notificationBody) {
      try {
        const io = req.app.get('socketio');
        await createAndSendNotification(io, {
          recipientId: updatedOrder.user.toString(),
          title: notificationTitle,
          body: notificationBody,
          data: {
            orderId: updatedOrder._id.toString(),
            type: notificationType,
          },
        });
      } catch (notificationError) {
        console.error('Error sending order status notification:', notificationError);
      }
    }

    res.json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Cancel order
// @route   PUT /api/orders/:id/cancel
// @access  Private
exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized' });
    }

    if (!['PENDING', 'PROCESSING'].includes(order.orderStatus)) {
      return res.status(400).json({ message: 'Order cannot be cancelled' });
    }

    for (const item of order.items) {
      const product = await Product.findById(item.product);
      if (product) {
        const variant = product.variants.id(item.variantId);
        if (variant) {
          variant.stock += item.quantity;
          await product.save();
        }
      }
    }

    order.orderStatus = 'CANCELLED';
    await order.save();

    // Send order cancellation notification
    try {
      const io = req.app.get('socketio');
      await createAndSendNotification(io, {
        recipientId: order.user.toString(),
        title: '❌ Đơn hàng bị hủy',
        body: `Đơn hàng #${order._id.toString().slice(-6)} của bạn đã bị hủy.`,
        data: {
          orderId: order._id.toString(),
          type: 'ORDER_CANCELLED',
        },
      });
    } catch (notificationError) {
      console.error('Error sending order cancellation notification:', notificationError);
    }

    res.json({ message: 'Order cancelled successfully', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

