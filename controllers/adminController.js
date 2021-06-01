const {User, Movie, View, Vote} = require('../models')
const {comparePassword} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')

class AdminController {

    static login(req, res, next) {
        User.findOne({
                where : {
                    email : req.body.email
                }
        })
        .then(data=>{;
            if(data && comparePassword(req.body.password, data.password)){
                let payload ={
                    id : data.id,
                    email : data.email
                }
                res.status(200).json({
                    ...payload,
                    access_token : generateToken(payload)
                })
            }
            else if(data && !comparePassword(req.body.password, data.password)){
                next({name : "400", message : "Invalid Email or Password"})
            }
            else if(req.body.email && !data){
                next({name : "400", message : "Invalid Email or Password"})
            }
            else {
                throw Error()
            }
        })
        .catch(err=>{
            next(err)
        })
    }

    static getAllMovies(req, res, next) {
        Movie.findAll()
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }

    static addMovie(req, res, next) {
        console.log('masuk add movie controller');
        let newMovie = {
            title: req.body.title,
            description: req.body.description,
            duration: req.body.duration,
            artists: req.body.artists,
            genres: req.body.genres,
            watchURL: req.body.watchURL
        }
        Movie.create(newMovie)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static showEditMovie(req, res, next) {
        Movie.findAll({
            where: {
                id : Number(req.params.id)
            }
        })
        .then(data => {
            res.status(200).json(data[0])
        }).catch(err => {
            next(err)
        })
    }

    // untuk mengupdate movie diharapkan dari front end get movie by ID terlebih dahulu
    static updateMovie(req, res, next) {
        console.log(req.body);
        let updatedMovie = {
            title: req.body.title,
            description: req.body.description,
            duration: req.body.duration,
            artists: req.body.artists,
            genres: req.body.genres,
            watchURL: req.body.watchURL
        }
        Movie.update(updatedMovie, {
            where : {
                id : Number(req.params.id)
            },
            returning: true
        }).then(data=>{
            res.status(200).json(data[1][0])
        }).catch(err=>{
            next(err)
        })
    }

    static deleteMovie(req, res, next) {
        Movie.destroy({
            where :{
                id : Number(req.params.id)
            }
        }).then(data=>{
            res.status(200).json({message: "Movie deletion success"})
        }).catch(err=>{
            next(err)
        })
    }

    // on client side just check the length to count the view
    static showAllView(req, res, next){
        Movie.findAll({
            include: [View]
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    // on client side just check the length to count the vote
    static showAllVote(req, res, next) {
        Movie.findAll({
            include: [Vote]
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = AdminController