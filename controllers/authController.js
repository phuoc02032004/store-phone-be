const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = async (req, res) => {
  try { // Khối try bắt đầu
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Vui lòng nhập email và mật khẩu'
      });
    }

    // Check for user email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Email hoặc mật khẩu không chính xác'
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: 'error',
        message: 'Email hoặc mật khẩu không chính xác'
      });
    }

    // Create token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    // Gửi response thành công
    res.status(200).json({ // Mở ngoặc cho đối tượng JSON
      status: 'success',
      data: { // Mở ngoặc cho đối tượng data
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token
      } // Đóng ngoặc cho đối tượng data
    }); // Đóng ngoặc cho đối tượng JSON và kết thúc lệnh .json()
  } catch (error) { // Khối catch nằm SAU khi khối try đã kết thúc
    console.error('Login Error:', error); // Thêm context cho log lỗi
    res.status(500).json({ status: 'error', message: 'Server Error' }); // Thống nhất cấu trúc lỗi
  }
}; // Đóng hàm login

/**
 * @desc    Register new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input (thêm ví dụ)
    if (!username || !email || !password) {
      return res.status(400).json({ status: 'error', message: 'Vui lòng cung cấp đủ thông tin: username, email, password' });
    }
    if (password.length < 4) { // Giả sử có yêu cầu độ dài tối thiểu
        return res.status(400).json({ status: 'error', message: 'Mật khẩu phải có ít nhất 4 ký tự.' });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ status: 'error', message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role: 'user', // Default role
    });

    // Create token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    // Thay đổi response để nhất quán hơn (tương tự login)
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
    // req.user được gán bởi middleware xác thực (ví dụ: từ token)
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

    // Already an admin
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

module.exports = {
  login,
  register,
  getProfile,
  promoteToAdmin
};