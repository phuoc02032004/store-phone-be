const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Category = require('./models/Category');
const Product = require('./models/Product');
require('dotenv').config();

const seedCategories = async () => {
  try {
    console.log('Seeding categories...');
    
    // Tạo categories
    const categories = [
      {
        name: 'iPhone',
        slug: 'iphone',
        description: 'iPhone products from Apple'
      },
      {
        name: 'MacBook',
        slug: 'macbook',
        description: 'MacBook laptops from Apple'
      }
    ];

    for (const category of categories) {
      const existingCategory = await Category.findOne({ slug: category.slug });
      if (!existingCategory) {
        await Category.create(category);
        console.log(`Created category: ${category.name}`);
      } else {
        console.log(`Category ${category.name} already exists`);
      }
    }

    console.log('Categories seeded successfully!');
    return await Category.find(); // Return all categories for use in product seeding
  } catch (error) {
    console.error('Error seeding categories:', error);
    throw error;
  }
};

const seedProducts = async (categories) => {
  try {
    console.log('Seeding products...');
    
    const iPhoneCategory = categories.find(c => c.slug === 'iphone');
    const macBookCategory = categories.find(c => c.slug === 'macbook');    const products = [
      {
        name: 'iPhone 14 Pro Max',
        description: 'iPhone 14 Pro Max với hệ thống camera tiên tiến và chip A16 Bionic',
        price: 27990000, // 27,990,000 VNĐ
        category: iPhoneCategory._id,
        stock: 50,
        isNewArrival: true,
        isBestSeller: true,
        image: 'https://res.cloudinary.com/dqxndwzkf/image/upload/v1747806989/categories/sghrzfne0erovec6pf49.webp'
      },
      {
        name: 'iPhone 14',
        description: 'iPhone 14 với thời lượng pin tuyệt vời',
        price: 19990000, // 19,990,000 VNĐ
        category: iPhoneCategory._id,
        stock: 75,
        isNewArrival: true,
        image: 'https://res.cloudinary.com/dqxndwzkf/image/upload/v1747807273/pkntxtja4figpuul0acm.webp'
      },
      {
        name: 'iPhone 13',
        description: 'iPhone 13 mạnh mẽ với chip A15 Bionic',
        price: 16990000, // 16,990,000 VNĐ
        category: iPhoneCategory._id,
        stock: 60,
        isBestSeller: true,
        image: 'https://res.cloudinary.com/dqxndwzkf/image/upload/v1747807273/pkntxtja4figpuul0acm.webp'
      },
      {
        name: 'MacBook Pro 16"',
        description: 'MacBook Pro 16 inch với chip M2 Pro hoặc M2 Max',
        price: 59990000, // 59,990,000 VNĐ
        category: macBookCategory._id,
        stock: 30,
        isNewArrival: true,
        isBestSeller: true,
        image: 'https://res.cloudinary.com/dqxndwzkf/image/upload/v1747886068/product_images/jspah0jn1mxmqm8vqfgf.webp'
      },
      {
        name: 'MacBook Air M2',
        description: 'MacBook Air siêu mỏng nhẹ với chip M2',
        price: 29990000, // 29,990,000 VNĐ
        category: macBookCategory._id,
        stock: 45,
        isNewArrival: true,
        image: 'https://res.cloudinary.com/dqxndwzkf/image/upload/v1747886037/product_images/bw3sxvlvrkw4izvp1g2b.jpg'
      },
      {
        name: 'MacBook Pro 14"',
        description: 'MacBook Pro 14 inch với màn hình Retina tuyệt đẹp',
        price: 49990000, // 49,990,000 VNĐ
        category: macBookCategory._id,
        stock: 35,
        isBestSeller: true,
        image: 'https://res.cloudinary.com/dqxndwzkf/image/upload/v1747886068/product_images/jspah0jn1mxmqm8vqfgf.webp'
      }
    ];

    for (const product of products) {
      const existingProduct = await Product.findOne({ name: product.name });
      if (!existingProduct) {
        await Product.create(product);
        console.log(`Created product: ${product.name}`);
      } else {
        console.log(`Product ${product.name} already exists`);
      }
    }

    console.log('Products seeded successfully!');
  } catch (error) {
    console.error('Error seeding products:', error);
    throw error;
  }
};

const seedAll = async () => {
  let connection;
  try {
    console.log('Connecting to MongoDB...');
    connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });    console.log('Connected successfully to MongoDB');

    // Seed admin user
    const adminUser = await User.findOne({ role: 'admin' });

    if (!adminUser) {
      console.log('No admin user found. Creating default admin user...');
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);

      const newAdminUser = new User({
        username: 'admin',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin',
      });

      await newAdminUser.save();
      console.log('----------------------------------------');
      console.log('Default admin user created successfully!');
      console.log('Credentials:');
      console.log('Email: admin@example.com');
      console.log('Password: admin123');
      console.log('----------------------------------------');    } else {
      console.log('Admin user already exists');
    }

    // Seed categories and get them for product seeding
    const categories = await seedCategories();
    
    // Seed products
    await seedProducts(categories);

  } catch (error) {
    console.error('Error in seeding:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await mongoose.disconnect();
      console.log('Disconnected from MongoDB');
    }
  }
};

// Run the seeding process
seedAll();