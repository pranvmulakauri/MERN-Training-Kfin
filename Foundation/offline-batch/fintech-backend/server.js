const express = require('express')
const router = require('./routes/authRoute')
const app = express()
app.use(express.json())
app.use('/auth',require('./routes/authRoute'))
app.listen(4000,()=> {
    console.log(`Server started`)
})