const mongoose = require('mongoose');
const Category = require('../models/Category');
const slugify = require('slugify');
const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

// @desc    Get parent categories (categories with no parent)
// @route   GET /api/categories/parents
// @access  Public
exports.getParentCategories = async (req, res) => {
  try {
    const parentCategories = await Category.find({ parent: null })
      .sort({ name: 1 });
    
    res.json(parentCategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    if (!fileBuffer) {
      return reject(new Error('Không có dữ liệu file để tải lên.'));
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'categories',
        resource_type: 'image',
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary Upload Error:', error);
          return reject(error);
        }
        resolve(result);
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find()
      .populate('parent')
      .sort({ 'ancestors.name': 1, name: 1 });
    
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get a category by ID
// @route   GET /api/categories/:id
// @access  Public
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate('parent');
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get category tree
// @route   GET /api/categories/tree
// @access  Public
exports.getCategoryTree = async (req, res) => {
  try {
    const categories = await Category.find().sort({ level: 1, name: 1 });
    
    const tree = [];
    const map = {};
    
    categories.forEach(cat => {
      map[cat._id] = { ...cat.toObject(), children: [] };
    });
    
    categories.forEach(cat => {
      if (cat.parent) {
        map[cat.parent].children.push(map[cat._id]);
      } else {
        tree.push(map[cat._id]);
      }
    });
    
    res.json(tree);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create new category
// @route   POST /api/categories
// @access  Private/Admin
exports.createCategory = async (req, res) => {
  try {
    let { name, description, parentId } = req.body;
    let imageUrl = '';
    
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      imageUrl = result.secure_url;
    }
    
    const slug = slugify(name, { lower: true });
    
    let ancestors = [];
    let level = 0;
    
    if (parentId) {
      const parent = await Category.findById(parentId);
      if (!parent) {
        return res.status(404).json({ message: 'Parent category not found' });
      }
      
      ancestors = [
        ...parent.ancestors,
        {
          _id: parent._id,
          name: parent.name,
          slug: parent.slug
        }
      ];
      level = parent.level + 1;
    }
    
    const category = new Category({
      name,
      slug,
      description,
      parent: parentId || null,
      ancestors,
      image: imageUrl,
      level
    });
    
    await category.save();
    
    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Category with this name already exists' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private/Admin
exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      category.image = result.secure_url;
    }
    
    if (req.body.name) {
      category.name = req.body.name;
      category.slug = slugify(req.body.name, { lower: true });
    }
    
    if (req.body.description) {
      category.description = req.body.description;
    }
    
    if (req.body.parentId && req.body.parentId !== category.parent?.toString()) {
      if (req.body.parentId === req.params.id) {
        return res.status(400).json({ message: 'Category cannot be its own parent' });
      }
      
      const newParent = await Category.findById(req.body.parentId);
      if (!newParent) {
        return res.status(404).json({ message: 'Parent category not found' });
      }
      
      if (newParent.ancestors.some(a => a._id.toString() === category._id.toString())) {
        return res.status(400).json({ message: 'Cannot set a descendant as parent' });
      }
      
      category.parent = newParent._id;
      category.ancestors = [
        ...newParent.ancestors,
        {
          _id: newParent._id,
          name: newParent.name,
          slug: newParent.slug
        }
      ];
      category.level = newParent.level + 1;
      
      const children = await Category.find({ 'ancestors._id': category._id });
      for (const child of children) {
        const ancestorIndex = child.ancestors.findIndex(
          a => a._id.toString() === category._id.toString()
        );
        child.ancestors = [
          ...child.ancestors.slice(0, ancestorIndex),
          {
            _id: category._id,
            name: category.name,
            slug: category.slug
          },
          ...category.ancestors
        ];
        child.level = child.ancestors.length;
        await child.save();
      }
    }
    
    await category.save();
    
    res.json(category);
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Category with this name already exists' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get child categories by parent ID
// @route   GET /api/categories/:id/children
// @access  Public
exports.getChildCategories = async (req, res) => {
  try {
    const parentId = req.params.id;
    
    if (!mongoose.Types.ObjectId.isValid(parentId)) {
      return res.status(400).json({ message: 'Invalid category ID format' });
    }

    const parentCategory = await Category.findById(parentId);
    if (!parentCategory) {
      return res.status(404).json({ message: 'Parent category not found' });
    }

    const childCategories = await Category.find({ parent: parentId })
      .sort({ name: 1 });
    
    res.json(childCategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
exports.deleteCategory = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid category ID format' });
    }

    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    const hasChildren = await Category.exists({ parent: category._id });
    if (hasChildren) {
      return res.status(400).json({ message: 'Cannot delete category with subcategories' });
    }
    
    await category.deleteOne();
    
    res.json({ message: 'Category removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};