import express from 'express'
import {logger} from './middleware/logger'
import { errorHandler } from './middleware/errorHandler'
import { investorRouter } from './routes/investorRoutes'
import { router } from './routes/authRoutes'
export const app = express()
app.use(logger)
app.use(errorHandler)
app.use(express.json())


//Define the routes 
app.use('/api/investor', investorRouter)
app.use('/api/auth', router)
app.listen(4000,()=> {
    console.log('Server is runnign')
})


