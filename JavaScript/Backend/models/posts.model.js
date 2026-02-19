let mongoose = require('mongoose')
let postSchema = new mongoose.Schema({
    userType: {
        type: String,
        enum: ['user', 'anonymous'],
        default: 'user',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
    },
    tags: [String],
    category: {
        type: String,
        enum: ['technology', 'lifestyle', 'health', 'travel', 'food', 'education', 'entertainment', 'other']
    },
    comments: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },

            comment: {
                type: String,
                required: true,
            },

            createdAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    votes: {
        up: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        down: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    }
}, { timestamps: true })
module.exports = mongoose.model('Post', postSchema)