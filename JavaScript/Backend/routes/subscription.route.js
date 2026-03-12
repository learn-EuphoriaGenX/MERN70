let express = require('express')
const { authenticate } = require('../middleware/auth.middleware')
const { createOrder, verifyPayment } = require('../controllers/subscription.controller')
let route = express.Router()
// Subscription ROutes 

route.post('/create-order', authenticate(['user', 'admin']), createOrder)
route.post('/verify-payment', authenticate(['user', 'admin']), verifyPayment)
route.post('/unsubscribe', authenticate(['user', 'admin']),)

module.exports = route