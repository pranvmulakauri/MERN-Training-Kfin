const userModel = require('../models/userModel');

const getUsers = (request, response)=> {
    const users = userModel.getAllUsers();
    response.send(users)
}
module.exports = {
  getUsers
};