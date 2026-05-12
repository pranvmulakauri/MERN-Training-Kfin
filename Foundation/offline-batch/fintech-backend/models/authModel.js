const users = [
    {
        email:"akshay@gmail.com",
        password:"password"
    }
]
function checkUser(email){
const user = users.find((user) => user.email == email);
  if(user != undefined){
    return true
  }
  return false
}
function getUser(email){
const user = users.find((user) => user.email == email);
  return user
}

module.exports = {
    checkUser,
    getUser
}