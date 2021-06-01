const jwt = require('jsonwebtoken')

const generateToken = (payload)=>{
    return jwt.sign(payload, process.env.JWT_SECRET_KEY)
}

const verifyToken = (token)=>{
    return jwt.verify(token, process.env.JWT_SECRET_KEY)
}

module.exports = {
    generateToken,
    verifyToken
}