const asyncHandler = require('express-async-handler');
const admin = require('../config/firebaseAdmin');
const Notify = require('../models/Notify');
const User = require('../models/User');

// Helper function to emit notification events
const emitNotificationEvent = (io, recipientId, eventName, data) => {
  if (io) {
    io.to(recipientId).emit(eventName, data);
    console.log(`Emitted '${eventName}' to user ${recipientId}`);
  } else {
    console.warn('Socket.IO instance not available for emitting notification.');
  }
};

// @desc    Create and send a notification (internal helper)
const createAndSendNotification = async (io, { title, body, imageUrl, data, recipientId, fcmToken }) => {
  let targetFcmToken = fcmToken;

  if (!targetFcmToken) {
    const recipientUser = await User.findById(recipientId);
    if (!recipientUser || !recipientUser.fcmToken) {
      console.log(`No FCM token found for user ${recipientId}. Notification not sent via FCM.`);
      const notification = new Notify({
        title,
        body,
        imageUrl,
        data,
        recipient: recipientId,
        read: false,
      });
      await notification.save();
      emitNotificationEvent(io, recipientId, 'newNotification', notification);
      return { message: 'Notification saved to DB, but FCM token not found for recipient.', notificationId: notification._id };
    }
    targetFcmToken = recipientUser.fcmToken;
  }

  const notification = new Notify({
    title,
    body,
    imageUrl,
    data,
    recipient: recipientId,
    read: false,
  });

  await notification.save();

  const message = {
    notification: {
      title,
      body,
      imageUrl,
    },
    data: {
      ...data,
      notificationId: notification._id.toString(),
    },
    token: targetFcmToken,
  };

  try {
    const response = await admin.messaging().send(message);
    console.log('Successfully sent message:', response);
    emitNotificationEvent(io, recipientId, 'newNotification', notification);
    return { message: 'Notification sent successfully', notificationId: notification._id };
  } catch (error) {
    console.error('Error sending message:', error);
    throw new Error(`Error sending notification: ${error.message}`);
  }
};

// @desc    Send a notification (route handler)
// @route   POST /api/notifications/send
// @access  Private (or adjust as needed)
const sendNotification = asyncHandler(async (req, res) => {
  const io = req.app.get('socketio');
  const { title, body, imageUrl, data, recipientId, fcmToken } = req.body;

  try {
    const result = await createAndSendNotification(io, { title, body, imageUrl, data, recipientId, fcmToken });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error sending notification', error: error.message });
  }
});

// @desc    Get all notifications for a user
// @route   GET /api/notifications/my
// @access  Private
const getMyNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notify.find({ recipient: req.user._id }).sort({ createdAt: -1 });
  res.status(200).json(notifications);
});

// @desc    Get a notification by ID for the authenticated user
// @route   GET /api/notifications/:id
// @access  Private
const getNotificationById = asyncHandler(async (req, res) => {
  const notification = await Notify.findOne({ _id: req.params.id, recipient: req.user._id });

  if (!notification) {
    res.status(404);
    throw new Error('Notification not found');
  }

  res.status(200).json(notification);
});

// @desc    Mark a notification as read for the authenticated user
// @route   PATCH /api/notifications/:id/read
// @access  Private
const markNotificationAsRead = asyncHandler(async (req, res) => {
  const io = req.app.get('socketio');
  const notification = await Notify.findOneAndUpdate(
    { _id: req.params.id, recipient: req.user._id },
    { read: true },
    { new: true }
  );

  if (!notification) {
    res.status(404);
    throw new Error('Notification not found');
  }

  res.status(200).json({ message: 'Notification marked as read' });
  emitNotificationEvent(io, req.user._id.toString(), 'notificationRead', { notificationId: notification._id, read: true });
});

// @desc    Delete a notification for the authenticated user
// @route   DELETE /api/notifications/:id
// @access  Private
const deleteNotification = asyncHandler(async (req, res) => {
  const notification = await Notify.findOneAndDelete({ _id: req.params.id, recipient: req.user._id });

  if (!notification) {
    res.status(404);
    throw new Error('Notification not found');
  }

  res.status(200).json({ message: 'Notification deleted successfully' });
});

module.exports = {
  sendNotification,
  getMyNotifications,
  getNotificationById,
  markNotificationAsRead,
  deleteNotification,
  createAndSendNotification, // Export the new internal helper function
  emitNotificationEvent, // Export the helper function
};