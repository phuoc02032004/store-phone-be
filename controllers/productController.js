const mongoose = require('mongoose');
const Product = require('../models/Product');
const Category = require('../models/Category');
const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

const uploadToCloudinary = (fileBuffer, folderName = 'products') => { 
  return new Promise((resolve, reject) => {
    if (!fileBuffer) {
      return reject(new Error('Không có dữ liệu file để tải lên.'));
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folderName, 
        resource_type: 'image',
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary Upload Stream Error:', error);
          const detailedError = error.message || 'Lỗi không xác định khi tải ảnh lên Cloudinary.';
          return reject(new Error(`Lỗi khi tải ảnh lên Cloudinary: ${detailedError}`));
        }
        if (result && result.secure_url) {
          console.log('Cloudinary Upload Success:', result.public_id, result.secure_url);
          resolve({ secure_url: result.secure_url, public_id: result.public_id });
        } else {
          console.error('Cloudinary Upload Result Invalid:', result);
          reject(new Error('Không nhận được kết quả URL hợp lệ từ Cloudinary.'));
        }
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

// @desc    Search products
// @route   GET /api/products/search
// @access  Public

exports.searchProducts = async (req, res) => {
  try {
    const { keyword, minPrice, maxPrice, category, color, capacity, minStock, maxStock, sortBy, order } = req.query;
    
    const query = {};
    if (keyword) {
      query.$or = [
        { name: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } }
      ];
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      query['variants.price'] = {};
      if (minPrice !== undefined) query['variants.price'].$gte = Number(minPrice);
      if (maxPrice !== undefined) query['variants.price'].$lte = Number(maxPrice);
    }
    
    if (category) {
      query.category = category;
    }

    if (color) {
      query['variants.color'] = { $regex: color, $options: 'i' };
    }
    if (capacity) {
      query['variants.capacity'] = { $regex: capacity, $options: 'i' };
    }

    if (minStock !== undefined || maxStock !== undefined) {
      query['variants.stock'] = {};
      if (minStock !== undefined) query['variants.stock'].$gte = Number(minStock);
      if (maxStock !== undefined) query['variants.stock'].$lte = Number(maxStock);
    }

    const sort = {};
    if (sortBy) {
      sort[sortBy] = order === 'asc' ? 1 : -1;
    } else {
      sort.createdAt = -1; 
    }

    const products = await Product.find(query)
      .populate('category', 'name')
      .sort(sort);

    res.json(products);
  } catch (error) {
    console.error('Error in searchProducts:', error.message);
    res.status(500).json({ message: 'Lỗi máy chủ' });
  }
};

// @desc    Get all products
// @route   GET /api/products
// @access  Public
exports.getProducts = async (req, res) => {
  try {
    const { isNewArrival, isBestSeller } = req.query;
    
    const query = {};
    if (isNewArrival === 'true') {
      query.isNewArrival = true;
    }
    if (isBestSeller === 'true') {
      query.isBestSeller = true;
    }

    const products = await Product.find(query).populate('category', 'name');
    res.json(products);
  } catch (error) {
    console.error('Error in getProducts:', error.message);
    res.status(500).json({ message: 'Lỗi máy chủ' });
  }
};

// @desc    Get a product by ID
// @route   GET /api/products/:id
// @access  Public
exports.getProductById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'ID sản phẩm không hợp lệ' });
    }
    const product = await Product.findById(req.params.id).populate('category', 'name');

    if (!product) {
      return res.status(404).json({ message: 'Sản phẩm không tìm thấy' });
    }

    res.json(product);
  } catch (error) {
    console.error('Error in getProductById:', error.message);
    if (error.name === 'CastError') {
        return res.status(400).json({ message: 'ID sản phẩm không đúng định dạng' });
    }
    res.status(500).json({ message: 'Lỗi máy chủ' });
  }
};

