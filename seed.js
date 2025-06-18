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

    // Define parent categories for Apple brand
    const parentCategories = [
      {
        name: 'Apple',
        slug: 'apple',
        description: 'All Apple brand products'
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

    // Find parent category ID
    const appleParent = createdParentCategories.find(c => c.slug === 'apple');

    // Define second-level categories (children of Apple)
    const secondLevelCategories = [
      {
        name: 'Mac',
        slug: 'mac',
        description: 'Mac computers from Apple',
        parent: appleParent ? appleParent._id : null,
        ancestors: appleParent ? [{ _id: appleParent._id, name: appleParent.name, slug: appleParent.slug }] : [],
        level: appleParent ? 1 : 0
      },
      {
        name: 'iPad',
        slug: 'ipad',
        description: 'iPad tablets from Apple',
        parent: appleParent ? appleParent._id : null,
        ancestors: appleParent ? [{ _id: appleParent._id, name: appleParent.name, slug: appleParent.slug }] : [],
        level: appleParent ? 1 : 0
      },
      {
        name: 'iPhone',
        slug: 'iphone',
        description: 'iPhone smartphones from Apple',
        parent: appleParent ? appleParent._id : null,
        ancestors: appleParent ? [{ _id: appleParent._id, name: appleParent.name, slug: appleParent.slug }] : [],
        level: appleParent ? 1 : 0
      },
      {
        name: 'Watch',
        slug: 'watch',
        description: 'Apple Watch smartwatches from Apple',
        parent: appleParent ? appleParent._id : null,
        ancestors: appleParent ? [{ _id: appleParent._id, name: appleParent.name, slug: appleParent.slug }] : [],
        level: appleParent ? 1 : 0
      },
      {
        name: 'Vision',
        slug: 'vision',
        description: 'Apple Vision Pro and related products',
        parent: appleParent ? appleParent._id : null,
        ancestors: appleParent ? [{ _id: appleParent._id, name: appleParent.name, slug: appleParent.slug }] : [],
        level: appleParent ? 1 : 0
      },
      {
        name: 'AirPods',
        slug: 'airpods',
        description: 'AirPods and other audio products from Apple',
        parent: appleParent ? appleParent._id : null,
        ancestors: appleParent ? [{ _id: appleParent._id, name: appleParent.name, slug: appleParent.slug }] : [],
        level: appleParent ? 1 : 0
      },
      {
        name: 'RV&Home',
        slug: 'rv-home',
        description: 'Apple products for RV and Home automation',
        parent: appleParent ? appleParent._id : null,
        ancestors: appleParent ? [{ _id: appleParent._id, name: appleParent.name, slug: appleParent.slug }] : [],
        level: appleParent ? 1 : 0
      }
    ];

    const createdSecondLevelCategories = [];
    for (const category of secondLevelCategories) {
      const existingCategory = await Category.findOne({ slug: category.slug });
      if (!existingCategory) {
        const newCategory = await Category.create(category);
        createdSecondLevelCategories.push(newCategory);
        console.log(`Created second-level category: ${category.name}`);
      } else {
        createdSecondLevelCategories.push(existingCategory);
        console.log(`Second-level category ${category.name} already exists`);
      }
    }

    const macParent = createdSecondLevelCategories.find(c => c.slug === 'mac');
    const ipadParent = createdSecondLevelCategories.find(c => c.slug === 'ipad');
    const iphoneParent = createdSecondLevelCategories.find(c => c.slug === 'iphone');
    const watchParent = createdSecondLevelCategories.find(c => c.slug === 'watch');
    const visionParent = createdSecondLevelCategories.find(c => c.slug === 'vision');
    const airpodsParent = createdSecondLevelCategories.find(c => c.slug === 'airpods');
    const rvHomeParent = createdSecondLevelCategories.find(c => c.slug === 'rv-home');

    const thirdLevelCategories = [
      {
        name: 'MacBook Air',
        slug: 'macbook-air',
        description: 'MacBook Air laptops from Apple',
        parent: macParent ? macParent._id : null,
        ancestors: macParent ? [...appleParent.ancestors, { _id: macParent._id, name: macParent.name, slug: macParent.slug }] : [],
        level: macParent ? 2 : 0
      },
      {
        name: 'MacBook Pro',
        slug: 'macbook-pro',
        description: 'MacBook Pro laptops from Apple',
        parent: macParent ? macParent._id : null,
        ancestors: macParent ? [...appleParent.ancestors, { _id: macParent._id, name: macParent.name, slug: macParent.slug }] : [],
        level: macParent ? 2 : 0
      },
      {
        name: 'Mac Mini',
        slug: 'mac-mini',
        description: 'Mac Mini desktop computers from Apple',
        parent: macParent ? macParent._id : null,
        ancestors: macParent ? [...appleParent.ancestors, { _id: macParent._id, name: macParent.name, slug: macParent.slug }] : [],
        level: macParent ? 2 : 0
      },
      {
        name: 'Mac Studio',
        slug: 'mac-studio',
        description: 'Mac Studio desktop computers from Apple',
        parent: macParent ? macParent._id : null,
        ancestors: macParent ? [...appleParent.ancestors, { _id: macParent._id, name: macParent.name, slug: macParent.slug }] : [],
        level: macParent ? 2 : 0
      },
      {
        name: 'Mac Pro',
        slug: 'mac-pro',
        description: 'Mac Pro desktop computers from Apple',
        parent: macParent ? macParent._id : null,
        ancestors: macParent ? [...appleParent.ancestors, { _id: macParent._id, name: macParent.name, slug: macParent.slug }] : [],
        level: macParent ? 2 : 0
      },
      {
        name: 'iMac',
        slug: 'imac',
        description: 'iMac all-in-one desktop computers from Apple',
        parent: macParent ? macParent._id : null,
        ancestors: macParent ? [...appleParent.ancestors, { _id: macParent._id, name: macParent.name, slug: macParent.slug }] : [],
        level: macParent ? 2 : 0
      },
      {
        name: 'iPad Pro',
        slug: 'ipad-pro',
        description: 'iPad Pro models',
        parent: ipadParent ? ipadParent._id : null,
        ancestors: ipadParent ? [...appleParent.ancestors, { _id: ipadParent._id, name: ipadParent.name, slug: ipadParent.slug }] : [],
        level: ipadParent ? 2 : 0
      },
      {
        name: 'iPad Air',
        slug: 'ipad-air',
        description: 'iPad Air models',
        parent: ipadParent ? ipadParent._id : null,
        ancestors: ipadParent ? [...appleParent.ancestors, { _id: ipadParent._id, name: ipadParent.name, slug: ipadParent.slug }] : [],
        level: ipadParent ? 2 : 0
      },
      {
        name: 'iPad Mini',
        slug: 'ipad-mini',
        description: 'iPad Mini models',
        parent: ipadParent ? ipadParent._id : null,
        ancestors: ipadParent ? [...appleParent.ancestors, { _id: ipadParent._id, name: ipadParent.name, slug: ipadParent.slug }] : [],
        level: ipadParent ? 2 : 0
      },
      // iPhone sub-categories
      {
        name: 'iPhone Pro Max',
        slug: 'iphone-pro-max',
        description: 'iPhone Pro Max models',
        parent: iphoneParent ? iphoneParent._id : null,
        ancestors: iphoneParent ? [...appleParent.ancestors, { _id: iphoneParent._id, name: iphoneParent.name, slug: iphoneParent.slug }] : [],
        level: iphoneParent ? 2 : 0
      },
      {
        name: 'iPhone Pro',
        slug: 'iphone-pro',
        description: 'iPhone Pro models',
        parent: iphoneParent ? iphoneParent._id : null,
        ancestors: iphoneParent ? [...appleParent.ancestors, { _id: iphoneParent._id, name: iphoneParent.name, slug: iphoneParent.slug }] : [],
        level: iphoneParent ? 2 : 0
      },
      {
        name: 'iPhone Standard',
        slug: 'iphone-standard',
        description: 'Standard iPhone models',
        parent: iphoneParent ? iphoneParent._id : null,
        ancestors: iphoneParent ? [...appleParent.ancestors, { _id: iphoneParent._id, name: iphoneParent.name, slug: iphoneParent.slug }] : [],
        level: iphoneParent ? 2 : 0
      },
      {
        name: 'iPhone SE',
        slug: 'iphone-se',
        description: 'iPhone SE models',
        parent: iphoneParent ? iphoneParent._id : null,
        ancestors: iphoneParent ? [...appleParent.ancestors, { _id: iphoneParent._id, name: iphoneParent.name, slug: iphoneParent.slug }] : [],
        level: iphoneParent ? 2 : 0
      },
      {
        name: 'iPhone Plus',
        slug: 'iphone-plus',
        description: 'iPhone Plus models',
        parent: iphoneParent ? iphoneParent._id : null,
        ancestors: iphoneParent ? [...appleParent.ancestors, { _id: iphoneParent._id, name: iphoneParent.name, slug: iphoneParent.slug }] : [],
        level: iphoneParent ? 2 : 0
      },
      {
        name: 'iPhone Mini',
        slug: 'iphone-mini',
        description: 'iPhone Mini models',
        parent: iphoneParent ? iphoneParent._id : null,
        ancestors: iphoneParent ? [...appleParent.ancestors, { _id: iphoneParent._id, name: iphoneParent.name, slug: iphoneParent.slug }] : [],
        level: iphoneParent ? 2 : 0
      },
      {
        name: 'iPhone Plus',
        slug: 'iphone-plus',
        description: 'iPhone Plus models',
        parent: iphoneParent ? iphoneParent._id : null,
        ancestors: iphoneParent ? [...appleParent.ancestors, { _id: iphoneParent._id, name: iphoneParent.name, slug: iphoneParent.slug }] : [],
        level: iphoneParent ? 2 : 0
      },
      {
        name: 'iPhone Mini',
        slug: 'iphone-mini',
        description: 'iPhone Mini models',
        parent: iphoneParent ? iphoneParent._id : null,
        ancestors: iphoneParent ? [...appleParent.ancestors, { _id: iphoneParent._id, name: iphoneParent.name, slug: iphoneParent.slug }] : [],
        level: iphoneParent ? 2 : 0
      },
      // Watch sub-categories
      {
        name: 'Apple Watch Ultra',
        slug: 'apple-watch-ultra',
        description: 'Apple Watch Ultra models',
        parent: watchParent ? watchParent._id : null,
        ancestors: watchParent ? [...appleParent.ancestors, { _id: watchParent._id, name: watchParent.name, slug: watchParent.slug }] : [],
        level: watchParent ? 2 : 0
      },
      {
        name: 'Apple Watch Series',
        slug: 'apple-watch-series',
        description: 'Apple Watch Series models',
        parent: watchParent ? watchParent._id : null,
        ancestors: watchParent ? [...appleParent.ancestors, { _id: watchParent._id, name: watchParent.name, slug: watchParent.slug }] : [],
        level: watchParent ? 2 : 0
      },
      // Vision sub-categories
      {
        name: 'Vision Pro',
        slug: 'vision-pro',
        description: 'Apple Vision Pro models',
        parent: visionParent ? visionParent._id : null,
        ancestors: visionParent ? [...appleParent.ancestors, { _id: visionParent._id, name: visionParent.name, slug: visionParent.slug }] : [],
        level: visionParent ? 2 : 0
      },
      // AirPods sub-categories
      {
        name: 'AirPods Pro',
        slug: 'airpods-pro',
        description: 'AirPods Pro models',
        parent: airpodsParent ? airpodsParent._id : null,
        ancestors: airpodsParent ? [...appleParent.ancestors, { _id: airpodsParent._id, name: airpodsParent.name, slug: airpodsParent.slug }] : [],
        level: airpodsParent ? 2 : 0
      },
      {
        name: 'AirPods Max',
        slug: 'airpods-max',
        description: 'AirPods Max models',
        parent: airpodsParent ? airpodsParent._id : null,
        ancestors: airpodsParent ? [...appleParent.ancestors, { _id: airpodsParent._id, name: airpodsParent.name, slug: airpodsParent.slug }] : [],
        level: airpodsParent ? 2 : 0
      },
      {
        name: 'AirPods Standard',
        slug: 'airpods-standard',
        description: 'Standard AirPods models',
        parent: airpodsParent ? airpodsParent._id : null,
        ancestors: airpodsParent ? [...appleParent.ancestors, { _id: airpodsParent._id, name: airpodsParent.name, slug: airpodsParent.slug }] : [],
        level: airpodsParent ? 2 : 0
      },
      // RV&Home sub-categories
      {
        name: 'HomePod',
        slug: 'homepod',
        description: 'HomePod smart speakers',
        parent: rvHomeParent ? rvHomeParent._id : null,
        ancestors: rvHomeParent ? [...appleParent.ancestors, { _id: rvHomeParent._id, name: rvHomeParent.name, slug: rvHomeParent.slug }] : [],
        level: rvHomeParent ? 2 : 0
      },
      {
        name: 'Apple TV',
        slug: 'apple-tv',
        description: 'Apple TV streaming devices',
        parent: rvHomeParent ? rvHomeParent._id : null,
        ancestors: rvHomeParent ? [...appleParent.ancestors, { _id: rvHomeParent._id, name: rvHomeParent.name, slug: rvHomeParent.slug }] : [],
        level: rvHomeParent ? 2 : 0
      }
    ];

    const createdThirdLevelCategories = [];
    for (const category of thirdLevelCategories) {
      const existingCategory = await Category.findOne({ slug: category.slug });
      if (!existingCategory) {
        const newCategory = await Category.create(category);
        createdThirdLevelCategories.push(newCategory);
        console.log(`Created third-level category: ${category.name}`);
      } else {
        createdThirdLevelCategories.push(existingCategory);
        console.log(`Third-level category ${category.name} already exists`);
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

    const macBookAirCategory = categories.find(c => c.slug === 'macbook-air');
    const macBookProCategory = categories.find(c => c.slug === 'macbook-pro');
    const macMiniCategory = categories.find(c => c.slug === 'mac-mini');
    const macStudioCategory = categories.find(c => c.slug === 'mac-studio');
    const macProCategory = categories.find(c => c.slug === 'mac-pro');
    const iMacCategory = categories.find(c => c.slug === 'imac');
    const iPadProCategory = categories.find(c => c.slug === 'ipad-pro');
    const iPadAirCategory = categories.find(c => c.slug === 'ipad-air');
    const iPadMiniCategory = categories.find(c => c.slug === 'ipad-mini');
    const iPhoneProMaxCategory = categories.find(c => c.slug === 'iphone-pro-max');
    const iPhoneProCategory = categories.find(c => c.slug === 'iphone-pro');
    const iPhoneStandardCategory = categories.find(c => c.slug === 'iphone-standard');
    const iPhoneSECategory = categories.find(c => c.slug === 'iphone-se');
    const appleWatchUltraCategory = categories.find(c => c.slug === 'apple-watch-ultra');
    const appleWatchSeriesCategory = categories.find(c => c.slug === 'apple-watch-series');
    const visionProCategory = categories.find(c => c.slug === 'vision-pro');
    const airPodsProCategory = categories.find(c => c.slug === 'airpods-pro');
    const airPodsMaxCategory = categories.find(c => c.slug === 'airpods-max');
    const airPodsStandardCategory = categories.find(c => c.slug === 'airpods-standard');
    const homePodCategory = categories.find(c => c.slug === 'homepod');
    const appleTVCategory = categories.find(c => c.slug === 'apple-tv');

    const products = [
      {
        name: 'MacBook Air M3',
        description: 'MacBook Air M3 with powerful performance and sleek design.',
        category: macBookAirCategory ? macBookAirCategory._id : null,
        isNewArrival: true,
        isBestSeller: true,
        image: 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/44/331644/macbook-air-13-inch-m3-tgdd-xanh-1-638660181465844583-750x500.jpg',
        variants: [
          { name: "MacBook Air M3", variantName: "MacBook Air 13-inch M3 8GB/256GB - Midnight", color: "Midnight", capacity: "8GB/256GB", price: 27990000, stock: 150, sku: "MBA-M3-13-8-256-MN" },
          { name: "MacBook Air M3", variantName: "MacBook Air 13-inch M3 8GB/512GB - Starlight", color: "Starlight", capacity: "8GB/512GB", price: 30990000, stock: 120, sku: "MBA-M3-13-8-512-SL" },
          { name: "MacBook Air M3", variantName: "MacBook Air 15-inch M3 8GB/256GB - Space Gray", color: "Space Gray", capacity: "8GB/256GB", price: 32990000, stock: 100, sku: "MBA-M3-15-8-256-SG" },
          { name: "MacBook Air M3", variantName: "MacBook Air 15-inch M3 16GB/512GB - Silver", color: "Silver", capacity: "16GB/512GB", price: 38990000, stock: 80, sku: "MBA-M3-15-16-512-SV" }
        ]
      },
      {
        name: 'MacBook Pro M3',
        description: 'MacBook Pro M3 for professional performance.',
        category: macBookProCategory ? macBookProCategory._id : null,
        isNewArrival: true,
        isBestSeller: true,
        image: 'https://cdn.tgdd.vn/Products/Images/44/327690/macbook-pro-16-inch-m3-max-64gb-1tb-40gpu-den-1-750x500.jpg',
        variants: [
          { name: "MacBook Pro M3", variantName: "MacBook Pro 14-inch M3 8GB/512GB - Space Gray", color: "Space Gray", capacity: "8GB/512GB", price: 42990000, stock: 90, sku: "MBP-M3-14-8-512-SG" },
          { name: "MacBook Pro M3", variantName: "MacBook Pro 14-inch M3 Pro 18GB/512GB - Space Black", color: "Space Black", capacity: "18GB/512GB", price: 49990000, stock: 70, sku: "MBP-M3P-14-18-512-SB" },
          { name: "MacBook Pro M3", variantName: "MacBook Pro 16-inch M3 Max 36GB/1TB - Silver", color: "Silver", capacity: "36GB/1TB", price: 74990000, stock: 50, sku: "MBP-M3M-16-36-1TB-SV" }
        ]
      },
      {
        name: 'iMac 24-inch M3',
        description: 'iMac 24-inch with M3 chip, all-in-one desktop.',
        category: iMacCategory ? iMacCategory._id : null,
        isNewArrival: false,
        isBestSeller: false,
        image: 'https://cdn.tgdd.vn/Products/Images/5698/327691/imac-24-inch-m3-16gb-512gb-10gpu-1-1-750x500.jpg',
        variants: [
          { name: "iMac 24-inch M3", variantName: "iMac 24-inch M3 8GB/256GB - Blue", color: "Blue", capacity: "8GB/256GB", price: 34990000, stock: 60, sku: "IMAC-M3-24-8-256-BL" },
          { name: "iMac 24-inch M3", variantName: "iMac 24-inch M3 8GB/512GB - Green", color: "Green", capacity: "8GB/512GB", price: 37990000, stock: 40, sku: "IMAC-M3-24-8-512-GR" }
        ]
      },

      {
        name: 'Mac Mini M4',
        description: 'Mac Mini M4 with incredible performance and versatility.',
        category: macMiniCategory ? macMiniCategory._id : null,
        isNewArrival: true,
        isBestSeller: false,
        image: 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/5698/331493/mac-mini-m4-16gb-256gb-bac-1-638660045913073298-750x500.jpg',
        variants: [
          { name: "Mac Mini M4", variantName: "Mac Mini M4 8GB/256GB", color: "Silver", capacity: "8GB/256GB", price: 15990000, stock: 100, sku: "MM-M2-8-256" },
          { name: "Mac Mini M4", variantName: "Mac Mini M4 8GB/512GB", color: "Silver", capacity: "8GB/512GB", price: 18990000, stock: 80, sku: "MM-M2-8-512" },
          { name: "Mac Mini M4", variantName: "Mac Mini M4 Pro 16GB/512GB", color: "Silver", capacity: "16GB/512GB", price: 25990000, stock: 60, sku: "MM-M2P-16-512" }
        ]
      },
      {
        name: 'Mac Studio M3 Max',
        description: 'Mac Studio M3 Max for ultimate creative power.',
        category: macStudioCategory ? macStudioCategory._id : null,
        isNewArrival: true,
        isBestSeller: true,
        image: 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/5698/335383/mac-studio-m3-ultra-96gb-1tb-bac-1-638769618622556026-750x500.jpg',
        variants: [
          { name: "Mac Studio M3 Max", variantName: "Mac Studio M3 Max 32GB/512GB", color: "Silver", capacity: "32GB/512GB", price: 54990000, stock: 40, sku: "MS-M2M-32-512" },
          { name: "Mac Studio M3 Max", variantName: "Mac Studio M2 Ultra 64GB/1TB", color: "Silver", capacity: "64GB/1TB", price: 84990000, stock: 25, sku: "MS-M2U-64-1TB" },
          { name: "Mac Studio M3 Max", variantName: "Mac Studio M2 Ultra 128GB/2TB", color: "Silver", capacity: "128GB/2TB", price: 109990000, stock: 15, sku: "MS-M2U-128-2TB" }
        ]
      },
      {
        name: 'Mac Pro M2 Ultra',
        description: 'Mac Pro M2 Ultra, the most powerful Mac ever.',
        category: macProCategory ? macProCategory._id : null,
        isNewArrival: true,
        isBestSeller: false,
        image: 'https://tse2.mm.bing.net/th/id/OIP.p2cSRuf_zF_Ww71Ps-HiZgHaHa?r=0&rs=1&pid=ImgDetMain',
        variants: [
          { name: "Mac Pro M2 Ultra", variantName: "Mac Pro M2 Ultra 64GB/1TB (Tower)", color: "Silver", capacity: "64GB/1TB", price: 169990000, stock: 10, sku: "MP-M2U-64-1TB-T" },
          { name: "Mac Pro M2 Ultra", variantName: "Mac Pro M2 Ultra 128GB/2TB (Rack)", color: "Silver", capacity: "128GB/2TB", price: 199990000, stock: 8, sku: "MP-M2U-128-2TB-R" },
          { name: "Mac Pro M2 Ultra", variantName: "Mac Pro M2 Ultra 192GB/4TB (Tower)", color: "Silver", capacity: "192GB/4TB", price: 249990000, stock: 5, sku: "MP-M2U-192-4TB-T" }
        ]
      },

      {
        name: 'Mac Mini M4',
        description: 'Mac Mini M4 with incredible performance and versatility.',
        category: macMiniCategory ? macMiniCategory._id : null,
        isNewArrival: true,
        isBestSeller: false,
        image: 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/5698/331493/mac-mini-m4-16gb-256gb-bac-1-638660045913073298-750x500.jpg',
        variants: [
          { name: "Mac Mini M4", variantName: "Mac Mini M4 8GB/256GB", color: "Silver", capacity: "8GB/256GB", price: 15990000, stock: 100, sku: "MM-M2-8-256" },
          { name: "Mac Mini M4", variantName: "Mac Mini M4 8GB/512GB", color: "Silver", capacity: "8GB/512GB", price: 18990000, stock: 80, sku: "MM-M2-8-512" },
          { name: "Mac Mini M4", variantName: "Mac Mini M4 Pro 16GB/512GB", color: "Silver", capacity: "16GB/512GB", price: 25990000, stock: 60, sku: "MM-M2P-16-512" }
        ]
      },
      {
        name: 'Mac Pro M2 Ultra',
        description: 'Mac Pro M2 Ultra, the most powerful Mac ever.',
        category: macProCategory ? macProCategory._id : null,
        isNewArrival: true,
        isBestSeller: false,
        image: 'https://tse2.mm.bing.net/th/id/OIP.p2cSRuf_zF_Ww71Ps-HiZgHaHa?r=0&rs=1&pid=ImgDetMain',
        variants: [
          { name: "Mac Pro M2 Ultra", variantName: "Mac Pro M2 Ultra 64GB/1TB (Tower)", color: "Silver", capacity: "64GB/1TB", price: 169990000, stock: 10, sku: "MP-M2U-64-1TB-T" },
          { name: "Mac Pro M2 Ultra", variantName: "Mac Pro M2 Ultra 128GB/2TB (Rack)", color: "Silver", capacity: "128GB/2TB", price: 199990000, stock: 8, sku: "MP-M2U-128-2TB-R" },
          { name: "Mac Pro M2 Ultra", variantName: "Mac Pro M2 Ultra 192GB/4TB (Tower)", color: "Silver", capacity: "192GB/4TB", price: 249990000, stock: 5, sku: "MP-M2U-192-4TB-T" }
        ]
      },

      // iPad Products
      {
        name: 'iPad Pro M4',
        description: 'iPad Pro with M4 chip, incredibly thin and powerful.',
        category: iPadProCategory ? iPadProCategory._id : null,
        isNewArrival: true,
        isBestSeller: true,
        image: 'https://cdn.tgdd.vn/Products/Images/522/325513/ipad-pro-11-inch-m4-wifi-black-1-750x500.jpg',
        variants: [
          { name: "iPad Pro M4", variantName: "iPad Pro 11-inch M4 256GB - Space Gray", color: "Space Gray", capacity: "256GB", price: 28990000, stock: 120, sku: "IPADPRO-M4-11-256-SG" },
          { name: "iPad Pro M4", variantName: "iPad Pro 13-inch M4 512GB - Silver", color: "Silver", capacity: "512GB", price: 35990000, stock: 90, sku: "IPADPRO-M4-13-512-SV" }
        ]
      },
      {
        name: 'iPad Air M3',
        description: 'iPad Air with M2 chip, powerful and versatile.',
        category: iPadAirCategory ? iPadAirCategory._id : null,
        isNewArrival: true,
        isBestSeller: false,
        image: 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/522/335279/ipad-air-m3-13-inch-5g-blue-1-638772001135851250-750x500.jpg',
        variants: [
          { name: "iPad Air M3", variantName: "iPad Air 11-inch M2 128GB - Blue", color: "Blue", capacity: "128GB", price: 18990000, stock: 180, sku: "IPADAIR-M2-11-128-BL" },
          { name: "iPad Air M3", variantName: "iPad Air 13-inch M2 256GB - Starlight", color: "Starlight", capacity: "256GB", price: 22990000, stock: 140, sku: "IPADAIR-M2-13-256-SL" }
        ]
      },
      {
        name: 'iPad mini 7',
        description: 'iPad mini 7, compact and powerful.',
        category: iPadMiniCategory ? iPadMiniCategory._id : null,
        isNewArrival: false,
        isBestSeller: true,
        image: 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/522/331229/ipad-mini-7-wifi-blue-1-638651175208934105-750x500.jpg',
        variants: [
          { name: "iPad mini 7", variantName: "iPad mini 7 64GB - Space Gray", color: "Space Gray", capacity: "64GB", price: 12990000, stock: 200, sku: "IPADMINI-64-SG" },
          { name: "iPad mini 7", variantName: "iPad mini 7 256GB - Pink", color: "Pink", capacity: "256GB", price: 16990000, stock: 150, sku: "IPADMINI-256-PK" }
        ]
      },

      // iPhone Products
      {
        name: 'iPhone 16 Pro Max',
        description: 'iPhone 16 Pro Max with A17 Pro chip and Pro camera system.',
        category: iPhoneProMaxCategory ? iPhoneProMaxCategory._id : null,
        isNewArrival: true,
        isBestSeller: true,
        image: 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/329149/iphone-16-pro-max-titan-sa-mac-1-638638962337813406-750x500.jpg',
        variants: [
          { name: "iPhone 16 Pro Max", variantName: "iPhone 16 Pro Max 256GB - Natural Titanium", color: "Natural Titanium", capacity: "256GB", price: 33990000, stock: 100, sku: "IP15PM-256-NT" },
          { name: "iPhone 16 Pro Max", variantName: "iPhone 16 Pro Max 512GB - Blue Titanium", color: "Blue Titanium", capacity: "512GB", price: 38990000, stock: 70, sku: "IP15PM-512-BT" },
          { name: "iPhone 16 Pro Max", variantName: "iPhone 16 Pro Max 1TB - Black Titanium", color: "Black Titanium", capacity: "1TB", price: 44990000, stock: 40, sku: "IP15PM-1TB-BLT" }
        ]
      },
      {
        name: 'iPhone 16 Pro',
        description: 'iPhone 16 Pro with A17 Pro chip and Pro camera system.',
        category: iPhoneProCategory ? iPhoneProCategory._id : null,
        isNewArrival: true,
        isBestSeller: true,
        image: 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/329143/iphone-16-pro-titan-trang-1-638638981055641372-750x500.jpg',
        variants: [
          { name: "iPhone 16 Pro", variantName: "iPhone 16 Pro 128GB - Natural Titanium", color: "Natural Titanium", capacity: "128GB", price: 28990000, stock: 120, sku: "IP15P-128-NT" },
          { name: "iPhone 16 Pro", variantName: "iPhone 16 Pro 256GB - Blue Titanium", color: "Blue Titanium", capacity: "256GB", price: 31990000, stock: 90, sku: "IP15P-256-BT" }
        ]
      },
      {
        name: 'iPhone 16',
        description: 'iPhone 16 with Dynamic Island and A16 Bionic chip.',
        category: iPhoneStandardCategory ? iPhoneStandardCategory._id : null,
        isNewArrival: true,
        isBestSeller: false,
        image: 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/329138/iphone-16-plus-den-1-638639096261944470-750x500.jpg',
        variants: [
          { name: "iPhone 16", variantName: "iPhone 16 128GB - Pink", color: "Pink", capacity: "128GB", price: 22990000, stock: 150, sku: "IP15-128-PK" },
          { name: "iPhone 16", variantName: "iPhone 16 256GB - Green", color: "Green", capacity: "256GB", price: 25990000, stock: 120, sku: "IP15-256-GR" }
        ]
      },
      {
        name: 'iPhone SE 2022`',
        description: 'iPhone SE 2022, powerful and affordable.',
        category: iPhoneSECategory ? iPhoneSECategory._id : null,
        isNewArrival: false,
        isBestSeller: true,
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/1/_/1_359_1.png',
        variants: [
          { name: "iPhone SE 2022", variantName: "iPhone SE 2022 64GB - Midnight", color: "Midnight", capacity: "64GB", price: 10990000, stock: 200, sku: "IPSE-64-MN" },
          { name: "iPhone SE 2022", variantName: "iPhone SE 2022 128GB - Starlight", color: "Starlight", capacity: "128GB", price: 12990000, stock: 180, sku: "IPSE-128-SL" }
        ]
      },

      // Watch Products
      {
        name: 'Apple Watch Ultra 2',
        description: 'Apple Watch Ultra 2 for extreme adventures.',
        category: appleWatchUltraCategory ? appleWatchUltraCategory._id : null,
        isNewArrival: true,
        isBestSeller: true,
        image: 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/7077/329719/apple-watch-ultra-2-lte-49mm-vien-titanium-day-alpine-1-638616632586155895-750x500.jpg',
        variants: [
          { name: "Apple Watch Ultra 2", variantName: "Apple Watch Ultra 2 - Alpine Loop Blue", color: "Blue", capacity: "GPS + Cellular", price: 21990000, stock: 80, sku: "AWU2-AL-BL" },
          { name: "Apple Watch Ultra 2", variantName: "Apple Watch Ultra 2 - Trail Loop Green", color: "Green", capacity: "GPS + Cellular", price: 21990000, stock: 60, sku: "AWU2-TL-GR" }
        ]
      },
      {
        name: 'Apple Watch Series 10',
        description: 'Apple Watch Series 10, smarter, brighter, mightier.',
        category: appleWatchSeriesCategory ? appleWatchSeriesCategory._id : null,
        isNewArrival: true,
        isBestSeller: false,
        image: 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/7077/329155/apple-watch-s10-den-1-638616621929799246-750x500.jpg',
        variants: [
          { name: "Apple Watch Series 10", variantName: "Apple Watch Series 10 41mm - Midnight Aluminum", color: "Midnight", capacity: "GPS", price: 11990000, stock: 150, sku: "AWS9-41-MN" },
          { name: "Apple Watch Series 10", variantName: "Apple Watch Series 10 45mm - Starlight Aluminum", color: "Starlight", capacity: "GPS + Cellular", price: 14990000, stock: 100, sku: "AWS9-45-SL" }
        ]
      },

      // Vision Products
      {
        name: 'Apple Vision Pro',
        description: 'Apple Vision Pro, spatial computer.',
        category: visionProCategory ? visionProCategory._id : null,
        isNewArrival: true,
        isBestSeller: true,
        image: 'https://cdn.tgdd.vn/Products/Images/13098/322918/apple-vision-pro-1-750x500.jpg',
        variants: [
          { name: "Apple Vision Pro", variantName: "Apple Vision Pro 256GB", color: "Space Gray", capacity: "256GB", price: 89990000, stock: 20, sku: "AVP-256" },
          { name: "Apple Vision Pro", variantName: "Apple Vision Pro 512GB", color: "Space Gray", capacity: "512GB", price: 95990000, stock: 15, sku: "AVP-512" }
        ]
      },

      // AirPods Products
      {
        name: 'AirPods Pro (2nd Gen)',
        description: 'AirPods Pro (2nd Gen) with Active Noise Cancellation.',
        category: airPodsProCategory ? airPodsProCategory._id : null,
        isNewArrival: true,
        isBestSeller: true,
        image: 'https://cdn.tgdd.vn/Products/Images/54/315014/tai-nghe-bluetooth-airpods-pro-2nd-gen-usb-c-charge-apple-1-750x500.jpg',
        variants: [
          { name: "AirPods Pro (2nd Gen)", variantName: "AirPods Pro (2nd Gen) with MagSafe Charging Case (USB-C)", color: "White", capacity: "N/A", price: 6990000, stock: 250, sku: "APP2-USBC" }
        ]
      },
      {
        name: 'AirPods Max',
        description: 'AirPods Max, over-ear headphones with high-fidelity audio.',
        category: airPodsMaxCategory ? airPodsMaxCategory._id : null,
        isNewArrival: false,
        isBestSeller: false,
        image: 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/54/329161/airpods-max-cong-usb-c-den-1-638616502635375739-750x500.jpg',
        variants: [
          { name: "AirPods Max", variantName: "AirPods Max - Space Gray", color: "Space Gray", capacity: "N/A", price: 13990000, stock: 100, sku: "APMAX-SG" },
          { name: "AirPods Max", variantName: "AirPods Max - Silver", color: "Silver", capacity: "N/A", price: 13990000, stock: 80, sku: "APMAX-SV" }
        ]
      },
      {
        name: 'AirPods (3rd Gen)',
        description: 'AirPods (3rd Gen) with Spatial Audio.',
        category: airPodsStandardCategory ? airPodsStandardCategory._id : null,
        isNewArrival: false,
        isBestSeller: false,
        image: 'https://cdn.tgdd.vn/Products/Images/54/315014/tai-nghe-bluetooth-airpods-pro-2nd-gen-usb-c-charge-apple-1-750x500.jpg',
        variants: [
          { name: "AirPods (3rd Gen)", variantName: "AirPods (3rd Gen) with Lightning Charging Case", color: "White", capacity: "N/A", price: 4990000, stock: 200, sku: "AP3-LC" }
        ]
      },

      // RV&Home Products
      {
        name: 'Apple HomePod (2nd Gen)',
        description: 'Apple HomePod (2nd Gen), powerful smart speaker.',
        category: homePodCategory ? homePodCategory._id : null,
        isNewArrival: true,
        isBestSeller: true,
        image: 'https://cdsassets.apple.com/live/7WUAS350/images/homepod/2023-homepod-colors.png',
        variants: [
          { name: "HomePod (2nd Gen)", variantName: "HomePod (2nd Gen) - Midnight", color: "Midnight", capacity: "N/A", price: 7990000, stock: 100, sku: "HP2-MN" },
          { name: "HomePod (2nd Gen)", variantName: "HomePod (2nd Gen) - White", color: "White", capacity: "N/A", price: 7990000, stock: 90, sku: "HP2-WH" }
        ]
      },
      {
        name: 'Apple TV 4K',
        description: 'Apple TV 4K, the best of TV, together with your Apple devices and services.',
        category: appleTVCategory ? appleTVCategory._id : null,
        isNewArrival: false,
        isBestSeller: true,
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/p/apple-tv-4k-hero-select-202104.jpg',
        variants: [
          { name: "Apple TV 4K", variantName: "Apple TV 4K (Wi-Fi) 64GB", color: "Black", capacity: "64GB", price: 3990000, stock: 150, sku: "ATV4K-64" },
          { name: "Apple TV 4K", variantName: "Apple TV 4K (Wi-Fi + Ethernet) 128GB", color: "Black", capacity: "128GB", price: 4990000, stock: 120, sku: "ATV4K-128" }
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