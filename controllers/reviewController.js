const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const Review = require('../models/Review');
const Product = require('../models/Product');
const Order = require('../models/Order');

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const query = {
      user: req.user._id,
      items: { $elemMatch: { product: new mongoose.Types.ObjectId(req.params.id) } },
      paymentStatus: 'PAID', 
    };
    console.log('Order.findOne Query:', JSON.stringify(query, null, 2));
    const hasPurchased = await Order.findOne(query);

    console.log({ hasPurchased });
    if (!hasPurchased) {
      res.status(400);
      throw new Error('You can only review products you have purchased.');
    }


    // Kiểm tra xem có tên người dùng không
    if (!req.user || !req.user.username) {
      res.status(400);
      throw new Error('User information not found');
    }

    const review = new Review({
      name: req.user.username, // Sử dụng username thay vì name
      rating: Number(rating),
      comment,
      user: req.user._id,
      product: req.params.id,
    });

    const createdReview = await review.save();

    product.reviews.push(createdReview._id);
    product.numReviews = product.reviews.length;

    const productReviews = await Review.find({ product: product._id });
    product.rating =
      productReviews.reduce((acc, item) => item.rating + acc, 0) /
      productReviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Get all reviews for a product
// @route   GET /api/products/:id/reviews
// @access  Public
const getProductReviews = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate('reviews');

  if (product) {
    res.json(product.reviews);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

module.exports = {
  createProductReview,
  getProductReviews,
};