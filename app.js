require('dotenv').config()
const cors = require('cors')
const express = require('express')
const allRoutes = require('./routes')
const errorHandler = require('./middlewares/errorHandlers')
const app = express()
const PORT = 3000

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.use(allRoutes)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log('listening on port ',PORT);
})