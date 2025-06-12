const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = async (req, res) => {
  try { 
    const { email, password, fcmToken } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Vui lòng nhập email và mật khẩu'
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Email hoặc mật khẩu không chính xác'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: 'error',
        message: 'Email hoặc mật khẩu không chính xác'
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.status(200).json({
      status: 'success',
      data: { 
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token,
        fcmToken: user.fcmToken,
      }
    });

    if (fcmToken) {
      user.fcmToken = fcmToken;
      await user.save();
    }
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ status: 'error', message: 'Server Error' });
  }
}; 

/**
 * @desc    Register new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const register = async (req, res) => {
  try {
    const { username, email, password, fcmToken } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ status: 'error', message: 'Vui lòng cung cấp đủ thông tin: username, email, password' });
    }
    if (password.length < 4) {
        return res.status(400).json({ status: 'error', message: 'Mật khẩu phải có ít nhất 4 ký tự.' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ status: 'error', message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role: 'user',
      fcmToken: fcmToken || null,
      isVerified: false,
    });

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); 

    const emailVerificationToken = crypto.createHash('sha256').update(verificationCode).digest('hex');
    const emailVerificationExpires = Date.now() + 15 * 60 * 1000; 

    user.emailVerificationToken = emailVerificationToken;
    user.emailVerificationExpires = emailVerificationExpires;
    await user.save({ validateBeforeSave: false });

    const verificationMessage = `Mã xác minh email của bạn là: ${verificationCode}\n\nMã này sẽ hết hạn sau 15 phút.\n\nVui lòng sử dụng mã này để xác minh địa chỉ email của bạn.`;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Mã xác minh email của bạn',
        message: verificationMessage
      });
    } catch (emailError) {
      console.error('Error sending verification email:', emailError);
    }

    res.status(201).json({
      status: 'success',
      message: 'Đăng ký thành công. Vui lòng kiểm tra email để xác minh tài khoản.',
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
        isVerified: user.isVerified,
      }
    });

  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ status: 'error', message: 'Server Error' });
  }
};

/**
 * @desc    Get current user profile
 * @route   GET /api/auth/profile
 * @access  Private
 */
const getProfile = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
        return res.status(401).json({ status: 'error', message: 'Not authorized, token failed or user not found' });
    }
    const user = await User.findById(req.user._id).select('-password -fcmToken');
    if (!user) {
        return res.status(404).json({ status: 'error', message: 'User not found' });
    }
    res.status(200).json({ status: 'success', data: user });
  } catch (error) {
    console.error('Get Profile Error:', error);
    res.status(500).json({ status: 'error', message: 'Server Error' });
  }
};

/**
 * @desc    Promote user to admin role
 * @route   PUT /api/auth/promote/:id
 * @access  Private/Admin (cần middleware kiểm tra role admin)
 */
const promoteToAdmin = async (req, res) => {
  try {
    // if (req.user.role !== 'admin') {
    //   return res.status(403).json({ status: 'error', message: 'Forbidden: Only admins can promote users' });
    // }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }

    if (user.role === 'admin') {
      return res.status(400).json({ status: 'error', message: 'User is already an admin' });
    }

    user.role = 'admin';
    await user.save();

    res.status(200).json({
      status: 'success',
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Promote to Admin Error:', error);
    res.status(500).json({ status: 'error', message: 'Server Error' });
  }
};

/**
 * @desc    Change user password
 * @route   /api/auth/changepassword
 * @access  Private
 */
const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ status: 'error', message: 'Vui lòng cung cấp đủ thông tin: oldPassword, newPassword' });
    }
    if (newPassword.length < 4) {
      return res.status(400).json({ status: 'error', message: 'Mật khẩu mới phải có ít nhất 4 ký tự.' });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ status: 'error', message: 'Mật khẩu cũ không chính xác.' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.status(200).json({ status: 'success', message: 'Mật khẩu đã được thay đổi thành công.' });
  } catch (error) {
    console.error('Change Password Error:', error);
    res.status(500).json({ status: 'error', message: 'Server Error' });
  }
};

const crypto = require('crypto'); 


