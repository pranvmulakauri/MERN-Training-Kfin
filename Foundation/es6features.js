function greet(name = 'ghost'){
    return "Hello " + name
}
//arrow function
const bye = ()=> {
    return "Bye"
}

console.log(greet())
console.log(greet("akshay"))
name = 'bob'
console.log(`Hello ${name}
    bye`)