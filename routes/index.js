const express = require('express')
const router = express.Router()
const adminRoutes = require('./admin')
const userRoutes = require('./user')

router.use('/', adminRoutes)
router.use('/user', userRoutes)

module.exports = router