const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  description: {
    type: String
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null
  },
  ancestors: [{
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true
    }
  }],
  image: {
    type: String
  },
  level: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

categorySchema.index({ 'ancestors._id': 1 });

categorySchema.methods.getPath = function() {
  return this.ancestors.map(a => a.name).concat([this.name]).join(' > ');
};

module.exports = mongoose.model('Category', categorySchema);