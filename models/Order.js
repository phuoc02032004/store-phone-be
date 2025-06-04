const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true
  }
});

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [orderItemSchema],
  shippingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    phone: { type: String, required: true }
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['COD', 'BANKING','ZaloPay'] 
  },
  paymentStatus: {
    type: String,
    required: true,
    enum: ['PENDING', 'PAID', 'FAILED'],
    default: 'PENDING'
  },
  orderStatus: {
    type: String,
    required: true,
    enum: ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'],
    default: 'PENDING'
  },
  totalAmount: {
    type: Number,
    required: true
  },
  shippingFee: {
    type: Number,
    default: 0
  },
  isFreeShipping: {
    type: Boolean,
    default: false
  },
  appliedCoupon: {
    type: String,
    default: null
  },
  discountAmount: {
    type: Number,
    default: 0
  },
  finalAmount: {
    type: Number,
    required: true
  },
  notes: {
    type: String
  }
}, {
  timestamps: true
});

orderSchema.pre('save', function(next) {
  let subtotal = 0;
  if (this.items && this.items.length > 0) {
    subtotal = this.items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  }
  this.totalAmount = subtotal;

  let calculatedShippingFee = this.shippingFee;
  if (this.isFreeShipping) {
    calculatedShippingFee = 0;
  }

  this.finalAmount = this.totalAmount - this.discountAmount + calculatedShippingFee;

  next();
});

module.exports = mongoose.model('Order', orderSchema);
