const { checkUser, getUser } = require("../models/authModel");

const login = (request,response)=>{
    //logic
      const { email, password } = request.body;
      //data has to be fetched
      if(checkUser(email)){
        const user = getUser(email)
        if(email == user.email && password == user.password){
            return response.json({'message': 'Login successful'})
        }
      } 
    return response.json();
}
const signup = (request,response)=> {
    return response.json()
}
module.exports = {
    login,
    signup
}