const {User} = require('../models')
const {verifyToken} = require('../helpers/jwt')

const authenticate = (req, res ,next) =>{

    try {
        let {id, email} = verifyToken(req.headers.access_token)
        User.findByPk(id)
        .then(data=>{
            if (data){
                req.currentUser = {
                    id : data.id,
                    email : data.email
                }
                next()
            }
        })
        .catch(err=>{
            throw Error()
        })

    } catch (error) {
        next(error)        
    }

}

module.exports = authenticate