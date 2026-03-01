let express = require('express')
const { register, login, getProfile, updateProfile, deleteUser } = require('../controllers/user.controller')
const { authenticate } = require('../middleware/auth.middleware')
let route = express.Router()
// CRUD operations for user
route.post('/register', register)
route.get('/login', login)
route.get('/profile', authenticate(['user', 'admin']), getProfile)
route.put('/profile', authenticate(['user', 'admin']), updateProfile)
route.delete('/delete', authenticate(['user', 'admin']), deleteUser)

module.exports = route