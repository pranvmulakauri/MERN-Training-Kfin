//Generics in Typescript
// function identity(value:any): any{
//     return value
// }

// const result = identity("Akshay");
// const result2 = identity(111)
// result.toFixed(2)

function identity<T>(value: T) {
  return value
}
const result = identity("Akshay");
const result2 = identity(111)
result2.toFixed(2)

type ApiResponse <T> = {
  success: boolean;
  data: T; // {}
}

type body = {
  status: number;
  message: string;
  data : any, 
}

const response: ApiResponse<body> = {
  success: true,
  data: {
    status: 200,
    message: 'Hello',
    data: null
  }
}

console.log(response.success);