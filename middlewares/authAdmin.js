const {User} = require('../models')
const {verifyToken} = require('../helpers/jwt')

const authenticate = (req, res, next)=>{
    console.log('masuk authentication admin');
    console.log(req.headers);
    try {
        let {id, email} = verifyToken(req.headers.access_token)
        User.findByPk(id)
        .then(data=>{
            //harus ditambah if data dan elsenya jaga2 ada orang punya access_token id lain yang sudah dihapus
            req.currentUser = {
                id : data.id,
                email : data.email
            }
            next()
        })
        .catch(err=>{
            next({name:"401", message :"Authentication Error" })
        })

    } catch (error) {
        next({name : "401", message :"Access Token Error"})
    }
}

const authorize = (req, res, next)=>{

    User.findByPk(req.currentUser.id)
    .then(data=>{
        if (data && data.role === "admin"){
            next()
        }
        else if (data && data.role !== "admin"){
            next({name : "401", message : "you are not admin"})
        }
    })  
    .catch(err=>{
        next(err)
    })

}

module.exports = {
    authenticate,
    authorize
}