const fs = require('fs');
const readline = require('readline');
const express = require('express');
const router = express.Router();

// This is the HIGH-PERFORMANCE route
router.post('/upload-leads-stream', async (req, res) => {
  // For demo, we will stream a local file. In real prod, req is a stream itself.
  const filePath = './leads-50k.csv'; // We created yesterday
  
  const fileStream = fs.createReadStream(filePath); // 64KB at a time, not 50MB
  
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let batch = [];
  let totalProcessed = 0;
  let batchCount = 0;

  console.log("Starting stream upload... Memory at start:", 
    Math.round(process.memoryUsage().heapUsed / 1024 / 1024), "MB");

  for await (const line of rl) {
    // line = "lead-123,9876543210" - only 1 lead at a time!
    batch.push(line);

    // Batch of 1000, like NeoDove does - don't insert 1 by 1, it's slow
    if (batch.length === 1000) {
      batchCount++;
      totalProcessed += batch.length;
      
      // Simulate DB insert
      // await db.collection('leads').insertMany(batch); 
      
      const mem = Math.round(process.memoryUsage().heapUsed / 1024 / 1024);
      console.log(`Batch ${batchCount}: Inserted ${batch.length} | Total: ${totalProcessed} | Memory: ${mem} MB`);
      
      batch = []; // CRITICAL: Empty batch, GC can clean. Memory stays 12 MB
      
      // If you did history.push(batch) here, you'd be back to 203 MB leak!
    }
  }

  // Last remaining batch
  if (batch.length > 0) {
    totalProcessed += batch.length;
    console.log(`Final batch: ${batch.length}`);
  }

  res.json({ 
    message: `Done! Processed ${totalProcessed} leads with stream`,
    memory: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + " MB"
  });
});

module.exports = router;