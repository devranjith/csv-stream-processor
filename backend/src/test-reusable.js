const BulkProcessor = require('./bulkProcessor');

// 1. For LEADS - your jll use case
async function uploadLeads() {
  console.log("\n--- UPLOADING LEADS ---");
  const leadProcessor = new BulkProcessor({
    batchSize: 1000,
    onBatch: async (batch) => {
      // await db.collection('leads').insertMany(batch);
      // Simulate DB delay
      await new Promise(r => setTimeout(r, 10));
    }
  });
  await leadProcessor.process('./leads-50k.csv');
}

// 2. For CONTACTS - same class, no copy-paste!
async function uploadContacts() {
  console.log("\n--- UPLOADING CONTACTS (same class!) ---");
  const contactProcessor = new BulkProcessor({
    batchSize: 500, // Different batch size
    onBatch: async (batch) => {
      // await db.collection('contacts').insertMany(batch);
      await new Promise(r => setTimeout(r, 10));
    }
  });
  // Override parse if contacts CSV is different
  contactProcessor.parseLine = (line) => {
    const [name, email] = line.split(',');
    return { name, email };
  };
  await contactProcessor.process('./leads-50k.csv'); // Same file for demo
}

(async () => {
  await uploadLeads();
  await uploadContacts();
})();