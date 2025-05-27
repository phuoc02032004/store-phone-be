const express = require('express');
const router = express.Router();
const {
  getOrders,
  getMyOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  cancelOrder
} = require('../controllers/orderController');
const { auth, adminAuth } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     OrderItem:
 *       type: object
 *       required:
 *         - product
 *         - quantity
 *         - price
 *       properties:
 *         product:
 *           type: string
 *           description: Product ID
 *         quantity:
 *           type: number
 *           description: Quantity ordered
 *         price:
 *           type: number
 *           description: Price per unit
 *     ShippingAddress:
 *       type: object
 *       required:
 *         - street
 *         - city
 *         - state
 *         - phone
 *       properties:
 *         street:
 *           type: string
 *         city:
 *           type: string
 *         state:
 *           type: string
 *         phone:
 *           type: string
 *     Order:
 *       type: object
 *       required:
 *         - user
 *         - items
 *         - shippingAddress
 *         - paymentMethod
 *       properties:
 *         user:
 *           type: string
 *           description: User ID
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderItem'
 *         shippingAddress:
 *           $ref: '#/components/schemas/ShippingAddress'
 *         paymentMethod:
 *           type: string
 *           enum: [COD, BANKING, ZaloPay]
 *         paymentStatus:
 *           type: string
 *           enum: [PENDING, PAID, FAILED]
 *         orderStatus:
 *           type: string
 *           enum: [PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED]
 *         totalAmount:
 *           type: number
 *         shippingFee:
 *           type: number
 *           description: Shipping fee for the order
 *         isFreeShipping:
 *           type: boolean
 *           description: Indicates if free shipping is applied
 *         appliedCoupon:
 *           type: string
 *           description: ID of the applied coupon
 *         discountAmount:
 *           type: number
 *           description: Discount amount applied by coupon
 *         finalAmount:
 *           type: number
 *           description: Final amount after discounts and shipping
 *         notes:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders (Admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       401:
 *         description: Not authorized
 */
router.get('/', auth, adminAuth, getOrders);

/**
 * @swagger
 * /api/orders/my-orders:
 *   get:
 *     summary: Get user's orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       401:
 *         description: Not authorized
 */
router.get('/my-orders', auth, getMyOrders);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 *       401:
 *         description: Not authorized
 */
router.get('/:id', auth, getOrderById);

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - items
 *               - shippingAddress
 *               - paymentMethod
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - product
 *                     - quantity
 *                   properties:
 *                     product:
 *                       type: string
 *                       description: Product ID
 *                     quantity:
 *                       type: number
 *                       minimum: 1
 *               shippingAddress:
 *                 $ref: '#/components/schemas/ShippingAddress'
 *               paymentMethod:
 *                 type: string
 *                 enum: [COD, BANKING, ZaloPay]
 *               notes:
 *                 type: string
 *               couponCode:
 *                 type: string
 *                 description: Optional coupon code to apply
 *               shippingFee:
 *                 type: number
 *                 description: Optional shipping fee
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Invalid input or insufficient stock
 *       401:
 *         description: Not authorized
 */
router.post('/', auth, createOrder);

/**
 * @swagger
 * /api/orders/{id}:
 *   put:
 *     summary: Update order status (Admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderStatus:
 *                 type: string
 *                 enum: [PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED]
 *               paymentStatus:
 *                 type: string
 *                 enum: [PENDING, PAID, FAILED]
 *     responses:
 *       200:
 *         description: Order status updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 *       401:
 *         description: Not authorized
 */
router.put('/:id', auth, adminAuth, updateOrderStatus);

/**
 * @swagger
 * /api/orders/{id}/cancel:
 *   put:
 *     summary: Cancel order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order cancelled successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Order cannot be cancelled
 *       404:
 *         description: Order not found
 *       401:
 *         description: Not authorized
 */
router.put('/:id/cancel', auth, cancelOrder);

module.exports = router;
