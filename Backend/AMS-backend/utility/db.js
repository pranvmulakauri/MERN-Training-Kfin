const sqlite3 = require('sqlite3');

const database = new sqlite3.Database('ams.db',(error,data)=>{
    console.log('Hello')
})
module.exports = database;