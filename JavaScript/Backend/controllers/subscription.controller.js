

const razorpayInstance = require('../config/razorpay.config')
const Subscription = require('../models/subscription.model')
const User = require('../models/user.model')
const crypto = require('crypto')

// create order to a plan
exports.createOrder = async (req, res) => {
    try {
        const { plan } = req.body
        const userId = req.user._id

        // Check if user already has an active subscription
        const existingSubscription = await Subscription.findOne({ userId, isActive: true })
        if (existingSubscription) {
            return res.status(400).json({ message: 'You already have an active subscription' })
        }


        let amount = 0;
        if (plan === 'basic') {
            amount = 59
        } else if (plan === 'pro') {
            amount = 199
        } else if (plan === 'premium') {
            amount = 299
        }


        const options = {
            amount: amount * 100, // Amount in paise
            currency: 'INR',
            receipt: `receipt_${userId}_${Date.now()}`
        }

        const order = await razorpayInstance.orders.create(options)

        return res.status(200).json({ message: 'Order created successfully', order })
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

// Verify payment and activate subscription
exports.verifyPayment = async (req, res) => {
    try {
        const {
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
            plan
        } = req.body
        const userId = req.user._id

        const body = razorpayOrderId + '|' + razorpayPaymentId

        const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest('hex')

        if (expectedSignature !== razorpaySignature) {
            return res.status(400).json({ message: 'Invalid payment signature', success: false })
        }

        // Activate subscription
        const subscription = new Subscription({
            userId,
            plan,
            startDate: new Date(),
            endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)), // 1 month subscription
            isActive: true,
            planStatus: 'active',
            razorpayPaymentId,
            razorpayOrderId
        })
        await subscription.save()

        let user = await User.findById(userId)
        if (plan === 'basic') {
            user.postUploadLimit = 5
        } else if (plan === 'pro') {
            user.postUploadLimit = 20
        } else if (plan === 'premium') {
            user.postUploadLimit = 100
        }
        await user.save()

        return res.status(200).json({ message: 'Payment verified and subscription activated', data: subscription })

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}


// Unsubscribe from a plan
exports.unsubscribe = async (req, res) => {
    try {
        const userId = req.user._id
        // Find active subscription
        const subscription = await Subscription.findOne({ userId, isActive: true })
        if (!subscription) {
            return res.status(400).json({ message: 'No active subscription found' })
        }


        // Update subscription to inactive
        subscription.isActive = false
        subscription.endDate = new Date() // Set end date to now
        subscription.planStatus = 'cancelled'
        await subscription.save()

        let user = await User.findById(userId)
        user.postUploadLimit = 1 // Reset to free plan limit
        await user.save()

        res.status(200).json({ message: 'Unsubscribed successfully', subscription })
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}