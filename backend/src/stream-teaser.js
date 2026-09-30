const fs = require('fs');

// First, create a dummy 50k leads file
const write = fs.createWriteStream('leads-50k.csv');
for(let i=0; i<50000; i++) write.write(`lead-${i},9876543210\n`);
write.end();
console.log("Created 50k file");

// NOW THE MAGIC - Stream reading
const readStream = fs.createReadStream('leads-50k.csv'); // Does NOT load file, just opens tap

let count = 0;
readStream.on('data', (chunk) => {
  // chunk is only 64KB, not 50MB!
  count++;
  const mem = Math.round(process.memoryUsage().heapUsed / 1024 / 1024);
  console.log(`Chunk ${count}: ${chunk.length} bytes | Memory: ${mem} MB`);
});

readStream.on('end', () => {
  console.log("Done! 50k leads processed, but memory never went to 203 MB");
});