// @desc    Create a new product
// @route   POST /api/products
// @access  Private/Admin
exports.createProduct = async (req, res) => {
  try {
    const { name, description, category: categoryId, isNewArrival, isBestSeller } = req.body;
    let variants = req.body.variants;
    try {
      if (typeof variants === 'string') {
        variants = JSON.parse(variants);
      }
    } catch (parseError) {
      return res.status(400).json({ message: 'Dữ liệu biến thể sản phẩm không hợp lệ, phải là định dạng JSON.' });
    }

    if (!name || !categoryId || !variants || !Array.isArray(variants) || variants.length === 0) {
        return res.status(400).json({ message: 'Vui lòng cung cấp tên, ID danh mục và ít nhất một biến thể sản phẩm.' });
    }

    for (const variant of variants) {
      if (typeof variant.price !== 'number' || variant.price <= 0) {
        return res.status(400).json({ message: 'Mỗi biến thể phải có giá hợp lệ và lớn hơn 0.' });
      }
      if (typeof variant.stock !== 'number' || variant.stock < 0) {
        return res.status(400).json({ message: 'Mỗi biến thể phải có số lượng tồn kho hợp lệ.' });
      }
      if (!variant.color) {
        return res.status(400).json({ message: 'Mỗi biến thể phải có màu sắc.' });
      }
      if (!variant.capacity) {
        return res.status(400).json({ message: 'Mỗi biến thể phải có dung lượng.' });
      }
      variant.sku = `${name.substring(0, 3).toUpperCase()}-${variant.color.substring(0, 3).toUpperCase()}-${variant.capacity.replace(/\s+/g, '')}-${Date.now()}`;
    }

    const variantCombinations = new Set();
    for (const variant of variants) {
      const combination = `${variant.color}-${variant.capacity}`;
      if (variantCombinations.has(combination)) {
        return res.status(400).json({ 
          message: `Không thể có hai biến thể giống nhau (Màu: ${variant.color}, Dung lượng: ${variant.capacity})`
        });
      }
      variantCombinations.add(combination);
    }

    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({ message: 'ID danh mục không hợp lệ.' });
    }

    const categoryExists = await Category.findById(categoryId);
    if (!categoryExists) {
        return res.status(404).json({ message: 'Danh mục không tồn tại.' });
    }

    let imageUrl = '';
    let imagePublicId = '';

    if (req.file && req.file.buffer) {
      try {
        const result = await uploadToCloudinary(req.file.buffer, 'product_images'); 
        imageUrl = result.secure_url;
        imagePublicId = result.public_id;
      } catch (uploadError) {
        console.error('Lỗi tải ảnh lên khi tạo sản phẩm:', uploadError.message);
      }
    }    const product = new Product({
      name,
      description,
      category: categoryId, 
      image: imageUrl,
      variants,
      isNewArrival: isNewArrival === 'true' || isNewArrival === true,
      isBestSeller: isBestSeller === 'true' || isBestSeller === true,
      // imagePublicId: imagePublicId, // Lưu public_id nếu bạn muốn xóa ảnh khỏi Cloudinary sau này
    });

    const savedProduct = await product.save();
    await savedProduct.populate('category', 'name'); // Populate sau khi lưu

    res.status(201).json({ message: 'Sản phẩm được tạo thành công', product: savedProduct });
  } catch (error) {
    console.error('Error in createProduct:', error.message);
    if (error.name === 'ValidationError') {
        return res.status(400).json({ message: 'Lỗi xác thực dữ liệu', errors: error.errors });
    }
    res.status(500).json({ message: 'Lỗi máy chủ' });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
exports.updateProduct = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'ID sản phẩm không hợp lệ' });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Sản phẩm không tìm thấy' });
    }    const { name, description, category: categoryId, isNewArrival, isBestSeller } = req.body;
    let variants = req.body.variants;

    if (categoryId && categoryId !== 'string' && categoryId !== '') {
      if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        return res.status(400).json({ message: 'ID danh mục cung cấp để cập nhật không hợp lệ.' });
      }
      const categoryExists = await Category.findById(categoryId);
      if (!categoryExists) {
        return res.status(404).json({ message: 'Danh mục cung cấp để cập nhật không tồn tại.' });
      }
      product.category = categoryId;
    }

    if (req.file && req.file.buffer) {
      try {
        // (Tùy chọn) Xóa ảnh cũ trên Cloudinary trước khi tải ảnh mới
        // if (product.imagePublicId) {
        //   await cloudinary.uploader.destroy(product.imagePublicId);
        // }
        const result = await uploadToCloudinary(req.file.buffer, 'product_images'); // Truyền folderName
        product.image = result.secure_url;
        // product.imagePublicId = result.public_id;
      } catch (uploadError) {
        console.error('Lỗi tải ảnh lên khi cập nhật sản phẩm:', uploadError.message);
        // return res.status(500).json({ message: `Lỗi tải ảnh: ${uploadError.message}` });
      }
    }    product.name = name || product.name;
    product.description = description || product.description;
    if (variants) {
      try {
        if (typeof variants === 'string') {
          variants = JSON.parse(variants);
        }
      } catch (parseError) {
        return res.status(400).json({ message: 'Dữ liệu biến thể sản phẩm không hợp lệ, phải là định dạng JSON.' });
      }
      if (!Array.isArray(variants) || variants.length === 0) {
        return res.status(400).json({ message: 'Biến thể sản phẩm phải là một mảng không rỗng.' });
      }
      for (const variant of variants) {
        if (typeof variant.price !== 'number' || variant.price <= 0) {
          return res.status(400).json({ message: 'Mỗi biến thể phải có giá hợp lệ và lớn hơn 0.' });
        }
        if (typeof variant.stock !== 'number' || variant.stock < 0) {
          return res.status(400).json({ message: 'Mỗi biến thể phải có số lượng tồn kho hợp lệ.' });
        }
        if (!variant.color) {
          return res.status(400).json({ message: 'Mỗi biến thể phải có màu sắc.' });
        }
        if (!variant.capacity) {
          return res.status(400).json({ message: 'Mỗi biến thể phải có dung lượng.' });
        }
        
        if (!variant.sku) {
          variant.sku = `${product.name.substring(0, 3).toUpperCase()}-${variant.color.substring(0, 3).toUpperCase()}-${variant.capacity.replace(/\s+/g, '')}-${Date.now()}`;
        }
      }

      const variantCombinations = new Set();
      for (const variant of variants) {
        const combination = `${variant.color}-${variant.capacity}`;
        if (variantCombinations.has(combination)) {
          return res.status(400).json({ 
            message: `Không thể có hai biến thể giống nhau (Màu: ${variant.color}, Dung lượng: ${variant.capacity})`
          });
        }
        variantCombinations.add(combination);
      }
      product.variants = variants;
    }
    product.isNewArrival = isNewArrival !== undefined ? (isNewArrival === 'true' || isNewArrival === true) : product.isNewArrival;
    product.isBestSeller = isBestSeller !== undefined ? (isBestSeller === 'true' || isBestSeller === true) : product.isBestSeller;

    const updatedProduct = await product.save();
    await updatedProduct.populate('category', 'name');

    res.json({ message: 'Sản phẩm được cập nhật thành công', product: updatedProduct });
  } catch (error) {
    console.error('Error in updateProduct:', error.message);
    if (error.name === 'ValidationError') {
        return res.status(400).json({ message: 'Lỗi xác thực dữ liệu', errors: error.errors });
    }
    if (error.name === 'CastError') { // Bắt lỗi cast nếu vẫn xảy ra
        return res.status(400).json({ message: 'ID không đúng định dạng cho một trường nào đó.' });
    }
    res.status(500).json({ message: 'Lỗi máy chủ' });
  }
};


