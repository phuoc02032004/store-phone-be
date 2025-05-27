const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Category = require('./models/Category');
const Product = require('./models/Product');
const Coupon = require('./models/Coupon');
const Review = require('./models/Review');
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

const seedCoupons = async () => {
  try {
    console.log('Seeding coupons...');

    const coupons = [
      {
        code: 'WELCOME100K',
        type: 'FIXED_AMOUNT_DISCOUNT',
        value: 100000,
        minOrderValue: 500000,
        startDate: new Date(Date.now() - 86400000 * 7), // 7 days ago
        endDate: new Date(Date.now() + 86400000 * 90), // 90 days from now
        usageLimit: 500,
        usageLimitPerUser: 1,
        isActive: true
      },
      {
        code: 'SALE20',
        type: 'PERCENTAGE_DISCOUNT',
        value: 20,
        minOrderValue: 500000,
        maxDiscountValue: 200000,
        startDate: new Date(Date.now() - 86400000), // Yesterday
        endDate: new Date(Date.now() + 86400000 * 30), // 30 days from now
        usageLimit: 100,
        usageLimitPerUser: 1,
        isActive: true
      },
      {
        code: 'FREESHIP',
        type: 'FREE_SHIPPING',
        value: 0,
        minOrderValue: 1000000,
        startDate: new Date(Date.now() - 86400000),
        endDate: new Date(Date.now() + 86400000 * 60),
        usageLimit: 50,
        usageLimitPerUser: 1,
        isActive: true
      },
      {
        code: 'FIXED100K',
        type: 'FIXED_AMOUNT_DISCOUNT',
        value: 100000,
        minOrderValue: 1000000,
        startDate: new Date(Date.now() - 86400000),
        endDate: new Date(Date.now() + 86400000 * 90),
        usageLimit: 200,
        usageLimitPerUser: null,
        isActive: true
      },
      {
        code: 'SUMMER2025',
        type: 'PERCENTAGE_DISCOUNT',
        value: 15,
        minOrderValue: 750000,
        maxDiscountValue: 150000,
        startDate: new Date(Date.now() + 86400000 * 10), // Starts in 10 days
        endDate: new Date(Date.now() + 86400000 * 40), // Ends in 40 days
        usageLimit: 200,
        usageLimitPerUser: 1,
        isActive: true
      },
      {
        code: 'NEWUSER50',
        type: 'FIXED_AMOUNT_DISCOUNT',
        value: 50000,
        minOrderValue: 300000,
        startDate: new Date(Date.now() - 86400000 * 5), // Started 5 days ago
        endDate: new Date(Date.now() + 86400000 * 25), // Ends in 25 days
        usageLimit: 500,
        usageLimitPerUser: 1,
        isActive: true
      }
    ];

    for (const coupon of coupons) {
      const existingCoupon = await Coupon.findOne({ code: coupon.code });
      if (!existingCoupon) {
        await Coupon.create(coupon);
        console.log(`Created coupon: ${coupon.code}`);
      } else {
        console.log(`Coupon ${coupon.code} already exists`);
      }
    }

    console.log('Coupons seeded successfully!');
  } catch (error) {
    console.error('Error seeding coupons:', error);
    throw error;
  }
};

const seedReviews = async () => {
  try {
    console.log('Seeding reviews...');

    const users = await User.find({});
    const products = await Product.find({});

    if (users.length === 0 || products.length === 0) {
      console.log('No users or products found to seed reviews. Skipping review seeding.');
      return;
    }

    const reviews = [
      {
        user: users[0]._id,
        product: products[0]._id, // iPhone 14 Pro Max
        rating: 5,
        comment: 'Sản phẩm tuyệt vời, camera chụp ảnh rất đẹp!'
      },
      {
        user: users[1]._id, // Assuming there's a second user or create one
        product: products[0]._id,
        rating: 4,
        comment: 'Pin dùng khá tốt, thiết kế sang trọng.'
      },
      {
        user: users[0]._id,
        product: products[3]._id, // MacBook Pro 16"
        rating: 5,
        comment: 'Hiệu năng mạnh mẽ, màn hình sắc nét, rất phù hợp cho công việc đồ họa.'
      },
      {
        user: users[1]._id,
        product: products[4]._id, // MacBook Air M2
        rating: 4,
        comment: 'Nhẹ và mỏng, tiện lợi mang đi lại. Chip M2 rất nhanh.'
      }
    ];

    for (const reviewData of reviews) {
      const existingReview = await Review.findOne({ user: reviewData.user, product: reviewData.product });
      if (!existingReview) {
        await Review.create(reviewData);
        console.log(`Created review for product ${reviewData.product} by user ${reviewData.user}`);
      } else {
        console.log(`Review for product ${reviewData.product} by user ${reviewData.user} already exists`);
      }
    }

    console.log('Reviews seeded successfully!');
  } catch (error) {
    console.error('Error seeding reviews:', error);
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
    });
    console.log('Connected successfully to MongoDB');

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

    // Seed coupons
    await seedCoupons();

    // Seed reviews
    await seedReviews();

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