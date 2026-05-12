const express =  require('express')
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const app = express()
app.use(logger)
app.use(errorHandler)
app.use(express.json())


//Define the routes 
app.use('/api/investor', require('./routes/investorRoutes'))
app.use('/api/auth', require('./routes/authRoutes'))
app.listen(4000,()=> {
    console.log('Server is runnign')
})