/**
 * @desc    Forgot password - Send reset token to user email
 * @route   POST /api/auth/forgotpassword
 * @access  Public
 */
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ status: 'error', message: 'Vui lòng nhập địa chỉ email' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(200).json({ status: 'success', message: 'Nếu email tồn tại, một mã đặt lại mật khẩu đã được gửi.' });
    }

    const resetToken = crypto.randomBytes(3).toString('hex').toUpperCase();

    const passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const passwordResetExpires = Date.now() + 15 * 60 * 1000;

    user.passwordResetToken = passwordResetToken;
    user.passwordResetExpires = passwordResetExpires;
    try {
      await user.save({ validateBeforeSave: false });
    } catch (saveError) {
      console.error('Error saving user document with reset token:', saveError);
    }


    const message = `Mã đặt lại mật khẩu của bạn là: ${resetToken}\n\nMã này sẽ hết hạn sau 15 phút.\n\nNếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.`;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Mã đặt lại mật khẩu của bạn',
        message: message
      });

      res.status(200).json({
        status: 'success',
        message: 'Mã đặt lại mật khẩu đã được gửi đến email của bạn.'
      });
    } catch (emailError) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });

      console.error('Error sending password reset email:', emailError);
      return res.status(500).json({ status: 'error', message: 'Có lỗi khi gửi email đặt lại mật khẩu. Vui lòng thử lại sau.' });
    }

  } catch (error) {
    console.error('Forgot Password Error:', error);
    res.status(500).json({ status: 'error', message: 'Server Error' });
  }
};

/**
 * @desc    Reset password using token
 * @route   PUT /api/auth/resetpassword
 * @access  Public
 */
const resetPassword = async (req, res) => {
  try {
    const { email, resetToken, newPassword } = req.body;

    if (!email || !resetToken || !newPassword) {
      return res.status(400).json({ status: 'error', message: 'Vui lòng cung cấp đủ thông tin: email, mã đặt lại, và mật khẩu mới.' });
    }

    if (newPassword.length < 4) {
        return res.status(400).json({ status: 'error', message: 'Mật khẩu mới phải có ít nhất 4 ký tự.' });
    }

    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    const user = await User.findOne({ email }).select('+passwordResetToken +passwordResetExpires');

    if (!user) {
        return res.status(400).json({ status: 'error', message: 'Mã đặt lại không hợp lệ hoặc đã hết hạn.' });
    }


    if (user.passwordResetToken !== hashedToken || user.passwordResetExpires <= Date.now()) {
         return res.status(400).json({ status: 'error', message: 'Mã đặt lại không hợp lệ hoặc đã hết hạn.' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    res.status(200).json({ status: 'success', message: 'Mật khẩu của bạn đã được đặt lại thành công.' });

  } catch (error) {
    console.error('Reset Password Error:', error);
    res.status(500).json({ status: 'error', message: 'Server Error' });
  }
};
/**
 * @desc    Verify user email using verification code
 * @route   POST /api/auth/verify-email
 * @access  Public
 */
const verifyEmail = async (req, res) => {
  try {
    const { email, verificationCode } = req.body;

    if (!email || !verificationCode) {
      return res.status(400).json({ status: 'error', message: 'Vui lòng cung cấp đủ thông tin: email và mã xác minh.' });
    }

    const hashedCode = crypto.createHash('sha256').update(verificationCode).digest('hex');

    const user = await User.findOne({
      email,
      emailVerificationToken: hashedCode,
      emailVerificationExpires: { $gt: Date.now() } 
    });

    if (!user) {
      return res.status(400).json({ status: 'error', message: 'Mã xác minh không hợp lệ hoặc đã hết hạn.' });
    }

    user.isVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;

    await user.save();

    res.status(200).json({ status: 'success', message: 'Email của bạn đã được xác minh thành công.' });

  } catch (error) {
    console.error('Verify Email Error:', error);
    res.status(500).json({ status: 'error', message: 'Server Error' });
  }
};

module.exports = {
  login,
  register,
  getProfile,
  promoteToAdmin,
  changePassword,
  forgotPassword,
  resetPassword,
  verifyEmail,
};