const {User, Movie, Vote, View} = require('../models')
const {comparePassword} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')
const { Op } = require("sequelize");

class Controller {

    static register(req ,res ,next) {
        console.log('masuk register user');
        console.log(req.body);
        let obj = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
        User.create(obj)
        .then(data => {
            res.status(201).json({
                name: data.name,
                email: data.email
            })
        })
        .catch(err => {
            next(err)
        })
    }

    static login(req, res, next) {
        User.findOne({
                where: {
                    email: req.body.email
                }
            })
        .then(data => {
            if (data && comparePassword(req.body.password, data.password)) {
                console.log(data);
                let payload = {
                    id: data.id,
                    name: data.name,
                    email: data.email
                }
                res.status(200).json({
                    ...payload,
                    access_token: generateToken(payload)
                })
            }
            else if (data && !comparePassword(req.body.password, data.password)) {
                next({ name: "400", message: 'Invalid Email or Password' })
            }
            else if (!data) {
                next({ name: "400", message: 'Invalid Email or Password' })
            }
            else {
                throw Error()
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static getAllMovies(req, res, next) {
        Movie.findAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => { 
            next(err)
        })
    }

    static addVote(req, res, next) {

        let newVote = {
            MovieId : Number(req.params.id),
            UserId : req.currentUser.id
        }
        // menggunakan findOrCreate untuk mengantisipasi duplikasi vote
        Vote.findOrCreate({
            where: { 
                [Op.and]: [
                    { MovieId: Number(req.params.id) }, 
                    { UserId : req.currentUser.id }
                ],
            },
            defaults: newVote
        })
        .then(data => {
            console.log(data[0].isNewRecord);
            if(!data[0].isNewRecord) res.status(200).json({message: 'movie already voted'})
            res.status(201).json({message: `add vote to movie success: movieID${req.params.id}, userID${req.currentUser.id}`})
        })
        .catch(err => {
            next(err)
        })
    }

    static deleteVote(req, res, next) {
        Vote.destroy({
            where: {
                [Op.and]: [
                    { MovieId: Number(req.params.id) }, 
                    { UserId : req.currentUser.id }
                ]
            }
        })
        .then(data => {
            res.status(200).json({message: `unvote success`})
        })
        .catch(err => {
            next(err)
        })
    }

    // this view may take bigger space since it add every user id on database instead of just incrementing number (but better details and visibility)
    // (incrementing is another option)
    static addView(req, res ,next) {
        let newView = {
            MovieId : Number(req.params.id),
            UserId : req.currentUser.id
        }
        View.create(newView)
        .then(data => {
            res.status(201).json({message: "view added"})
        })
        .catch(err => {
            next(err)
        })
    }
}


module.exports = Controller