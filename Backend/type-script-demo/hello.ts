const username:string = "akshay"

let phone:string|number|undefined = "123123123"
phone = undefined
console.log(typeof(phone))

interface User {
    name:string,
    phone:number
}

const ak:User = {
    name:"akshay",
    phone:12321
}

interface Car{
    model:string,
    price:number,
    specifications:any
}
let cars:Car[] = []
cars.push({
    model:"SUV",
    price:123,
    specifications: {}
})
console.log(cars)

function add(num1:number,num2:number){
    let response:number = num1 + num2;
    return response
}