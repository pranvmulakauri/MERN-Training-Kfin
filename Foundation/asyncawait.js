async function openApp() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('App Opened')
    }, 3000);
  });
}

async function ViewMenuInApp() {
 return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Chineese & chats')
    }, 8000);
  });
}

async function makePayment() {
 return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Food Ordered')
    }, 1000);
  });
}

async function process() {
  const appOpened = await openApp();
  console.log(appOpened)
  const menuRead = await ViewMenuInApp();
  console.log(menuRead)
  const ordered = await makePayment();
  console.log(ordered)
}

process();
