const Coupon = require('../models/Coupon');
const User = require('../models/User');
const { sendNotification, createAndSendNotification } = require('./notificationController');

// @desc    Create a new coupon
// @route   POST /api/coupons
// @access  Private/Admin
exports.createCoupon = async (req, res) => {
    try {
        if (req.body.giftProductId === '') {
            req.body.giftProductId = undefined;
        }

        const coupon = new Coupon({ ...req.body, createdBy: req.user.id });
        console.log(req.body);
        await coupon.save();

        const users = await User.find({});
        for (const user of users) {
            try {
                await createAndSendNotification(req.app.get('socketio'), {
                    recipientId: user._id.toString(),
                    title: '📣 Thông báo chương trình khuyến mãi mới',
                    body: `Mã giảm giá "${coupon.code}" mới đã có! Giảm giá ${coupon.value}${coupon.type === 'PERCENTAGE_DISCOUNT' ? '%' : 'đ'} cho đơn hàng của bạn.`,
                    data: {
                        couponId: coupon._id.toString(),
                        type: 'NEW_PROMOTION',
                    },
                });
            } catch (notificationError) {
                console.error(`Error sending promotion notification to user ${user._id}:`, notificationError);
            }
        }

        res.status(201).json(coupon);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get all coupons
// @route   GET /api/coupons
// @access  Public
exports.getCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find({});
        res.status(200).json(coupons);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get single coupon by ID
// @route   GET /api/coupons/:id
// @access  Public
exports.getCouponById = async (req, res) => {
    try {
        const coupon = await Coupon.findById(req.params.id);
        if (!coupon) {
            return res.status(404).json({ message: 'Coupon not found' });
        }
        res.status(200).json(coupon);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get coupon by code
// @route   GET /api/coupons/code/:code
// @access  Public
exports.getCouponByCode = async (req, res) => {
    try {
        const coupon = await Coupon.findOne({ code: req.params.code });
        if (!coupon) {
            return res.status(404).json({ message: 'Coupon not found' });
        }
        res.status(200).json(coupon);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Update a coupon
// @route   PUT /api/coupons/:id
// @access  Private/Admin
exports.updateCoupon = async (req, res) => {
    try {
        if (req.body.giftProductId === '') {
            req.body.giftProductId = undefined;
        }

        const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!coupon) {
            return res.status(404).json({ message: 'Coupon not found' });
        }
        res.status(200).json(coupon);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Delete a coupon
// @route   DELETE /api/coupons/:id
// @access  Private/Admin
exports.deleteCoupon = async (req, res) => {
    try {
        const coupon = await Coupon.findByIdAndDelete(req.params.id);
        if (!coupon) {
            return res.status(404).json({ message: 'Coupon not found' });
        }
        res.status(200).json({ message: 'Coupon removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

/**
 * @desc    Apply a coupon to check its validity
 * @route   POST /api/coupons/apply
 * @access  Private
 */
exports.applyCoupon = async (req, res) => {
    try {
        const { couponCode, totalAmount } = req.body;
        const userId = req.user._id;

        if (!couponCode || totalAmount === undefined) {
            return res.status(400).json({ message: 'Missing coupon code or total amount' });
        }

        const coupon = await Coupon.findOne({ code: couponCode });

        if (!coupon) {
            return res.status(404).json({ message: 'Coupon not found' });
        }

        if (!coupon.isValid()) {
            return res.status(400).json({ message: 'Coupon is not valid or expired' });
        }

        const UserCoupon = require('../models/UserCoupon'); 
        const userCouponCount = await UserCoupon.countDocuments({ userId: userId, couponId: coupon._id });
        if (coupon.usageLimitPerUser !== null && userCouponCount >= coupon.usageLimitPerUser) {
            return res.status(400).json({ message: 'You have reached the usage limit for this coupon' });
        }

        if (coupon.minOrderValue && totalAmount < coupon.minOrderValue) {
            return res.status(400).json({ message: `Minimum order value for this coupon is ${coupon.minOrderValue}` });
        }

        let discountAmount = 0;
        let isFreeShipping = false;

        if (coupon.type === 'PERCENTAGE_DISCOUNT') {
            discountAmount = totalAmount * (coupon.value / 100);
            if (coupon.maxDiscountValue && discountAmount > coupon.maxDiscountValue) {
                discountAmount = coupon.maxDiscountValue;
            }
        } else if (coupon.type === 'FIXED_AMOUNT_DISCOUNT') {
            discountAmount = coupon.value;
        } else if (coupon.type === 'FREE_SHIPPING') {
            isFreeShipping = true;
        }

        const finalAmount = totalAmount - discountAmount;

        res.status(200).json({
            success: true,
            message: 'Coupon applied successfully',
            coupon: {
                code: coupon.code,
                type: coupon.type,
                value: coupon.value,
                discountAmount: discountAmount,
                isFreeShipping: isFreeShipping,
                finalAmount: finalAmount
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};