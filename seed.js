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

    // Define parent categories
    const parentCategories = [
      {
        name: 'Điện thoại',
        slug: 'dien-thoai',
        description: 'Các loại điện thoại di động'
      },
      {
        name: 'Laptop',
        slug: 'laptop',
        description: 'Các loại máy tính xách tay'
      }
    ];

    // Create parent categories
    const createdParentCategories = [];
    for (const category of parentCategories) {
      const existingCategory = await Category.findOne({ slug: category.slug });
      if (!existingCategory) {
        const newCategory = await Category.create(category);
        createdParentCategories.push(newCategory);
        console.log(`Created parent category: ${category.name}`);
      } else {
        createdParentCategories.push(existingCategory);
        console.log(`Parent category ${category.name} already exists`);
      }
    }

    // Find parent category IDs
    const dienThoaiParent = createdParentCategories.find(c => c.slug === 'dien-thoai');
    const laptopParent = createdParentCategories.find(c => c.slug === 'laptop');

    // Define child categories
    const childCategories = [
      {
        name: 'iPhone',
        slug: 'iphone',
        description: 'iPhone products from Apple',
        parent: dienThoaiParent ? dienThoaiParent._id : null,
        ancestors: dienThoaiParent ? [{ _id: dienThoaiParent._id, name: dienThoaiParent.name, slug: dienThoaiParent.slug }] : [],
        level: dienThoaiParent ? 1 : 0
      },
      {
        name: 'Samsung',
        slug: 'samsung',
        description: 'Samsung mobile phones',
        parent: dienThoaiParent ? dienThoaiParent._id : null,
        ancestors: dienThoaiParent ? [{ _id: dienThoaiParent._id, name: dienThoaiParent.name, slug: dienThoaiParent.slug }] : [],
        level: dienThoaiParent ? 1 : 0
      },
      {
        name: 'Xiaomi',
        slug: 'xiaomi',
        description: 'Xiaomi mobile phones',
        parent: dienThoaiParent ? dienThoaiParent._id : null,
        ancestors: dienThoaiParent ? [{ _id: dienThoaiParent._id, name: dienThoaiParent.name, slug: dienThoaiParent.slug }] : [],
        level: dienThoaiParent ? 1 : 0
      },
      {
        name: 'MacBook',
        slug: 'macbook',
        description: 'MacBook laptops from Apple',
        parent: laptopParent ? laptopParent._id : null,
        ancestors: laptopParent ? [{ _id: laptopParent._id, name: laptopParent.name, slug: laptopParent.slug }] : [],
        level: laptopParent ? 1 : 0
      },
      {
        name: 'Asus',
        slug: 'asus',
        description: 'Asus laptops',
        parent: laptopParent ? laptopParent._id : null,
        ancestors: laptopParent ? [{ _id: laptopParent._id, name: laptopParent.name, slug: laptopParent.slug }] : [],
        level: laptopParent ? 1 : 0
      },
      {
        name: 'HP',
        slug: 'hp',
        description: 'HP laptops',
        parent: laptopParent ? laptopParent._id : null,
        ancestors: laptopParent ? [{ _id: laptopParent._id, name: laptopParent.name, slug: laptopParent.slug }] : [],
        level: laptopParent ? 1 : 0
      }
    ];

    const createdChildCategories = [];
    for (const category of childCategories) {
      const existingCategory = await Category.findOne({ slug: category.slug });
      if (!existingCategory) {
        const newCategory = await Category.create(category);
        createdChildCategories.push(newCategory);
        console.log(`Created child category: ${category.name}`);
      } else {
        createdChildCategories.push(existingCategory);
        console.log(`Child category ${category.name} already exists`);
      }
    }

    console.log('Categories seeded successfully!');
    return await Category.find(); 
  } catch (error) {
    console.error('Error seeding categories:', error);
    throw error;
  }
};

