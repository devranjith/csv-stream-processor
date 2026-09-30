// leak.js - We are creating a real memory leak on purpose

let history = []; // This will keep growing forever

function realLeak() {
  setInterval(() => {
    // Every 1 sec, we push 1 MILLION strings
    // And closure holds `history` forever, so GC can't clean it
    const bigChunk = new Array(1000000).fill("lead-9876543210");
    history.push(bigChunk);
    
    const mem = Math.round(process.memoryUsage().heapUsed / 1024 / 1024);
    console.log(`History: ${history.length} | Memory: ${mem} MB`);
  }, 1000);
}

console.log("Starting leak... Watch Memory number");
realLeak();