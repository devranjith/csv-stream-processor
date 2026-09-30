const fs = require('fs');
const readline = require('readline');

class BulkProcessor {
  constructor(options) {
    this.batchSize = options.batchSize || 1000;
    this.onBatch = options.onBatch; // What to do with each batch - DB insert, API call, etc.
    this.onProgress = options.onProgress || (() => {});
  }

  // This ONE method handles any file - leads, contacts, invoices, anything
  async process(filePath) {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

    let batch = [];
    let total = 0;
    let batchNo = 0;
    const startMem = Math.round(process.memoryUsage().heapUsed / 1024 / 1024);
    const startTime = Date.now();

    console.log(`[Processor] Starting ${filePath} | Memory: ${startMem} MB`);

    for await (const line of rl) {
      if (!line.trim()) continue; // skip empty lines
      batch.push(this.parseLine(line)); // parseLine can be overridden

      if (batch.length >= this.batchSize) {
        batchNo++;
        total += batch.length;
        await this.handleBatch(batch, batchNo, total);
        batch = []; // GC can clean - keeps 16 MB forever
      }
    }

    // last batch
    if (batch.length > 0) {
      batchNo++;
      total += batch.length;
      await this.handleBatch(batch, batchNo, total);
    }

    const endMem = Math.round(process.memoryUsage().heapUsed / 1024 / 1024);
    const time = (Date.now() - startTime) / 1000;
    console.log(`[Processor] Done! Total: ${total} | Time: ${time}s | Memory: ${startMem} -> ${endMem} MB`);

    return { total, time, memory: `${startMem} -> ${endMem} MB` };
  }

  // Override this if your CSV has different format
  parseLine(line) {
    // Default: "lead-123,9876543210" -> { id: 'lead-123', phone: '9876543210' }
    const [id, phone] = line.split(',');
    return { id, phone };
  }

  async handleBatch(batch, batchNo, total) {
    const mem = Math.round(process.memoryUsage().heapUsed / 1024 / 1024);
    console.log(` Batch ${batchNo}: ${batch.length} | Total: ${total} | Mem: ${mem} MB`);

    // Call user's function - this is where DB insert happens
    if (this.onBatch) {
      await this.onBatch(batch);
    }

    if (this.onProgress) {
      this.onProgress({ batchNo, total, memory: mem });
    }
  }
}

module.exports = BulkProcessor;