const seedProducts = async (categories) => {
  try {
    console.log('Seeding products...');

    const iPhoneCategory = categories.find(c => c.slug === 'iphone');
    const samsungCategory = categories.find(c => c.slug === 'samsung');
    const xiaomiCategory = categories.find(c => c.slug === 'xiaomi');
    const macBookCategory = categories.find(c => c.slug === 'macbook');
    const asusCategory = categories.find(c => c.slug === 'asus');
    const hpCategory = categories.find(c => c.slug === 'hp');

    const products = [
      {
        name: 'iPhone 16',
        description: 'iPhone 16 với thiết kế mới và hiệu năng vượt trội.',
        category: iPhoneCategory ? iPhoneCategory._id : null,
        isNewArrival: true,
        isBestSeller: true,
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-1.png',
        variants: [
          { name: "iPhone 16", variantName: "iPhone 16 128GB - Xanh Titan", color: "Xanh Titan", capacity: "128GB", price: 23990000, stock: 150, sku: "IP16-128-XT" },
          { name: "iPhone 16", variantName: "iPhone 16 256GB - Xanh Titan", color: "Xanh Titan", capacity: "256GB", price: 26990000, stock: 200, sku: "IP16-256-XT" },
          { name: "iPhone 16", variantName: "iPhone 16 512GB - Xanh Titan", color: "Xanh Titan", capacity: "512GB", price: 32990000, stock: 80, sku: "IP16-512-XT" },
          { name: "iPhone 16", variantName: "iPhone 16 128GB - Titan Tự Nhiên", color: "Titan Tự Nhiên", capacity: "128GB", price: 23990000, stock: 120, sku: "IP16-128-TTN" },
          { name: "iPhone 16", variantName: "iPhone 16 256GB - Titan Tự Nhiên", color: "Titan Tự Nhiên", capacity: "256GB", price: 26990000, stock: 180, sku: "IP16-256-TTN" },
          { name: "iPhone 16", variantName: "iPhone 16 512GB - Titan Tự Nhiên", color: "Titan Tự Nhiên", capacity: "512GB", price: 32990000, stock: 75, sku: "IP16-512-TTN" },
          { name: "iPhone 16", variantName: "iPhone 16 128GB - Titan Đen", color: "Titan Đen", capacity: "128GB", price: 23990000, stock: 130, sku: "IP16-128-TD" },
          { name: "iPhone 16", variantName: "iPhone 16 256GB - Titan Đen", color: "Titan Đen", capacity: "256GB", price: 26990000, stock: 190, sku: "IP16-256-TD" },
          { name: "iPhone 16", variantName: "iPhone 16 128GB - Hồng Phấn (Giả định)", color: "Hồng Phấn", capacity: "128GB", price: 23990000, stock: 100, sku: "IP16-128-HP" },
          { name: "iPhone 16", variantName: "iPhone 16 256GB - Vàng Đồng (Giả định)", color: "Vàng Đồng", capacity: "256GB", price: 26990000, stock: 90, sku: "IP16-256-VD" }
        ]
      },
      {
        name: 'iPhone 16 Pro',
        description: 'iPhone 16 Pro với camera chuyên nghiệp và chip A18 Bionic.',
        category: iPhoneCategory ? iPhoneCategory._id : null,
        isNewArrival: true,
        isBestSeller: true,
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro_1.png',
        variants: [
          { name: "iPhone 16 Pro", variantName: "iPhone 16 Pro 256GB - Titan Đen", color: "Titan Đen", capacity: "256GB", price: 30990000, stock: 100, sku: "IP16P-256-TD" },
          { name: "iPhone 16 Pro", variantName: "iPhone 16 Pro 512GB - Titan Đen", color: "Titan Đen", capacity: "512GB", price: 35990000, stock: 70, sku: "IP16P-512-TD" },
          { name: "iPhone 16 Pro", variantName: "iPhone 16 Pro 1TB - Titan Đen", color: "Titan Đen", capacity: "1TB", price: 41990000, stock: 40, sku: "IP16P-1TB-TD" },
          { name: "iPhone 16 Pro", variantName: "iPhone 16 Pro 256GB - Titan Trắng", color: "Titan Trắng", capacity: "256GB", price: 30990000, stock: 90, sku: "IP16P-256-TT" },
          { name: "iPhone 16 Pro", variantName: "iPhone 16 Pro 512GB - Titan Trắng", color: "Titan Trắng", capacity: "512GB", price: 35990000, stock: 65, sku: "IP16P-512-TT" },
          { name: "iPhone 16 Pro", variantName: "iPhone 16 Pro 1TB - Titan Trắng", color: "Titan Trắng", capacity: "1TB", price: 41990000, stock: 35, sku: "IP16P-1TB-TT" },
          { name: "iPhone 16 Pro", variantName: "iPhone 16 Pro 256GB - Titan Tự Nhiên", color: "Titan Tự Nhiên", capacity: "256GB", price: 30990000, stock: 110, sku: "IP16P-256-TTN" },
          { name: "iPhone 16 Pro", variantName: "iPhone 16 Pro 512GB - Titan Tự Nhiên", color: "Titan Tự Nhiên", capacity: "512GB", price: 35990000, stock: 80, sku: "IP16P-512-TTN" },
          { name: "iPhone 16 Pro", variantName: "iPhone 16 Pro 256GB - Xanh Dương Titan (Giả định)", color: "Xanh Dương Titan", capacity: "256GB", price: 30990000, stock: 80, sku: "IP16P-256-XDT" },
          { name: "iPhone 16 Pro", variantName: "iPhone 16 Pro 512GB - Xanh Dương Titan (Giả định)", color: "Xanh Dương Titan", capacity: "512GB", price: 35990000, stock: 50, sku: "IP16P-512-XDT" }
        ]
      },
      {
        name: 'iPhone 16 Pro Max',
        description: 'iPhone 16 Pro Max với màn hình lớn và thời lượng pin khủng.',
        category: iPhoneCategory ? iPhoneCategory._id : null,
        isNewArrival: true,
        isBestSeller: true,
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro-max.png',
        variants: [
          { name: "iPhone 16 Pro Max", variantName: "iPhone 16 Pro Max 256GB - Titan Đen", color: "Titan Đen", capacity: "256GB", price: 33990000, stock: 90, sku: "IP16PM-256-TD" },
          { name: "iPhone 16 Pro Max", variantName: "iPhone 16 Pro Max 512GB - Titan Đen", color: "Titan Đen", capacity: "512GB", price: 38990000, stock: 60, sku: "IP16PM-512-TD" },
          { name: "iPhone 16 Pro Max", variantName: "iPhone 16 Pro Max 1TB - Titan Đen", color: "Titan Đen", capacity: "1TB", price: 44990000, stock: 30, sku: "IP16PM-1TB-TD" },
          { name: "iPhone 16 Pro Max", variantName: "iPhone 16 Pro Max 256GB - Titan Trắng", color: "Titan Trắng", capacity: "256GB", price: 33990000, stock: 85, sku: "IP16PM-256-TT" },
          { name: "iPhone 16 Pro Max", variantName: "iPhone 16 Pro Max 512GB - Titan Trắng", color: "Titan Trắng", capacity: "512GB", price: 38990000, stock: 55, sku: "IP16PM-512-TT" },
          { name: "iPhone 16 Pro Max", variantName: "iPhone 16 Pro Max 1TB - Titan Trắng", color: "Titan Trắng", capacity: "1TB", price: 44990000, stock: 25, sku: "IP16PM-1TB-TT" },
          { name: "iPhone 16 Pro Max", variantName: "iPhone 16 Pro Max 256GB - Titan Tự Nhiên", color: "Titan Tự Nhiên", capacity: "256GB", price: 33990000, stock: 100, sku: "IP16PM-256-TTN" },
          { name: "iPhone 16 Pro Max", variantName: "iPhone 16 Pro Max 512GB - Titan Tự Nhiên", color: "Titan Tự Nhiên", capacity: "512GB", price: 38990000, stock: 70, sku: "IP16PM-512-TTN" }
        ]
      },

      // Samsung Products (at least 3)
      {
        name: 'Samsung Galaxy S25 Ultra',
        description: 'Samsung Galaxy S25 Ultra với camera 200MP và bút S Pen.',
        category: samsungCategory ? samsungCategory._id : null,
        isNewArrival: true,
        isBestSeller: true,
        image: 'https://cdn2.fptshop.com.vn/unsafe/384x0/filters:format(webp):quality(75)/galaxy_s25_ultra_titan_silver_blue_4_3f0c8ea577.png', // Placeholder image
        variants: [
          { name: "Galaxy S25 Ultra", variantName: "Galaxy S25 Ultra 256GB - Đen", color: "Đen", capacity: "256GB", price: 28990000, stock: 120, sku: "SS-S25U-256-D" },
          { name: "Galaxy S25 Ultra", variantName: "Galaxy S25 Ultra 512GB - Trắng", color: "Trắng", capacity: "512GB", price: 31990000, stock: 80, sku: "SS-S25U-512-T" },
          { name: "Galaxy S25 Ultra", variantName: "Galaxy S25 Ultra 1TB - Xanh", color: "Xanh", capacity: "1TB", price: 36990000, stock: 50, sku: "SS-S25U-1TB-X" },
          { name: "Galaxy S25 Ultra", variantName: "Galaxy S25 Ultra 256GB - Tím", color: "Tím", capacity: "256GB", price: 28990000, stock: 90, sku: "SS-S25U-256-Tim" }
        ]
      },
      {
        name: 'Samsung Galaxy Z Fold 6',
        description: 'Samsung Galaxy Z Fold 6 màn hình gập đột phá.',
        category: samsungCategory ? samsungCategory._id : null,
        isNewArrival: true,
        isBestSeller: false,
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-z-fold-6-xanh_5_.png', // Placeholder image
        variants: [
          { name: "Galaxy Z Fold 6", variantName: "Galaxy Z Fold 6 256GB - Đen", color: "Đen", capacity: "256GB", price: 35990000, stock: 70, sku: "SS-ZF7-256-D" },
          { name: "Galaxy Z Fold 6", variantName: "Galaxy Z Fold 6 512GB - Xanh", color: "Xanh", capacity: "512GB", price: 38990000, stock: 40, sku: "SS-ZF7-512-X" },
          { name: "Galaxy Z Fold 6", variantName: "Galaxy Z Fold 6 256GB - Bạc", color: "Bạc", capacity: "256GB", price: 35990000, stock: 50, sku: "SS-ZF7-256-B" },
          { name: "Galaxy Z Fold 6", variantName: "Galaxy Z Fold 6 512GB - Kem", color: "Kem", capacity: "512GB", price: 38990000, stock: 30, sku: "SS-ZF7-512-K" }
        ]
      },
      {
        name: 'Samsung Galaxy A56',
        description: 'Samsung Galaxy A56 pin trâu, camera tốt.',
        category: samsungCategory ? samsungCategory._id : null,
        isNewArrival: false,
        isBestSeller: true,
        image: 'https://cdn2.cellphones.com.vn/x/media/catalog/product/d/i/dien-thoai-samsung-galaxy-a56_3_.png?_gl=1*187l4hm*_gcl_au*MjAzMzg2MTcwOS4xNzQ3ODA2ODky*_ga*MjE0NjMyMjc2MS4xNzI2NzA4Mzc0*_ga_QLK8WFHNK9*czE3NDk0NTMxMDYkbzIyJGcxJHQxNzQ5NDUzMjcxJGoyOCRsMCRoMTE4NTkwNDkzMQ..', // Placeholder image
        variants: [
          { name: "Galaxy A56", variantName: "Galaxy A56 128GB - Đen", color: "Đen", capacity: "128GB", price: 7990000, stock: 200, sku: "SS-A56-128-D" },
          { name: "Galaxy A56", variantName: "Galaxy A56 256GB - Trắng", color: "Trắng", capacity: "256GB", price: 8990000, stock: 150, sku: "SS-A56-256-T" },
          { name: "Galaxy A56", variantName: "Galaxy A56 128GB - Xanh", color: "Xanh", capacity: "128GB", price: 7990000, stock: 180, sku: "SS-A56-128-X" },
          { name: "Galaxy A56", variantName: "Galaxy A56 256GB - Hồng", color: "Hồng", capacity: "256GB", price: 8990000, stock: 130, sku: "SS-A56-256-H" }
        ]
      },

      // Xiaomi Products (at least 3)
      {
        name: 'Xiaomi 15 Pro',
        description: 'Xiaomi 15 Pro hiệu năng mạnh mẽ.',
        category: xiaomiCategory ? xiaomiCategory._id : null,
        isNewArrival: true,
        isBestSeller: true,
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-xiaomi-redmi-note-14-pro_2__2_1.png', // Placeholder image
        variants: [
          { name: "Xiaomi 15 Pro", variantName: "Xiaomi 15 Pro 256GB - Đen", color: "Đen", capacity: "256GB", price: 18990000, stock: 100, sku: "XM-15P-256-D" },
          { name: "Xiaomi 15 Pro", variantName: "Xiaomi 15 Pro 512GB - Trắng", color: "Trắng", capacity: "512GB", price: 20990000, stock: 70, sku: "XM-15P-512-T" },
          { name: "Xiaomi 15 Pro", variantName: "Xiaomi 15 Pro 256GB - Xanh", color: "Xanh", capacity: "256GB", price: 18990000, stock: 80, sku: "XM-15P-256-X" },
          { name: "Xiaomi 15 Pro", variantName: "Xiaomi 15 Pro 512GB - Tím", color: "Tím", capacity: "512GB", price: 20990000, stock: 60, sku: "XM-15P-512-Tim" }
        ]
      },
      {
        name: 'Xiaomi Redmi Note 15 Pro',
        description: 'Redmi Note 15 Pro giá tốt, cấu hình cao.',
        category: xiaomiCategory ? xiaomiCategory._id : null,
        isNewArrival: true,
        isBestSeller: false,
        image: 'https://hanhtech.com/wp-content/uploads/2025/06/xiaomi-redmi-note-15-pro-8gb-256gb-chinh-hang-moi-100-nguyen-seal-image.jpg', // Placeholder image
        variants: [
          { name: "Redmi Note 15 Pro", variantName: "Redmi Note 15 Pro 128GB - Xanh", color: "Xanh", capacity: "128GB", price: 6990000, stock: 150, sku: "XM-RN15P-128-X" },
          { name: "Redmi Note 15 Pro", variantName: "Redmi Note 15 Pro 256GB - Đen", color: "Đen", capacity: "256GB", price: 7990000, stock: 120, sku: "XM-RN15P-256-D" },
          { name: "Redmi Note 15 Pro", variantName: "Redmi Note 15 Pro 128GB - Trắng", color: "Trắng", capacity: "128GB", price: 6990000, stock: 130, sku: "XM-RN15P-128-T" },
          { name: "Redmi Note 15 Pro", variantName: "Redmi Note 15 Pro 256GB - Đỏ", color: "Đỏ", capacity: "256GB", price: 7990000, stock: 100, sku: "XM-RN15P-256-Do" }
        ]
      },
      {
        name: 'Xiaomi Poco X7 Pro',
        description: 'Poco X7 Pro chuyên game.',
        category: xiaomiCategory ? xiaomiCategory._id : null,
        isNewArrival: false,
        isBestSeller: true,
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-poco-x7-pro-5g_2_.png', // Placeholder image
        variants: [
          { name: "Poco X7 Pro", variantName: "Poco X7 Pro 128GB - Vàng", color: "Vàng", capacity: "128GB", price: 5990000, stock: 180, sku: "XM-PX7P-128-V" },
          { name: "Poco X7 Pro", variantName: "Poco X7 Pro 256GB - Đen", color: "Đen", capacity: "256GB", price: 6490000, stock: 140, sku: "XM-PX7P-256-D" },
          { name: "Poco X7 Pro", variantName: "Poco X7 Pro 128GB - Xanh", color: "Xanh", capacity: "128GB", price: 5990000, stock: 160, sku: "XM-PX7P-128-X" },
          { name: "Poco X7 Pro", variantName: "Poco X7 Pro 256GB - Trắng", color: "Trắng", capacity: "256GB", price: 6490000, stock: 120, sku: "XM-PX7P-256-T" }
        ]
      },

      // MacBook Products (at least 3)
      {
        name: 'MacBook Air 13" M3',
        description: 'MacBook Air 13 inch với chip M3 mạnh mẽ và thiết kế siêu mỏng.',
        category: macBookCategory ? macBookCategory._id : null,
        isNewArrival: true,
        isBestSeller: true,
        image: 'https://cdn.tgdd.vn/Products/Images/44/322612/macbook-air-13-inch-m3-2024-1-3-750x500.jpg',
        variants: [
          { name: "MacBook Air 13\" M3", variantName: "MacBook Air 13\" M3 8GB/256GB - Midnight", color: "Midnight", capacity: "8GB/256GB", price: 27990000, stock: 80, sku: "MBA13M3-8-256-MN" },
          { name: "MacBook Air 13\" M3", variantName: "MacBook Air 13\" M3 8GB/512GB - Starlight", color: "Starlight", capacity: "8GB/512GB", price: 30990000, stock: 60, sku: "MBA13M3-8-512-SL" },
          { name: "MacBook Air 13\" M3", variantName: "MacBook Air 13\" M3 16GB/512GB - Space Gray", color: "Space Gray", capacity: "16GB/512GB", price: 35990000, stock: 40, sku: "MBA13M3-16-512-SG" },
          { name: "MacBook Air 13\" M3", variantName: "MacBook Air 13\" M3 8GB/256GB - Silver", color: "Silver", capacity: "8GB/256GB", price: 27990000, stock: 70, sku: "MBA13M3-8-256-SV" }
        ]
      },
      {
        name: 'MacBook Pro 14" M3 Pro',
        description: 'MacBook Pro 14 inch với chip M3 Pro cho hiệu năng vượt trội.',
        category: macBookCategory ? macBookCategory._id : null,
        isNewArrival: true,
        isBestSeller: true,
        image: 'https://cdn.tgdd.vn/Products/Images/44/318229/macbook-pro-14-inch-m3-2023-acv-1-750x500.jpg',
        variants: [
          { name: "MacBook Pro 14\" M3 Pro", variantName: "MacBook Pro 14\" M3 Pro 18GB/512GB - Space Black", color: "Space Black", capacity: "18GB/512GB", price: 49990000, stock: 50, sku: "MBP14M3P-18-512-SB" },
          { name: "MacBook Pro 14\" M3 Pro", variantName: "MacBook Pro 14\" M3 Pro 36GB/1TB - Silver", color: "Silver", capacity: "36GB/1TB", price: 62990000, stock: 30, sku: "MBP14M3P-36-1TB-SL" },
          { name: "MacBook Pro 14\" M3 Pro", variantName: "MacBook Pro 14\" M3 Pro 18GB/1TB - Space Black", color: "Space Black", capacity: "18GB/1TB", price: 54990000, stock: 40, sku: "MBP14M3P-18-1TB-SB" },
          { name: "MacBook Pro 14\" M3 Pro", variantName: "MacBook Pro 14\" M3 Pro 36GB/512GB - Silver", color: "Silver", capacity: "36GB/512GB", price: 58990000, stock: 25, sku: "MBP14M3P-36-512-SL" }
        ]
      },
      {
        name: 'MacBook Pro 16" M3 Max',
        description: 'MacBook Pro 16 inch với chip M3 Max, hiệu năng tối thượng cho các tác vụ nặng.',
        category: macBookCategory ? macBookCategory._id : null,
        isNewArrival: true,
        isBestSeller: true,
        image: 'https://cdn.tgdd.vn/Products/Images/44/327690/macbook-pro-16-inch-m3-max-64gb-1tb-40gpu-den-1-750x500.jpg',
        variants: [
          { name: "MacBook Pro 16\" M3 Max", variantName: "MacBook Pro 16\" M3 Max 36GB/1TB - Space Black", color: "Space Black", capacity: "36GB/1TB", price: 74990000, stock: 25, sku: "MBP16M3M-36-1TB-SB" },
          { name: "MacBook Pro 16\" M3 Max", variantName: "MacBook Pro 16\" M3 Max 48GB/2TB - Silver", color: "Silver", capacity: "48GB/2TB", price: 89990000, stock: 15, sku: "MBP16M3M-48-2TB-SL" },
          { name: "MacBook Pro 16\" M3 Max", variantName: "MacBook Pro 16\" M3 Max 36GB/2TB - Space Black", color: "Space Black", capacity: "36GB/2TB", price: 82990000, stock: 20, sku: "MBP16M3M-36-2TB-SB" },
          { name: "MacBook Pro 16\" M3 Max", variantName: "MacBook Pro 16\" M3 Max 48GB/1TB - Silver", color: "Silver", capacity: "48GB/1TB", price: 81990000, stock: 18, sku: "MBP16M3M-48-1TB-SL" }
        ]
      },

      // Asus Products (at least 3)
      {
        name: 'Asus Zenbook S 13 OLED',
        description: 'Asus Zenbook S 13 OLED mỏng nhẹ, màn hình đẹp.',
        category: asusCategory ? asusCategory._id : null,
        isNewArrival: true,
        isBestSeller: true,
        image: 'https://dlcdnwebimgs.asus.com/gain/e75363c2-34ad-43b8-9400-1c0843f611b6/w800', // Placeholder image
        variants: [
          { name: "Zenbook S 13 OLED", variantName: "Zenbook S 13 OLED i7/16GB/512GB", color: "Xanh Đen", capacity: "16GB/512GB", price: 28990000, stock: 90, sku: "ASUS-ZS13-i7-16-512" },
          { name: "Zenbook S 13 OLED", variantName: "Zenbook S 13 OLED i5/8GB/512GB", color: "Xanh Đen", capacity: "8GB/512GB", price: 25990000, stock: 100, sku: "ASUS-ZS13-i5-8-512" },
          { name: "Zenbook S 13 OLED", variantName: "Zenbook S 13 OLED i7/16GB/1TB", color: "Xanh Đen", capacity: "16GB/1TB", price: 31990000, stock: 70, sku: "ASUS-ZS13-i7-16-1TB" },
          { name: "Zenbook S 13 OLED", variantName: "Zenbook S 13 OLED i5/8GB/256GB", color: "Xanh Đen", capacity: "8GB/256GB", price: 23990000, stock: 120, sku: "ASUS-ZS13-i5-8-256" }
        ]
      },
      {
        name: 'Asus ROG Zephyrus G16',
        description: 'Asus ROG Zephyrus G16 laptop gaming mạnh mẽ.',
        category: asusCategory ? asusCategory._id : null,
        isNewArrival: true,
        isBestSeller: false,
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_25__2_28.png', // Placeholder image
        variants: [
          { name: "ROG Zephyrus G16", variantName: "ROG Zephyrus G16 i9/32GB/1TB RTX 4070", color: "Đen", capacity: "32GB/1TB", price: 45990000, stock: 60, sku: "ASUS-ROG-G16-i9-32-1TB-4070" },
          { name: "ROG Zephyrus G16", variantName: "ROG Zephyrus G16 i7/16GB/512GB RTX 4060", color: "Đen", capacity: "16GB/512GB", price: 38990000, stock: 80, sku: "ASUS-ROG-G16-i7-16-512-4060" },
          { name: "ROG Zephyrus G16", variantName: "ROG Zephyrus G16 i9/32GB/2TB RTX 4080", color: "Đen", capacity: "32GB/2TB", price: 55990000, stock: 40, sku: "ASUS-ROG-G16-i9-32-2TB-4080" },
          { name: "ROG Zephyrus G16", variantName: "ROG Zephyrus G16 i7/16GB/1TB RTX 4070", color: "Trắng", capacity: "16GB/1TB", price: 41990000, stock: 50, sku: "ASUS-ROG-G16-i7-16-1TB-4070-T" }
        ]
      },
      {
        name: 'Asus Vivobook 15',
        description: 'Asus Vivobook 15 laptop văn phòng giá rẻ.',
        category: asusCategory ? asusCategory._id : null,
        isNewArrival: false,
        isBestSeller: true,
        image: 'https://cdn2.fptshop.com.vn/unsafe/384x0/filters:format(webp):quality(75)/2023_4_13_638169958069065063_asus-vivobook-a1505va-l1113w-i5-13500h-bac-2.jpg', // Placeholder image
        variants: [
          { name: "Vivobook 15", variantName: "Vivobook 15 i5/8GB/512GB", color: "Đen", capacity: "8GB/512GB", price: 15990000, stock: 150, sku: "ASUS-VB15-i5-8-512" },
          { name: "Vivobook 15", variantName: "Vivobook 15 i3/8GB/256GB", color: "Bạc", capacity: "8GB/256GB", price: 12990000, stock: 180, sku: "ASUS-VB15-i3-8-256" },
          { name: "Vivobook 15", variantName: "Vivobook 15 i5/16GB/512GB", color: "Xanh", capacity: "16GB/512GB", price: 17990000, stock: 120, sku: "ASUS-VB15-i5-16-512-X" },
          { name: "Vivobook 15", variantName: "Vivobook 15 i3/4GB/256GB", color: "Đen", capacity: "4GB/256GB", price: 11990000, stock: 200, sku: "ASUS-VB15-i3-4-256-D" }
        ]
      },

      // HP Products (at least 3)
      {
        name: 'HP Spectre x360 14',
        description: 'HP Spectre x360 14 laptop 2-in-1 cao cấp.',
        category: hpCategory ? hpCategory._id : null,
        isNewArrival: true,
        isBestSeller: true,
        image: 'https://cdn2.fptshop.com.vn/unsafe/384x0/filters:format(webp):quality(75)/2024_6_24_638548335557426654_a19blpa.jpg', // Placeholder image
        variants: [
          { name: "Spectre x360 14", variantName: "Spectre x360 14 i7/16GB/1TB", color: "Đen", capacity: "16GB/1TB", price: 35990000, stock: 70, sku: "HP-SPX14-i7-16-1TB" },
          { name: "Spectre x360 14", variantName: "Spectre x360 14 i5/8GB/512GB", color: "Bạc", capacity: "8GB/512GB", price: 30990000, stock: 90, sku: "HP-SPX14-i5-8-512" },
          { name: "Spectre x360 14", variantName: "Spectre x360 14 i7/16GB/512GB", color: "Đen", capacity: "16GB/512GB", price: 33990000, stock: 80, sku: "HP-SPX14-i7-16-512" },
          { name: "Spectre x360 14", variantName: "Spectre x360 14 i5/8GB/1TB", color: "Bạc", capacity: "8GB/1TB", price: 32990000, stock: 60, sku: "HP-SPX14-i5-8-1TB" }
        ]
      },
      {
        name: 'HP Envy x360 15',
        description: 'HP Envy x360 15 laptop đa năng.',
        category: hpCategory ? hpCategory._id : null,
        isNewArrival: true,
        isBestSeller: false,
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/_/0/_0000_6453189_sd.jpg', // Placeholder image
        variants: [
          { name: "Envy x360 15", variantName: "Envy x360 15 i5/8GB/512GB", color: "Bạc", capacity: "8GB/512GB", price: 22990000, stock: 100, sku: "HP-ENVY15-i5-8-512" },
          { name: "Envy x360 15", variantName: "Envy x360 15 i7/16GB/512GB", color: "Đen", capacity: "16GB/512GB", price: 26990000, stock: 80, sku: "HP-ENVY15-i7-16-512" },
          { name: "Envy x360 15", variantName: "Envy x360 15 i5/8GB/1TB", color: "Bạc", capacity: "8GB/1TB", price: 24990000, stock: 90, sku: "HP-ENVY15-i5-8-1TB" },
          { name: "Envy x360 15", variantName: "Envy x360 15 i7/16GB/1TB", color: "Đen", capacity: "16GB/1TB", price: 28990000, stock: 70, sku: "HP-ENVY15-i7-16-1TB" }
        ]
      },
      {
        name: 'HP Pavilion 15',
        description: 'HP Pavilion 15 laptop phổ thông.',
        category: hpCategory ? hpCategory._id : null,
        isNewArrival: false,
        isBestSeller: true,
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_11__4_5.png', // Placeholder image
        variants: [
          { name: "Pavilion 15", variantName: "Pavilion 15 i5/8GB/256GB", color: "Vàng", capacity: "8GB/256GB", price: 14990000, stock: 180, sku: "HP-PAV15-i5-8-256" },
          { name: "Pavilion 15", variantName: "Pavilion 15 i3/4GB/256GB", color: "Bạc", capacity: "4GB/256GB", price: 11990000, stock: 200, sku: "HP-PAV15-i3-4-256" },
          { name: "Pavilion 15", variantName: "Pavilion 15 i5/8GB/512GB", color: "Đỏ", capacity: "8GB/512GB", price: 15990000, stock: 150, sku: "HP-PAV15-i5-8-512-Do" },
          { name: "Pavilion 15", variantName: "Pavilion 15 i3/8GB/256GB", color: "Xanh", capacity: "8GB/256GB", price: 12990000, stock: 170, sku: "HP-PAV15-i3-8-256-X" }
        ]
      }
    ];

    for (const product of products) {
      // Check if category exists before creating product
      if (product.category) {
        const existingProduct = await Product.findOne({ name: product.name });
        if (!existingProduct) {
          await Product.create(product);
          console.log(`Created product: ${product.name}`);
        } else {
          console.log(`Product ${product.name} already exists`);
        }
      } else {
        console.warn(`Skipping product "${product.name}" as its category was not found.`);
      }
    }

    console.log('Products seeded successfully!');
  } catch (error) {
    console.error('Error seeding products:', error);
    throw error;
  }
};

