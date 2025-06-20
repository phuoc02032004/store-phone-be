const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  searchProducts
} = require('../controllers/productController');
const { auth, adminAuth } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductVariant:
 *       type: object
 *       required:
 *         - color
 *         - capacity
 *         - price
 *         - stock
 *         - sku
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated variant ID
 *         color:
 *           type: string
 *           description: Color of the variant
 *         capacity:
 *           type: string
 *           description: Storage capacity of the variant
 *         price:
 *           type: number
 *           description: Price of this variant
 *           minimum: 0
 *         stock:
 *           type: number
 *           description: Stock quantity of this variant
 *           minimum: 0
 *         sku:
 *           type: string
 *           description: Stock Keeping Unit - unique identifier for this variant
 *         image:
 *           type: string
 *           description: Image URL specific to this variant (optional)
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - category
 *         - variants
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated ID
 *         name:
 *           type: string
 *           description: Product name
 *         description:
 *           type: string
 *           description: Product description
 *         category:
 *           type: string
 *           description: Category ID
 *         image:
 *           type: string
 *           description: Main product image URL
 *         variants:
 *           type: array
 *           description: Array of product variants with different colors and capacities
 *           items:
 *             $ref: '#/components/schemas/ProductVariant'
 *         isNewArrival:
 *           type: boolean
 *           description: Indicates if the product is a new arrival
 *         isBestSeller:
 *           type: boolean
 *           description: Indicates if the product is a best seller
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       required:
 *         - rating
 *         - comment
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated ID
 *         name:
 *           type: string
 *           description: User's name
 *         rating:
 *           type: number
 *           description: Rating given by the user (1-5)
 *         comment:
 *           type: string
 *           description: Review comment
 *         user:
 *           type: string
 *           description: User ID
 *         product:
 *           type: string
 *           description: Product ID
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products with optional filters
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: isNewArrival
 *         schema:
 *           type: boolean
 *         description: Filter for new arrival products
 *       - in: query
 *         name: isBestSeller
 *         schema:
 *           type: boolean
 *         description: Filter for best seller products
 *     responses:
 *       200:
 *         description: List of products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 */
router.get('/', getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/products/category/{category}:
 *   get:
 *     summary: Get products by category
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       404:
 *         description: No products found for this category
 *       500:
 *         description: Server error
 */
router.get('/category/:categoryId', getProductsByCategory);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/products/{id}/reviews:
 *   post:
 *     summary: Create a new review for a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rating
 *               - comment
 *             properties:
 *               rating:
 *                 type: number
 *                 description: Rating for the product (1-5)
 *               comment:
 *                 type: string
 *                 description: Comment for the product review
 *     responses:
 *       201:
 *         description: Review added successfully
 *       400:
 *         description: Product already reviewed or You can only review products you have purchased.
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 *   get:
 *     summary: Get all reviews for a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: List of reviews retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Product name
 *               description:
 *                 type: string
 *                 description: Product description
 *               category:
 *                 type: string
 *                 description: Category ID
 *               variants:
 *                 type: array
 *                 description: Array of product variants
 *                 items:
 *                   type: object
 *                   properties:
 *                     color:
 *                       type: string
 *                       description: Color of the variant
 *                     capacity:
 *                       type: string
 *                       description: Storage capacity of the variant
 *                     price:
 *                       type: number
 *                       description: Price of this variant
 *                       minimum: 0
 *                     stock:
 *                       type: number
 *                       description: Stock quantity of this variant
 *                       minimum: 0
 *                     image:
 *                       type: string
 *                       format: binary
 *                       description: Image specific to this variant (optional)
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Main product image file
 *               isNewArrival:
 *                 type: boolean
 *                 description: Set if the product is a new arrival
 *               isBestSeller:
 *                 type: boolean
 *                 description: Set if the product is a best seller
 *             required:
 *               - name
 *               - description
 *               - category
 *               - variants
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Server error
 */
router.post('/', auth, adminAuth, upload.single('image'), createProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               variants:
 *                 type: array
 *                 description: Array of product variants
 *                 items:
 *                   type: object
 *                   properties:
 *                     color:
 *                       type: string
 *                       description: Color of the variant
 *                     capacity:
 *                       type: string
 *                       description: Storage capacity of the variant
 *                     price:
 *                       type: number
 *                       description: Price of this variant
 *                       minimum: 0
 *                     stock:
 *                       type: number
 *                       description: Stock quantity of this variant
 *                       minimum: 0
 *                     sku:
 *                       type: string
 *                       description: Existing SKU (for updating existing variants)
 *                     image:
 *                       type: string
 *                       format: binary
 *                       description: Image specific to this variant (optional)
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Main product image
 *               isNewArrival:
 *                 type: boolean
 *                 description: Set if the product is a new arrival
 *               isBestSeller:
 *                 type: boolean
 *                 description: Set if the product is a best seller
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Server error
 */
router.put('/:id', auth, adminAuth, upload.single('image'), updateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Server error
 */
router.delete('/:id', auth, adminAuth, deleteProduct);

/**
 * 
 * @swagger
 * /api/products/search:
 *   get:
 *     summary: Search products by keyword
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: Keyword to search for in product names or descriptions
 *     responses:
 *       200:
 *         description: List of products matching the keyword
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 */
router.get('/search', searchProducts);
router.get('/:id', getProductById);

module.exports = router;