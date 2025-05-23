const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUser } = require('../controllers/userController');
const { auth, adminAuth } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
const { updateUserRole } = require('../controllers/userController');

// @desc    Update user role
// @route   PUT /api/users/:id/role
// @access  Private/Admin
router.put('/:id/role', auth, adminAuth, updateUserRole);
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's username.
 *               email:
 *                 type: string
 *                 description: The user's email address.
 *               password:
 *                 type: string
 *                 description: The user's password.
 *               isAdmin:
 *                 type: boolean
 *                 description: Set to true to create an admin user (admin only).
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating success.
 *                 token:
 *                   type: string
 *                   description: The JWT token for the user.
 *       400:
 *         description: User already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *       500:
 *         description: Server error
 */
router.post('/register', registerUser);
61 |
/**
* @swagger
* /api/users/login:
 *   post:
 *     summary: Login user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address.
 *               password:
 *                 type: string
 *                 description: The user's password.
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating success.
 *                 token:
 *                   type: string
 *                   description: The JWT token for the user.
 *       400:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *       500:
 *         description: Server error
 */
router.post('/login', loginUser);

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Get user data
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The user's ID.
 *                 username:
 *                   type: string
 *                   description: The user's username.
 *                 email:
 *                   type: string
 *                   description: The user's email address.
 *       401:
 *         description: Not authorized, token failed
 *       500:
 *         description: Server error
 */
router.get('/me', auth, getUser);

module.exports = router;