const e = require('express')
let mongoose = require('mongoose')
let userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String
    },
    coverPicture: {
        type: String
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other']
    },
    birthdate: {
        type: Date
    },
    socialMedia: {
        facebook: String,
        twitter: String,
        instagram: String,
        linkedin: String
    }

}, { timestamps: true })
module.exports = mongoose.model('User', userSchema)