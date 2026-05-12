// Import the necessary modules
const express = require('express')
const app = express()
app.use(express.json())

const userRoutes = require("./routes/userRoutes");
app.use("/", userRoutes);
//Define your apis 

app.get('/health',(request,response)=> {
    //Your server code here

    response.json({"message": "Health Ok"})
})

/*
    Query Parameters
    http://www.google.com/search?q=Who is Trump
*/
app.get('/stocks/list',(request,response)=> {
    const query = request.query['name']
    console.log(`Requested stock name is : ${query}`)
    response.json({
        "stocks": [
            "Apple",
            "Microsoft",
            "Facebook",
            "Indian Oil",
            "HAL",
            "Dominos"
        ]
    })
})

app.get('/stocks/:name/details',(request,response)=> {
    const name = request.params.name
    response.send(`Name is ${name}`)
})

app.post('/login',(request,response)=> {
    const email = request.body.email
    const password = request.body.password

    return response.send(`Logged in ${email}`)
})

// start the server
app.listen(3000,()=> {
    console.log('server running')
})