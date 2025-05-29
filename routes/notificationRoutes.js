const express = require('express');
const { 
  sendNotification, 
  getMyNotifications, 
  getNotificationById,
  markNotificationAsRead,
  deleteNotification 
} = require('../controllers/notificationController');
const { auth, adminAuth } = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Notification:
 *       type: object
 *       required:
 *         - title
 *         - body
 *         - recipient
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated ID của notification
 *         title:
 *           type: string
 *           description: Tiêu đề thông báo
 *         body:
 *           type: string
 *           description: Nội dung thông báo
 *         imageUrl:
 *           type: string
 *           description: URL hình ảnh đính kèm (nếu có)
 *         data:
 *           type: object
 *           description: Dữ liệu tùy chỉnh cho thông báo
 *         recipient:
 *           type: string
 *           description: ID của người nhận thông báo
 *         read:
 *           type: boolean
 *           description: Trạng thái đã đọc của thông báo
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Thời gian tạo thông báo
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Thời gian cập nhật thông báo
 */

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: API quản lý thông báo
 */

/**
 * @swagger
 * /api/notifications/send:
 *   post:
 *     summary: Gửi thông báo mới (Chỉ Admin)
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - body
 *               - recipientId
 *             properties:
 *               title:
 *                 type: string
 *                 description: Tiêu đề thông báo
 *               body:
 *                 type: string
 *                 description: Nội dung thông báo
 *               imageUrl:
 *                 type: string
 *                 description: URL hình ảnh đính kèm (tùy chọn)
 *               data:
 *                 type: object
 *                 description: Dữ liệu tùy chỉnh cho thông báo (tùy chọn)
 *               recipientId:
 *                 type: string
 *                 description: ID của người nhận thông báo
 *               fcmToken:
 *                 type: string
 *                 description: FCM token của thiết bị người nhận (tùy chọn)
 *     responses:
 *       200:
 *         description: Gửi thông báo thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Notification sent successfully
 *                 notificationId:
 *                   type: string
 *                   example: "60d5ec49f8c7d10015f8e123"
 *       401:
 *         description: Không có quyền truy cập
 *       403:
 *         description: Không phải admin
 *       500:
 *         description: Lỗi server
 */
router.route('/send').post(auth, adminAuth, sendNotification);

/**
 * @swagger
 * /api/notifications/my:
 *   get:
 *     summary: Lấy tất cả thông báo của người dùng đăng nhập
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách thông báo
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notification'
 *       401:
 *         description: Không có quyền truy cập
 *       500:
 *         description: Lỗi server
 */
router.route('/my').get(auth, getMyNotifications);

/**
 * @swagger
 * /api/notifications/{id}:
 *   get:
 *     summary: Lấy thông tin chi tiết một thông báo
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của thông báo
 *     responses:
 *       200:
 *         description: Chi tiết thông báo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       401:
 *         description: Không có quyền truy cập
 *       404:
 *         description: Không tìm thấy thông báo
 *       500:
 *         description: Lỗi server
 */
router.route('/:id').get(auth, getNotificationById);

/**
 * @swagger
 * /api/notifications/{id}/read:
 *   patch:
 *     summary: Đánh dấu thông báo đã đọc
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của thông báo
 *     responses:
 *       200:
 *         description: Đánh dấu đã đọc thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Notification marked as read
 *       401:
 *         description: Không có quyền truy cập
 *       404:
 *         description: Không tìm thấy thông báo
 *       500:
 *         description: Lỗi server
 */
router.route('/:id/read').patch(auth, markNotificationAsRead);

/**
 * @swagger
 * /api/notifications/{id}:
 *   delete:
 *     summary: Xóa một thông báo
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của thông báo
 *     responses:
 *       200:
 *         description: Xóa thông báo thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Notification deleted successfully
 *       401:
 *         description: Không có quyền truy cập
 *       404:
 *         description: Không tìm thấy thông báo
 *       500:
 *         description: Lỗi server
 */
router.route('/:id').delete(auth, deleteNotification);

module.exports = router;