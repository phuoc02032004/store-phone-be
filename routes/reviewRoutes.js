const express = require('express');
const router = express.Router();
const {
  createProductReview,
  getProductReviews,
} = require('../controllers/reviewController');
const { auth } = require('../middlewares/authMiddleware');

router.route('/:id/reviews').post(auth, createProductReview).get(getProductReviews);

module.exports = router;