let jwt = require('jsonwebtoken')

module.exports.generateToken = (user) => {
    return jwt.sign(
        {
            username: user.username,
            userId: user._id,
            userEmail: user.email,
            userRole: user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    )
}

module.exports.verifyToken = (token) => {
    try {
        let decoded = jwt.verify(token, process.env.JWT_SECRET)
        return decoded
    } catch (error) {
        throw new Error("Invalid token")
    }
} 