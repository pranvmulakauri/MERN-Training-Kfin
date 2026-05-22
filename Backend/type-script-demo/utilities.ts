interface Customer {
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
}
let bob2: Customer = {
  name: "Bob",
  email: "bob@gmail.com",
  phone: "123",
  age: 123,
  gender: "hello",
};

type genderFreeCustomer = Partial<Customer>;
let noGenBob: genderFreeCustomer = {
  name: "BOb",
  "phone": "123"
};

type publicCustomer = Pick<Customer, "name" | "email">;
let publicAk: publicCustomer = {
  name: "akshay",
  email: "akshay@gmail.com",
  //phone:"123"
}

type limitedCustomer = Omit<Customer, "gender">;
let bk: limitedCustomer = {
  name: "Bob",
  email: "bob@builder.com",
  phone: "",
  age: 10,
  gender: ""
};

type readCustomer = Readonly<Customer>;


let ak: publicCustomer = {
  name: "akshay",
  email: "hello",
};

let bob: readCustomer = {
  name: "Bob",
  email: "bob@builder.com",
  phone: "",
  age: 10,
  gender: "male",
};
bob.name = "AKshay"
