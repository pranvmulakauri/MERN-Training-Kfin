const express = require('express')
const app = express()
app.use(express.json())

//api code
app.get('/greet/:id',(request,response)=>{
    //server code
    const name = request.query.name;
    const id = request.params.id
    //const {name} = request.query;
    response.send(`Hello ${name} ${id}`)
})

app.post('/login/:role',(request,response)=>{
    const {email , password} = request.body;
    const {role} = request.params
    console.log(role)
    console.log(email)
    console.log(password)
    response.send(200)
})
app.listen(3000,()=>{
    console.log('Server started')
})
