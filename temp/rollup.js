function displayMessage() { 
   console.log("First script's imported module");
}

displayMessage();

let someFunc = (a) => { console.log(a); };

someFunc('First script');
console.log('Second script');
