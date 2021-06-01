const bcrypt = require('bcrypt')

const hashPassword = (password) =>{
    return bcrypt.hashSync(password,10)
}

const comparePassword = (inputPassword, hashPass)=>{
    return bcrypt.compareSync(inputPassword,hashPass)
}

module.exports = {
    hashPassword,
    comparePassword
}