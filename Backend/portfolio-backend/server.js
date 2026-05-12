const express = require('express')
const app = express()
app.use(express.json())

app.use('/api/investor',require('./routes/investorRoute'))
app.listen(3000,()=> {})