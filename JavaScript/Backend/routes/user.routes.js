let express = require('express')
const { register, login, getProfile, updateProfile, deleteUser } = require('../controllers/user.controller')
let route = express.Router()
// CRUD operations for user
route.post('/register', register)
route.get('/login', login)
route.get('/profile', getProfile)
route.put('/profile', updateProfile)
route.delete('/delete', deleteUser)

module.exports = route