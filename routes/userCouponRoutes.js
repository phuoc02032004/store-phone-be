const express = require('express');
const { adminAuth } = require('../middlewares/authMiddleware');
const {
    assignCouponToUser,
    getUserCoupons,
    markCouponAsUsed
} = require('../controllers/userCouponController');

const router = express.Router();

// Assign a coupon to a user (Admin only)
router.post('/assign', adminAuth, assignCouponToUser);

// Get all coupons for a specific user (User or Admin)
router.get('/:userId', getUserCoupons);

// Mark a user's coupon as used (User or System)
router.put('/use/:userCouponId', markCouponAsUsed);

module.exports = router;