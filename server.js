const express = require('express')
const app = express()
const port = 5001

app.use(express.json())

const apiRoutes = require('./routes/apiRoutes')
const connectDB = require('./config/db')

connectDB()

app.use('/api', apiRoutes)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))