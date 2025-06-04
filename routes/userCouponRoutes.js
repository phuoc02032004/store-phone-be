const express = require('express');
const { adminAuth } = require('../middlewares/authMiddleware');
const {
    assignCouponToUser,
    getUserCoupons,
    markCouponAsUsed
} = require('../controllers/userCouponController');

const router = express.Router();

/**
 * @swagger
 * /api/user-coupons/assign:
 *   post:
 *     summary: Assign a coupon to a user (Admin only)
 *     tags: [User Coupons]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - couponId
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user to assign the coupon to.
 *               couponId:
 *                 type: string
 *                 description: The ID of the coupon to assign.
 *     responses:
 *       201:
 *         description: Coupon assigned successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserCoupon'
 *       400:
 *         description: Invalid input or coupon already assigned.
 *       401:
 *         description: Unauthorized, admin access required.
 *       500:
 *         description: Server error.
 */
router.post('/assign', adminAuth, assignCouponToUser);

/**
 * @swagger
 * /api/user-coupons/{userId}:
 *   get:
 *     summary: Get all coupons for a specific user
 *     tags: [User Coupons]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to get coupons for.
 *     responses:
 *       200:
 *         description: A list of user coupons.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserCoupon'
 *       404:
 *         description: User not found.
 *       500:
 *         description: Server error.
 */
router.get('/:userId', getUserCoupons);

/**
 * @swagger
 * /api/user-coupons/use/{userCouponId}:
 *   put:
 *     summary: Mark a user coupon as used
 *     tags: [User Coupons]
 *     parameters:
 *       - in: path
 *         name: userCouponId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user coupon to mark as used.
 *     responses:
 *       200:
 *         description: User coupon marked as used successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserCoupon'
 *       400:
 *         description: Coupon already used or invalid status.
 *       404:
 *         description: User coupon not found.
 *       500:
 *         description: Server error.
 */
router.put('/use/:userCouponId', markCouponAsUsed);

module.exports = router;