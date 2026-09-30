High-Performance CSV Ingestion Service

Solving Node.js memory leaks (203MB → 16MB) and Event Loop blocking for bulk file uploads.

A reusable streaming pipeline built with Node.js createReadStream + readline that processes 50k+ records without crashing production. Same class handles leads, contacts, invoices with 2-line config.

GitHub: github.com/devranjith/csv-stream-processor | Live Demo: Memory profiling with process.memoryUsage() + Clinic.js



🚨 The Problem (What Most Tutorials Miss)

Uploading 50k leads with readFileSync / readFile in production:

Event Loop Blocking: All other API calls freeze for 2-8 seconds
Memory Leak: 12MB → 203MB for 1 user, 1GB+ for 10 parallel users → OOM crash
Copy-paste: Separate 50-line files for leads, contacts, reports

✅ The Fix

Metric
Before (readFileSync)
After (BulkProcessor)
1 User (50k leads)
203MB, blocks loop 2s
16MB, non-blocking 1.2s
10 Parallel Users
1GB+, server crashes
45MB, stable
Code Reuse
150 lines (3 files)
70 lines (1 class)

🏗️ Architecture

CSV File (50MB) 
  → createReadStream (64KB chunks) 
  → readline (1 line at a time) 
  → parseLine() (override per CSV type)
  → batch[1000] 
  → onBatch(batch) → DB insert / API
  → batch = [] → GC cleans → Memory stays 16MB forever

Key Principles:
Stream + Backpressure: Never hold full file in memory
Batching: 1000 records = 50 DB calls instead of 50k
Open/Closed Principle: Extend via parseLine and onBatch, don't modify class
Dependency Injection: onBatch injects DB logic, class stays pure

🚀 Usage

1. Basic - Leads (id,phone)

const BulkProcessor = require('./bulkProcessor');

const processor = new BulkProcessor({
  batchSize: 1000,
  onBatch: async (batch) => {
    await db.collection('leads').insertMany(batch);
  },
  onProgress: ({ batchNo, total, memory }) => {
    console.log(`Batch ${batchNo}: ${total} done, Mem: ${memory}MB`);
  }
});

await processor.process('./leads-50k.csv');
// [Processor] Starting... Memory: 15 MB
//  Batch 1: 1000 | Total: 1000 | Mem: 16 MB
//  ...
// [Processor] Done! Total: 50000 | Time: 1.1s | Memory: 15 -> 17 MB

2. Reuse - Contacts (name,email) - Same Class!

const contactProcessor = new BulkProcessor({
  batchSize: 500,
  onBatch: async (batch) => db.collection('contacts').insertMany(batch)
});

// Only 2-line override for different CSV format
contactProcessor.parseLine = (line) => {
  const [name, email] = line.split(',');
  return { name, email };
};

await contactProcessor.process('./contacts.csv');

3. Reuse - Invoices (pipe-separated) - Same Class!

const invoiceProcessor = new BulkProcessor({
  batchSize: 2000,
  onBatch: async (batch) => db.collection('invoices').insertMany(batch)
});

invoiceProcessor.parseLine = (line) => {
  const [invoiceNo, amount, date] = line.split('|');
  return { invoiceNo, amount, date };
};

await invoiceProcessor.process('./invoices.csv');

🔍 How I Validated (No Guessing)

// Memory profiling - Real numbers from production test
console.log(`Memory: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB`);

// Parallel stress test - 10 users
Promise.all([...Array(10)].map(() => processor.process('./leads-50k.csv')))
// Before: 1GB+ → Crash
// After: 45MB → Stable

// Event Loop blocking detection
// node --trace-sync-io
// or: clinic doctor --on-port 'node test-reusable.js'

🧠 What I Learned (Fundamentals)

Sync vs Async: readFileSync blocks Event Loop, readFile + streams don't
Event Loop: Sync → Microtask (Promise) → Macrotask (setTimeout, readFile) → Timers vs Poll order matters
Memory Leak: cache.push(bigData) + uncleared setInterval → 12 → 203MB; Fix: clearInterval + DB + batch=[]
this Bug: function(){} creates new this → undefined, () => {} remembers outer this
Reusable Design: BulkProcessor class with batchSize, onBatch, parseLine override = Open/Closed + DI

📂 Project Structure

csv-stream-processor/
├── bulkProcessor.js      # Reusable class (70 lines, 1 class for all uploads)
├── test-reusable.js      # Demo: leads + contacts with same class
├── leads-50k.csv         # Test file (50k records, ~50MB)
├── streamUpload.js       # Step 1: Naive vs Stream comparison (203MB → 16MB)
├── this-bug.js           # Step 2: Lost `this` bug demo
└── README.md             # This file

🎯 Why This Matters for Production

If you're building B2B SaaS (like JLL, NeoDove), bulk upload is core feature. Naive implementation = 2 AM PagerDuty call when 10 sales reps upload at once. This implementation = sleeps well.

Built by Ranjith K - Full Stack Developer (Python, React, Node.js) - Learning to be a good software engineer, not just syntax.

🔗 Resume & Profile

Resume: Full Stack Developer - Python · React · Node.js
LinkedIn: linkedin.com/in/ranjith-k-94108257
Email: webdevranjith@gmail.com
