const express = require('express')
const router = express.Router()
const authenticate = require('../middlewares/auth')
const Controller = require('../controllers/controller')

router.post('/register', Controller.register)
router.post('/login', Controller.login)

router.get('/movie', authenticate, Controller.getAllMovies)
router.post('/movie/:id', authenticate, Controller.addVote)
router.delete('/movie/:id', authenticate, Controller.deleteVote)
router.post('/movie/:id/view', authenticate, Controller.addView)

module.exports = router