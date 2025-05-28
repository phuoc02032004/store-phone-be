const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = async (req, res) => {
  try { 
    const { email, password } = req.body;
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
        token
      }
    });
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
    const { username, email, password } = req.body;

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
    });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );
    res.status(201).json({
      status: 'success',
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token
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
    const user = await User.findById(req.user._id).select('-password');
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
    // Kiểm tra xem người thực hiện có phải là admin không (cần middleware)
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

module.exports = {
  login,
  register,
  getProfile,
  promoteToAdmin,
  changePassword
};