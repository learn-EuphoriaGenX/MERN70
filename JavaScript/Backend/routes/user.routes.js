let express = require('express')
const { register, login, getProfile, updateProfile, deleteUser, sendOtp } = require('../controllers/user.controller')
const { authenticate } = require('../middleware/auth.middleware')
const upload = require('../config/multer.config')
let route = express.Router()
// CRUD operations for user
route.post('/register', register)
route.post('/send-otp', sendOtp)
route.post('/login', login)
route.get('/profile', authenticate(['user', 'admin']), getProfile)
route.put(
    '/profile',
    authenticate(['user', 'admin']),
    upload.fields([
        { name: 'profilePicture', maxCount: 1 },
        { name: 'coverPicture', maxCount: 1 }
    ]),
    updateProfile
);
route.delete('/delete', authenticate(['user', 'admin']), deleteUser)

module.exports = route