// Keep other seeding functions as they are
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
        createdBy: adminUser ? adminUser._id : null // Use adminUser if available
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
        createdBy: adminUser ? adminUser._id : null
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
        createdBy: adminUser ? adminUser._id : null
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
        createdBy: adminUser ? adminUser._id : null
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
        createdBy: adminUser ? adminUser._id : null
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
        createdBy: adminUser ? adminUser._id : null
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

    // Select some products to add reviews to (ensure they exist)
    const productsWithReviews = products.slice(0, Math.min(products.length, 5)); // Take up to 5 products

    const reviews = [
      {
        user: users[0]._id,
        product: productsWithReviews[0] ? productsWithReviews[0]._id : null,
        rating: 5,
        comment: 'Sản phẩm tuyệt vời, rất đáng tiền!',
        name: 'Seeded User' // Added name field
      },
      {
        user: users.length > 1 ? users[1]._id : users[0]._id, // Use second user if available, otherwise use first
        product: productsWithReviews[0] ? productsWithReviews[0]._id : null,
        rating: 4,
        comment: 'Pin dùng khá tốt, thiết kế sang trọng.',
        name: 'Seeded User' // Added name field
      },
      {
        user: users[0]._id,
        product: productsWithReviews[1] ? productsWithReviews[1]._id : null,
        rating: 5,
        comment: 'Hiệu năng mạnh mẽ, màn hình sắc nét.',
        name: 'Seeded User' // Added name field
      },
      {
        user: users.length > 1 ? users[1]._id : users[0]._id,
        product: productsWithReviews[2] ? productsWithReviews[2]._id : null,
        rating: 4,
        comment: 'Nhẹ và mỏng, tiện lợi mang đi lại.',
        name: 'Seeded User' // Added name field
      }
    ].filter(review => review.product !== null); // Filter out reviews for non-existent products

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
    let adminUser = await User.findOne({ role: 'admin' });

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

      adminUser = await newAdminUser.save(); // Assign the created user to adminUser
      console.log('----------------------------------------');
      console.log('Default admin user created successfully!');
      console.log('Credentials:');
      console.log('Email: admin@example.com');
      console.log('Password: admin123');
      console.log('----------------------------------------');
    } else {
      console.log('Admin user already exists');
    }

    // Seed categories and get them for product seeding
    const categories = await seedCategories();

    // Seed products
    await seedProducts(categories);

    // Seed coupons, passing adminUser
    await seedCoupons(adminUser);

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