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
        name: 'iPhone 16',
        description: 'iPhone 16 với thiết kế mới và hiệu năng vượt trội.',
        category: iPhoneCategory._id,
        isNewArrival: true,
        isBestSeller: true,
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-1.png', 
        variants: [
          {
            name: "iPhone 16",
            variantName: "iPhone 16 128GB - Xanh Titan",
            color: "Xanh Titan",
            capacity: "128GB",
            price: 23990000,
            stock: 150,
            sku: "IP16-128-XT"
          },
          {
            name: "iPhone 16",
            variantName: "iPhone 16 256GB - Xanh Titan",
            color: "Xanh Titan",
            capacity: "256GB",
            price: 26990000,
            stock: 200,
            sku: "IP16-256-XT"
          },
          {
            name: "iPhone 16",
            variantName: "iPhone 16 512GB - Xanh Titan",
            color: "Xanh Titan",
            capacity: "512GB",
            price: 32990000,
            stock: 80,
            sku: "IP16-512-XT"
          },
          {
            name: "iPhone 16",
            variantName: "iPhone 16 128GB - Titan Tự Nhiên",
            color: "Titan Tự Nhiên",
            capacity: "128GB",
            price: 23990000,
            stock: 120,
            sku: "IP16-128-TTN"
          },
          {
            name: "iPhone 16",
            variantName: "iPhone 16 256GB - Titan Tự Nhiên",
            color: "Titan Tự Nhiên",
            capacity: "256GB",
            price: 26990000,
            stock: 180,
            sku: "IP16-256-TTN"
          },
          {
            name: "iPhone 16",
            variantName: "iPhone 16 512GB - Titan Tự Nhiên",
            color: "Titan Tự Nhiên",
            capacity: "512GB",
            price: 32990000,
            stock: 75,
            sku: "IP16-512-TTN"
          },
          {
            name: "iPhone 16",
            variantName: "iPhone 16 128GB - Titan Đen",
            color: "Titan Đen",
            capacity: "128GB",
            price: 23990000,
            stock: 130,
            sku: "IP16-128-TD"
          },
          {
            name: "iPhone 16",
            variantName: "iPhone 16 256GB - Titan Đen",
            color: "Titan Đen",
            capacity: "256GB",
            price: 26990000,
            stock: 190,
            sku: "IP16-256-TD"
          },
          {
            name: "iPhone 16",
            variantName: "iPhone 16 128GB - Hồng Phấn (Giả định)",
            color: "Hồng Phấn",
            capacity: "128GB",
            price: 23990000,
            stock: 100,
            sku: "IP16-128-HP"
          },
          {
            name: "iPhone 16",
            variantName: "iPhone 16 256GB - Vàng Đồng (Giả định)",
            color: "Vàng Đồng",
            capacity: "256GB",
            price: 26990000,
            stock: 90,
            sku: "IP16-256-VD"
          }
        ]
      },
      {
        name: 'iPhone 16 Pro',
        description: 'iPhone 16 Pro với camera chuyên nghiệp và chip A18 Bionic.',
        category: iPhoneCategory._id,
        isNewArrival: true,
        isBestSeller: true,
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro_1.png', 
        variants: [
          {
            name: "iPhone 16 Pro",
            variantName: "iPhone 16 Pro 256GB - Titan Đen",
            color: "Titan Đen",
            capacity: "256GB",
            price: 30990000,
            stock: 100,
            sku: "IP16P-256-TD"
          },
          {
            name: "iPhone 16 Pro",
            variantName: "iPhone 16 Pro 512GB - Titan Đen",
            color: "Titan Đen",
            capacity: "512GB",
            price: 35990000,
            stock: 70,
            sku: "IP16P-512-TD"
          },
          {
            name: "iPhone 16 Pro",
            variantName: "iPhone 16 Pro 1TB - Titan Đen",
            color: "Titan Đen",
            capacity: "1TB",
            price: 41990000,
            stock: 40,
            sku: "IP16P-1TB-TD"
          },
          {
            name: "iPhone 16 Pro",
            variantName: "iPhone 16 Pro 256GB - Titan Trắng",
            color: "Titan Trắng",
            capacity: "256GB",
            price: 30990000,
            stock: 90,
            sku: "IP16P-256-TT"
          },
          {
            name: "iPhone 16 Pro",
            variantName: "iPhone 16 Pro 512GB - Titan Trắng",
            color: "Titan Trắng",
            capacity: "512GB",
            price: 35990000,
            stock: 65,
            sku: "IP16P-512-TT"
          },
          {
            name: "iPhone 16 Pro",
            variantName: "iPhone 16 Pro 1TB - Titan Trắng",
            color: "Titan Trắng",
            capacity: "1TB",
            price: 41990000,
            stock: 35,
            sku: "IP16P-1TB-TT"
          },
          {
            name: "iPhone 16 Pro",
            variantName: "iPhone 16 Pro 256GB - Titan Tự Nhiên",
            color: "Titan Tự Nhiên",
            capacity: "256GB",
            price: 30990000,
            stock: 110,
            sku: "IP16P-256-TTN"
          },
          {
            name: "iPhone 16 Pro",
            variantName: "iPhone 16 Pro 512GB - Titan Tự Nhiên",
            color: "Titan Tự Nhiên",
            capacity: "512GB",
            price: 35990000,
            stock: 80,
            sku: "IP16P-512-TTN"
          },
          {
            name: "iPhone 16 Pro",
            variantName: "iPhone 16 Pro 256GB - Xanh Dương Titan (Giả định)",
            color: "Xanh Dương Titan",
            capacity: "256GB",
            price: 30990000,
            stock: 80,
            sku: "IP16P-256-XDT"
          },
          {
            name: "iPhone 16 Pro",
            variantName: "iPhone 16 Pro 512GB - Xanh Dương Titan (Giả định)",
            color: "Xanh Dương Titan",
            capacity: "512GB",
            price: 35990000,
            stock: 50,
            sku: "IP16P-512-XDT"
          }
        ]
      },
      {
        name: 'iPhone 16 Pro Max',
        description: 'iPhone 16 Pro Max với màn hình lớn và thời lượng pin khủng.',
        category: iPhoneCategory._id,
        isNewArrival: true,
        isBestSeller: true,
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro-max.png', 
        variants: [
          {
            name: "iPhone 16 Pro Max",
            variantName: "iPhone 16 Pro Max 256GB - Titan Đen",
            color: "Titan Đen",
            capacity: "256GB",
            price: 33990000,
            stock: 90,
            sku: "IP16PM-256-TD"
          },
          {
            name: "iPhone 16 Pro Max",
            variantName: "iPhone 16 Pro Max 512GB - Titan Đen",
            color: "Titan Đen",
            capacity: "512GB",
            price: 38990000,
            stock: 60,
            sku: "IP16PM-512-TD"
          },
          {
            name: "iPhone 16 Pro Max",
            variantName: "iPhone 16 Pro Max 1TB - Titan Đen",
            color: "Titan Đen",
            capacity: "1TB",
            price: 44990000,
            stock: 30,
            sku: "IP16PM-1TB-TD"
          },
          {
            name: "iPhone 16 Pro Max",
            variantName: "iPhone 16 Pro Max 256GB - Titan Trắng",
            color: "Titan Trắng",
            capacity: "256GB",
            price: 33990000,
            stock: 85,
            sku: "IP16PM-256-TT"
          },
          {
            name: "iPhone 16 Pro Max",
            variantName: "iPhone 16 Pro Max 512GB - Titan Trắng",
            color: "Titan Trắng",
            capacity: "512GB",
            price: 38990000,
            stock: 55,
            sku: "IP16PM-512-TT"
          },
          {
            name: "iPhone 16 Pro Max",
            variantName: "iPhone 16 Pro Max 1TB - Titan Trắng",
            color: "Titan Trắng",
            capacity: "1TB",
            price: 44990000,
            stock: 25,
            sku: "IP16PM-1TB-TT"
          },
          {
            name: "iPhone 16 Pro Max",
            variantName: "iPhone 16 Pro Max 256GB - Titan Tự Nhiên",
            color: "Titan Tự Nhiên",
            capacity: "256GB",
            price: 33990000,
            stock: 100,
            sku: "IP16PM-256-TTN"
          },
          {
            name: "iPhone 16 Pro Max",
            variantName: "iPhone 16 Pro Max 512GB - Titan Tự Nhiên",
            color: "Titan Tự Nhiên",
            capacity: "512GB",
            price: 38990000,
            stock: 70,
            sku: "IP16PM-512-TTN"
          }
        ]
      },
      {
        name: 'MacBook Air 13" M3',
        description: 'MacBook Air 13 inch với chip M3 mạnh mẽ và thiết kế siêu mỏng.',
        category: macBookCategory._id,
        isNewArrival: true,
        isBestSeller: true,
        image: 'https://cdn2.fptshop.com.vn/unsafe/750x0/filters:format(webp):quality(75)/2024_3_20_638465487289151222_macbook-air-m3-13-2024-xanh-1.jpg', 
        variants: [
          {
            name: "MacBook Air 13\" M3",
            variantName: "MacBook Air 13\" M3 8GB/256GB - Midnight",
            color: "Midnight",
            capacity: "8GB/256GB",
            price: 27990000,
            stock: 80,
            sku: "MBA13M3-8-256-MN"
          },
          {
            name: "MacBook Air 13\" M3",
            variantName: "MacBook Air 13\" M3 8GB/512GB - Starlight",
            color: "Starlight",
            capacity: "8GB/512GB",
            price: 30990000,
            stock: 60,
            sku: "MBA13M3-8-512-SL"
          },
          {
            name: "MacBook Air 13\" M3",
            variantName: "MacBook Air 13\" M3 16GB/512GB - Space Gray",
            color: "Space Gray",
            capacity: "16GB/512GB",
            price: 35990000,
            stock: 40,
            sku: "MBA13M3-16-512-SG"
          }
        ]
      },
      {
        name: 'MacBook Pro 14" M3 Pro',
        description: 'MacBook Pro 14 inch với chip M3 Pro cho hiệu năng vượt trội.',
        category: macBookCategory._id,
        isNewArrival: true,
        isBestSeller: true,
        image: 'https://cdn2.fptshop.com.vn/unsafe/750x0/filters:format(webp):quality(75)/2024_3_20_638465446511085530_macbook-pro-14-2023-m3-8-cpu-10-gpu-bac%20(1).jpg', 
        variants: [
          {
            name: "MacBook Pro 14\" M3 Pro",
            variantName: "MacBook Pro 14\" M3 Pro 18GB/512GB - Space Black",
            color: "Space Black",
            capacity: "18GB/512GB",
            price: 49990000,
            stock: 50,
            sku: "MBP14M3P-18-512-SB"
          },
          {
            name: "MacBook Pro 14\" M3 Pro",
            variantName: "MacBook Pro 14\" M3 Pro 36GB/1TB - Silver",
            color: "Silver",
            capacity: "36GB/1TB",
            price: 62990000,
            stock: 30,
            sku: "MBP14M3P-36-1TB-SL"
          }
        ]
      },
      {
        name: 'MacBook Pro 16" M3 Max',
        description: 'MacBook Pro 16 inch với chip M3 Max, hiệu năng tối thượng cho các tác vụ nặng.',
        category: macBookCategory._id,
        isNewArrival: true,
        isBestSeller: true,
        image: 'https://cdn2.fptshop.com.vn/unsafe/750x0/filters:format(webp):quality(75)/macbook_pro_16_m4_pro_max_silver_1_6f38aaf8d8.png', 
        variants: [
          {
            name: "MacBook Pro 16\" M3 Max",
            variantName: "MacBook Pro 16\" M3 Max 36GB/1TB - Space Black",
            color: "Space Black",
            capacity: "36GB/1TB",
            price: 74990000,
            stock: 25,
            sku: "MBP16M3M-36-1TB-SB"
          },
          {
            name: "MacBook Pro 16\" M3 Max",
            variantName: "MacBook Pro 16\" M3 Max 48GB/2TB - Silver",
            color: "Silver",
            capacity: "48GB/2TB",
            price: 89990000,
            stock: 15,
            sku: "MBP16M3M-48-2TB-SL"
          }
        ]
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
 
const seedCoupons = async (adminUser) => {
  try {
    console.log('Seeding coupons...');
 
    const coupons = [
      {
        name: 'Welcome Discount 100K',
        code: 'WELCOME100K',
        description: 'Giảm 100.000đ cho đơn hàng đầu tiên.',
        type: 'FIXED_AMOUNT_DISCOUNT',
        value: 100000,
        minOrderValue: 500000,
        startDate: new Date(Date.now() - 86400000 * 7), // 7 days ago
        endDate: new Date(Date.now() + 86400000 * 90), // 90 days from now
        usageLimit: 500,
        usageLimitPerUser: 1,
        isActive: true,
        createdBy: adminUser._id
      },
      {
        name: '20% Off Sale',
        code: 'SALE20',
        description: 'Giảm 20% tối đa 200.000đ cho đơn hàng.',
        type: 'PERCENTAGE_DISCOUNT',
        value: 20,
        minOrderValue: 500000,
        maxDiscountValue: 200000,
        startDate: new Date(Date.now() - 86400000),
        endDate: new Date(Date.now() + 86400000 * 30),
        usageLimit: 100,
        usageLimitPerUser: 1,
        isActive: true,
        createdBy: adminUser._id
      },
      {
        name: 'Free Shipping',
        code: 'FREESHIP',
        description: 'Miễn phí vận chuyển cho đơn hàng trên 1.000.000đ.',
        type: 'FREE_SHIPPING',
        value: 0,
        minOrderValue: 1000000,
        startDate: new Date(Date.now() - 86400000),
        endDate: new Date(Date.now() + 86400000 * 60),
        usageLimit: 50,
        usageLimitPerUser: 1,
        isActive: true,
        createdBy: adminUser._id
      },
      {
        name: 'Fixed 100K Discount',
        code: 'FIXED100K',
        description: 'Giảm giá cố định 100.000đ.',
        type: 'FIXED_AMOUNT_DISCOUNT',
        value: 100000,
        minOrderValue: 1000000,
        startDate: new Date(Date.now() - 86400000),
        endDate: new Date(Date.now() + 86400000 * 90),
        usageLimit: 200,
        usageLimitPerUser: null,
        isActive: true,
        createdBy: adminUser._id
      },
      {
        name: 'Summer Sale 2025',
        code: 'SUMMER2025',
        description: 'Giảm 15% tối đa 150.000đ cho mùa hè 2025.',
        type: 'PERCENTAGE_DISCOUNT',
        value: 15,
        minOrderValue: 750000,
        maxDiscountValue: 150000,
        startDate: new Date(Date.now() + 86400000 * 10),
        endDate: new Date(Date.now() + 86400000 * 40),
        usageLimit: 200,
        usageLimitPerUser: 1,
        isActive: true,
        createdBy: adminUser._id
      },
      {
        name: 'New User 50K',
        code: 'NEWUSER50',
        description: 'Giảm 50.000đ cho người dùng mới.',
        type: 'FIXED_AMOUNT_DISCOUNT',
        value: 50000,
        minOrderValue: 300000,
        startDate: new Date(Date.now() - 86400000 * 5),
        endDate: new Date(Date.now() + 86400000 * 25),
        usageLimit: 500,
        usageLimitPerUser: 1,
        isActive: true,
        createdBy: adminUser._id
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