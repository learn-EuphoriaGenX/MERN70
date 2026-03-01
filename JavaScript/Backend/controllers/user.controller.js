
let User = require('../models/user.model')
let { comparePassword, hashPassword } = require('../utils/password.utils')
let { generateToken, verifyToken } = require('../utils/jwt.utils')


module.exports.register = async (req, res) => {
    try {
        let { username, email, password } = req.body
        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" })
        }
        let alreadyExists = await User.findOne({ email: email })
        if (alreadyExists) {
            return res.status(400).json({ success: false, message: "User already exists" })
        }
        password = hashPassword(password)
        let newUser = await User.create({
            username,
            email,
            password
        })
        res.status(201).json({ success: false, message: "User registered successfully" })
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

module.exports.login = async (req, res) => {
    try {
        let { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" })
        }
        let user = await User.findOne({ email: email })
        if (!user) {
            return res.status(400).json({ success: false, message: "Email does'nt exists!" })
        }

        let isMatch = await comparePassword(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" })
        }
        let token = generateToken(user)
        return res.status(200).json({
            success: true, message: "Login successful",
            data: { user, token }
        })

    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

module.exports.getProfile = (req, res) => {
    try {
        let userId = req.user.userId;
        let token = req.headers.authorization
        let user = User.findById(userId).select("-password")
        res.status(200).json({
            success: true,
            message: "User profile fetched successfully",
            data: { user, token }
        })
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

module.exports.updateProfile = (req, res) => {
    try {
        let userId = req.user.userId;
        let user = User.findById(userId).select("-password")
        let token = req.headers.authorization
        let { username, phone, profilePicture, coverPicture } = req.body
        if (username) user.username = username
        if (phone) user.phone = phone
        if (profilePicture) user.profilePicture = profilePicture
        if (coverPicture) user.coverPicture = coverPicture
        user.save()
        res.status(200).json({
            success: true,
            message: "User profile updated successfully",
            data: { user, token }
        })
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

module.exports.deleteUser = (req, res) => {
    try {
        let userId = req.user.userId;
        User.findByIdAndDelete(userId)
        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        })
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}