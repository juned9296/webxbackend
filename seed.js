
const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function seed() {
  try {
    await client.connect();
    const db = client.db("webxDB");

    // Projects data
    const projects = [
      {
        title: "Event Management System",
        description: "A full-featured event management platform with ticket booking and scheduling.",
        stack: ["React", "Node.js", "Express", "MongoDB"],
        price: 499,
        demoLink: "https://demo.webxlearner.com/event-management",
        sourceCode: "https://github.com/webx/event-management"
      },
      {
        title: "Restaurant Management System",
        description: "Role-based system with inventory, orders, and finance tracking.",
        stack: ["Next.js", "Redux Toolkit", "Tailwind CSS", "Node.js"],
        price: 999,
        demoLink: "https://demo.webxlearner.com/restaurant-management",
        sourceCode: "https://github.com/webx/restaurant-management"
      }
    ];

    // Support data
    const support = {
      email: "support@webxlearner.com",
      whatsapp: "+91 9643187413",
      telegram: "https://t.me/webxsupport"
    };

    // WebX message
    const message = {
      message: "Video pasand aayi ho to subscribe kar lo!"
    };

    // Insert data
    await db.collection("projects").deleteMany({});
    await db.collection("projects").insertMany(projects);

    await db.collection("support").deleteMany({});
    await db.collection("support").insertOne(support);

    await db.collection("webx").deleteMany({});
    await db.collection("webx").insertOne(message);

    console.log("✅ Database seeded successfully!");
  } catch (err) {
    console.error("❌ Error seeding database:", err);
  } finally {
    await client.close();
  }
}

seed();
