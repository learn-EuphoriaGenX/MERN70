let jwt = require('jsonwebtoken')
let { verifyToken } = require('../utils/jwt.utils')

module.exports.authenticate = (role = []) => {
    return (req, res, next) => {
        try {
            let token = req.headers.authorization
            if (!token) {
                return res.status(401).json({ success: false, message: "Unauthorized" })
            }
            let decoded = verifyToken(token)
            if (role.length && !role.includes(decoded.userRole)) {
                return res.status(403).json({ success: false, message: "Forbidden" })
            }
            req.user = decoded
            next()
        } catch (error) {
            res.status(401).json({ success: false, message: "Unauthorized" })
        }
    }
}