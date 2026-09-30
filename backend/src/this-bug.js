class LeadProcessor {
  constructor() {
    this.leads = ["lead-1", "lead-2"];
    this.count = 2;
  }

  process() {
    console.log("Processing", this.count, "leads");
  }

  // The BUG that every junior hits
  startWithBug() {
    setTimeout(function() {
      console.log("Bug version - this.leads:", this.leads); // What will this print?
      // this.count?
    }, 100);
  }

  startFixed() {
    setTimeout(() => {
      console.log("Fixed version - this.leads:", this.leads); // What will this print?
    }, 100);
  }
}

const p = new LeadProcessor();
p.process(); // Works: Processing 2 leads

p.startWithBug();  // What happens? Run it.
p.startFixed();    // What happens? Run it.