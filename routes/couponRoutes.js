const express = require('express');
const { auth, adminAuth } = require('../middlewares/authMiddleware');
const {
    createCoupon,
    getCoupons,
    getCouponById,
    getCouponByCode,
    updateCoupon,
    deleteCoupon
} = require('../controllers/couponController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Coupons
 *   description: API for managing coupons
 */

/**
 * @swagger
 * /api/coupons:
 *   post:
 *     summary: Create a new coupon
 *     tags: [Coupons]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - code
 *               - type
 *               - startDate
 *               - endDate
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Summer Sale"
 *               code:
 *                 type: string
 *                 example: "SUMMER20"
 *               description:
 *                 type: string
 *                 example: "20% off on all items"
 *               type:
 *                 type: string
 *                 enum: [PERCENTAGE_DISCOUNT, FIXED_AMOUNT_DISCOUNT, FREE_SHIPPING, BUY_X_GET_Y, PRODUCT_GIFT]
 *                 example: "PERCENTAGE_DISCOUNT"
 *               value:
 *                 type: number
 *                 example: 20
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-06-01T00:00:00Z"
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-08-31T23:59:59Z"
 *               isActive:
 *                 type: boolean
 *                 example: true
 *               usageLimit:
 *                 type: number
 *                 example: 100
 *               usageLimitPerUser:
 *                 type: number
 *                 example: 1
 *               minOrderValue:
 *                 type: number
 *                 example: 50
 *               maxDiscountValue:
 *                 type: number
 *                 example: 10
 *               applicableProducts:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: objectId
 *                 example: ["60d0fe4f5311530015a10000"]
 *               applicableCategories:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: objectId
 *                 example: ["60d0fe4f5311530015a10001"]
 *               excludedProducts:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: objectId
 *                 example: ["60d0fe4f5311530015a10002"]
 *               buyQuantity:
 *                 type: number
 *                 example: 2
 *               getQuantity:
 *                 type: number
 *                 example: 1
 *               giftProductId:
 *                 type: string
 *                 format: objectId
 *                 example: "60d0fe4f5311530015a10003"
 *     responses:
 *       201:
 *         description: Coupon created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Coupon'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/',auth, adminAuth, createCoupon);

/**
 * @swagger
 * /api/coupons:
 *   get:
 *     summary: Get all coupons
 *     tags: [Coupons]
 *     responses:
 *       200:
 *         description: A list of coupons
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Coupon'
 *       500:
 *         description: Server error
 */
router.get('/', getCoupons);

/**
 * @swagger
 * /api/coupons/{id}:
 *   get:
 *     summary: Get a coupon by ID
 *     tags: [Coupons]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: objectId
 *         required: true
 *         description: ID of the coupon to retrieve
 *     responses:
 *       200:
 *         description: Coupon data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Coupon'
 *       404:
 *         description: Coupon not found
 *       500:
 *         description: Server error
 */
router.get('/:id', getCouponById);

/**
 * @swagger
 * /api/coupons/code/{code}:
 *   get:
 *     summary: Get a coupon by code
 *     tags: [Coupons]
 *     parameters:
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: Code of the coupon to retrieve
 *     responses:
 *       200:
 *         description: Coupon data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Coupon'
 *       404:
 *         description: Coupon not found
 *       500:
 *         description: Server error
 */
router.get('/code/:code', getCouponByCode);

/**
 * @swagger
 * /api/coupons/{id}:
 *   put:
 *     summary: Update a coupon by ID
 *     tags: [Coupons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: objectId
 *         required: true
 *         description: ID of the coupon to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CouponInput'
 *     responses:
 *       200:
 *         description: Coupon updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Coupon'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Coupon not found
 *       500:
 *         description: Server error
 */
router.put('/:id',auth, adminAuth, updateCoupon);

/**
 * @swagger
 * /api/coupons/{id}:
 *   delete:
 *     summary: Delete a coupon by ID
 *     tags: [Coupons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: objectId
 *         required: true
 *         description: ID of the coupon to delete
 *     responses:
 *       200:
 *         description: Coupon deleted successfully
 *       404:
 *         description: Coupon not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', auth, adminAuth, deleteCoupon);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Coupon:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           format: objectId
 *           description: The auto-generated ID of the coupon
 *         name:
 *           type: string
 *           description: Name of the coupon
 *         code:
 *           type: string
 *           description: Unique code for the coupon
 *         description:
 *           type: string
 *           description: Description of the coupon
 *         type:
 *           type: string
 *           enum: [PERCENTAGE_DISCOUNT, FIXED_AMOUNT_DISCOUNT, FREE_SHIPPING, BUY_X_GET_Y, PRODUCT_GIFT]
 *           description: Type of discount
 *         value:
 *           type: number
 *           description: Discount value (e.g., percentage or fixed amount)
 *         startDate:
 *           type: string
 *           format: date-time
 *           description: Start date of the coupon validity
 *         endDate:
 *           type: string
 *           format: date-time
 *           description: End date of the coupon validity
 *         isActive:
 *           type: boolean
 *           description: Whether the coupon is active
 *         usageLimit:
 *           type: number
 *           nullable: true
 *           description: Maximum number of times the coupon can be used in total
 *         timesUsed:
 *           type: number
 *           description: Number of times the coupon has been used
 *         usageLimitPerUser:
 *           type: number
 *           description: Maximum number of times a single user can use the coupon
 *         minOrderValue:
 *           type: number
 *           description: Minimum order value for the coupon to be applicable
 *         maxDiscountValue:
 *           type: number
 *           nullable: true
 *           description: Maximum discount value for percentage discounts
 *         applicableProducts:
 *           type: array
 *           items:
 *             type: string
 *             format: objectId
 *           description: Array of product IDs the coupon applies to
 *         applicableCategories:
 *           type: array
 *           items:
 *             type: string
 *             format: objectId
 *           description: Array of category IDs the coupon applies to
 *         excludedProducts:
 *           type: array
 *           items:
 *             type: string
 *             format: objectId
 *           description: Array of product IDs excluded from the coupon
 *         buyQuantity:
 *           type: number
 *           description: Quantity to buy for BUY_X_GET_Y type
 *         getQuantity:
 *           type: number
 *           description: Quantity to get for BUY_X_GET_Y type
 *         giftProductId:
 *           type: string
 *           format: objectId
 *           nullable: true
 *           description: Product ID to be gifted for PRODUCT_GIFT type
 *         createdBy:
 *           type: string
 *           format: objectId
 *           description: User ID who created the coupon
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date and time when the coupon was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date and time when the coupon was last updated
 *     CouponInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Summer Sale"
 *         code:
 *           type: string
 *           example: "SUMMER20"
 *         description:
 *           type: string
 *           example: "20% off on all items"
 *         type:
 *           type: string
 *           enum: [PERCENTAGE_DISCOUNT, FIXED_AMOUNT_DISCOUNT, FREE_SHIPPING, BUY_X_GET_Y, PRODUCT_GIFT]
 *           example: "PERCENTAGE_DISCOUNT"
 *         value:
 *           type: number
 *           example: 20
 *         startDate:
 *           type: string
 *           format: date-time
 *           example: "2024-06-01T00:00:00Z"
 *         endDate:
 *           type: string
 *           format: date-time
 *           example: "2024-08-31T23:59:59Z"
 *         isActive:
 *           type: boolean
 *           example: true
 *         usageLimit:
 *           type: number
 *           example: 100
 *         usageLimitPerUser:
 *           type: number
 *           example: 1
 *         minOrderValue:
 *           type: number
 *           example: 50
 *         maxDiscountValue:
 *           type: number
 *           example: 10
 *         applicableProducts:
 *           type: array
 *           items:
 *             type: string
 *             format: objectId
 *           example: ["60d0fe4f5311530015a10000"]
 *         applicableCategories:
 *           type: array
 *           items:
 *             type: string
 *             format: objectId
 *           example: ["60d0fe4f5311530015a10001"]
 *         excludedProducts:
 *           type: array
 *           items:
 *             type: string
 *             format: objectId
 *           example: ["60d0fe4f5311530015a10002"]
 *         buyQuantity:
 *           type: number
 *           example: 2
 *         getQuantity:
 *           type: number
 *           example: 1
 *         giftProductId:
 *           type: string
 *           format: objectId
 *           example: "60d0fe4f5311530015a10003"
 */