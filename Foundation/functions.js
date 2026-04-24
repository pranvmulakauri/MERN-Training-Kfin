//you want the code to be executed sequentially even if it asynchronous code
console.log("Task 1");
setTimeout(() => {
  console.log("Task 2");
  setTimeout(() => {
    console.log("Task 3");
    setTimeout(() => {
      console.log("Task 4");
      setTimeout(() => {
        console.log("Task 5");
      }, 1000); // 2nd
    }, 8000);
  }, 2000);
}, 4000);
