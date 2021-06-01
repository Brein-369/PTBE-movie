const express = require('express')
const router = express.Router()
const {authenticate, authorize} = require('../middlewares/authAdmin')
const AdminController = require('../controllers/adminController')

router.post('/login', AdminController.login)

router.get('/movie', authenticate, authorize,AdminController.getAllMovies)
router.post('/movie',authenticate, authorize, AdminController.addMovie)
router.get('/movie/:id',authenticate, authorize, AdminController.showEditMovie)
router.put('/movie/:id',authenticate, authorize, AdminController.updateMovie)
router.delete('/movie/:id',authenticate, authorize, AdminController.deleteMovie)

router.get('/view', authenticate, authorize,AdminController.showAllView)
router.get('/vote',authenticate, authorize, AdminController.showAllVote)

module.exports = router