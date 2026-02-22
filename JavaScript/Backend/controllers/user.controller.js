
module.exports.login = (req, res) => {
    res.send("User Login Endpoint")
}

module.exports.register = (req, res) => {
    res.send("User Registration Endpoint")
}

module.exports.getProfile = (req, res) => {
    res.send("User Profile Endpoint")
}

module.exports.updateProfile = (req, res) => {
    res.send("Update User Profile Endpoint")
}

module.exports.deleteUser = (req, res) => {
    res.send("Delete User Endpoint")
}