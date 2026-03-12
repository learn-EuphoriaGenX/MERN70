
let User = require('../models/user.model')
let { comparePassword, hashPassword } = require('../utils/password.utils')
let { generateToken, verifyToken } = require('../utils/jwt.utils')
const { sendEmail } = require('../utils/mail.utils')


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
        password = await hashPassword(password)
        await User.create({
            username,
            email,
            password
        })
        res.status(201).json({ success: true, message: "User registered successfully" })
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

module.exports.sendOtp = async (req, res) => {
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

        // Generate a 6-digit OTP
        let otp = Math.floor(100000 + Math.random() * 900000).toString()
        user.otp = otp
        await user.save()

        // Send OTP to user's email
        let subject = "Your OTP for password login"
        let text = `Your OTP for login is: ${otp}`
        await sendEmail(email, subject, text)

        res.status(200).json({ success: true, message: "OTP sent to email successfully" })
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

module.exports.login = async (req, res) => {
    try {
        let { email, otp } = req.body

        if (!email || !otp) {
            return res.status(400).json({ success: false, message: "All fields are required" })
        }
        let user = await User.findOne({ email: email })
        if (!user) {
            return res.status(400).json({ success: false, message: "Email does'nt exists!" })
        }
        if (user.otp !== otp) {
            return res.status(400).json({ success: false, message: "Invalid OTP" })
        }

        let token = generateToken(user)
        user.otp = null;

        await user.save()
        return res.status(200).json({
            success: true, message: "Login successful",
            data: { user, token }
        })

    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

module.exports.getProfile = async (req, res) => {
    try {
        let userId = req.user.userId;
        let token = req.headers.authorization
        let user = await User.findById(userId).select("-password")

        res.status(200).json({
            success: true,
            message: "User profile fetched successfully",
            data: { user }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

module.exports.updateProfile = async (req, res) => {
    try {


        const profilePicture = req.files?.profilePicture?.[0]?.filename;
        const coverPicture = req.files?.coverPicture?.[0]?.filename;
        let userId = req.user.userId;
        let updateData = { ...req.body }

        if (profilePicture) {
            updateData.profilePicture = profilePicture
        }
        if (coverPicture) {
            updateData.coverPicture = coverPicture
        }
        let user = await User.findByIdAndUpdate(userId, updateData, { new: true }).select("-password")
        res.status(200).json({
            success: true,
            message: "User profile updated successfully",
            data: { user }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false });
    }
};

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