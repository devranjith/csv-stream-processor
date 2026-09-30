const fs = require('fs');

console.log("1. Start - Time:", new Date().toLocaleTimeString());

// CODE 2 - Async - Worker goes
console.log("2. Reading file ASYNC...");
fs.readFile('./non-blocking.js', (err, data) => {
  console.log("3. ASYNC Done - Time:", new Date().toLocaleTimeString());
});

console.log("4. End - Time:", new Date().toLocaleTimeString());