// @desc    Get products by category
// @route   GET /api/products/category/:categoryId  (Đổi tên param cho rõ ràng)
// @access  Public
exports.getProductsByCategory = async (req, res) => {
  try {
    const { category: categoryId } = req.params;

    // Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({ message: 'ID danh mục không hợp lệ.' });
    }

    // Check if category exists
    const categoryExists = await Category.findById(categoryId);
    if (!categoryExists) {
      return res.status(404).json({ message: 'Danh mục không tìm thấy.' });
    }

    // Find products with populated category
    const products = await Product.find({ category: categoryId }).populate('category', 'name');
    
    if (!products || products.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm nào cho danh mục này.' });
    }

    res.json(products);
  } catch (error) {
    console.error('Error in getProductsByCategory:', error.message);
    res.status(500).json({ message: 'Lỗi máy chủ' });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
exports.deleteProduct = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'ID sản phẩm không hợp lệ' });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Sản phẩm không tìm thấy' });
    }

    // (Tùy chọn) Xóa ảnh trên Cloudinary nếu có
    // if (product.imagePublicId) {
    //   try {
    //     await cloudinary.uploader.destroy(product.imagePublicId);
    //   } catch (deleteError) {
    //     console.error('Lỗi xóa ảnh trên Cloudinary:', deleteError.message);
    //     // Không chặn việc xóa sản phẩm khỏi DB nếu xóa ảnh lỗi
    //   }
    // }

    await product.deleteOne(); // Hoặc Product.findByIdAndDelete(req.params.id)

    res.json({ message: 'Sản phẩm được xóa thành công' });
  } catch (error) {
    console.error('Error in deleteProduct:', error.message);
    if (error.name === 'CastError') {
        return res.status(400).json({ message: 'ID sản phẩm không đúng định dạng' });
    }
    res.status(500).json({ message: 'Lỗi máy chủ' });
  }
};

