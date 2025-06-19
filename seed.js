const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Category = require("./models/Category");
const Product = require("./models/Product");
const Coupon = require("./models/Coupon");
const Review = require("./models/Review");
require("dotenv").config();

const seedCategories = async () => {
  try {
    console.log("Seeding categories...");

    const parentCategories = [
      {
        name: "Apple",
        slug: "apple",
        description: "All Apple brand products",
      },
    ];

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

    const appleParent = createdParentCategories.find((c) => c.slug === "apple");

    const secondLevelCategories = [
      {
        name: "Mac",
        slug: "mac",
        description: "Mac computers from Apple",
        parent: appleParent ? appleParent._id : null,
        ancestors: appleParent
          ? [
              {
                _id: appleParent._id,
                name: appleParent.name,
                slug: appleParent.slug,
              },
            ]
          : [],
        level: appleParent ? 1 : 0,
      },
      {
        name: "iPad",
        slug: "ipad",
        description: "iPad tablets from Apple",
        parent: appleParent ? appleParent._id : null,
        ancestors: appleParent
          ? [
              {
                _id: appleParent._id,
                name: appleParent.name,
                slug: appleParent.slug,
              },
            ]
          : [],
        level: appleParent ? 1 : 0,
      },
      {
        name: "iPhone",
        slug: "iphone",
        description: "iPhone smartphones from Apple",
        parent: appleParent ? appleParent._id : null,
        ancestors: appleParent
          ? [
              {
                _id: appleParent._id,
                name: appleParent.name,
                slug: appleParent.slug,
              },
            ]
          : [],
        level: appleParent ? 1 : 0,
      },
      {
        name: "Watch",
        slug: "watch",
        description: "Apple Watch smartwatches from Apple",
        parent: appleParent ? appleParent._id : null,
        ancestors: appleParent
          ? [
              {
                _id: appleParent._id,
                name: appleParent.name,
                slug: appleParent.slug,
              },
            ]
          : [],
        level: appleParent ? 1 : 0,
      },
      {
        name: "Vision",
        slug: "vision",
        description: "Apple Vision Pro and related products",
        parent: appleParent ? appleParent._id : null,
        ancestors: appleParent
          ? [
              {
                _id: appleParent._id,
                name: appleParent.name,
                slug: appleParent.slug,
              },
            ]
          : [],
        level: appleParent ? 1 : 0,
      },
      {
        name: "AirPods",
        slug: "airpods",
        description: "AirPods and other audio products from Apple",
        parent: appleParent ? appleParent._id : null,
        ancestors: appleParent
          ? [
              {
                _id: appleParent._id,
                name: appleParent.name,
                slug: appleParent.slug,
              },
            ]
          : [],
        level: appleParent ? 1 : 0,
      },
      {
        name: "RV&Home",
        slug: "rv-home",
        description: "Apple products for RV and Home automation",
        parent: appleParent ? appleParent._id : null,
        ancestors: appleParent
          ? [
              {
                _id: appleParent._id,
                name: appleParent.name,
                slug: appleParent.slug,
              },
            ]
          : [],
        level: appleParent ? 1 : 0,
      },
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

    const macParent = createdSecondLevelCategories.find(
      (c) => c.slug === "mac"
    );
    const ipadParent = createdSecondLevelCategories.find(
      (c) => c.slug === "ipad"
    );
    const iphoneParent = createdSecondLevelCategories.find(
      (c) => c.slug === "iphone"
    );
    const watchParent = createdSecondLevelCategories.find(
      (c) => c.slug === "watch"
    );
    const visionParent = createdSecondLevelCategories.find(
      (c) => c.slug === "vision"
    );
    const airpodsParent = createdSecondLevelCategories.find(
      (c) => c.slug === "airpods"
    );
    const rvHomeParent = createdSecondLevelCategories.find(
      (c) => c.slug === "rv-home"
    );

    const thirdLevelCategories = [
      {
        name: "MacBook Air",
        slug: "macbook-air",
        description: "MacBook Air laptops from Apple",
        parent: macParent ? macParent._id : null,
        ancestors: macParent
          ? [
              ...appleParent.ancestors,
              {
                _id: macParent._id,
                name: macParent.name,
                slug: macParent.slug,
              },
            ]
          : [],
        level: macParent ? 2 : 0,
        image: "https://res.cloudinary.com/dqxndwzkf/image/upload/v1750216572/categories/cv8yzkcgvrluxtzyluwq.svg",
      },
      {
        name: "MacBook Pro",
        slug: "macbook-pro",
        description: "MacBook Pro laptops from Apple",
        parent: macParent ? macParent._id : null,
        ancestors: macParent
          ? [
              ...appleParent.ancestors,
              {
                _id: macParent._id,
                name: macParent.name,
                slug: macParent.slug,
              },
            ]
          : [],
        level: macParent ? 2 : 0,
        image: "https://res.cloudinary.com/dqxndwzkf/image/upload/v1750216572/categories/cv8yzkcgvrluxtzyluwq.svg",
      },
      {
        name: "Mac Mini",
        slug: "mac-mini",
        description: "Mac Mini desktop computers from Apple",
        parent: macParent ? macParent._id : null,
        ancestors: macParent
          ? [
              ...appleParent.ancestors,
              {
                _id: macParent._id,
                name: macParent.name,
                slug: macParent.slug,
              },
            ]
          : [],
        level: macParent ? 2 : 0,
        image: "https://www.apple.com/assets-www/en_WW/mac/chapternav/macmini_f7eabee7b.svg"
      },
      {
        name: "Mac Studio",
        slug: "mac-studio",
        description: "Mac Studio desktop computers from Apple",
        parent: macParent ? macParent._id : null,
        ancestors: macParent
          ? [
              ...appleParent.ancestors,
              {
                _id: macParent._id,
                name: macParent.name,
                slug: macParent.slug,
              },
            ]
          : [],
        level: macParent ? 2 : 0,
        image: "https://www.apple.com/assets-www/en_WW/mac/chapternav/macstudio_d48bbc5a3.svg",
      },
      {
        name: "Mac Pro",
        slug: "mac-pro",
        description: "Mac Pro desktop computers from Apple",
        parent: macParent ? macParent._id : null,
        ancestors: macParent
          ? [
              ...appleParent.ancestors,
              {
                _id: macParent._id,
                name: macParent.name,
                slug: macParent.slug,
              },
            ]
          : [],
        level: macParent ? 2 : 0,
        image: "https://www.apple.com/assets-www/en_WW/mac/chapternav/macpro_a0f334173.svg",
      },
      {
        name: "iMac",
        slug: "imac",
        description: "iMac all-in-one desktop computers from Apple",
        parent: macParent ? macParent._id : null,
        ancestors: macParent
          ? [
              ...appleParent.ancestors,
              {
                _id: macParent._id,
                name: macParent.name,
                slug: macParent.slug,
              },
            ]
          : [],
        level: macParent ? 2 : 0,
        image: "https://www.apple.com/assets-www/en_WW/mac/chapternav/imac24_065a2bf21.svg",
      },
      {
        name: "iPad Pro",
        slug: "ipad-pro",
        description: "iPad Pro models",
        parent: ipadParent ? ipadParent._id : null,
        ancestors: ipadParent
          ? [
              ...appleParent.ancestors,
              {
                _id: ipadParent._id,
                name: ipadParent.name,
                slug: ipadParent.slug,
              },
            ]
          : [],
        level: ipadParent ? 2 : 0,
        image: "https://www.apple.com/assets-www/en_WW/ipad/chapternav/ipad_pro_b05b29e18.svg"
      },
      {
        name: "iPad Air",
        slug: "ipad-air",
        description: "iPad Air models",
        parent: ipadParent ? ipadParent._id : null,
        ancestors: ipadParent
          ? [
              ...appleParent.ancestors,
              {
                _id: ipadParent._id,
                name: ipadParent.name,
                slug: ipadParent.slug,
              },
            ]
          : [],
        level: ipadParent ? 2 : 0,
        image: "https://www.apple.com/assets-www/en_WW/ipad/chapternav/ipad_pro_b05b29e18.svg"
      },
      {
        name: "iPad Mini",
        slug: "ipad-mini",
        description: "iPad Mini models",
        parent: ipadParent ? ipadParent._id : null,
        ancestors: ipadParent
          ? [
              ...appleParent.ancestors,
              {
                _id: ipadParent._id,
                name: ipadParent.name,
                slug: ipadParent.slug,
              },
            ]
          : [],
        level: ipadParent ? 2 : 0,
        image: "https://www.apple.com/assets-www/en_WW/ipad/chapternav/ipad_mini_ca78d03ea.svg"
      },
      // iPhone sub-categories
      {
        name: "iPhone Pro Max",
        slug: "iphone-pro-max",
        description: "iPhone Pro Max models",
        parent: iphoneParent ? iphoneParent._id : null,
        ancestors: iphoneParent
          ? [
              ...appleParent.ancestors,
              {
                _id: iphoneParent._id,
                name: iphoneParent.name,
                slug: iphoneParent.slug,
              },
            ]
          : [],
        level: iphoneParent ? 2 : 0,
        image: "https://res.cloudinary.com/dqxndwzkf/image/upload/v1750228355/categories/meohep3syur86uqfwllu.svg"
      },
      {
        name: "iPhone Pro",
        slug: "iphone-pro",
        description: "iPhone Pro models",
        parent: iphoneParent ? iphoneParent._id : null,
        ancestors: iphoneParent
          ? [
              ...appleParent.ancestors,
              {
                _id: iphoneParent._id,
                name: iphoneParent.name,
                slug: iphoneParent.slug,
              },
            ]
          : [],
        level: iphoneParent ? 2 : 0,
        image: "https://res.cloudinary.com/dqxndwzkf/image/upload/v1750228355/categories/meohep3syur86uqfwllu.svg"
      },
      {
        name: "iPhone Standard",
        slug: "iphone-standard",
        description: "Standard iPhone models",
        parent: iphoneParent ? iphoneParent._id : null,
        ancestors: iphoneParent
          ? [
              ...appleParent.ancestors,
              {
                _id: iphoneParent._id,
                name: iphoneParent.name,
                slug: iphoneParent.slug,
              },
            ]
          : [],
        level: iphoneParent ? 2 : 0,
        image: "https://res.cloudinary.com/dqxndwzkf/image/upload/v1750228355/categories/meohep3syur86uqfwllu.svg"
      },
      {
        name: "iPhone SE",
        slug: "iphone-se",
        description: "iPhone SE models",
        parent: iphoneParent ? iphoneParent._id : null,
        ancestors: iphoneParent
          ? [
              ...appleParent.ancestors,
              {
                _id: iphoneParent._id,
                name: iphoneParent.name,
                slug: iphoneParent.slug,
              },
            ]
          : [],
        level: iphoneParent ? 2 : 0,
        image: "https://res.cloudinary.com/dqxndwzkf/image/upload/v1750218122/categories/uhx5ztgwensai8uxxfi8.svg"
      },
      {
        name: "iPhone Plus",
        slug: "iphone-plus",
        description: "iPhone Plus models",
        parent: iphoneParent ? iphoneParent._id : null,
        ancestors: iphoneParent
          ? [
              ...appleParent.ancestors,
              {
                _id: iphoneParent._id,
                name: iphoneParent.name,
                slug: iphoneParent.slug,
              },
            ]
          : [],
        level: iphoneParent ? 2 : 0,
        image: "https://res.cloudinary.com/dqxndwzkf/image/upload/v1750218419/categories/adssyljjab0llqtsadfl.svg"
      },
      {
        name: "iPhone Mini",
        slug: "iphone-mini",
        description: "iPhone Mini models",
        parent: iphoneParent ? iphoneParent._id : null,
        ancestors: iphoneParent
          ? [
              ...appleParent.ancestors,
              {
                _id: iphoneParent._id,
                name: iphoneParent.name,
                slug: iphoneParent.slug,
              },
            ]
          : [],
        level: iphoneParent ? 2 : 0,
        image: "https://res.cloudinary.com/dqxndwzkf/image/upload/v1750218419/categories/adssyljjab0llqtsadfl.svg"
      },
      // Watch sub-categories
      {
        name: "Apple Watch Ultra",
        slug: "apple-watch-ultra",
        description: "Apple Watch Ultra models",
        parent: watchParent ? watchParent._id : null,
        ancestors: watchParent
          ? [
              ...appleParent.ancestors,
              {
                _id: watchParent._id,
                name: watchParent.name,
                slug: watchParent.slug,
              },
            ]
          : [],
        level: watchParent ? 2 : 0,
        image: "https://res.cloudinary.com/dqxndwzkf/image/upload/v1750218774/categories/bkzipnbqm3vwsneuqz3d.svg"
      },
      {
        name: "Apple Watch Series",
        slug: "apple-watch-series",
        description: "Apple Watch Series models",
        parent: watchParent ? watchParent._id : null,
        ancestors: watchParent
          ? [
              ...appleParent.ancestors,
              {
                _id: watchParent._id,
                name: watchParent.name,
                slug: watchParent.slug,
              },
            ]
          : [],
        level: watchParent ? 2 : 0,
        image: "https://res.cloudinary.com/dqxndwzkf/image/upload/v1750218852/categories/c6q94irfzcbs2gj3f6qr.svg"
      },
      // Vision sub-categories
      {
        name: "Vision Pro",
        slug: "vision-pro",
        description: "Apple Vision Pro models",
        parent: visionParent ? visionParent._id : null,
        ancestors: visionParent
          ? [
              ...appleParent.ancestors,
              {
                _id: visionParent._id,
                name: visionParent.name,
                slug: visionParent.slug,
              },
            ]
          : [],
        level: visionParent ? 2 : 0,
      },
      // AirPods sub-categories
      {
        name: "AirPods Pro",
        slug: "airpods-pro",
        description: "AirPods Pro models",
        parent: airpodsParent ? airpodsParent._id : null,
        ancestors: airpodsParent
          ? [
              ...appleParent.ancestors,
              {
                _id: airpodsParent._id,
                name: airpodsParent.name,
                slug: airpodsParent.slug,
              },
            ]
          : [],
        level: airpodsParent ? 2 : 0,
      },
      {
        name: "AirPods Max",
        slug: "airpods-max",
        description: "AirPods Max models",
        parent: airpodsParent ? airpodsParent._id : null,
        ancestors: airpodsParent
          ? [
              ...appleParent.ancestors,
              {
                _id: airpodsParent._id,
                name: airpodsParent.name,
                slug: airpodsParent.slug,
              },
            ]
          : [],
        level: airpodsParent ? 2 : 0,
      },
      {
        name: "AirPods Standard",
        slug: "airpods-standard",
        description: "Standard AirPods models",
        parent: airpodsParent ? airpodsParent._id : null,
        ancestors: airpodsParent
          ? [
              ...appleParent.ancestors,
              {
                _id: airpodsParent._id,
                name: airpodsParent.name,
                slug: airpodsParent.slug,
              },
            ]
          : [],
        level: airpodsParent ? 2 : 0,
      },
      // RV&Home sub-categories
      {
        name: "HomePod",
        slug: "homepod",
        description: "HomePod smart speakers",
        parent: rvHomeParent ? rvHomeParent._id : null,
        ancestors: rvHomeParent
          ? [
              ...appleParent.ancestors,
              {
                _id: rvHomeParent._id,
                name: rvHomeParent.name,
                slug: rvHomeParent.slug,
              },
            ]
          : [],
        level: rvHomeParent ? 2 : 0,
      },
      {
        name: "Apple TV",
        slug: "apple-tv",
        description: "Apple TV streaming devices",
        parent: rvHomeParent ? rvHomeParent._id : null,
        ancestors: rvHomeParent
          ? [
              ...appleParent.ancestors,
              {
                _id: rvHomeParent._id,
                name: rvHomeParent.name,
                slug: rvHomeParent.slug,
              },
            ]
          : [],
        level: rvHomeParent ? 2 : 0,
      },
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

    console.log("Categories seeded successfully!");
    return await Category.find();
  } catch (error) {
    console.error("Error seeding categories:", error);
    throw error;
  }
};

const seedProducts = async (categories) => {
  try {
    console.log("Seeding products...");

    const macBookAirCategory = categories.find((c) => c.slug === "macbook-air");
    const macBookProCategory = categories.find((c) => c.slug === "macbook-pro");
    const macMiniCategory = categories.find((c) => c.slug === "mac-mini");
    const macStudioCategory = categories.find((c) => c.slug === "mac-studio");
    const macProCategory = categories.find((c) => c.slug === "mac-pro");
    const iMacCategory = categories.find((c) => c.slug === "imac");
    const iPadProCategory = categories.find((c) => c.slug === "ipad-pro");
    const iPadAirCategory = categories.find((c) => c.slug === "ipad-air");
    const iPadMiniCategory = categories.find((c) => c.slug === "ipad-mini");
    const iPhoneProMaxCategory = categories.find(
      (c) => c.slug === "iphone-pro-max"
    );
    const iPhoneProCategory = categories.find((c) => c.slug === "iphone-pro");
    const iPhoneStandardCategory = categories.find(
      (c) => c.slug === "iphone-standard"
    );
    const iPhoneSECategory = categories.find((c) => c.slug === "iphone-se");
    const appleWatchUltraCategory = categories.find(
      (c) => c.slug === "apple-watch-ultra"
    );
    const appleWatchSeriesCategory = categories.find(
      (c) => c.slug === "apple-watch-series"
    );
    const visionProCategory = categories.find((c) => c.slug === "vision-pro");
    const airPodsProCategory = categories.find((c) => c.slug === "airpods-pro");
    const airPodsMaxCategory = categories.find((c) => c.slug === "airpods-max");
    const airPodsStandardCategory = categories.find(
      (c) => c.slug === "airpods-standard"
    );
    const homePodCategory = categories.find((c) => c.slug === "homepod");
    const appleTVCategory = categories.find((c) => c.slug === "apple-tv");

    const products = [
      {
        name: "MacBook Air M4", // Giả định M4 đã ra mắt
        description:
          "MacBook Air M4: Siêu mỏng, siêu nhẹ, siêu mạnh mẽ với chip M4 thế hệ mới.",
        category: macBookAirCategory ? macBookAirCategory._id : null,
        isNewArrival: true,
        isBestSeller: false, // Mới ra mắt, chưa thể là best seller ngay
        image:
          "https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/44/331644/macbook-air-13-inch-m3-tgdd-xanh-1-638660181465844583-750x500.jpg", // Tạm dùng ảnh M3
        variants: [
          // 13-inch M4
          {
            name: "MacBook Air M4",
            variantName: "MacBook Air 13-inch M4 8GB/256GB - Midnight",
            color: "Midnight",
            capacity: "8GB/256GB",
            price: 30990000,
            stock: 100,
            sku: "MBA-M4-13-8-256-MN",
          },
          {
            name: "MacBook Air M4",
            variantName: "MacBook Air 13-inch M4 8GB/512GB - Starlight",
            color: "Starlight",
            capacity: "8GB/512GB",
            price: 33990000,
            stock: 90,
            sku: "MBA-M4-13-8-512-SL",
          },
          {
            name: "MacBook Air M4",
            variantName: "MacBook Air 13-inch M4 16GB/512GB - Space Gray",
            color: "Space Gray",
            capacity: "16GB/512GB",
            price: 38990000,
            stock: 80,
            sku: "MBA-M4-13-16-512-SG",
          },
          {
            name: "MacBook Air M4",
            variantName: "MacBook Air 13-inch M4 16GB/1TB - Silver",
            color: "Silver",
            capacity: "16GB/1TB",
            price: 43990000,
            stock: 70,
            sku: "MBA-M4-13-16-1T-SV",
          },
          // 15-inch M4
          {
            name: "MacBook Air M4",
            variantName: "MacBook Air 15-inch M4 8GB/256GB - Starlight",
            color: "Starlight",
            capacity: "8GB/256GB",
            price: 35990000,
            stock: 90,
            sku: "MBA-M4-15-8-256-SL",
          },
          {
            name: "MacBook Air M4",
            variantName: "MacBook Air 15-inch M4 16GB/512GB - Midnight",
            color: "Midnight",
            capacity: "16GB/512GB",
            price: 43990000,
            stock: 70,
            sku: "MBA-M4-15-16-512-MN",
          },
          {
            name: "MacBook Air M4",
            variantName: "MacBook Air 15-inch M4 16GB/1TB - Space Gray",
            color: "Space Gray",
            capacity: "16GB/1TB",
            price: 48990000,
            stock: 60,
            sku: "MBA-M4-15-16-1T-SG",
          },
          {
            name: "MacBook Air M4",
            variantName: "MacBook Air 15-inch M4 24GB/1TB - Silver",
            color: "Silver",
            capacity: "24GB/1TB",
            price: 53990000,
            stock: 50,
            sku: "MBA-M4-15-24-1T-SV",
          }, // Option RAM cao hơn
        ],
      },
      {
        name: "MacBook Air M3",
        description:
          "MacBook Air M3 with powerful performance and sleek design.",
        category: macBookAirCategory ? macBookAirCategory._id : null,
        isNewArrival: true,
        isBestSeller: true,
        image:
          "https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/44/331644/macbook-air-13-inch-m3-tgdd-xanh-1-638660181465844583-750x500.jpg",
        variants: [
          // 13-inch M3
          {
            name: "MacBook Air M3",
            variantName: "MacBook Air 13-inch M3 8GB/256GB - Midnight",
            color: "Midnight",
            capacity: "8GB/256GB",
            price: 27990000,
            stock: 150,
            sku: "MBA-M3-13-8-256-MN",
          },
          {
            name: "MacBook Air M3",
            variantName: "MacBook Air 13-inch M3 8GB/512GB - Starlight",
            color: "Starlight",
            capacity: "8GB/512GB",
            price: 30990000,
            stock: 120,
            sku: "MBA-M3-13-8-512-SL",
          },
          {
            name: "MacBook Air M3",
            variantName: "MacBook Air 13-inch M3 16GB/256GB - Space Gray",
            color: "Space Gray",
            capacity: "16GB/256GB",
            price: 32990000,
            stock: 100,
            sku: "MBA-M3-13-16-256-SG",
          },
          {
            name: "MacBook Air M3",
            variantName: "MacBook Air 13-inch M3 16GB/512GB - Silver",
            color: "Silver",
            capacity: "16GB/512GB",
            price: 35990000,
            stock: 90,
            sku: "MBA-M3-13-16-512-SV",
          },
          {
            name: "MacBook Air M3",
            variantName: "MacBook Air 13-inch M3 16GB/1TB - Midnight",
            color: "Midnight",
            capacity: "16GB/1TB",
            price: 40990000,
            stock: 70,
            sku: "MBA-M3-13-16-1T-MN",
          },
          {
            name: "MacBook Air M3",
            variantName: "MacBook Air 13-inch M3 24GB/512GB - Starlight",
            color: "Starlight",
            capacity: "24GB/512GB",
            price: 39990000,
            stock: 50,
            sku: "MBA-M3-13-24-512-SL",
          }, // Max RAM option
          // 15-inch M3
          {
            name: "MacBook Air M3",
            variantName: "MacBook Air 15-inch M3 8GB/256GB - Space Gray",
            color: "Space Gray",
            capacity: "8GB/256GB",
            price: 32990000,
            stock: 100,
            sku: "MBA-M3-15-8-256-SG",
          },
          {
            name: "MacBook Air M3",
            variantName: "MacBook Air 15-inch M3 8GB/512GB - Silver",
            color: "Silver",
            capacity: "8GB/512GB",
            price: 35990000,
            stock: 90,
            sku: "MBA-M3-15-8-512-SV",
          },
          {
            name: "MacBook Air M3",
            variantName: "MacBook Air 15-inch M3 16GB/512GB - Midnight",
            color: "Midnight",
            capacity: "16GB/512GB",
            price: 40990000,
            stock: 80,
            sku: "MBA-M3-15-16-512-MN",
          },
          {
            name: "MacBook Air M3",
            variantName: "MacBook Air 15-inch M3 16GB/1TB - Starlight",
            color: "Starlight",
            capacity: "16GB/1TB",
            price: 45990000,
            stock: 60,
            sku: "MBA-M3-15-16-1T-SL",
          },
          {
            name: "MacBook Air M3",
            variantName: "MacBook Air 15-inch M3 24GB/1TB - Space Gray",
            color: "Space Gray",
            capacity: "24GB/1TB",
            price: 49990000,
            stock: 40,
            sku: "MBA-M3-15-24-1T-SG",
          }, // Max RAM option
        ],
      },
      {
        name: "MacBook Air M2",
        description:
          "MacBook Air M2: Hiệu năng tuyệt vời trong một thiết kế mỏng nhẹ cổ điển.",
        category: macBookAirCategory ? macBookAirCategory._id : null,
        isNewArrival: false,
        isBestSeller: true, // Vẫn còn rất hot
        image:
          "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/macbook-air-midnight-select-20220606?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1653084303665",
        variants: [
          // 13-inch M2
          {
            name: "MacBook Air M2",
            variantName: "MacBook Air 13-inch M2 8GB/256GB - Midnight",
            color: "Midnight",
            capacity: "8GB/256GB",
            price: 24990000,
            stock: 200,
            sku: "MBA-M2-13-8-256-MN",
          },
          {
            name: "MacBook Air M2",
            variantName: "MacBook Air 13-inch M2 8GB/512GB - Starlight",
            color: "Starlight",
            capacity: "8GB/512GB",
            price: 27990000,
            stock: 180,
            sku: "MBA-M2-13-8-512-SL",
          },
          {
            name: "MacBook Air M2",
            variantName: "MacBook Air 13-inch M2 16GB/256GB - Space Gray",
            color: "Space Gray",
            capacity: "16GB/256GB",
            price: 29990000,
            stock: 150,
            sku: "MBA-M2-13-16-256-SG",
          },
          {
            name: "MacBook Air M2",
            variantName: "MacBook Air 13-inch M2 16GB/512GB - Silver",
            color: "Silver",
            capacity: "16GB/512GB",
            price: 32990000,
            stock: 130,
            sku: "MBA-M2-13-16-512-SV",
          },
          {
            name: "MacBook Air M2",
            variantName: "MacBook Air 13-inch M2 16GB/1TB - Midnight",
            color: "Midnight",
            capacity: "16GB/1TB",
            price: 37990000,
            stock: 100,
            sku: "MBA-M2-13-16-1T-MN",
          },
          // 15-inch M2 (Apple ra mắt 15-inch M2 sau)
          {
            name: "MacBook Air M2",
            variantName: "MacBook Air 15-inch M2 8GB/256GB - Space Gray",
            color: "Space Gray",
            capacity: "8GB/256GB",
            price: 29990000,
            stock: 120,
            sku: "MBA-M2-15-8-256-SG",
          },
          {
            name: "MacBook Air M2",
            variantName: "MacBook Air 15-inch M2 16GB/512GB - Starlight",
            color: "Starlight",
            capacity: "16GB/512GB",
            price: 37990000,
            stock: 90,
            sku: "MBA-M2-15-16-512-SL",
          },
          {
            name: "MacBook Air M2",
            variantName: "MacBook Air 15-inch M2 24GB/1TB - Silver",
            color: "Silver",
            capacity: "24GB/1TB",
            price: 44990000,
            stock: 60,
            sku: "MBA-M2-15-24-1T-SV",
          },
        ],
      },
      {
        name: "MacBook Pro M4", // Giả định M4 Pro/Max đã ra mắt
        description:
          "MacBook Pro M4 Pro/Max: Sức mạnh đồ họa và xử lý chuyên nghiệp đỉnh cao.",
        category: macBookProCategory ? macBookProCategory._id : null,
        isNewArrival: true,
        isBestSeller: false,
        image:
          "https://cdn.tgdd.vn/Products/Images/44/327690/macbook-pro-16-inch-m3-max-64gb-1tb-40gpu-den-1-750x500.jpg", // Tạm dùng ảnh M3 Max
        variants: [
          // 14-inch M4 Pro
          {
            name: "MacBook Pro M4",
            variantName: "MacBook Pro 14-inch M4 Pro 18GB/512GB - Space Black",
            color: "Space Black",
            capacity: "18GB/512GB",
            price: 55990000,
            stock: 70,
            sku: "MBP-M4P-14-18-512-SB",
          },
          {
            name: "MacBook Pro M4",
            variantName: "MacBook Pro 14-inch M4 Pro 18GB/1TB - Silver",
            color: "Silver",
            capacity: "18GB/1TB",
            price: 60990000,
            stock: 60,
            sku: "MBP-M4P-14-18-1T-SV",
          },
          {
            name: "MacBook Pro M4",
            variantName: "MacBook Pro 14-inch M4 Pro 36GB/1TB - Space Black",
            color: "Space Black",
            capacity: "36GB/1TB",
            price: 68990000,
            stock: 50,
            sku: "MBP-M4P-14-36-1T-SB",
          },
          // 14-inch M4 Max
          {
            name: "MacBook Pro M4",
            variantName: "MacBook Pro 14-inch M4 Max 36GB/1TB - Silver",
            color: "Silver",
            capacity: "36GB/1TB",
            price: 79990000,
            stock: 40,
            sku: "MBP-M4M-14-36-1T-SV",
          },
          {
            name: "MacBook Pro M4",
            variantName: "MacBook Pro 14-inch M4 Max 48GB/1TB - Space Black",
            color: "Space Black",
            capacity: "48GB/1TB",
            price: 87990000,
            stock: 30,
            sku: "MBP-M4M-14-48-1T-SB",
          },
          // 16-inch M4 Max
          {
            name: "MacBook Pro M4",
            variantName: "MacBook Pro 16-inch M4 Max 36GB/1TB - Space Black",
            color: "Space Black",
            capacity: "36GB/1TB",
            price: 89990000,
            stock: 35,
            sku: "MBP-M4M-16-36-1T-SB",
          },
          {
            name: "MacBook Pro M4",
            variantName: "MacBook Pro 16-inch M4 Max 64GB/2TB - Silver",
            color: "Silver",
            capacity: "64GB/2TB",
            price: 109990000,
            stock: 25,
            sku: "MBP-M4M-16-64-2T-SV",
          },
          {
            name: "MacBook Pro M4",
            variantName: "MacBook Pro 16-inch M4 Max 96GB/4TB - Space Black",
            color: "Space Black",
            capacity: "96GB/4TB",
            price: 139990000,
            stock: 15,
            sku: "MBP-M4M-16-96-4T-SB",
          },
        ],
      },
      {
        name: "MacBook Pro M3",
        description: "MacBook Pro M3 Pro/Max for professional performance.",
        category: macBookProCategory ? macBookProCategory._id : null,
        isNewArrival: true,
        isBestSeller: true,
        image:
          "https://cdn.tgdd.vn/Products/Images/44/327690/macbook-pro-16-inch-m3-max-64gb-1tb-40gpu-den-1-750x500.jpg",
        variants: [
          // 14-inch M3 (Base) - Thường có bản M3 thường cho 14-inch
          {
            name: "MacBook Pro M3",
            variantName: "MacBook Pro 14-inch M3 8GB/512GB - Space Gray",
            color: "Space Gray",
            capacity: "8GB/512GB",
            price: 42990000,
            stock: 90,
            sku: "MBP-M3-14-8-512-SG",
          }, // Giữ lại từ data gốc
          {
            name: "MacBook Pro M3",
            variantName: "MacBook Pro 14-inch M3 16GB/512GB - Silver",
            color: "Silver",
            capacity: "16GB/512GB",
            price: 47990000,
            stock: 80,
            sku: "MBP-M3-14-16-512-SV",
          },
          // 14-inch M3 Pro
          {
            name: "MacBook Pro M3",
            variantName: "MacBook Pro 14-inch M3 Pro 18GB/512GB - Space Black",
            color: "Space Black",
            capacity: "18GB/512GB",
            price: 49990000,
            stock: 70,
            sku: "MBP-M3P-14-18-512-SB",
          }, // Giữ lại từ data gốc
          {
            name: "MacBook Pro M3",
            variantName: "MacBook Pro 14-inch M3 Pro 18GB/1TB - Silver",
            color: "Silver",
            capacity: "18GB/1TB",
            price: 54990000,
            stock: 60,
            sku: "MBP-M3P-14-18-1T-SV",
          },
          {
            name: "MacBook Pro M3",
            variantName: "MacBook Pro 14-inch M3 Pro 36GB/1TB - Space Black",
            color: "Space Black",
            capacity: "36GB/1TB",
            price: 62990000,
            stock: 50,
            sku: "MBP-M3P-14-36-1T-SB",
          },
          // 14-inch M3 Max
          {
            name: "MacBook Pro M3",
            variantName: "MacBook Pro 14-inch M3 Max 36GB/1TB - Silver",
            color: "Silver",
            capacity: "36GB/1TB",
            price: 74990000,
            stock: 40,
            sku: "MBP-M3M-14-36-1T-SV",
          }, // Giữ lại từ data gốc, điều chỉnh sku
          // 16-inch M3 Max
          {
            name: "MacBook Pro M3",
            variantName: "MacBook Pro 16-inch M3 Max 36GB/1TB - Space Black",
            color: "Space Black",
            capacity: "36GB/1TB",
            price: 84990000,
            stock: 35,
            sku: "MBP-M3M-16-36-1T-SB",
          },
          {
            name: "MacBook Pro M3",
            variantName: "MacBook Pro 16-inch M3 Max 48GB/1TB - Silver",
            color: "Silver",
            capacity: "48GB/1TB",
            price: 92990000,
            stock: 30,
            sku: "MBP-M3M-16-48-1T-SV",
          },
          {
            name: "MacBook Pro M3",
            variantName: "MacBook Pro 16-inch M3 Max 64GB/2TB - Space Black",
            color: "Space Black",
            capacity: "64GB/2TB",
            price: 104990000,
            stock: 20,
            sku: "MBP-M3M-16-64-2T-SB",
          },
          {
            name: "MacBook Pro M3",
            variantName: "MacBook Pro 16-inch M3 Max 128GB/4TB - Silver",
            color: "Silver",
            capacity: "128GB/4TB",
            price: 134990000,
            stock: 10,
            sku: "MBP-M3M-16-128-4T-SV",
          }, // Cấu hình cao nhất
        ],
      },
      {
        name: "MacBook Pro M2",
        description:
          "MacBook Pro M2 Pro/Max: Hiệu năng chuyên nghiệp mạnh mẽ, đáng tin cậy.",
        category: macBookProCategory ? macBookProCategory._id : null,
        isNewArrival: false,
        isBestSeller: true,
        image:
          "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/b/mbp-silver-select-202206.jpg",
        variants: [
          // 14-inch M2 Pro
          {
            name: "MacBook Pro M2",
            variantName: "MacBook Pro 14-inch M2 Pro 16GB/512GB - Space Gray",
            color: "Space Gray",
            capacity: "16GB/512GB",
            price: 45990000,
            stock: 100,
            sku: "MBP-M2P-14-16-512-SG",
          },
          {
            name: "MacBook Pro M2",
            variantName: "MacBook Pro 14-inch M2 Pro 16GB/1TB - Silver",
            color: "Silver",
            capacity: "16GB/1TB",
            price: 50990000,
            stock: 80,
            sku: "MBP-M2P-14-16-1T-SV",
          },
          {
            name: "MacBook Pro M2",
            variantName: "MacBook Pro 14-inch M2 Pro 32GB/1TB - Space Gray",
            color: "Space Gray",
            capacity: "32GB/1TB",
            price: 58990000,
            stock: 60,
            sku: "MBP-M2P-14-32-1T-SG",
          },
          // 14-inch M2 Max
          {
            name: "MacBook Pro M2",
            variantName: "MacBook Pro 14-inch M2 Max 32GB/1TB - Silver",
            color: "Silver",
            capacity: "32GB/1TB",
            price: 69990000,
            stock: 50,
            sku: "MBP-M2M-14-32-1T-SV",
          },
          // 16-inch M2 Pro
          {
            name: "MacBook Pro M2",
            variantName: "MacBook Pro 16-inch M2 Pro 16GB/512GB - Space Gray",
            color: "Space Gray",
            capacity: "16GB/512GB",
            price: 55990000,
            stock: 90,
            sku: "MBP-M2P-16-16-512-SG",
          },
          {
            name: "MacBook Pro M2",
            variantName: "MacBook Pro 16-inch M2 Pro 32GB/1TB - Silver",
            color: "Silver",
            capacity: "32GB/1TB",
            price: 63990000,
            stock: 70,
            sku: "MBP-M2P-16-32-1T-SV",
          },
          // 16-inch M2 Max
          {
            name: "MacBook Pro M2",
            variantName: "MacBook Pro 16-inch M2 Max 32GB/1TB - Space Gray",
            color: "Space Gray",
            capacity: "32GB/1TB",
            price: 79990000,
            stock: 40,
            sku: "MBP-M2M-16-32-1T-SG",
          },
          {
            name: "MacBook Pro M2",
            variantName: "MacBook Pro 16-inch M2 Max 64GB/2TB - Silver",
            color: "Silver",
            capacity: "64GB/2TB",
            price: 99990000,
            stock: 30,
            sku: "MBP-M2M-16-64-2T-SV",
          },
          {
            name: "MacBook Pro M2",
            variantName: "MacBook Pro 16-inch M2 Max 96GB/4TB - Space Gray",
            color: "Space Gray",
            capacity: "96GB/4TB",
            price: 129990000,
            stock: 15,
            sku: "MBP-M2M-16-96-4T-SG",
          },
        ],
      },
      {
        name: "iMac 24-inch M4", // Giả định
        description:
          "iMac 24-inch M4: Sức mạnh M4 trong thiết kế All-in-One tuyệt đẹp.",
        category: iMacCategory ? iMacCategory._id : null,
        isNewArrival: true,
        isBestSeller: false,
        image:
          "https://cdn.tgdd.vn/Products/Images/5698/327691/imac-24-inch-m3-16gb-512gb-10gpu-1-1-750x500.jpg", // Tạm dùng ảnh M3
        variants: [
          {
            name: "iMac 24-inch M4",
            variantName: "iMac 24-inch M4 8-core GPU 8GB/256GB - Blue",
            color: "Blue",
            capacity: "8GB/256GB",
            price: 38990000,
            stock: 50,
            sku: "IMAC-M4-24-8GPU-8-256-BL",
          },
          {
            name: "iMac 24-inch M4",
            variantName: "iMac 24-inch M4 10-core GPU 8GB/512GB - Green",
            color: "Green",
            capacity: "8GB/512GB",
            price: 42990000,
            stock: 45,
            sku: "IMAC-M4-24-10GPU-8-512-GR",
          },
          {
            name: "iMac 24-inch M4",
            variantName: "iMac 24-inch M4 10-core GPU 16GB/512GB - Pink",
            color: "Pink",
            capacity: "16GB/512GB",
            price: 47990000,
            stock: 40,
            sku: "IMAC-M4-24-10GPU-16-512-PK",
          },
          {
            name: "iMac 24-inch M4",
            variantName: "iMac 24-inch M4 10-core GPU 16GB/1TB - Silver",
            color: "Silver",
            capacity: "16GB/1TB",
            price: 52990000,
            stock: 30,
            sku: "IMAC-M4-24-10GPU-16-1T-SV",
          },
          {
            name: "iMac 24-inch M4",
            variantName: "iMac 24-inch M4 10-core GPU 24GB/1TB - Yellow",
            color: "Yellow",
            capacity: "24GB/1TB",
            price: 57990000,
            stock: 20,
            sku: "IMAC-M4-24-10GPU-24-1T-YL",
          },
          {
            name: "iMac 24-inch M4",
            variantName: "iMac 24-inch M4 10-core GPU 16GB/2TB - Orange",
            color: "Orange",
            capacity: "16GB/2TB",
            price: 57990000,
            stock: 25,
            sku: "IMAC-M4-24-10GPU-16-2T-OR",
          },
          {
            name: "iMac 24-inch M4",
            variantName: "iMac 24-inch M4 10-core GPU 24GB/2TB - Purple",
            color: "Purple",
            capacity: "24GB/2TB",
            price: 62990000,
            stock: 15,
            sku: "IMAC-M4-24-10GPU-24-2T-PU",
          },
        ],
      },
      {
        name: "iMac 24-inch M3",
        description: "iMac 24-inch with M3 chip, all-in-one desktop.",
        category: iMacCategory ? iMacCategory._id : null,
        isNewArrival: true, // Ra mắt gần đây
        isBestSeller: true,
        image:
          "https://cdn.tgdd.vn/Products/Images/5698/327691/imac-24-inch-m3-16gb-512gb-10gpu-1-1-750x500.jpg",
        variants: [
          {
            name: "iMac 24-inch M3",
            variantName: "iMac 24-inch M3 8-core GPU 8GB/256GB - Blue",
            color: "Blue",
            capacity: "8GB/256GB",
            price: 34990000,
            stock: 60,
            sku: "IMAC-M3-24-8GPU-8-256-BL",
          },
          {
            name: "iMac 24-inch M3",
            variantName: "iMac 24-inch M3 8-core GPU 8GB/256GB - Silver",
            color: "Silver",
            capacity: "8GB/256GB",
            price: 34990000,
            stock: 55,
            sku: "IMAC-M3-24-8GPU-8-256-SV",
          },
          {
            name: "iMac 24-inch M3",
            variantName: "iMac 24-inch M3 10-core GPU 8GB/512GB - Green",
            color: "Green",
            capacity: "8GB/512GB",
            price: 37990000,
            stock: 40,
            sku: "IMAC-M3-24-10GPU-8-512-GR",
          },
          {
            name: "iMac 24-inch M3",
            variantName: "iMac 24-inch M3 10-core GPU 8GB/512GB - Pink",
            color: "Pink",
            capacity: "8GB/512GB",
            price: 37990000,
            stock: 35,
            sku: "IMAC-M3-24-10GPU-8-512-PK",
          },
          {
            name: "iMac 24-inch M3",
            variantName: "iMac 24-inch M3 10-core GPU 16GB/256GB - Yellow",
            color: "Yellow",
            capacity: "16GB/256GB",
            price: 40990000,
            stock: 30,
            sku: "IMAC-M3-24-10GPU-16-256-YL",
          },
          {
            name: "iMac 24-inch M3",
            variantName: "iMac 24-inch M3 10-core GPU 16GB/512GB - Orange",
            color: "Orange",
            capacity: "16GB/512GB",
            price: 44990000,
            stock: 25,
            sku: "IMAC-M3-24-10GPU-16-512-OR",
          },
          {
            name: "iMac 24-inch M3",
            variantName: "iMac 24-inch M3 10-core GPU 16GB/1TB - Purple",
            color: "Purple",
            capacity: "16GB/1TB",
            price: 49990000,
            stock: 20,
            sku: "IMAC-M3-24-10GPU-16-1T-PU",
          },
          {
            name: "iMac 24-inch M3",
            variantName: "iMac 24-inch M3 10-core GPU 24GB/512GB - Blue",
            color: "Blue",
            capacity: "24GB/512GB",
            price: 49990000,
            stock: 15,
            sku: "IMAC-M3-24-10GPU-24-512-BL",
          }, // Max RAM
        ],
      },
      {
        name: "iMac 24-inch M1",
        description:
          "iMac 24-inch M1: Thiết kế All-in-One rực rỡ, hiệu năng M1 ấn tượng.",
        category: iMacCategory ? iMacCategory._id : null,
        isNewArrival: false,
        isBestSeller: true, // Vẫn là lựa chọn tốt
        image:
          "https://th.bing.com/th/id/R.fb650765e7727c258325dad584f623aa?rik=7lFQvY%2bs%2bKj5eg&pid=ImgRaw&r=0",
        variants: [
          {
            name: "iMac 24-inch M1",
            variantName: "iMac 24-inch M1 7-core GPU 8GB/256GB - Blue",
            color: "Blue",
            capacity: "8GB/256GB",
            price: 29990000,
            stock: 70,
            sku: "IMAC-M1-24-7GPU-8-256-BL",
          }, // M1 base có 7-core GPU
          {
            name: "iMac 24-inch M1",
            variantName: "iMac 24-inch M1 8-core GPU 8GB/256GB - Green",
            color: "Green",
            capacity: "8GB/256GB",
            price: 32990000,
            stock: 65,
            sku: "IMAC-M1-24-8GPU-8-256-GR",
          },
          {
            name: "iMac 24-inch M1",
            variantName: "iMac 24-inch M1 8-core GPU 8GB/512GB - Pink",
            color: "Pink",
            capacity: "8GB/512GB",
            price: 35990000,
            stock: 60,
            sku: "IMAC-M1-24-8GPU-8-512-PK",
          },
          {
            name: "iMac 24-inch M1",
            variantName: "iMac 24-inch M1 8-core GPU 16GB/256GB - Silver",
            color: "Silver",
            capacity: "16GB/256GB",
            price: 37990000,
            stock: 50,
            sku: "IMAC-M1-24-8GPU-16-256-SV",
          },
          {
            name: "iMac 24-inch M1",
            variantName: "iMac 24-inch M1 8-core GPU 16GB/512GB - Yellow",
            color: "Yellow",
            capacity: "16GB/512GB",
            price: 40990000,
            stock: 40,
            sku: "IMAC-M1-24-8GPU-16-512-YL",
          },
          {
            name: "iMac 24-inch M1",
            variantName: "iMac 24-inch M1 8-core GPU 8GB/1TB - Orange",
            color: "Orange",
            capacity: "8GB/1TB",
            price: 39990000,
            stock: 30,
            sku: "IMAC-M1-24-8GPU-8-1T-OR",
          },
          {
            name: "iMac 24-inch M1",
            variantName: "iMac 24-inch M1 8-core GPU 16GB/1TB - Purple",
            color: "Purple",
            capacity: "16GB/1TB",
            price: 44990000,
            stock: 20,
            sku: "IMAC-M1-24-8GPU-16-1T-PU",
          },
        ],
      },

      // --- Mac Mini Category ---
      {
        name: "Mac Mini M4", // Giả định
        description: "Mac Mini M4 with incredible performance and versatility.",
        category: macMiniCategory ? macMiniCategory._id : null,
        isNewArrival: true,
        isBestSeller: false,
        image:
          "https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/5698/331493/mac-mini-m4-16gb-256gb-bac-1-638660045913073298-750x500.jpg", // Tạm dùng ảnh cũ
        variants: [
          // M4 Base
          {
            name: "Mac Mini M4",
            variantName: "Mac Mini M4 8GB/256GB",
            color: "Silver",
            capacity: "8GB/256GB",
            price: 17990000,
            stock: 90,
            sku: "MM-M4-8-256-SV",
          },
          {
            name: "Mac Mini M4",
            variantName: "Mac Mini M4 8GB/512GB",
            color: "Silver",
            capacity: "8GB/512GB",
            price: 20990000,
            stock: 80,
            sku: "MM-M4-8-512-SV",
          },
          {
            name: "Mac Mini M4",
            variantName: "Mac Mini M4 16GB/256GB",
            color: "Silver",
            capacity: "16GB/256GB",
            price: 22990000,
            stock: 70,
            sku: "MM-M4-16-256-SV",
          },
          {
            name: "Mac Mini M4",
            variantName: "Mac Mini M4 16GB/512GB",
            color: "Silver",
            capacity: "16GB/512GB",
            price: 25990000,
            stock: 60,
            sku: "MM-M4-16-512-SV",
          },
          {
            name: "Mac Mini M4",
            variantName: "Mac Mini M4 24GB/1TB",
            color: "Silver",
            capacity: "24GB/1TB",
            price: 32990000,
            stock: 40,
            sku: "MM-M4-24-1T-SV",
          }, // Max RAM cho base
          // M4 Pro
          {
            name: "Mac Mini M4",
            variantName: "Mac Mini M4 Pro 16GB/512GB",
            color: "Space Gray",
            capacity: "16GB/512GB",
            price: 33990000,
            stock: 50,
            sku: "MM-M4P-16-512-SG",
          }, // Pro có thể có Space Gray
          {
            name: "Mac Mini M4",
            variantName: "Mac Mini M4 Pro 32GB/1TB",
            color: "Space Gray",
            capacity: "32GB/1TB",
            price: 43990000,
            stock: 30,
            sku: "MM-M4P-32-1T-SG",
          },
          {
            name: "Mac Mini M4",
            variantName: "Mac Mini M4 Pro 32GB/2TB",
            color: "Silver",
            capacity: "32GB/2TB",
            price: 48990000,
            stock: 20,
            sku: "MM-M4P-32-2T-SV",
          },
        ],
      },
      {
        name: "Mac Mini M2",
        description: "Mac Mini M2: Nhỏ gọn, mạnh mẽ, đa năng.",
        category: macMiniCategory ? macMiniCategory._id : null,
        isNewArrival: false, // M2 đã ra mắt một thời gian
        isBestSeller: true,
        image:
          "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mac-mini-hero-202301?wid=904&hei=840&fmt=jpeg&qlt=90&.v=16700382 hero-202301",
        variants: [
          // M2 Base (sửa SKU từ data gốc của bạn MM-M2... thành MM-M2-...)
          {
            name: "Mac Mini M2",
            variantName: "Mac Mini M2 8GB/256GB",
            color: "Silver",
            capacity: "8GB/256GB",
            price: 15990000,
            stock: 100,
            sku: "MM-M2-8-256-SV",
          },
          {
            name: "Mac Mini M2",
            variantName: "Mac Mini M2 8GB/512GB",
            color: "Silver",
            capacity: "8GB/512GB",
            price: 18990000,
            stock: 80,
            sku: "MM-M2-8-512-SV",
          },
          {
            name: "Mac Mini M2",
            variantName: "Mac Mini M2 16GB/256GB",
            color: "Silver",
            capacity: "16GB/256GB",
            price: 20990000,
            stock: 70,
            sku: "MM-M2-16-256-SV",
          },
          {
            name: "Mac Mini M2",
            variantName: "Mac Mini M2 16GB/512GB",
            color: "Silver",
            capacity: "16GB/512GB",
            price: 23990000,
            stock: 65,
            sku: "MM-M2-16-512-SV",
          },
          {
            name: "Mac Mini M2",
            variantName: "Mac Mini M2 24GB/1TB",
            color: "Silver",
            capacity: "24GB/1TB",
            price: 30990000,
            stock: 45,
            sku: "MM-M2-24-1T-SV",
          },
          // M2 Pro (sửa SKU từ data gốc của bạn MM-M2P... thành MM-M2P-...)
          {
            name: "Mac Mini M2",
            variantName: "Mac Mini M2 Pro 16GB/512GB",
            color: "Space Gray",
            capacity: "16GB/512GB",
            price: 30990000,
            stock: 60,
            sku: "MM-M2P-16-512-SG",
          },
          {
            name: "Mac Mini M2",
            variantName: "Mac Mini M2 Pro 16GB/1TB",
            color: "Space Gray",
            capacity: "16GB/1TB",
            price: 35990000,
            stock: 50,
            sku: "MM-M2P-16-1T-SG",
          },
          {
            name: "Mac Mini M2",
            variantName: "Mac Mini M2 Pro 32GB/512GB",
            color: "Silver",
            capacity: "32GB/512GB",
            price: 38990000,
            stock: 30,
            sku: "MM-M2P-32-512-SV",
          },
          {
            name: "Mac Mini M2",
            variantName: "Mac Mini M2 Pro 32GB/2TB",
            color: "Space Gray",
            capacity: "32GB/2TB",
            price: 46990000,
            stock: 20,
            sku: "MM-M2P-32-2T-SG",
          },
        ],
      },
      {
        name: "Mac Mini M1",
        description:
          "Mac Mini M1: Khởi đầu hoàn hảo cho sức mạnh Apple Silicon.",
        category: macMiniCategory ? macMiniCategory._id : null,
        isNewArrival: false,
        isBestSeller: false, // Có thể không còn là best seller khi M2 ra
        image:
          "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/m/img-apple-main_1_1_1.jpg",
        variants: [
          {
            name: "Mac Mini M1",
            variantName: "Mac Mini M1 8GB/256GB",
            color: "Silver",
            capacity: "8GB/256GB",
            price: 13990000,
            stock: 120,
            sku: "MM-M1-8-256-SV",
          },
          {
            name: "Mac Mini M1",
            variantName: "Mac Mini M1 8GB/512GB",
            color: "Silver",
            capacity: "8GB/512GB",
            price: 16990000,
            stock: 100,
            sku: "MM-M1-8-512-SV",
          },
          {
            name: "Mac Mini M1",
            variantName: "Mac Mini M1 16GB/256GB",
            color: "Silver",
            capacity: "16GB/256GB",
            price: 18990000,
            stock: 80,
            sku: "MM-M1-16-256-SV",
          },
          {
            name: "Mac Mini M1",
            variantName: "Mac Mini M1 16GB/512GB",
            color: "Silver",
            capacity: "16GB/512GB",
            price: 21990000,
            stock: 70,
            sku: "MM-M1-16-512-SV",
          },
          {
            name: "Mac Mini M1",
            variantName: "Mac Mini M1 16GB/1TB",
            color: "Silver",
            capacity: "16GB/1TB",
            price: 25990000,
            stock: 50,
            sku: "MM-M1-16-1T-SV",
          },
        ],
      },

      // --- Mac Studio Category ---
      // Điều chỉnh Mac Studio từ data gốc: product name là M3 Max thì variants nên là M3 Max và M3 Ultra
      {
        name: "Mac Studio M3",
        description: "Mac Studio M3 Max/Ultra for ultimate creative power.",
        category: macStudioCategory ? macStudioCategory._id : null,
        isNewArrival: true,
        isBestSeller: true,
        image:
          "https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/5698/335383/mac-studio-m3-ultra-96gb-1tb-bac-1-638769618622556026-750x500.jpg",
        variants: [
          // M3 Max
          {
            name: "Mac Studio M3",
            variantName: "Mac Studio M3 Max 32GB/512GB",
            color: "Silver",
            capacity: "32GB/512GB",
            price: 59990000,
            stock: 40,
            sku: "MS-M3X-32-512-SV",
          },
          {
            name: "Mac Studio M3",
            variantName: "Mac Studio M3 Max 32GB/1TB",
            color: "Silver",
            capacity: "32GB/1TB",
            price: 65990000,
            stock: 35,
            sku: "MS-M3X-32-1T-SV",
          },
          {
            name: "Mac Studio M3",
            variantName: "Mac Studio M3 Max 64GB/1TB",
            color: "Silver",
            capacity: "64GB/1TB",
            price: 77990000,
            stock: 30,
            sku: "MS-M3X-64-1T-SV",
          },
          {
            name: "Mac Studio M3",
            variantName: "Mac Studio M3 Max 64GB/2TB",
            color: "Silver",
            capacity: "64GB/2TB",
            price: 89990000,
            stock: 20,
            sku: "MS-M3X-64-2T-SV",
          },
          // M3 Ultra
          {
            name: "Mac Studio M3",
            variantName: "Mac Studio M3 Ultra 64GB/1TB",
            color: "Silver",
            capacity: "64GB/1TB",
            price: 94990000,
            stock: 25,
            sku: "MS-M3U-64-1T-SV",
          },
          {
            name: "Mac Studio M3",
            variantName: "Mac Studio M3 Ultra 128GB/1TB",
            color: "Silver",
            capacity: "128GB/1TB",
            price: 114990000,
            stock: 15,
            sku: "MS-M3U-128-1T-SV",
          },
          {
            name: "Mac Studio M3",
            variantName: "Mac Studio M3 Ultra 128GB/2TB",
            color: "Silver",
            capacity: "128GB/2TB",
            price: 126990000,
            stock: 10,
            sku: "MS-M3U-128-2T-SV",
          },
          {
            name: "Mac Studio M3",
            variantName: "Mac Studio M3 Ultra 192GB/4TB",
            color: "Silver",
            capacity: "192GB/4TB",
            price: 164990000,
            stock: 5,
            sku: "MS-M3U-192-4T-SV",
          }, // Cấu hình Ultra cao nhất
        ],
      },
      {
        name: "Mac Studio M2",
        description:
          "Mac Studio M2 Max/Ultra: Sức mạnh đột phá cho chuyên gia.",
        category: macStudioCategory ? macStudioCategory._id : null,
        isNewArrival: false, // M2 đã ra trước M3
        isBestSeller: true,
        image:
          "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/1/_/1_75_5.png",
        variants: [
          // M2 Max (sửa SKU từ data gốc của bạn MS-M2M... thành MS-M2X...)
          {
            name: "Mac Studio M2",
            variantName: "Mac Studio M2 Max 32GB/512GB",
            color: "Silver",
            capacity: "32GB/512GB",
            price: 54990000,
            stock: 40,
            sku: "MS-M2X-32-512-SV",
          },
          {
            name: "Mac Studio M2",
            variantName: "Mac Studio M2 Max 32GB/1TB",
            color: "Silver",
            capacity: "32GB/1TB",
            price: 60990000,
            stock: 35,
            sku: "MS-M2X-32-1T-SV",
          },
          {
            name: "Mac Studio M2",
            variantName: "Mac Studio M2 Max 64GB/1TB",
            color: "Silver",
            capacity: "64GB/1TB",
            price: 72990000,
            stock: 30,
            sku: "MS-M2X-64-1T-SV",
          },
          // M2 Ultra (sửa SKU từ data gốc của bạn MS-M2U... thành MS-M2U...)
          {
            name: "Mac Studio M2",
            variantName: "Mac Studio M2 Ultra 64GB/1TB",
            color: "Silver",
            capacity: "64GB/1TB",
            price: 84990000,
            stock: 25,
            sku: "MS-M2U-64-1T-SV",
          },
          {
            name: "Mac Studio M2",
            variantName: "Mac Studio M2 Ultra 128GB/1TB",
            color: "Silver",
            capacity: "128GB/1TB",
            price: 104990000,
            stock: 15,
            sku: "MS-M2U-128-1T-SV",
          },
          {
            name: "Mac Studio M2",
            variantName: "Mac Studio M2 Ultra 128GB/2TB",
            color: "Silver",
            capacity: "128GB/2TB",
            price: 116990000,
            stock: 10,
            sku: "MS-M2U-128-2T-SV",
          },
          {
            name: "Mac Studio M2",
            variantName: "Mac Studio M2 Ultra 192GB/4TB",
            color: "Silver",
            capacity: "192GB/4TB",
            price: 154990000,
            stock: 5,
            sku: "MS-M2U-192-4T-SV",
          },
        ],
      },
      {
        name: "Mac Studio M1",
        description:
          "Mac Studio M1 Max/Ultra: Khởi đầu cho dòng máy trạm nhỏ gọn, mạnh mẽ.",
        category: macStudioCategory ? macStudioCategory._id : null,
        isNewArrival: false,
        isBestSeller: false,
        image:
          "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/1/_/1_75_5.png",
        variants: [
          // M1 Max
          {
            name: "Mac Studio M1",
            variantName: "Mac Studio M1 Max 32GB/512GB",
            color: "Silver",
            capacity: "32GB/512GB",
            price: 49990000,
            stock: 30,
            sku: "MS-M1X-32-512-SV",
          },
          {
            name: "Mac Studio M1",
            variantName: "Mac Studio M1 Max 64GB/1TB",
            color: "Silver",
            capacity: "64GB/1TB",
            price: 62990000,
            stock: 20,
            sku: "MS-M1X-64-1T-SV",
          },
          // M1 Ultra
          {
            name: "Mac Studio M1",
            variantName: "Mac Studio M1 Ultra 64GB/1TB",
            color: "Silver",
            capacity: "64GB/1TB",
            price: 79990000,
            stock: 15,
            sku: "MS-M1U-64-1T-SV",
          },
          {
            name: "Mac Studio M1",
            variantName: "Mac Studio M1 Ultra 128GB/2TB",
            color: "Silver",
            capacity: "128GB/2TB",
            price: 99990000,
            stock: 10,
            sku: "MS-M1U-128-2T-SV",
          },
        ],
      },
      {
        name: "Mac Mini M4", // Giả định mới nhất
        description:
          "Mac Mini M4: Sức mạnh M4 đột phá trong một thiết kế nhỏ gọn quen thuộc.",
        category: macMiniCategory ? macMiniCategory._id : null,
        isNewArrival: true,
        isBestSeller: false, // Mới ra mắt
        image:
          "https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/5698/331493/mac-mini-m4-16gb-256gb-bac-1-638660045913073298-750x500.jpg", // Tạm dùng ảnh cũ, cần cập nhật khi có
        variants: [
          // M4 Base
          {
            name: "Mac Mini M4",
            variantName: "Mac Mini M4 8GB/256GB - Silver",
            color: "Silver",
            capacity: "8GB/256GB",
            price: 18990000,
            stock: 100,
            sku: "MM-M4-8-256-SV",
          },
          {
            name: "Mac Mini M4",
            variantName: "Mac Mini M4 8GB/512GB - Silver",
            color: "Silver",
            capacity: "8GB/512GB",
            price: 21990000,
            stock: 90,
            sku: "MM-M4-8-512-SV",
          },
          {
            name: "Mac Mini M4",
            variantName: "Mac Mini M4 16GB/256GB - Silver",
            color: "Silver",
            capacity: "16GB/256GB",
            price: 23990000,
            stock: 80,
            sku: "MM-M4-16-256-SV",
          },
          {
            name: "Mac Mini M4",
            variantName: "Mac Mini M4 16GB/512GB - Silver",
            color: "Silver",
            capacity: "16GB/512GB",
            price: 26990000,
            stock: 70,
            sku: "MM-M4-16-512-SV",
          },
          {
            name: "Mac Mini M4",
            variantName: "Mac Mini M4 16GB/1TB - Silver",
            color: "Silver",
            capacity: "16GB/1TB",
            price: 31990000,
            stock: 60,
            sku: "MM-M4-16-1T-SV",
          },
          {
            name: "Mac Mini M4",
            variantName: "Mac Mini M4 24GB/512GB - Silver",
            color: "Silver",
            capacity: "24GB/512GB",
            price: 31990000,
            stock: 50,
            sku: "MM-M4-24-512-SV",
          }, // Max RAM for base
          // M4 Pro
          {
            name: "Mac Mini M4",
            variantName: "Mac Mini M4 Pro 16GB/512GB - Space Gray",
            color: "Space Gray",
            capacity: "16GB/512GB",
            price: 35990000,
            stock: 60,
            sku: "MM-M4P-16-512-SG",
          },
          {
            name: "Mac Mini M4",
            variantName: "Mac Mini M4 Pro 32GB/512GB - Space Gray",
            color: "Space Gray",
            capacity: "32GB/512GB",
            price: 40990000,
            stock: 50,
            sku: "MM-M4P-32-512-SG",
          },
          {
            name: "Mac Mini M4",
            variantName: "Mac Mini M4 Pro 32GB/1TB - Silver",
            color: "Silver",
            capacity: "32GB/1TB",
            price: 45990000,
            stock: 40,
            sku: "MM-M4P-32-1T-SV",
          },
          {
            name: "Mac Mini M4",
            variantName: "Mac Mini M4 Pro 32GB/2TB - Space Gray",
            color: "Space Gray",
            capacity: "32GB/2TB",
            price: 50990000,
            stock: 30,
            sku: "MM-M4P-32-2T-SG",
          },
        ],
      },
      {
        name: "Mac Mini M2", // Sửa lại tên từ 'Mac Mini M4' trong data gốc của bạn để khớp SKU
        description: "Mac Mini M2 with incredible performance and versatility.",
        category: macMiniCategory ? macMiniCategory._id : null,
        isNewArrival: false, // M2 đã ra mắt trước M4 (giả định)
        isBestSeller: true,
        image:
          "https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/5698/331493/mac-mini-m4-16gb-256gb-bac-1-638660045913073298-750x500.jpg", // Ảnh này là của M2
        variants: [
          // M2 Base - SKU từ data gốc là MM-M2...
          {
            name: "Mac Mini M2",
            variantName: "Mac Mini M2 8GB/256GB - Silver",
            color: "Silver",
            capacity: "8GB/256GB",
            price: 15990000,
            stock: 100,
            sku: "MM-M2-8-256-SV",
          }, // Thêm -SV
          {
            name: "Mac Mini M2",
            variantName: "Mac Mini M2 8GB/512GB - Silver",
            color: "Silver",
            capacity: "8GB/512GB",
            price: 18990000,
            stock: 80,
            sku: "MM-M2-8-512-SV",
          }, // Thêm -SV
          {
            name: "Mac Mini M2",
            variantName: "Mac Mini M2 16GB/256GB - Silver",
            color: "Silver",
            capacity: "16GB/256GB",
            price: 20990000,
            stock: 90,
            sku: "MM-M2-16-256-SV",
          },
          {
            name: "Mac Mini M2",
            variantName: "Mac Mini M2 16GB/512GB - Silver",
            color: "Silver",
            capacity: "16GB/512GB",
            price: 23990000,
            stock: 70,
            sku: "MM-M2-16-512-SV",
          },
          {
            name: "Mac Mini M2",
            variantName: "Mac Mini M2 16GB/1TB - Silver",
            color: "Silver",
            capacity: "16GB/1TB",
            price: 28990000,
            stock: 60,
            sku: "MM-M2-16-1T-SV",
          },
          {
            name: "Mac Mini M2",
            variantName: "Mac Mini M2 24GB/512GB - Silver",
            color: "Silver",
            capacity: "24GB/512GB",
            price: 28990000,
            stock: 50,
            sku: "MM-M2-24-512-SV",
          },
          // M2 Pro - SKU từ data gốc là MM-M2P...
          {
            name: "Mac Mini M2",
            variantName: "Mac Mini M2 Pro 16GB/512GB - Silver",
            color: "Silver",
            capacity: "16GB/512GB",
            price: 30990000,
            stock: 60,
            sku: "MM-M2P-16-512-SV",
          }, // Giữ nguyên từ data gốc (thêm -SV)
          {
            name: "Mac Mini M2",
            variantName: "Mac Mini M2 Pro 16GB/512GB - Space Gray",
            color: "Space Gray",
            capacity: "16GB/512GB",
            price: 30990000,
            stock: 55,
            sku: "MM-M2P-16-512-SG",
          },
          {
            name: "Mac Mini M2",
            variantName: "Mac Mini M2 Pro 32GB/512GB - Space Gray",
            color: "Space Gray",
            capacity: "32GB/512GB",
            price: 35990000,
            stock: 45,
            sku: "MM-M2P-32-512-SG",
          },
          {
            name: "Mac Mini M2",
            variantName: "Mac Mini M2 Pro 16GB/1TB - Silver",
            color: "Silver",
            capacity: "16GB/1TB",
            price: 35990000,
            stock: 40,
            sku: "MM-M2P-16-1T-SV",
          },
          {
            name: "Mac Mini M2",
            variantName: "Mac Mini M2 Pro 32GB/2TB - Space Gray",
            color: "Space Gray",
            capacity: "32GB/2TB",
            price: 45990000,
            stock: 30,
            sku: "MM-M2P-32-2T-SG",
          },
        ],
      },
      {
        name: "Mac Mini M1",
        description:
          "Mac Mini M1: Hiệu năng Apple Silicon trong thiết kế nhỏ gọn kinh điển.",
        category: macMiniCategory ? macMiniCategory._id : null,
        isNewArrival: false,
        isBestSeller: false, // M2 và M4 (giả định) sẽ phổ biến hơn
        image:
          "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mac-mini-hero-202011?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1603403373000",
        variants: [
          {
            name: "Mac Mini M1",
            variantName: "Mac Mini M1 8GB/256GB - Silver",
            color: "Silver",
            capacity: "8GB/256GB",
            price: 13990000,
            stock: 120,
            sku: "MM-M1-8-256-SV",
          },
          {
            name: "Mac Mini M1",
            variantName: "Mac Mini M1 8GB/512GB - Silver",
            color: "Silver",
            capacity: "8GB/512GB",
            price: 16990000,
            stock: 110,
            sku: "MM-M1-8-512-SV",
          },
          {
            name: "Mac Mini M1",
            variantName: "Mac Mini M1 16GB/256GB - Silver",
            color: "Silver",
            capacity: "16GB/256GB",
            price: 18990000,
            stock: 100,
            sku: "MM-M1-16-256-SV",
          },
          {
            name: "Mac Mini M1",
            variantName: "Mac Mini M1 16GB/512GB - Silver",
            color: "Silver",
            capacity: "16GB/512GB",
            price: 21990000,
            stock: 90,
            sku: "MM-M1-16-512-SV",
          },
          {
            name: "Mac Mini M1",
            variantName: "Mac Mini M1 8GB/1TB - Silver",
            color: "Silver",
            capacity: "8GB/1TB",
            price: 20990000,
            stock: 70,
            sku: "MM-M1-8-1T-SV",
          },
          {
            name: "Mac Mini M1",
            variantName: "Mac Mini M1 16GB/1TB - Silver",
            color: "Silver",
            capacity: "16GB/1TB",
            price: 25990000,
            stock: 60,
            sku: "MM-M1-16-1T-SV",
          },
          {
            name: "Mac Mini M1",
            variantName: "Mac Mini M1 16GB/2TB - Silver",
            color: "Silver",
            capacity: "16GB/2TB",
            price: 30990000,
            stock: 40,
            sku: "MM-M1-16-2T-SV",
          },
        ],
      },

      // --- Mac Pro Category ---
      {
        name: "Mac Pro M4 Ultra", // Giả định mới nhất
        description:
          "Mac Pro M4 Ultra: Định nghĩa lại sức mạnh máy trạm chuyên nghiệp.",
        category: macProCategory ? macProCategory._id : null,
        isNewArrival: true,
        isBestSeller: false,
        image:
          "https://tse2.mm.bing.net/th/id/OIP.p2cSRuf_zF_Ww71Ps-HiZgHaHa?r=0&rs=1&pid=ImgDetMain", // Tạm dùng ảnh M2 Ultra
        variants: [
          // Tower
          {
            name: "Mac Pro M4 Ultra",
            variantName: "Mac Pro M4 Ultra 128GB/1TB (Tower)",
            color: "Silver",
            capacity: "128GB/1TB",
            price: 209990000,
            stock: 8,
            sku: "MP-M4U-128-1T-T",
          },
          {
            name: "Mac Pro M4 Ultra",
            variantName: "Mac Pro M4 Ultra 192GB/2TB (Tower)",
            color: "Silver",
            capacity: "192GB/2TB",
            price: 259990000,
            stock: 6,
            sku: "MP-M4U-192-2T-T",
          },
          {
            name: "Mac Pro M4 Ultra",
            variantName: "Mac Pro M4 Ultra 256GB/4TB (Tower)",
            color: "Silver",
            capacity: "256GB/4TB",
            price: 319990000,
            stock: 4,
            sku: "MP-M4U-256-4T-T",
          }, // RAM cao hơn M2 Ultra
          {
            name: "Mac Pro M4 Ultra",
            variantName: "Mac Pro M4 Ultra 256GB/8TB (Tower)",
            color: "Silver",
            capacity: "256GB/8TB",
            price: 369990000,
            stock: 3,
            sku: "MP-M4U-256-8T-T",
          },
          // Rack
          {
            name: "Mac Pro M4 Ultra",
            variantName: "Mac Pro M4 Ultra 128GB/1TB (Rack)",
            color: "Silver",
            capacity: "128GB/1TB",
            price: 219990000,
            stock: 7,
            sku: "MP-M4U-128-1T-R",
          },
          {
            name: "Mac Pro M4 Ultra",
            variantName: "Mac Pro M4 Ultra 192GB/4TB (Rack)",
            color: "Silver",
            capacity: "192GB/4TB",
            price: 299990000,
            stock: 5,
            sku: "MP-M4U-192-4T-R",
          },
          {
            name: "Mac Pro M4 Ultra",
            variantName: "Mac Pro M4 Ultra 256GB/8TB (Rack)",
            color: "Silver",
            capacity: "256GB/8TB",
            price: 379990000,
            stock: 2,
            sku: "MP-M4U-256-8T-R",
          },
        ],
      },
      {
        name: "Mac Pro M3 Ultra", // Giả định
        description:
          "Mac Pro M3 Ultra: Sức mạnh vượt trội cho những tác vụ nặng nhất.",
        category: macProCategory ? macProCategory._id : null,
        isNewArrival: true, // Nếu M4 là mới nhất, thì M3 cũng coi là mới
        isBestSeller: false,
        image:
          "https://tse2.mm.bing.net/th/id/OIP.p2cSRuf_zF_Ww71Ps-HiZgHaHa?r=0&rs=1&pid=ImgDetMain", // Tạm dùng ảnh M2 Ultra
        variants: [
          // Tower
          {
            name: "Mac Pro M3 Ultra",
            variantName: "Mac Pro M3 Ultra 96GB/1TB (Tower)",
            color: "Silver",
            capacity: "96GB/1TB",
            price: 189990000,
            stock: 12,
            sku: "MP-M3U-96-1T-T",
          },
          {
            name: "Mac Pro M3 Ultra",
            variantName: "Mac Pro M3 Ultra 128GB/2TB (Tower)",
            color: "Silver",
            capacity: "128GB/2TB",
            price: 229990000,
            stock: 10,
            sku: "MP-M3U-128-2T-T",
          },
          {
            name: "Mac Pro M3 Ultra",
            variantName: "Mac Pro M3 Ultra 192GB/4TB (Tower)",
            color: "Silver",
            capacity: "192GB/4TB",
            price: 289990000,
            stock: 7,
            sku: "MP-M3U-192-4T-T",
          },
          // Rack
          {
            name: "Mac Pro M3 Ultra",
            variantName: "Mac Pro M3 Ultra 96GB/2TB (Rack)",
            color: "Silver",
            capacity: "96GB/2TB",
            price: 209990000,
            stock: 9,
            sku: "MP-M3U-96-2T-R",
          },
          {
            name: "Mac Pro M3 Ultra",
            variantName: "Mac Pro M3 Ultra 192GB/8TB (Rack)",
            color: "Silver",
            capacity: "192GB/8TB",
            price: 339990000,
            stock: 4,
            sku: "MP-M3U-192-8T-R",
          },
        ],
      },
      {
        name: "Mac Pro M2 Ultra",
        description: "Mac Pro M2 Ultra, the most powerful Mac ever.",
        category: macProCategory ? macProCategory._id : null,
        isNewArrival: false, // M3, M4 Ultra (giả định) mới hơn
        isBestSeller: true, // Vẫn là lựa chọn hàng đầu hiện tại
        image:
          "https://tse2.mm.bing.net/th/id/OIP.p2cSRuf_zF_Ww71Ps-HiZgHaHa?r=0&rs=1&pid=ImgDetMain",
        variants: [
          // Tower - Mở rộng từ data gốc
          {
            name: "Mac Pro M2 Ultra",
            variantName: "Mac Pro M2 Ultra 64GB/1TB (Tower)",
            color: "Silver",
            capacity: "64GB/1TB",
            price: 169990000,
            stock: 10,
            sku: "MP-M2U-64-1T-T",
          },
          {
            name: "Mac Pro M2 Ultra",
            variantName: "Mac Pro M2 Ultra 64GB/2TB (Tower)",
            color: "Silver",
            capacity: "64GB/2TB",
            price: 185990000,
            stock: 9,
            sku: "MP-M2U-64-2T-T",
          },
          {
            name: "Mac Pro M2 Ultra",
            variantName: "Mac Pro M2 Ultra 128GB/1TB (Tower)",
            color: "Silver",
            capacity: "128GB/1TB",
            price: 209990000,
            stock: 8,
            sku: "MP-M2U-128-1T-T",
          },
          {
            name: "Mac Pro M2 Ultra",
            variantName: "Mac Pro M2 Ultra 128GB/4TB (Tower)",
            color: "Silver",
            capacity: "128GB/4TB",
            price: 259990000,
            stock: 6,
            sku: "MP-M2U-128-4T-T",
          },
          {
            name: "Mac Pro M2 Ultra",
            variantName: "Mac Pro M2 Ultra 192GB/2TB (Tower)",
            color: "Silver",
            capacity: "192GB/2TB",
            price: 289990000,
            stock: 5,
            sku: "MP-M2U-192-2T-T",
          },
          {
            name: "Mac Pro M2 Ultra",
            variantName: "Mac Pro M2 Ultra 192GB/8TB (Tower)",
            color: "Silver",
            capacity: "192GB/8TB",
            price: 359990000,
            stock: 3,
            sku: "MP-M2U-192-8T-T",
          }, // Max config
          // Rack - Mở rộng từ data gốc
          {
            name: "Mac Pro M2 Ultra",
            variantName: "Mac Pro M2 Ultra 64GB/1TB (Rack)",
            color: "Silver",
            capacity: "64GB/1TB",
            price: 179990000,
            stock: 9,
            sku: "MP-M2U-64-1T-R",
          },
          {
            name: "Mac Pro M2 Ultra",
            variantName: "Mac Pro M2 Ultra 128GB/2TB (Rack)",
            color: "Silver",
            capacity: "128GB/2TB",
            price: 219990000,
            stock: 8,
            sku: "MP-M2U-128-2T-R",
          }, // Giữ từ data gốc
          {
            name: "Mac Pro M2 Ultra",
            variantName: "Mac Pro M2 Ultra 192GB/4TB (Rack)",
            color: "Silver",
            capacity: "192GB/4TB",
            price: 299990000,
            stock: 4,
            sku: "MP-M2U-192-4T-R",
          }, // Giữ từ data gốc, sửa price cho hợp lý
          {
            name: "Mac Pro M2 Ultra",
            variantName: "Mac Pro M2 Ultra 128GB/8TB (Rack)",
            color: "Silver",
            capacity: "128GB/8TB",
            price: 309990000,
            stock: 3,
            sku: "MP-M2U-128-8T-R",
          },
        ],
      },

      // iPad Products
      {
        name: "iPad Pro M4",
        description:
          "iPad Pro with M4 chip, incredibly thin and powerful. Features Tandem OLED display.",
        category: iPadProCategory ? iPadProCategory._id : null,
        isNewArrival: true,
        isBestSeller: true,
        image:
          "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/f/r/frame_100_1_2__3.png",
        variants: [
          // 11-inch M4
          {
            name: "iPad Pro M4",
            variantName: "iPad Pro 11-inch M4 256GB - Space Black - Wi-Fi",
            color: "Space Black",
            capacity: "256GB",
            price: 28990000,
            stock: 120,
            sku: "IPADPRO-M4-11-256-SB-W",
          },
          {
            name: "iPad Pro M4",
            variantName:
              "iPad Pro 11-inch M4 256GB - Silver - Wi-Fi + Cellular",
            color: "Silver",
            capacity: "256GB",
            price: 33990000,
            stock: 100,
            sku: "IPADPRO-M4-11-256-SV-WC",
          },
          {
            name: "iPad Pro M4",
            variantName: "iPad Pro 11-inch M4 512GB - Space Black - Wi-Fi",
            color: "Space Black",
            capacity: "512GB",
            price: 33990000,
            stock: 90,
            sku: "IPADPRO-M4-11-512-SB-W",
          },
          {
            name: "iPad Pro M4",
            variantName: "iPad Pro 11-inch M4 1TB - Silver - Wi-Fi + Cellular",
            color: "Silver",
            capacity: "1TB",
            price: 47990000,
            stock: 70,
            sku: "IPADPRO-M4-11-1T-SV-WC",
          },
          // 13-inch M4
          {
            name: "iPad Pro M4",
            variantName: "iPad Pro 13-inch M4 256GB - Silver - Wi-Fi",
            color: "Silver",
            capacity: "256GB",
            price: 37990000,
            stock: 110,
            sku: "IPADPRO-M4-13-256-SV-W",
          },
          {
            name: "iPad Pro M4",
            variantName:
              "iPad Pro 13-inch M4 512GB - Space Black - Wi-Fi + Cellular",
            color: "Space Black",
            capacity: "512GB",
            price: 47990000,
            stock: 90,
            sku: "IPADPRO-M4-13-512-SB-WC",
          },
          {
            name: "iPad Pro M4",
            variantName: "iPad Pro 13-inch M4 1TB - Silver - Wi-Fi",
            color: "Silver",
            capacity: "1TB",
            price: 51990000,
            stock: 60,
            sku: "IPADPRO-M4-13-1T-SV-W",
          },
          {
            name: "iPad Pro M4",
            variantName:
              "iPad Pro 13-inch M4 2TB - Space Black - Wi-Fi + Cellular",
            color: "Space Black",
            capacity: "2TB",
            price: 65990000,
            stock: 40,
            sku: "IPADPRO-M4-13-2T-SB-WC",
          },
        ],
      },
      {
        name: "iPad Pro M2",
        description:
          "iPad Pro with M2 chip, powerful performance for professionals.",
        category: iPadProCategory ? iPadProCategory._id : null,
        isNewArrival: false,
        isBestSeller: true,
        image:
          "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/ipad-pro-11-select-cell-spacegray-202210?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1664411149097",
        variants: [
          {
            name: "iPad Pro M2",
            variantName: "iPad Pro 11-inch M2 128GB - Space Gray - Wi-Fi",
            color: "Space Gray",
            capacity: "128GB",
            price: 21990000,
            stock: 150,
            sku: "IPADPRO-M2-11-128-SG-W",
          },
          {
            name: "iPad Pro M2",
            variantName:
              "iPad Pro 11-inch M2 256GB - Silver - Wi-Fi + Cellular",
            color: "Silver",
            capacity: "256GB",
            price: 27990000,
            stock: 130,
            sku: "IPADPRO-M2-11-256-SV-WC",
          },
          {
            name: "iPad Pro M2",
            variantName: "iPad Pro 11-inch M2 512GB - Space Gray - Wi-Fi",
            color: "Space Gray",
            capacity: "512GB",
            price: 30990000,
            stock: 100,
            sku: "IPADPRO-M2-11-512-SG-W",
          },
          {
            name: "iPad Pro M2",
            variantName: "iPad Pro 12.9-inch M2 128GB - Silver - Wi-Fi",
            color: "Silver",
            capacity: "128GB",
            price: 28990000,
            stock: 140,
            sku: "IPADPRO-M2-129-128-SV-W",
          },
          {
            name: "iPad Pro M2",
            variantName:
              "iPad Pro 12.9-inch M2 256GB - Space Gray - Wi-Fi + Cellular",
            color: "Space Gray",
            capacity: "256GB",
            price: 36990000,
            stock: 110,
            sku: "IPADPRO-M2-129-256-SG-WC",
          },
          {
            name: "iPad Pro M2",
            variantName: "iPad Pro 12.9-inch M2 1TB - Silver - Wi-Fi",
            color: "Silver",
            capacity: "1TB",
            price: 45990000,
            stock: 80,
            sku: "IPADPRO-M2-129-1T-SV-W",
          },
        ],
      },
      {
        name: "iPad Pro M1",
        description: "iPad Pro with the groundbreaking M1 chip.",
        category: iPadProCategory ? iPadProCategory._id : null,
        isNewArrival: false,
        isBestSeller: false,
        image:
          "https://th.bing.com/th/id/OIP.OQNvxV8z2NiuN3q-fjeroQHaHa?r=0&rs=1&pid=ImgDetMain&cb=idpwebp2&o=7&rm=3",
        variants: [
          {
            name: "iPad Pro M1",
            variantName: "iPad Pro 11-inch M1 128GB - Space Gray - Wi-Fi",
            color: "Space Gray",
            capacity: "128GB",
            price: 18990000,
            stock: 100,
            sku: "IPADPRO-M1-11-128-SG-W",
          },
          {
            name: "iPad Pro M1",
            variantName:
              "iPad Pro 11-inch M1 256GB - Silver - Wi-Fi + Cellular",
            color: "Silver",
            capacity: "256GB",
            price: 24990000,
            stock: 90,
            sku: "IPADPRO-M1-11-256-SV-WC",
          },
          {
            name: "iPad Pro M1",
            variantName: "iPad Pro 12.9-inch M1 128GB - Space Gray - Wi-Fi",
            color: "Space Gray",
            capacity: "128GB",
            price: 25990000,
            stock: 80,
            sku: "IPADPRO-M1-129-128-SG-W",
          },
          {
            name: "iPad Pro M1",
            variantName:
              "iPad Pro 12.9-inch M1 512GB - Silver - Wi-Fi + Cellular",
            color: "Silver",
            capacity: "512GB",
            price: 34990000,
            stock: 60,
            sku: "IPADPRO-M1-129-512-SV-WC",
          },
        ],
      },

      // --- iPad Air Category ---
      {
        name: "iPad Air M3", // Sửa lại từ dữ liệu gốc, đảm bảo đây là M3
        description:
          "iPad Air with the powerful M3 chip, incredibly versatile and colorful.",
        category: iPadAirCategory ? iPadAirCategory._id : null,
        isNewArrival: true,
        isBestSeller: false, // Giữ nguyên từ data gốc
        image:
          "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/ipad-air-11-wifi-1.jpg",
        variants: [
          // 11-inch M3
          {
            name: "iPad Air M3",
            variantName: "iPad Air 11-inch M3 128GB - Blue - Wi-Fi",
            color: "Blue",
            capacity: "128GB",
            price: 16990000,
            stock: 180,
            sku: "IPADAIR-M3-11-128-BL-W",
          },
          {
            name: "iPad Air M3",
            variantName:
              "iPad Air 11-inch M3 128GB - Starlight - Wi-Fi + Cellular",
            color: "Starlight",
            capacity: "128GB",
            price: 20990000,
            stock: 150,
            sku: "IPADAIR-M3-11-128-SL-WC",
          },
          {
            name: "iPad Air M3",
            variantName: "iPad Air 11-inch M3 256GB - Space Gray - Wi-Fi",
            color: "Space Gray",
            capacity: "256GB",
            price: 19990000,
            stock: 140,
            sku: "IPADAIR-M3-11-256-SG-W",
          },
          {
            name: "iPad Air M3",
            variantName:
              "iPad Air 11-inch M3 512GB - Purple - Wi-Fi + Cellular",
            color: "Purple",
            capacity: "512GB",
            price: 26990000,
            stock: 100,
            sku: "IPADAIR-M3-11-512-PU-WC",
          },
          // 13-inch M3
          {
            name: "iPad Air M3",
            variantName: "iPad Air 13-inch M3 128GB - Starlight - Wi-Fi",
            color: "Starlight",
            capacity: "128GB",
            price: 20990000,
            stock: 140,
            sku: "IPADAIR-M3-13-128-SL-W",
          },
          {
            name: "iPad Air M3",
            variantName: "iPad Air 13-inch M3 256GB - Blue - Wi-Fi + Cellular",
            color: "Blue",
            capacity: "256GB",
            price: 27990000,
            stock: 120,
            sku: "IPADAIR-M3-13-256-BL-WC",
          },
          {
            name: "iPad Air M3",
            variantName: "iPad Air 13-inch M3 512GB - Space Gray - Wi-Fi",
            color: "Space Gray",
            capacity: "512GB",
            price: 26990000,
            stock: 90,
            sku: "IPADAIR-M3-13-512-SG-W",
          },
          {
            name: "iPad Air M3",
            variantName: "iPad Air 13-inch M3 1TB - Purple - Wi-Fi + Cellular",
            color: "Purple",
            capacity: "1TB",
            price: 33990000,
            stock: 70,
            sku: "IPADAIR-M3-13-1T-PU-WC",
          },
        ],
      },
      {
        name: "iPad Air M2",
        description:
          "iPad Air with the powerful M2 chip, a leap in performance.",
        category: iPadAirCategory ? iPadAirCategory._id : null,
        isNewArrival: false, // M3 is newer
        isBestSeller: true,
        image:
          "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/ipad-air-6-m2-11-inch-5g_1.jpg", // Placeholder for M2 Air, update if needed
        variants: [
          {
            name: "iPad Air M2",
            variantName: "iPad Air 11-inch M2 128GB - Blue - Wi-Fi",
            color: "Blue",
            capacity: "128GB",
            price: 15990000,
            stock: 200,
            sku: "IPADAIR-M2-11-128-BL-W",
          },
          {
            name: "iPad Air M2",
            variantName:
              "iPad Air 11-inch M2 256GB - Starlight - Wi-Fi + Cellular",
            color: "Starlight",
            capacity: "256GB",
            price: 21990000,
            stock: 170,
            sku: "IPADAIR-M2-11-256-SL-WC",
          },
          {
            name: "iPad Air M2",
            variantName: "iPad Air 13-inch M2 128GB - Space Gray - Wi-Fi",
            color: "Space Gray",
            capacity: "128GB",
            price: 19990000,
            stock: 160,
            sku: "IPADAIR-M2-13-128-SG-W",
          },
          {
            name: "iPad Air M2",
            variantName:
              "iPad Air 13-inch M2 256GB - Purple - Wi-Fi + Cellular",
            color: "Purple",
            capacity: "256GB",
            price: 25990000,
            stock: 130,
            sku: "IPADAIR-M2-13-256-PU-WC",
          },
        ],
      },
      {
        name: "iPad Air 5 (M1)",
        description:
          "iPad Air (5th generation) with M1 chip, supercharged by M1.",
        category: iPadAirCategory ? iPadAirCategory._id : null,
        isNewArrival: false,
        isBestSeller: true,
        image:
          "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/ipad-air-select-wifi-purple-202203?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1645066002620",
        variants: [
          {
            name: "iPad Air 5 (M1)",
            variantName: "iPad Air 5 64GB - Space Gray - Wi-Fi",
            color: "Space Gray",
            capacity: "64GB",
            price: 13990000,
            stock: 250,
            sku: "IPADAIR5-M1-64-SG-W",
          },
          {
            name: "iPad Air 5 (M1)",
            variantName: "iPad Air 5 64GB - Starlight - Wi-Fi + Cellular",
            color: "Starlight",
            capacity: "64GB",
            price: 17990000,
            stock: 220,
            sku: "IPADAIR5-M1-64-SL-WC",
          },
          {
            name: "iPad Air 5 (M1)",
            variantName: "iPad Air 5 256GB - Pink - Wi-Fi",
            color: "Pink",
            capacity: "256GB",
            price: 17490000,
            stock: 200,
            sku: "IPADAIR5-M1-256-PK-W",
          },
          {
            name: "iPad Air 5 (M1)",
            variantName: "iPad Air 5 256GB - Blue - Wi-Fi + Cellular",
            color: "Blue",
            capacity: "256GB",
            price: 21490000,
            stock: 180,
            sku: "IPADAIR5-M1-256-BL-WC",
          },
          {
            name: "iPad Air 5 (M1)",
            variantName: "iPad Air 5 64GB - Purple - Wi-Fi",
            color: "Purple",
            capacity: "64GB",
            price: 13990000,
            stock: 190,
            sku: "IPADAIR5-M1-64-PU-W",
          },
        ],
      },

      // --- iPad mini Category ---
      {
        name: "iPad mini 7",
        description:
          "iPad mini 7, compact and powerful. Small in size, big on capability.",
        category: iPadMiniCategory ? iPadMiniCategory._id : null,
        isNewArrival: false, // Giữ nguyên từ data gốc
        isBestSeller: true, // Giữ nguyên từ data gốc
        image:
          "https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/522/331229/ipad-mini-7-wifi-blue-1-638651175208934105-750x500.jpg", // Ảnh này ghi mini 7
        variants: [
          {
            name: "iPad mini 7",
            variantName: "iPad mini 7 64GB - Space Gray - Wi-Fi",
            color: "Space Gray",
            capacity: "64GB",
            price: 12990000,
            stock: 200,
            sku: "IPADMINI7-64-SG-W",
          },
          {
            name: "iPad mini 7",
            variantName: "iPad mini 7 64GB - Starlight - Wi-Fi + Cellular",
            color: "Starlight",
            capacity: "64GB",
            price: 16990000,
            stock: 180,
            sku: "IPADMINI7-64-SL-WC",
          },
          {
            name: "iPad mini 7",
            variantName: "iPad mini 7 256GB - Pink - Wi-Fi",
            color: "Pink",
            capacity: "256GB",
            price: 16990000,
            stock: 150,
            sku: "IPADMINI7-256-PK-W",
          },
          {
            name: "iPad mini 7",
            variantName: "iPad mini 7 256GB - Purple - Wi-Fi + Cellular",
            color: "Purple",
            capacity: "256GB",
            price: 20990000,
            stock: 130,
            sku: "IPADMINI7-256-PU-WC",
          },
          {
            name: "iPad mini 7",
            variantName: "iPad mini 7 128GB - Space Gray - Wi-Fi",
            color: "Space Gray",
            capacity: "128GB",
            price: 14990000,
            stock: 160,
            sku: "IPADMINI7-128-SG-W",
          }, // Thêm tùy chọn 128GB
          {
            name: "iPad mini 7",
            variantName: "iPad mini 7 128GB - Pink - Wi-Fi + Cellular",
            color: "Pink",
            capacity: "128GB",
            price: 18990000,
            stock: 140,
            sku: "IPADMINI7-128-PK-WC",
          },
        ],
      },
      {
        name: "iPad mini 6",
        description:
          "iPad mini (6th generation) with A15 Bionic chip. Mega power. Mini sized.",
        category: iPadMiniCategory ? iPadMiniCategory._id : null,
        isNewArrival: false,
        isBestSeller: true,
        image:
          "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/ipad-mini-select-wifi-purple-202109?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1629840735000",
        variants: [
          {
            name: "iPad mini 6",
            variantName: "iPad mini 6 64GB - Space Gray - Wi-Fi",
            color: "Space Gray",
            capacity: "64GB",
            price: 11990000,
            stock: 220,
            sku: "IPADMINI6-A15-64-SG-W",
          },
          {
            name: "iPad mini 6",
            variantName: "iPad mini 6 64GB - Starlight - Wi-Fi + Cellular",
            color: "Starlight",
            capacity: "64GB",
            price: 15990000,
            stock: 190,
            sku: "IPADMINI6-A15-64-SL-WC",
          },
          {
            name: "iPad mini 6",
            variantName: "iPad mini 6 256GB - Pink - Wi-Fi",
            color: "Pink",
            capacity: "256GB",
            price: 15490000,
            stock: 170,
            sku: "IPADMINI6-A15-256-PK-W",
          },
          {
            name: "iPad mini 6",
            variantName: "iPad mini 6 256GB - Purple - Wi-Fi + Cellular",
            color: "Purple",
            capacity: "256GB",
            price: 19490000,
            stock: 150,
            sku: "IPADMINI6-A15-256-PU-WC",
          },
        ],
      },
      {
        name: "iPad mini 5",
        description:
          "iPad mini (5th generation) with A12 Bionic chip. Mini just got mightier.",
        category: iPadMiniCategory ? iPadMiniCategory._id : null,
        isNewArrival: false,
        isBestSeller: false,
        image:
          "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/p/apple-ipad-mini-5-wifi-64-gb-2.jpg",
        variants: [
          {
            name: "iPad mini 5",
            variantName: "iPad mini 5 64GB - Space Gray - Wi-Fi",
            color: "Space Gray",
            capacity: "64GB",
            price: 8990000,
            stock: 150,
            sku: "IPADMINI5-A12-64-SG-W",
          },
          {
            name: "iPad mini 5",
            variantName: "iPad mini 5 64GB - Silver - Wi-Fi + Cellular",
            color: "Silver",
            capacity: "64GB",
            price: 11990000,
            stock: 120,
            sku: "IPADMINI5-A12-64-SV-WC",
          },
          {
            name: "iPad mini 5",
            variantName: "iPad mini 5 256GB - Gold - Wi-Fi",
            color: "Gold",
            capacity: "256GB",
            price: 11490000,
            stock: 100,
            sku: "IPADMINI5-A12-256-GD-W",
          },
        ],
      },

      // iPhone Products
      {
        name: "iPhone 15 Pro Max", // Sửa từ iPhone 16 Pro Max để khớp SKU và thực tế
        description:
          "iPhone 15 Pro Max with A17 Pro chip and advanced Pro camera system. Titanium design.",
        category: iPhoneProMaxCategory ? iPhoneProMaxCategory._id : null,
        isNewArrival: true,
        isBestSeller: true,
        image:
          "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_2__5_2_1_1.jpg", // Ảnh iPhone 15 Pro Max
        variants: [
          {
            name: "iPhone 15 Pro Max",
            variantName: "iPhone 15 Pro Max 256GB - Natural Titanium",
            color: "Natural Titanium",
            capacity: "256GB",
            price: 33990000,
            stock: 100,
            sku: "IP15PM-256-NT",
          },
          {
            name: "iPhone 15 Pro Max",
            variantName: "iPhone 15 Pro Max 256GB - Blue Titanium",
            color: "Blue Titanium",
            capacity: "256GB",
            price: 33990000,
            stock: 90,
            sku: "IP15PM-256-BT",
          },
          {
            name: "iPhone 15 Pro Max",
            variantName: "iPhone 15 Pro Max 256GB - White Titanium",
            color: "White Titanium",
            capacity: "256GB",
            price: 33990000,
            stock: 80,
            sku: "IP15PM-256-WT",
          },
          {
            name: "iPhone 15 Pro Max",
            variantName: "iPhone 15 Pro Max 512GB - Black Titanium",
            color: "Black Titanium",
            capacity: "512GB",
            price: 38990000,
            stock: 70,
            sku: "IP15PM-512-BKT",
          }, // Sửa BLT thành BKT cho Black Titanium
          {
            name: "iPhone 15 Pro Max",
            variantName: "iPhone 15 Pro Max 512GB - Natural Titanium",
            color: "Natural Titanium",
            capacity: "512GB",
            price: 38990000,
            stock: 60,
            sku: "IP15PM-512-NT",
          },
          {
            name: "iPhone 15 Pro Max",
            variantName: "iPhone 15 Pro Max 1TB - Blue Titanium",
            color: "Blue Titanium",
            capacity: "1TB",
            price: 44990000,
            stock: 40,
            sku: "IP15PM-1T-BT",
          },
          {
            name: "iPhone 15 Pro Max",
            variantName: "iPhone 15 Pro Max 1TB - White Titanium",
            color: "White Titanium",
            capacity: "1TB",
            price: 44990000,
            stock: 30,
            sku: "IP15PM-1T-WT",
          },
        ],
      },
      {
        name: "iPhone 14 Pro Max",
        description:
          "iPhone 14 Pro Max with A16 Bionic chip, Dynamic Island, and Pro camera system.",
        category: iPhoneProMaxCategory ? iPhoneProMaxCategory._id : null,
        isNewArrival: false,
        isBestSeller: true,
        image:
          "https://cdn.tgdd.vn/Products/Images/42/251192/iphone-14-pro-max-tim-thumb-600x600.jpg",
        variants: [
          {
            name: "iPhone 14 Pro Max",
            variantName: "iPhone 14 Pro Max 128GB - Deep Purple",
            color: "Deep Purple",
            capacity: "128GB",
            price: 27990000,
            stock: 120,
            sku: "IP14PM-128-DP",
          },
          {
            name: "iPhone 14 Pro Max",
            variantName: "iPhone 14 Pro Max 256GB - Gold",
            color: "Gold",
            capacity: "256GB",
            price: 30990000,
            stock: 110,
            sku: "IP14PM-256-GD",
          },
          {
            name: "iPhone 14 Pro Max",
            variantName: "iPhone 14 Pro Max 256GB - Space Black",
            color: "Space Black",
            capacity: "256GB",
            price: 30990000,
            stock: 100,
            sku: "IP14PM-256-SB",
          },
          {
            name: "iPhone 14 Pro Max",
            variantName: "iPhone 14 Pro Max 512GB - Silver",
            color: "Silver",
            capacity: "512GB",
            price: 35990000,
            stock: 80,
            sku: "IP14PM-512-SV",
          },
          {
            name: "iPhone 14 Pro Max",
            variantName: "iPhone 14 Pro Max 1TB - Deep Purple",
            color: "Deep Purple",
            capacity: "1TB",
            price: 40990000,
            stock: 50,
            sku: "IP14PM-1T-DP",
          },
        ],
      },
      {
        name: "iPhone 13 Pro Max",
        description:
          "iPhone 13 Pro Max with A15 Bionic chip, ProMotion display, and significant camera upgrades.",
        category: iPhoneProMaxCategory ? iPhoneProMaxCategory._id : null,
        isNewArrival: false,
        isBestSeller: false,
        image:
          "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-13-pro-max-256gb-cu-dep.2.png",
        variants: [
          {
            name: "iPhone 13 Pro Max",
            variantName: "iPhone 13 Pro Max 128GB - Sierra Blue",
            color: "Sierra Blue",
            capacity: "128GB",
            price: 23990000,
            stock: 100,
            sku: "IP13PM-128-SB",
          },
          {
            name: "iPhone 13 Pro Max",
            variantName: "iPhone 13 Pro Max 256GB - Graphite",
            color: "Graphite",
            capacity: "256GB",
            price: 26990000,
            stock: 90,
            sku: "IP13PM-256-GR",
          },
          {
            name: "iPhone 13 Pro Max",
            variantName: "iPhone 13 Pro Max 512GB - Gold",
            color: "Gold",
            capacity: "512GB",
            price: 30990000,
            stock: 70,
            sku: "IP13PM-512-GD",
          },
          {
            name: "iPhone 13 Pro Max",
            variantName: "iPhone 13 Pro Max 1TB - Alpine Green",
            color: "Alpine Green",
            capacity: "1TB",
            price: 34990000,
            stock: 40,
            sku: "IP13PM-1T-AG",
          },
        ],
      },

      // --- iPhone Pro Category ---
      {
        name: "iPhone 15 Pro", // Sửa từ iPhone 16 Pro
        description:
          "iPhone 15 Pro with A17 Pro chip and Pro camera system. Titanium design.",
        category: iPhoneProCategory ? iPhoneProCategory._id : null,
        isNewArrival: true,
        isBestSeller: true,
        image:
          "https://cdn.tgdd.vn/Products/Images/42/299033/iphone-15-pro-blue-thumbnew-600x600.jpg", // Ảnh iPhone 15 Pro
        variants: [
          {
            name: "iPhone 15 Pro",
            variantName: "iPhone 15 Pro 128GB - Natural Titanium",
            color: "Natural Titanium",
            capacity: "128GB",
            price: 28990000,
            stock: 120,
            sku: "IP15P-128-NT",
          },
          {
            name: "iPhone 15 Pro",
            variantName: "iPhone 15 Pro 128GB - White Titanium",
            color: "White Titanium",
            capacity: "128GB",
            price: 28990000,
            stock: 110,
            sku: "IP15P-128-WT",
          },
          {
            name: "iPhone 15 Pro",
            variantName: "iPhone 15 Pro 256GB - Blue Titanium",
            color: "Blue Titanium",
            capacity: "256GB",
            price: 31990000,
            stock: 90,
            sku: "IP15P-256-BT",
          },
          {
            name: "iPhone 15 Pro",
            variantName: "iPhone 15 Pro 256GB - Black Titanium",
            color: "Black Titanium",
            capacity: "256GB",
            price: 31990000,
            stock: 80,
            sku: "IP15P-256-BKT",
          },
          {
            name: "iPhone 15 Pro",
            variantName: "iPhone 15 Pro 512GB - Natural Titanium",
            color: "Natural Titanium",
            capacity: "512GB",
            price: 36990000,
            stock: 60,
            sku: "IP15P-512-NT",
          },
          {
            name: "iPhone 15 Pro",
            variantName: "iPhone 15 Pro 1TB - White Titanium",
            color: "White Titanium",
            capacity: "1TB",
            price: 42990000,
            stock: 40,
            sku: "IP15P-1T-WT",
          },
        ],
      },
      {
        name: "iPhone 14 Pro",
        description:
          "iPhone 14 Pro with A16 Bionic chip, Dynamic Island, and an amazing camera.",
        category: iPhoneProCategory ? iPhoneProCategory._id : null,
        isNewArrival: false,
        isBestSeller: true,
        image:
          "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-14-pro-max-256gb.png",
        variants: [
          {
            name: "iPhone 14 Pro",
            variantName: "iPhone 14 Pro 128GB - Space Black",
            color: "Space Black",
            capacity: "128GB",
            price: 24990000,
            stock: 140,
            sku: "IP14P-128-SB",
          },
          {
            name: "iPhone 14 Pro",
            variantName: "iPhone 14 Pro 256GB - Deep Purple",
            color: "Deep Purple",
            capacity: "256GB",
            price: 27990000,
            stock: 120,
            sku: "IP14P-256-DP",
          },
          {
            name: "iPhone 14 Pro",
            variantName: "iPhone 14 Pro 256GB - Silver",
            color: "Silver",
            capacity: "256GB",
            price: 27990000,
            stock: 110,
            sku: "IP14P-256-SV",
          },
          {
            name: "iPhone 14 Pro",
            variantName: "iPhone 14 Pro 512GB - Gold",
            color: "Gold",
            capacity: "512GB",
            price: 32990000,
            stock: 90,
            sku: "IP14P-512-GD",
          },
          {
            name: "iPhone 14 Pro",
            variantName: "iPhone 14 Pro 1TB - Space Black",
            color: "Space Black",
            capacity: "1TB",
            price: 37990000,
            stock: 60,
            sku: "IP14P-1T-SB",
          },
        ],
      },
      {
        name: "iPhone 13 Pro",
        description:
          "iPhone 13 Pro with A15 Bionic chip, ProMotion, and cinematic mode.",
        category: iPhoneProCategory ? iPhoneProCategory._id : null,
        isNewArrival: false,
        isBestSeller: false,
        image:
          "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-13-pro-max.png",
        variants: [
          {
            name: "iPhone 13 Pro",
            variantName: "iPhone 13 Pro 128GB - Graphite",
            color: "Graphite",
            capacity: "128GB",
            price: 20990000,
            stock: 110,
            sku: "IP13P-128-GR",
          },
          {
            name: "iPhone 13 Pro",
            variantName: "iPhone 13 Pro 256GB - Sierra Blue",
            color: "Sierra Blue",
            capacity: "256GB",
            price: 23990000,
            stock: 100,
            sku: "IP13P-256-SB",
          },
          {
            name: "iPhone 13 Pro",
            variantName: "iPhone 13 Pro 512GB - Silver",
            color: "Silver",
            capacity: "512GB",
            price: 27990000,
            stock: 80,
            sku: "IP13P-512-SV",
          },
          {
            name: "iPhone 13 Pro",
            variantName: "iPhone 13 Pro 1TB - Alpine Green",
            color: "Alpine Green",
            capacity: "1TB",
            price: 31990000,
            stock: 50,
            sku: "IP13P-1T-AG",
          },
        ],
      },

      // --- iPhone Standard Category ---
      {
        name: "iPhone 15", // Sửa từ iPhone 16
        description:
          "iPhone 15 with Dynamic Island, A16 Bionic chip, and an advanced dual-camera system.",
        category: iPhoneStandardCategory ? iPhoneStandardCategory._id : null,
        isNewArrival: true,
        isBestSeller: false,
        image:
          "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-plus_1__1.png", // Ảnh iPhone 15
        variants: [
          {
            name: "iPhone 15",
            variantName: "iPhone 15 128GB - Pink",
            color: "Pink",
            capacity: "128GB",
            price: 22990000,
            stock: 150,
            sku: "IP15-128-PK",
          },
          {
            name: "iPhone 15",
            variantName: "iPhone 15 128GB - Blue",
            color: "Blue",
            capacity: "128GB",
            price: 22990000,
            stock: 140,
            sku: "IP15-128-BL",
          },
          {
            name: "iPhone 15",
            variantName: "iPhone 15 256GB - Green",
            color: "Green",
            capacity: "256GB",
            price: 25990000,
            stock: 120,
            sku: "IP15-256-GR",
          },
          {
            name: "iPhone 15",
            variantName: "iPhone 15 256GB - Black",
            color: "Black",
            capacity: "256GB",
            price: 25990000,
            stock: 110,
            sku: "IP15-256-BK",
          },
          {
            name: "iPhone 15",
            variantName: "iPhone 15 512GB - Yellow",
            color: "Yellow",
            capacity: "512GB",
            price: 30990000,
            stock: 90,
            sku: "IP15-512-YL",
          },
          {
            name: "iPhone 15 Plus",
            variantName: "iPhone 15 Plus 128GB - Pink",
            color: "Pink",
            capacity: "128GB",
            price: 25990000,
            stock: 100,
            sku: "IP15PLS-128-PK",
          }, // Thêm bản Plus
          {
            name: "iPhone 15 Plus",
            variantName: "iPhone 15 Plus 256GB - Green",
            color: "Green",
            capacity: "256GB",
            price: 28990000,
            stock: 80,
            sku: "IP15PLS-256-GR",
          },
        ],
      },
      {
        name: "iPhone 14",
        description:
          "iPhone 14 with A15 Bionic chip, an impressive dual-camera system, and safety features.",
        category: iPhoneStandardCategory ? iPhoneStandardCategory._id : null,
        isNewArrival: false,
        isBestSeller: true,
        image:
          "https://onewaymobile.vn/images/products/2023/06/14/original/14-1-5_1662619052_1686739367.png",
        variants: [
          {
            name: "iPhone 14",
            variantName: "iPhone 14 128GB - Blue",
            color: "Blue",
            capacity: "128GB",
            price: 19990000,
            stock: 180,
            sku: "IP14-128-BL",
          },
          {
            name: "iPhone 14",
            variantName: "iPhone 14 128GB - Purple",
            color: "Purple",
            capacity: "128GB",
            price: 19990000,
            stock: 170,
            sku: "IP14-128-PU",
          },
          {
            name: "iPhone 14",
            variantName: "iPhone 14 256GB - Midnight",
            color: "Midnight",
            capacity: "256GB",
            price: 22990000,
            stock: 150,
            sku: "IP14-256-MN",
          },
          {
            name: "iPhone 14",
            variantName: "iPhone 14 256GB - Starlight",
            color: "Starlight",
            capacity: "256GB",
            price: 22990000,
            stock: 140,
            sku: "IP14-256-SL",
          },
          {
            name: "iPhone 14",
            variantName: "iPhone 14 512GB - (PRODUCT)RED",
            color: "(PRODUCT)RED",
            capacity: "512GB",
            price: 26990000,
            stock: 100,
            sku: "IP14-512-RD",
          },
          {
            name: "iPhone 14 Plus",
            variantName: "iPhone 14 Plus 128GB - Yellow",
            color: "Yellow",
            capacity: "128GB",
            price: 22990000,
            stock: 120,
            sku: "IP14PLS-128-YL",
          },
          {
            name: "iPhone 14 Plus",
            variantName: "iPhone 14 Plus 256GB - Blue",
            color: "Blue",
            capacity: "256GB",
            price: 25990000,
            stock: 100,
            sku: "IP14PLS-256-BL",
          },
        ],
      },
      {
        name: "iPhone 13",
        description:
          "iPhone 13 with A15 Bionic chip, the most advanced dual-camera system ever on iPhone.",
        category: iPhoneStandardCategory ? iPhoneStandardCategory._id : null,
        isNewArrival: false,
        isBestSeller: false,
        image:
          "https://cdn.tgdd.vn/Products/Images/42/223602/iphone-13-pink-2-600x600.jpg",
        variants: [
          {
            name: "iPhone 13",
            variantName: "iPhone 13 128GB - Pink",
            color: "Pink",
            capacity: "128GB",
            price: 16990000,
            stock: 200,
            sku: "IP13-128-PK",
          },
          {
            name: "iPhone 13",
            variantName: "iPhone 13 128GB - Blue",
            color: "Blue",
            capacity: "128GB",
            price: 16990000,
            stock: 190,
            sku: "IP13-128-BL",
          },
          {
            name: "iPhone 13",
            variantName: "iPhone 13 256GB - Midnight",
            color: "Midnight",
            capacity: "256GB",
            price: 19990000,
            stock: 170,
            sku: "IP13-256-MN",
          },
          {
            name: "iPhone 13",
            variantName: "iPhone 13 512GB - Starlight",
            color: "Starlight",
            capacity: "512GB",
            price: 23990000,
            stock: 130,
            sku: "IP13-512-SL",
          },
          {
            name: "iPhone 13 mini",
            variantName: "iPhone 13 mini 128GB - Green",
            color: "Green",
            capacity: "128GB",
            price: 15990000,
            stock: 100,
            sku: "IP13MINI-128-GR",
          }, // Thêm bản Mini
        ],
      },

      // --- iPhone SE Category ---
      {
        name: "iPhone SE (3rd generation)", // iPhone SE 2022
        description:
          "iPhone SE (3rd generation) with A15 Bionic chip, powerful and affordable.",
        category: iPhoneSECategory ? iPhoneSECategory._id : null,
        isNewArrival: false,
        isBestSeller: true,
        image:
          "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/1/_/1_359_1.png",
        variants: [
          {
            name: "iPhone SE (3rd generation)",
            variantName: "iPhone SE (3rd gen) 64GB - Midnight",
            color: "Midnight",
            capacity: "64GB",
            price: 10990000,
            stock: 200,
            sku: "IPSE3-64-MN",
          }, // Sửa SKU
          {
            name: "iPhone SE (3rd generation)",
            variantName: "iPhone SE (3rd gen) 64GB - Starlight",
            color: "Starlight",
            capacity: "64GB",
            price: 10990000,
            stock: 190,
            sku: "IPSE3-64-SL",
          },
          {
            name: "iPhone SE (3rd generation)",
            variantName: "iPhone SE (3rd gen) 128GB - (PRODUCT)RED",
            color: "(PRODUCT)RED",
            capacity: "128GB",
            price: 12990000,
            stock: 180,
            sku: "IPSE3-128-RD",
          },
          {
            name: "iPhone SE (3rd generation)",
            variantName: "iPhone SE (3rd gen) 128GB - Midnight",
            color: "Midnight",
            capacity: "128GB",
            price: 12990000,
            stock: 170,
            sku: "IPSE3-128-MN",
          },
          {
            name: "iPhone SE (3rd generation)",
            variantName: "iPhone SE (3rd gen) 256GB - Starlight",
            color: "Starlight",
            capacity: "256GB",
            price: 15990000,
            stock: 150,
            sku: "IPSE3-256-SL",
          },
        ],
      },
      {
        name: "iPhone SE (2nd generation)", // iPhone SE 2020
        description:
          "iPhone SE (2nd generation) with A13 Bionic chip. Lots to love. Less to spend.",
        category: iPhoneSECategory ? iPhoneSECategory._id : null,
        isNewArrival: false,
        isBestSeller: false,
        image:
          "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-se-white-select-2020?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1586574261670",
        variants: [
          {
            name: "iPhone SE (2nd generation)",
            variantName: "iPhone SE (2nd gen) 64GB - Black",
            color: "Black",
            capacity: "64GB",
            price: 8990000,
            stock: 150,
            sku: "IPSE2-64-BK",
          },
          {
            name: "iPhone SE (2nd generation)",
            variantName: "iPhone SE (2nd gen) 128GB - White",
            color: "White",
            capacity: "128GB",
            price: 10490000,
            stock: 120,
            sku: "IPSE2-128-WH",
          },
          {
            name: "iPhone SE (2nd generation)",
            variantName: "iPhone SE (2nd gen) 256GB - (PRODUCT)RED",
            color: "(PRODUCT)RED",
            capacity: "256GB",
            price: 12490000,
            stock: 100,
            sku: "IPSE2-256-RD",
          },
        ],
      },

      // Watch Products
      {
        name: "Apple Watch Ultra 2",
        description:
          "Apple Watch Ultra 2 for extreme adventures. Brighter display, new S9 SiP.",
        category: appleWatchUltraCategory ? appleWatchUltraCategory._id : null,
        isNewArrival: true,
        isBestSeller: true,
        image:
          "https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/7077/329719/apple-watch-ultra-2-lte-49mm-vien-titanium-day-alpine-1-638616632586155895-750x500.jpg",
        variants: [
          {
            name: "Apple Watch Ultra 2",
            variantName: "Apple Watch Ultra 2 - Alpine Loop Blue (S/M)",
            color: "Titanium with Blue Alpine Loop",
            capacity: "GPS + Cellular",
            price: 21990000,
            stock: 80,
            sku: "AWU2-AL-BL-SM",
          },
          {
            name: "Apple Watch Ultra 2",
            variantName: "Apple Watch Ultra 2 - Alpine Loop Indigo (M/L)",
            color: "Titanium with Indigo Alpine Loop",
            capacity: "GPS + Cellular",
            price: 21990000,
            stock: 70,
            sku: "AWU2-AL-IN-ML",
          },
          {
            name: "Apple Watch Ultra 2",
            variantName: "Apple Watch Ultra 2 - Trail Loop Green/Gray (S/M)",
            color: "Titanium with Green/Gray Trail Loop",
            capacity: "GPS + Cellular",
            price: 21990000,
            stock: 60,
            sku: "AWU2-TL-GRGY-SM",
          },
          {
            name: "Apple Watch Ultra 2",
            variantName: "Apple Watch Ultra 2 - Trail Loop Orange/Beige (M/L)",
            color: "Titanium with Orange/Beige Trail Loop",
            capacity: "GPS + Cellular",
            price: 21990000,
            stock: 50,
            sku: "AWU2-TL-ORBE-ML",
          },
          {
            name: "Apple Watch Ultra 2",
            variantName: "Apple Watch Ultra 2 - Ocean Band White",
            color: "Titanium with White Ocean Band",
            capacity: "GPS + Cellular",
            price: 21990000,
            stock: 75,
            sku: "AWU2-OC-WH",
          },
          {
            name: "Apple Watch Ultra 2",
            variantName: "Apple Watch Ultra 2 - Ocean Band Orange",
            color: "Titanium with Orange Ocean Band",
            capacity: "GPS + Cellular",
            price: 21990000,
            stock: 65,
            sku: "AWU2-OC-OR",
          },
        ],
      },
      {
        name: "Apple Watch Ultra",
        description:
          "Apple Watch Ultra. The most rugged and capable Apple Watch ever.",
        category: appleWatchUltraCategory ? appleWatchUltraCategory._id : null,
        isNewArrival: false,
        isBestSeller: true,
        image:
          "https://th.bing.com/th/id/OIP.Sp0RSSi808SOJ68MB9tPsgHaHa?r=0&rs=1&pid=ImgDetMain&cb=idpwebp2&o=7&rm=3",
        variants: [
          {
            name: "Apple Watch Ultra",
            variantName: "Apple Watch Ultra - Alpine Loop Green (M)",
            color: "Titanium with Green Alpine Loop",
            capacity: "GPS + Cellular",
            price: 19990000,
            stock: 90,
            sku: "AWU1-AL-GR-M",
          },
          {
            name: "Apple Watch Ultra",
            variantName: "Apple Watch Ultra - Trail Loop Yellow/Beige (S/M)",
            color: "Titanium with Yellow/Beige Trail Loop",
            capacity: "GPS + Cellular",
            price: 19990000,
            stock: 80,
            sku: "AWU1-TL-YLBE-SM",
          },
          {
            name: "Apple Watch Ultra",
            variantName: "Apple Watch Ultra - Ocean Band Midnight",
            color: "Titanium with Midnight Ocean Band",
            capacity: "GPS + Cellular",
            price: 19990000,
            stock: 85,
            sku: "AWU1-OC-MN",
          },
        ],
      },
      // Apple Watch Ultra category chỉ có 2 thế hệ là đủ

      // --- Apple Watch Series Category ---
      {
        name: "Apple Watch Series 9", // Sửa từ Series 10 để khớp SKU và thực tế
        description:
          "Apple Watch Series 9, smarter, brighter, mightier. With S9 SiP and Double Tap gesture.",
        category: appleWatchSeriesCategory
          ? appleWatchSeriesCategory._id
          : null,
        isNewArrival: true,
        isBestSeller: true, // Series 9 là mới nhất và bán chạy
        image:
          "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/45-cell-alum-midnight-sport-loop-midnight-s9?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1693322852957", // Ảnh Series 9
        variants: [
          // Aluminum
          {
            name: "Apple Watch Series 9",
            variantName: "Apple Watch Series 9 41mm Aluminum - Midnight - GPS",
            color: "Midnight Aluminum",
            capacity: "GPS",
            price: 10490000,
            stock: 150,
            sku: "AWS9-41AL-MN-GPS",
          }, // Sửa SKU gốc
          {
            name: "Apple Watch Series 9",
            variantName:
              "Apple Watch Series 9 41mm Aluminum - Starlight - GPS + Cellular",
            color: "Starlight Aluminum",
            capacity: "GPS + Cellular",
            price: 13490000,
            stock: 120,
            sku: "AWS9-41AL-SL-CELL",
          },
          {
            name: "Apple Watch Series 9",
            variantName: "Apple Watch Series 9 45mm Aluminum - Silver - GPS",
            color: "Silver Aluminum",
            capacity: "GPS",
            price: 11290000,
            stock: 140,
            sku: "AWS9-45AL-SV-GPS",
          },
          {
            name: "Apple Watch Series 9",
            variantName:
              "Apple Watch Series 9 45mm Aluminum - (PRODUCT)RED - GPS + Cellular",
            color: "(PRODUCT)RED Aluminum",
            capacity: "GPS + Cellular",
            price: 14290000,
            stock: 100,
            sku: "AWS9-45AL-RD-CELL",
          }, // Sửa SKU gốc
          {
            name: "Apple Watch Series 9",
            variantName: "Apple Watch Series 9 41mm Aluminum - Pink - GPS",
            color: "Pink Aluminum",
            capacity: "GPS",
            price: 10490000,
            stock: 130,
            sku: "AWS9-41AL-PK-GPS",
          },
          // Stainless Steel
          {
            name: "Apple Watch Series 9",
            variantName:
              "Apple Watch Series 9 41mm Stainless Steel - Graphite - GPS + Cellular",
            color: "Graphite Stainless Steel",
            capacity: "GPS + Cellular",
            price: 18990000,
            stock: 70,
            sku: "AWS9-41SS-GR-CELL",
          },
          {
            name: "Apple Watch Series 9",
            variantName:
              "Apple Watch Series 9 45mm Stainless Steel - Gold - GPS + Cellular",
            color: "Gold Stainless Steel",
            capacity: "GPS + Cellular",
            price: 19790000,
            stock: 60,
            sku: "AWS9-45SS-GD-CELL",
          },
        ],
      },
      {
        name: "Apple Watch Series 8",
        description:
          "Apple Watch Series 8. A healthy leap ahead with temperature sensing and Crash Detection.",
        category: appleWatchSeriesCategory
          ? appleWatchSeriesCategory._id
          : null,
        isNewArrival: false,
        isBestSeller: true,
        image:
          "https://th.bing.com/th/id/OIP.YsWYUZkcIsaZ9vCXOYTAmQHaHa?r=0&rs=1&pid=ImgDetMain&cb=idpwebp2&o=7&rm=3",
        variants: [
          {
            name: "Apple Watch Series 8",
            variantName: "Apple Watch Series 8 41mm Aluminum - Midnight - GPS",
            color: "Midnight Aluminum",
            capacity: "GPS",
            price: 8990000,
            stock: 180,
            sku: "AWS8-41AL-MN-GPS",
          },
          {
            name: "Apple Watch Series 8",
            variantName:
              "Apple Watch Series 8 45mm Aluminum - Starlight - GPS + Cellular",
            color: "Starlight Aluminum",
            capacity: "GPS + Cellular",
            price: 11990000,
            stock: 150,
            sku: "AWS8-45AL-SL-CELL",
          },
          {
            name: "Apple Watch Series 8",
            variantName: "Apple Watch Series 8 41mm Aluminum - Silver - GPS",
            color: "Silver Aluminum",
            capacity: "GPS",
            price: 8990000,
            stock: 160,
            sku: "AWS8-41AL-SV-GPS",
          },
          {
            name: "Apple Watch Series 8",
            variantName:
              "Apple Watch Series 8 45mm Stainless Steel - Graphite - GPS + Cellular",
            color: "Graphite Stainless Steel",
            capacity: "GPS + Cellular",
            price: 16990000,
            stock: 80,
            sku: "AWS8-45SS-GR-CELL",
          },
        ],
      },
      {
        name: "Apple Watch SE (2nd generation)",
        description:
          "Apple Watch SE (2nd generation). A great deal to love. Essential features, now even better value.",
        category: appleWatchSeriesCategory
          ? appleWatchSeriesCategory._id
          : null, // SE vẫn thuộc dòng Series rộng hơn
        isNewArrival: false,
        isBestSeller: true,
        image:
          "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6519/6519486_sd.jpg",
        variants: [
          {
            name: "Apple Watch SE (2nd gen)",
            variantName:
              "Apple Watch SE (2nd gen) 40mm Aluminum - Midnight - GPS",
            color: "Midnight Aluminum",
            capacity: "GPS",
            price: 6390000,
            stock: 200,
            sku: "AWSE2-40AL-MN-GPS",
          },
          {
            name: "Apple Watch SE (2nd gen)",
            variantName:
              "Apple Watch SE (2nd gen) 40mm Aluminum - Starlight - GPS + Cellular",
            color: "Starlight Aluminum",
            capacity: "GPS + Cellular",
            price: 7890000,
            stock: 180,
            sku: "AWSE2-40AL-SL-CELL",
          },
          {
            name: "Apple Watch SE (2nd gen)",
            variantName:
              "Apple Watch SE (2nd gen) 44mm Aluminum - Silver - GPS",
            color: "Silver Aluminum",
            capacity: "GPS",
            price: 7190000,
            stock: 190,
            sku: "AWSE2-44AL-SV-GPS",
          },
          {
            name: "Apple Watch SE (2nd gen)",
            variantName:
              "Apple Watch SE (2nd gen) 44mm Aluminum - Midnight - GPS + Cellular",
            color: "Midnight Aluminum",
            capacity: "GPS + Cellular",
            price: 8690000,
            stock: 160,
            sku: "AWSE2-44AL-MN-CELL",
          },
        ],
      },

      // --- Vision Products ---
      {
        name: "Apple Vision Pro",
        description:
          "Apple Vision Pro, spatial computer. Welcome to the era of spatial computing.",
        category: visionProCategory ? visionProCategory._id : null,
        isNewArrival: true,
        isBestSeller: true,
        image:
          "https://cdn.tgdd.vn/Products/Images/13098/322918/apple-vision-pro-1-750x500.jpg",
        variants: [
          {
            name: "Apple Vision Pro",
            variantName: "Apple Vision Pro 256GB",
            color: "Silver with Light Seal",
            capacity: "256GB",
            price: 89990000,
            stock: 20,
            sku: "AVP-256",
          },
          {
            name: "Apple Vision Pro",
            variantName: "Apple Vision Pro 512GB",
            color: "Silver with Light Seal",
            capacity: "512GB",
            price: 95990000,
            stock: 15,
            sku: "AVP-512",
          },
          {
            name: "Apple Vision Pro",
            variantName: "Apple Vision Pro 1TB",
            color: "Silver with Light Seal",
            capacity: "1TB",
            price: 102990000,
            stock: 10,
            sku: "AVP-1T",
          }, // Thêm 1TB
          {
            name: "Apple Vision Pro",
            variantName:
              "Apple Vision Pro 256GB + Zeiss Optical Inserts (Readers)",
            color: "Silver with Light Seal",
            capacity: "256GB + Zeiss Readers",
            price: 93980000,
            stock: 8,
            sku: "AVP-256-ZR",
          }, // Thêm tùy chọn kính
        ],
      },
      // Vision Pro hiện chỉ có 1 thế hệ

      // --- AirPods Pro Category ---
      {
        name: "AirPods Pro (2nd generation)",
        description:
          "AirPods Pro (2nd generation) with Active Noise Cancellation and Adaptive Transparency.",
        category: airPodsProCategory ? airPodsProCategory._id : null,
        isNewArrival: true,
        isBestSeller: true,
        image:
          "https://cdn.tgdd.vn/Products/Images/54/315014/tai-nghe-bluetooth-airpods-pro-2nd-gen-usb-c-charge-apple-1-750x500.jpg",
        variants: [
          {
            name: "AirPods Pro (2nd Gen)",
            variantName:
              "AirPods Pro (2nd Gen) with MagSafe Charging Case (USB-C)",
            color: "White",
            capacity: "N/A",
            price: 6190000,
            stock: 250,
            sku: "APP2-USBC",
          }, // Giữ nguyên, sửa giá
          {
            name: "AirPods Pro (2nd Gen)",
            variantName:
              "AirPods Pro (2nd Gen) with MagSafe Charging Case (Lightning)",
            color: "White",
            capacity: "N/A",
            price: 5990000,
            stock: 150,
            sku: "APP2-LTN",
          }, // Thêm bản Lightning nếu còn
        ],
      },
      // AirPods Pro hiện chỉ có 1 thế hệ là 2nd gen đang bán chạy

      // --- AirPods Max Category ---
      {
        name: "AirPods Max",
        description:
          "AirPods Max, over-ear headphones with high-fidelity audio and Active Noise Cancellation.",
        category: airPodsMaxCategory ? airPodsMaxCategory._id : null,
        isNewArrival: false,
        isBestSeller: false,
        image:
          "https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/54/329161/airpods-max-cong-usb-c-den-1-638616502635375739-750x500.jpg", // Ảnh này có chữ USB-C, nếu Max chưa có bản USB-C thì nên đổi
        variants: [
          {
            name: "AirPods Max",
            variantName: "AirPods Max - Space Gray",
            color: "Space Gray",
            capacity: "N/A",
            price: 13990000,
            stock: 100,
            sku: "APMAX-SG",
          },
          {
            name: "AirPods Max",
            variantName: "AirPods Max - Silver",
            color: "Silver",
            capacity: "N/A",
            price: 13990000,
            stock: 80,
            sku: "APMAX-SV",
          },
          {
            name: "AirPods Max",
            variantName: "AirPods Max - Sky Blue",
            color: "Sky Blue",
            capacity: "N/A",
            price: 13990000,
            stock: 70,
            sku: "APMAX-SB",
          },
          {
            name: "AirPods Max",
            variantName: "AirPods Max - Pink",
            color: "Pink",
            capacity: "N/A",
            price: 13990000,
            stock: 60,
            sku: "APMAX-PK",
          },
          {
            name: "AirPods Max",
            variantName: "AirPods Max - Green",
            color: "Green",
            capacity: "N/A",
            price: 13990000,
            stock: 50,
            sku: "APMAX-GR",
          },
        ],
      },
      // AirPods Max chỉ có 1 thế hệ

      // --- AirPods Standard Category ---
      {
        name: "AirPods (3rd generation)",
        description:
          "AirPods (3rd generation) with Spatial Audio and longer battery life.",
        category: airPodsStandardCategory ? airPodsStandardCategory._id : null,
        isNewArrival: false,
        isBestSeller: false, // Pro thường bán chạy hơn
        image:
          "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/MME73?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1632861342000",
        variants: [
          {
            name: "AirPods (3rd Gen)",
            variantName: "AirPods (3rd Gen) with Lightning Charging Case",
            color: "White",
            capacity: "N/A",
            price: 4490000,
            stock: 200,
            sku: "AP3-LC",
          }, // Sửa giá
          {
            name: "AirPods (3rd Gen)",
            variantName: "AirPods (3rd Gen) with MagSafe Charging Case",
            color: "White",
            capacity: "N/A",
            price: 4790000,
            stock: 180,
            sku: "AP3-MSC",
          }, // Thêm bản MagSafe
        ],
      },
      {
        name: "AirPods (2nd generation)",
        description: "AirPods (2nd generation). More magical than ever.",
        category: airPodsStandardCategory ? airPodsStandardCategory._id : null,
        isNewArrival: false,
        isBestSeller: true, // Vẫn là lựa chọn giá rẻ phổ biến
        image:
          "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/MV7N2?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1551489688005",
        variants: [
          {
            name: "AirPods (2nd Gen)",
            variantName: "AirPods (2nd Gen) with Charging Case",
            color: "White",
            capacity: "N/A",
            price: 3190000,
            stock: 250,
            sku: "AP2-CC",
          }, // Case thường
          // Apple không còn bán bản Wireless Charging Case riêng cho Airpods 2 nhiều
        ],
      },

      // RV&Home Products
      {
        name: "HomePod (2nd generation)",
        description:
          "HomePod (2nd Gen), powerful smart speaker with immersive, high-fidelity audio.",
        category: homePodCategory ? homePodCategory._id : null,
        isNewArrival: true,
        isBestSeller: true,
        image:
          "https://cdsassets.apple.com/live/7WUAS350/images/homepod/2023-homepod-colors.png",
        variants: [
          {
            name: "HomePod (2nd Gen)",
            variantName: "HomePod (2nd Gen) - Midnight",
            color: "Midnight",
            capacity: "N/A",
            price: 7990000,
            stock: 100,
            sku: "HP2-MN",
          },
          {
            name: "HomePod (2nd Gen)",
            variantName: "HomePod (2nd Gen) - White",
            color: "White",
            capacity: "N/A",
            price: 7990000,
            stock: 90,
            sku: "HP2-WH",
          },
          {
            name: "HomePod (2nd Gen)",
            variantName: "HomePod (2nd Gen) - Yellow",
            color: "Yellow",
            capacity: "N/A",
            price: 7990000,
            stock: 70,
            sku: "HP2-YL",
          }, // Màu mới
          // Không có nhiều tùy chọn khác cho HomePod chính
        ],
      },
      {
        name: "HomePod mini",
        description:
          "HomePod mini. Room-filling sound, an intelligent assistant, smart home control. All private and secure.",
        category: homePodCategory ? homePodCategory._id : null, // Có thể tạo category riêng "HomePod mini" hoặc gộp chung
        isNewArrival: false, // Ra mắt trước HomePod (2nd Gen)
        isBestSeller: true,
        image:
          "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/homepod-mini-select-yellow-202110?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1632925510000",
        variants: [
          {
            name: "HomePod mini",
            variantName: "HomePod mini - Space Gray",
            color: "Space Gray",
            capacity: "N/A",
            price: 2590000,
            stock: 150,
            sku: "HPMINI-SG",
          },
          {
            name: "HomePod mini",
            variantName: "HomePod mini - Blue",
            color: "Blue",
            capacity: "N/A",
            price: 2590000,
            stock: 140,
            sku: "HPMINI-BL",
          },
          {
            name: "HomePod mini",
            variantName: "HomePod mini - Yellow",
            color: "Yellow",
            capacity: "N/A",
            price: 2590000,
            stock: 120,
            sku: "HPMINI-YL",
          },
          {
            name: "HomePod mini",
            variantName: "HomePod mini - Orange",
            color: "Orange",
            capacity: "N/A",
            price: 2590000,
            stock: 110,
            sku: "HPMINI-OR",
          },
          {
            name: "HomePod mini",
            variantName: "HomePod mini - White",
            color: "White",
            capacity: "N/A",
            price: 2590000,
            stock: 130,
            sku: "HPMINI-WH",
          },
        ],
      },
      {
        name: "HomePod (1st generation)",
        description:
          "HomePod (1st Gen). The original smart speaker for the home that delivers amazing sound.",
        category: homePodCategory ? homePodCategory._id : null,
        isNewArrival: false,
        isBestSeller: false, // Đã ngừng sản xuất
        image:
          "https://support.apple.com/library/APPLE/APPLECARE_ALLGEOS/SP773/homepod_white_large_2x.jpg",
        variants: [
          {
            name: "HomePod (1st Gen)",
            variantName: "HomePod (1st Gen) - Space Gray",
            color: "Space Gray",
            capacity: "N/A",
            price: 6990000,
            stock: 30,
            sku: "HP1-SG",
          }, // Giá tham khảo cho hàng còn lại
          {
            name: "HomePod (1st Gen)",
            variantName: "HomePod (1st Gen) - White",
            color: "White",
            capacity: "N/A",
            price: 6990000,
            stock: 25,
            sku: "HP1-WH",
          },
        ],
      },

      // --- Apple TV Category ---
      {
        name: "Apple TV 4K (3rd generation - 2022)", // Ghi rõ thế hệ
        description:
          "Apple TV 4K (3rd generation). The Apple experience. Cinematic in every sense.",
        category: appleTVCategory ? appleTVCategory._id : null,
        isNewArrival: false, // Ra mắt 2022
        isBestSeller: true,
        image:
          "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/apple-tv-4k-hero-select-202210?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1664896361408",
        variants: [
          {
            name: "Apple TV 4K (3rd Gen)",
            variantName: "Apple TV 4K (3rd Gen) 64GB (Wi-Fi)",
            color: "Black",
            capacity: "64GB Wi-Fi",
            price: 3690000,
            stock: 150,
            sku: "ATV4K3-64-WIFI",
          }, // Sửa SKU
          {
            name: "Apple TV 4K (3rd Gen)",
            variantName: "Apple TV 4K (3rd Gen) 128GB (Wi-Fi + Ethernet)",
            color: "Black",
            capacity: "128GB Wi-Fi + Ethernet",
            price: 4290000,
            stock: 120,
            sku: "ATV4K3-128-ETH",
          }, // Sửa SKU
          // Ít biến thể cho Apple TV
        ],
      },
      {
        name: "Apple TV 4K (2nd generation - 2021)",
        description:
          "Apple TV 4K (2nd generation) brings the best of TV together with your favorite Apple devices and services.",
        category: appleTVCategory ? appleTVCategory._id : null,
        isNewArrival: false,
        isBestSeller: false, // 3rd Gen sẽ bán chạy hơn
        image:
          "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/p/apple-tv-4k-hero-select-202104.jpg", // Ảnh này là của 2nd Gen
        variants: [
          {
            name: "Apple TV 4K (2nd Gen)",
            variantName: "Apple TV 4K (2nd Gen) 32GB",
            color: "Black",
            capacity: "32GB",
            price: 3190000,
            stock: 100,
            sku: "ATV4K2-32",
          },
          {
            name: "Apple TV 4K (2nd Gen)",
            variantName: "Apple TV 4K (2nd Gen) 64GB",
            color: "Black",
            capacity: "64GB",
            price: 3590000,
            stock: 80,
            sku: "ATV4K2-64",
          },
        ],
      },
      {
        name: "Apple TV HD (Formerly 4th generation)",
        description:
          "Apple TV HD. Enjoy your favorite content from apps like Apple TV+, Netflix, and more.",
        category: appleTVCategory ? appleTVCategory._id : null,
        isNewArrival: false,
        isBestSeller: false,
        image: "https://everymac.com/images/cpu_pictures/apple-tv-4.jpg",
        variants: [
          {
            name: "Apple TV HD",
            variantName: "Apple TV HD 32GB with Siri Remote (2nd Gen or later)",
            color: "Black",
            capacity: "32GB",
            price: 2790000,
            stock: 120,
            sku: "ATVHD-32",
          },
          // Apple TV HD thường chỉ có 1 bản 32GB
        ],
      },
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
        console.warn(
          `Skipping product "${product.name}" as its category was not found.`
        );
      }
    }

    console.log("Products seeded successfully!");
  } catch (error) {
    console.error("Error seeding products:", error);
    throw error;
  }
};

// Keep other seeding functions as they are
const seedCoupons = async (adminUser) => {
  try {
    console.log("Seeding coupons...");

    const coupons = [
      {
        name: "Welcome Discount 100K",
        code: "WELCOME100K",
        description: "Giảm 100.000đ cho đơn hàng đầu tiên.",
        type: "FIXED_AMOUNT_DISCOUNT",
        value: 100000,
        minOrderValue: 500000,
        startDate: new Date(Date.now() - 86400000 * 7), // 7 days ago
        endDate: new Date(Date.now() + 86400000 * 90), // 90 days from now
        usageLimit: 500,
        usageLimitPerUser: 1,
        isActive: true,
        createdBy: adminUser ? adminUser._id : null, // Use adminUser if available
      },
      {
        name: "20% Off Sale",
        code: "SALE20",
        description: "Giảm 20% tối đa 200.000đ cho đơn hàng.",
        type: "PERCENTAGE_DISCOUNT",
        value: 20,
        minOrderValue: 500000,
        maxDiscountValue: 200000,
        startDate: new Date(Date.now() - 86400000),
        endDate: new Date(Date.now() + 86400000 * 30),
        usageLimit: 100,
        usageLimitPerUser: 1,
        isActive: true,
        createdBy: adminUser ? adminUser._id : null,
      },
      {
        name: "Free Shipping",
        code: "FREESHIP",
        description: "Miễn phí vận chuyển cho đơn hàng trên 1.000.000đ.",
        type: "FREE_SHIPPING",
        value: 0,
        minOrderValue: 1000000,
        startDate: new Date(Date.now() - 86400000),
        endDate: new Date(Date.now() + 86400000 * 60),
        usageLimit: 50,
        usageLimitPerUser: 1,
        isActive: true,
        createdBy: adminUser ? adminUser._id : null,
      },
      {
        name: "Fixed 100K Discount",
        code: "FIXED100K",
        description: "Giảm giá cố định 100.000đ.",
        type: "FIXED_AMOUNT_DISCOUNT",
        value: 100000,
        minOrderValue: 1000000,
        startDate: new Date(Date.now() - 86400000),
        endDate: new Date(Date.now() + 86400000 * 90),
        usageLimit: 200,
        usageLimitPerUser: null,
        isActive: true,
        createdBy: adminUser ? adminUser._id : null,
      },
      {
        name: "Summer Sale 2025",
        code: "SUMMER2025",
        description: "Giảm 15% tối đa 150.000đ cho mùa hè 2025.",
        type: "PERCENTAGE_DISCOUNT",
        value: 15,
        minOrderValue: 750000,
        maxDiscountValue: 150000,
        startDate: new Date(Date.now() + 86400000 * 10),
        endDate: new Date(Date.now() + 86400000 * 40),
        usageLimit: 200,
        usageLimitPerUser: 1,
        isActive: true,
        createdBy: adminUser ? adminUser._id : null,
      },
      {
        name: "New User 50K",
        code: "NEWUSER50",
        description: "Giảm 50.000đ cho người dùng mới.",
        type: "FIXED_AMOUNT_DISCOUNT",
        value: 50000,
        minOrderValue: 300000,
        startDate: new Date(Date.now() - 86400000 * 5),
        endDate: new Date(Date.now() + 86400000 * 25),
        usageLimit: 500,
        usageLimitPerUser: 1,
        isActive: true,
        createdBy: adminUser ? adminUser._id : null,
      },
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

    console.log("Coupons seeded successfully!");
  } catch (error) {
    console.error("Error seeding coupons:", error);
    throw error;
  }
};

const seedReviews = async () => {
  try {
    console.log("Seeding reviews...");

    const users = await User.find({});
    const products = await Product.find({});

    if (users.length === 0 || products.length === 0) {
      console.log(
        "No users or products found to seed reviews. Skipping review seeding."
      );
      return;
    }

    // Select some products to add reviews to (ensure they exist)
    const productsWithReviews = products.slice(0, Math.min(products.length, 5)); // Take up to 5 products

    const reviews = [
      {
        user: users[0]._id,
        product: productsWithReviews[0] ? productsWithReviews[0]._id : null,
        rating: 5,
        comment: "Sản phẩm tuyệt vời, rất đáng tiền!",
        name: "Seeded User", // Added name field
      },
      {
        user: users.length > 1 ? users[1]._id : users[0]._id, // Use second user if available, otherwise use first
        product: productsWithReviews[0] ? productsWithReviews[0]._id : null,
        rating: 4,
        comment: "Pin dùng khá tốt, thiết kế sang trọng.",
        name: "Seeded User", // Added name field
      },
      {
        user: users[0]._id,
        product: productsWithReviews[1] ? productsWithReviews[1]._id : null,
        rating: 5,
        comment: "Hiệu năng mạnh mẽ, màn hình sắc nét.",
        name: "Seeded User", // Added name field
      },
      {
        user: users.length > 1 ? users[1]._id : users[0]._id,
        product: productsWithReviews[2] ? productsWithReviews[2]._id : null,
        rating: 4,
        comment: "Nhẹ và mỏng, tiện lợi mang đi lại.",
        name: "Seeded User", // Added name field
      },
    ].filter((review) => review.product !== null); // Filter out reviews for non-existent products

    for (const reviewData of reviews) {
      const existingReview = await Review.findOne({
        user: reviewData.user,
        product: reviewData.product,
      });
      if (!existingReview) {
        await Review.create(reviewData);
        console.log(
          `Created review for product ${reviewData.product} by user ${reviewData.user}`
        );
      } else {
        console.log(
          `Review for product ${reviewData.product} by user ${reviewData.user} already exists`
        );
      }
    }

    console.log("Reviews seeded successfully!");
  } catch (error) {
    console.error("Error seeding reviews:", error);
    throw error;
  }
};

const seedAll = async () => {
  let connection;
  try {
    console.log("Connecting to MongoDB...");
    connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected successfully to MongoDB");

    // Seed admin user
    let adminUser = await User.findOne({ role: "admin" });

    if (!adminUser) {
      console.log("No admin user found. Creating default admin user...");
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash("admin123", salt);

      const newAdminUser = new User({
        username: "admin",
        email: "admin@example.com",
        password: hashedPassword,
        role: "admin",
      });

      adminUser = await newAdminUser.save(); // Assign the created user to adminUser
      console.log("----------------------------------------");
      console.log("Default admin user created successfully!");
      console.log("Credentials:");
      console.log("Email: admin@example.com");
      console.log("Password: admin123");
      console.log("----------------------------------------");
    } else {
      console.log("Admin user already exists");
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
    console.error("Error in seeding:", error);
    process.exit(1);
  } finally {
    if (connection) {
      await mongoose.disconnect();
      console.log("Disconnected from MongoDB");
    }
  }
};

// Run the seeding process
seedAll();
