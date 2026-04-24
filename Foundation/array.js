// //basic array declaration
 let cars = ['BMW','Nano','Bentley'];
console.log(cars)
// insert 
cars.push('Tiago')
cars.unshift('Baleno')
console.log(cars)
// Delete 
cars.pop()
cars.shift()
console.log(cars)

// //Inbuilt 
console.log(cars.length)
console.log(cars.indexOf('Mercedes'))
console.log(cars.indexOf('Nano'))

//Filter
//Filter is a iterator whre you can use it for iteration but 
//with return statement where size of the array changes
const filterResult = cars.filter((car)=> {
    if (car != 'Bentley'){
        return true
    }
})
console.log(filterResult)
//Map
// Map is also like a for loop where you can use it for iteration 
//with return statement where it returns **same size of an array**
const mapResult = cars.map((car)=> {
    if(car == 'BMW')
    {
        return true
    }else{
        return false
    }
})
console.log(mapResult)
//Foreach
// a for loop without index
// there is no return 
cars.forEach((car,index)=> {
    console.log(`Car is : ${car} present at ${index}`)
})


// Programming array -> same datatype 
//but in javascript dynamic data can be present in the same array
// dynamic typed language
const data = ['akshay',25,'bangalore','India',false]

//JSON -> JAVASCRIPT OBJECT NOTATION
const employee = {
    'name': "Akshay",
    "age": 20,
    "place": 'Bangalore'
}

//ES6 feature called as Spread operator 

//. operator -> access item in object
// ... spread operator 

cars = ['bmw','benz']
const affordable_cars=  [...cars,'Nano'];
console.log(affordable_cars)
