const multer = require('multer');
const path = require('path');

// Cấu hình storage cho multer - sử dụng memory storage để sau đó upload lên cloudinary
const storage = multer.memoryStorage();

// 2. (Tùy chọn) Lưu trữ trên đĩa cục bộ (hữu ích cho debug)
// const diskStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // Thư mục 'uploads' phải tồn tại ở gốc dự án
//   },
//   filename: function (req, file, cb) {
//     // Tạo tên file duy nhất: fieldname-timestamp.ext
//     cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
//   }
// });

// Bộ lọc file: Chỉ chấp nhận các loại ảnh phổ biến
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp|svg/;
  const mimetype = allowedTypes.test(file.mimetype);
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(new Error('Chỉ chấp nhận file ảnh có định dạng: jpeg, jpg, png, gif, webp'), false);
  }
};

// --- Khởi tạo Middleware Multer ---
const upload = multer({
  storage: storage, // Sử dụng memory storage đã định nghĩa ở trên
  limits: {
    fileSize: 5 * 1024 * 1024 // Giới hạn kích thước file (ví dụ: 5MB)
  },
  fileFilter: fileFilter
});

// Middleware để xử lý lỗi từ Multer (đặt sau route dùng upload)
const handleUploadError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        // Lỗi từ Multer (ví dụ: file quá lớn)
        console.error('Multer Error:', err.message);
        let message = 'Lỗi tải lên file.';
        if (err.code === 'LIMIT_FILE_SIZE') {
            message = 'File tải lên quá lớn (Tối đa 5MB).';
        }
         return res.status(400).json({ success: false, message });
    } else if (err) {
        // Lỗi khác (ví dụ: từ fileFilter)
        console.error('File Upload Error:', err.message);
        return res.status(400).json({ success: false, message: err.message || 'Loại file không hợp lệ.' });
    }
    // Nếu không có lỗi upload, tiếp tục
    next();
}

module.exports = upload;