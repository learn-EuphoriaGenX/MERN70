
let bcrypt = require('bcryptjs')

module.exports.hashPassword = async (password) => {
    try {
        let salt = await bcrypt.genSalt(10)
        let hashedPassword = await bcrypt.hash(password, salt)
        return hashedPassword.toString()
    } catch (error) {
        throw new Error("Error hashing password")
    }
}

module.exports.comparePassword = async (password, hashedPassword) => {
    try {
        let isMatch = await bcrypt.compare(password, hashedPassword)
        return isMatch
    } catch (error) {
        throw new Error("Error comparing password")
    }
}