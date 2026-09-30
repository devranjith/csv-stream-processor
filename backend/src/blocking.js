const fs = require('fs');

console.log("1. Start - Time:", new Date().toLocaleTimeString());

// CODE 1 - Sync - You go to storeroom
console.log("2. Reading file SYNC...");
const data = fs.readFileSync('./blocking.js'); // Reading itself
console.log("3. SYNC Done - Time:", new Date().toLocaleTimeString());

console.log("4. End");