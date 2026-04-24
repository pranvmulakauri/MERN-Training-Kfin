const task1Promise = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve('Task 1 success')
    },3000)
})
task1Promise
.then((value)=> {
    console.log(value)

})
.catch((error)=> {
    console.error(error)
})