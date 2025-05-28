const UserCoupon = require('../models/UserCoupon');
const Coupon = require('../models/Coupon');
const User = require('../models/User');

// @desc    Assign a coupon to a user
// @route   POST /api/user-coupons/assign
// @access  Private/Admin
exports.assignCouponToUser = async (req, res) => {
    const { userId, couponId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const coupon = await Coupon.findById(couponId);
        if (!coupon) {
            return res.status(404).json({ message: 'Coupon not found' });
        }

        const existingUserCoupon = await UserCoupon.findOne({ userId, couponId });
        if (existingUserCoupon) {
            return res.status(400).json({ message: 'User already has this coupon' });
        }

        const userCoupon = new UserCoupon({
            userId,
            couponId
        });

        await userCoupon.save();
        res.status(201).json({ message: 'Coupon assigned successfully', userCoupon });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get all coupons for a specific user
// @route   GET /api/user-coupons/:userId
// @access  Private/User (or Admin)
exports.getUserCoupons = async (req, res) => {
    try {
        const userCoupons = await UserCoupon.find({ userId: req.params.userId }).populate('couponId');
        res.status(200).json(userCoupons);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Mark a user's coupon as used
// @route   PUT /api/user-coupons/use/:userCouponId
// @access  Private/User (or System)
exports.markCouponAsUsed = async (req, res) => {
    try {
        const userCoupon = await UserCoupon.findById(req.params.userCouponId);

        if (!userCoupon) {
            return res.status(404).json({ message: 'User coupon not found' });
        }

        if (userCoupon.isUsed) {
            return res.status(400).json({ message: 'Coupon already used' });
        }

        userCoupon.isUsed = true;
        userCoupon.usedAt = Date.now();
        await userCoupon.save();

        const coupon = await Coupon.findById(userCoupon.couponId);
        if (coupon) {
            coupon.timesUsed = (coupon.timesUsed || 0) + 1;
            await coupon.save();
        }

        res.status(200).json({ message: 'Coupon marked as used', userCoupon });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};