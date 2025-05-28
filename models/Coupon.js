const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    code: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    type: {
        type: String,
        required: true,
         enum: [
            'PERCENTAGE_DISCOUNT',  // Giảm theo % trên tổng đơn hoặc sản phẩm
            'FIXED_AMOUNT_DISCOUNT', // Giảm số tiền cố định trên tổng đơn hoặc sản phẩm
            'FREE_SHIPPING',         // Miễn phí vận chuyển
            'BUY_X_GET_Y',           // Mua X tặng Y
            'PRODUCT_GIFT'           // Tặng sản phẩm kèm theo
        ],
    },
    value: {
        type: Number,
         required: function() { return this.type === 'PERCENTAGE_DISCOUNT' || this.type === 'FIXED_AMOUNT_DISCOUNT'; }
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    usageLimit: {
        type: Number,
        default: null 
    },
    timesUsed: {
        type: Number,
        default: 0
    },
    usageLimitPerUser: {
        type: Number,
        default: 1 
    },
    minOrderValue: {
        type: Number,
        default: 0 
    },
    maxDiscountValue: {
        type: Number,
        default: null 
    },
    applicableProducts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    applicableCategories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }],
    excludedProducts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    buyQuantity: {
        type: Number,
        required: function() { return this.type === 'BUY_X_GET_Y'; }
    },
    getQuantity: {
        type: Number,
        required: function() { return this.type === 'BUY_X_GET_Y'; }
    },
    giftProductId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
         required: function() { return this.type === 'PRODUCT_GIFT'; }
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, {
    timestamps: true
});

couponSchema.methods.isValid = function() {
    const now = new Date();
    if (!this.isActive) return false;
    if (this.startDate > now || this.endDate < now) return false;
    if (this.usageLimit !== null && this.timesUsed >= this.usageLimit) return false;
    return true;
};

couponSchema.index({ code: 1 });
couponSchema.index({ startDate: 1, endDate: 1, isActive: 1 });

module.exports = mongoose.model('Coupon', couponSchema);
