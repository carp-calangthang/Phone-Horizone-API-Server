// Import các module và thư viện cần thiết
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

// Tạo middleware validateToken bằng cách sử dụng express-async-handler
const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization; // Lấy giá trị của tiêu đề Authorization từ headers của yêu cầu, bao gồm cả 'Authorization' và 'authorization'
    console.log("Middleware validateToken is called");

    if (authHeader && authHeader.startsWith('Bearer')) { // Kiểm tra xem tiêu đề Authorization có tồn tại và có bắt đầu bằng 'Bearer' không
        token = authHeader.split(' ')[1]; // Nếu có, lấy token từ phần tử thứ hai trong chuỗi được phân chia bằng khoảng trắng

        if (!token) {
            return res.status(401).json({ message: 'User is not authorized or token is missing', ping: 'err401' });
        }

        try {           
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);  // Giải mã token và lấy thông tin được giải mã          
            req.user = decoded.username; // Lưu thông tin người dùng từ token vào request để sử dụng trong các xử lý tiếp theo
            next(); // Chuyển đến middleware hoặc controller tiếp theo
        } catch (err) {
            res.status(403).json({ message: 'Token is invalid or has expired', ping: 'err402' });
            throw new Error('Token is invalid or has expired');
        }   
    } else {
        res.status(401).json({ message: 'User is not authenticated or token is missing', ping: 'err401' });
        throw new Error('User is not authenticated or token is missing');
    }
});


module.exports = validateToken;
