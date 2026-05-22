import sqlite3  from "sqlite3";
export const database = new sqlite3.Database('ams.db',(error:any)=>{
    console.log('Hello')
})
