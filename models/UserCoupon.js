const mongoose = require('mongoose');

const userCouponSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    couponId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coupon',
        required: true
    },
    isUsed: {
        type: Boolean,
        default: false
    },
    usedAt: {
        type: Date,
        default: null
    },
    assignedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

userCouponSchema.index({ userId: 1, couponId: 1 }, { unique: true }); // Đảm bảo mỗi người dùng chỉ có một bản sao của một coupon cụ thể

module.exports = mongoose.model('UserCoupon', userCouponSchema);