const cron = require('node-cron')
const Subscription = require('../models/subscription.model')
const User = require('../models/user.model')


// Schedule a cron job to run every day at midnight (12:00 AM)
let postUploadLimitResetJob = cron.schedule('0 0 * * *', async () => {
    try {
        console.log('Running daily post upload limit reset job...')

        const res = await User.updateMany(
            {},
            { $set: { currentPostCount: 0 } } // Reset current post count to 0
        )
        console.log(`Post upload limits reset for ${res.nModified} users.`)
    } catch (error) {
        console.error('Error resetting post upload limits:', error)
    }
})


let subscriptionStatusCheckJob = cron.schedule('0 0 * * *', async () => {
    try {
        console.log('Running daily subscription status check job...')
        const now = new Date()
        const subscriptions = await Subscription.find({ isActive: true })

        let expiredCount = 0

        for (let subscription of subscriptions) {
            if (subscription.endDate < now) {
                subscription.isActive = false
                subscription.planStatus = 'expired'
                await subscription.save()
                expiredCount++

                // Also reset user's post upload limit to free plan
                let user = await User.findById(subscription.userId)
                if (user) {
                    user.postUploadLimit = 1 // Reset to free plan limit
                    await user.save()
                }
            }
        }
        
        console.log(`Checked ${subscriptions.length} subscriptions. Marked ${expiredCount} as expired.`)
    } catch (error) {
        console.error('Error checking subscription statuses:', error)
    }
})

module.exports = {
    postUploadLimitResetJob,
    subscriptionStatusCheckJob
}
