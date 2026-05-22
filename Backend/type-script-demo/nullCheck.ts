//Null Saftey
let username: string | null | undefined = null;
let phone: string | null = null;

interface user {
  name?: string;
}
let ram:user = {
    name:null
};
//? = optional symbol
// ! = non null assurance check // bad practice if used when you know values is null
//username = null;
console.log(username!.toUpperCase());
console.log(username ?? "value is null")
console.log(ram.name);

/*
! non null assurance
? optional (it can be null)
?? null default assignment
*/
