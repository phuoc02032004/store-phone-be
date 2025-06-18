const express = require('express');
const router = express.Router();
const {
  getCategories,
  getCategoryById,
  getCategoryTree,
  createCategory,
  updateCategory,
  deleteCategory,
  getParentCategories,
  getChildCategories,
} = require('../controllers/categoryController');
const { auth, adminAuth } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     CategoryAncestor:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The category ID
 *         name:
 *           type: string
 *           description: The category name
 *         slug:
 *           type: string
 *           description: URL-friendly version of name
 *     Category:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated ID
 *         name:
 *           type: string
 *           description: Category name
 *         slug:
 *           type: string
 *           description: URL-friendly version of name
 *         description:
 *           type: string
 *           description: Category description
 *         parent:
 *           type: string
 *           description: ID of parent category
 *         ancestors:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CategoryAncestor'
 *           description: Array of parent categories
 *         image:
 *           type: string
 *           description: Category image URL
 *         level:
 *           type: number
 *           description: Depth level in category tree
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
router.get('/', getCategories);

/**
 * @swagger
 * /api/categories/tree:
 *   get:
 *     summary: Get category tree structure
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Category tree retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   children:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/Category'
 */
router.get('/tree', getCategoryTree);

/**
 * @swagger
 * /api/categories/parents:
 *   get:
 *     summary: Get all parent categories (categories with no parent)
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of parent categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
router.get('/parents', getParentCategories);

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Get category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found
 */
router.get('/:id', getCategoryById);

/**
 * @swagger
 * /api/categories/{id}/children:
 *   get:
 *     summary: Get child categories by parent ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the parent category
 *     responses:
 *       200:
 *         description: List of child categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       400:
 *         description: Invalid category ID format
 *       404:
 *         description: Parent category not found
 */
router.get('/:id/children', getChildCategories);

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
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
 *                 description: Category name
 *               description:
 *                 type: string
 *                 description: Category description
 *               parentId:
 *                 type: string
 *                 description: ID of parent category
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Category image
 *             required:
 *               - name
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Invalid input or category already exists
 *       401:
 *         description: Not authorized
 */
router.post('/', auth, adminAuth, upload.single('image'), createCategory);

/**
 * @swagger
 * /api/categories/{id}:
 *   patch:
 *     summary: Update a category
 *     tags: [Categories]
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
 *               parentId:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Invalid input or category already exists
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Category not found
 */
router.patch('/:id', auth, adminAuth, upload.single('image'), updateCategory);

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Categories]
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
 *         description: Category deleted successfully
 *       400:
 *         description: Cannot delete category with subcategories
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Category not found
 */
router.delete('/:id', auth, adminAuth, deleteCategory);

module.exports = router;