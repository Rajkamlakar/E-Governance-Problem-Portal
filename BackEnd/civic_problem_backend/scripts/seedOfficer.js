// scripts/seedOfficer.js
// Run this script to create test officers
// Usage: node scripts/seedOfficer.js

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Officer = require("../models/Officer");

// Load env vars
dotenv.config();

// Connect to database
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });

const seedOfficers = async () => {
  try {
    // Check if officers already exist
    const existingOfficer = await Officer.findOne({ email: "admin@civic.com" });

    if (existingOfficer) {
      console.log("⚠️  Test officer already exists");
      console.log("Email: admin@civic.com");
      process.exit(0);
    }

    // Create test officer
    const officer = await Officer.create({
      name: "Admin Officer",
      email: "admin@civic.com",
      password: "admin123",
      employeeId: "ADMIN001",
      department: "Admin",
      ward: "Ward 1",
      role: "admin",
      isActive: true,
    });

    console.log("✅ Test officer created successfully!");
    console.log("-----------------------------------");
    console.log("Email: admin@civic.com");
    console.log("Password: admin123");
    console.log("Employee ID: ADMIN001");
    console.log("Department: Admin");
    console.log("Ward: Ward 1");
    console.log("Role: admin");
    console.log("-----------------------------------");
    console.log("⚠️  Please change the password after first login!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating officer:", error);
    process.exit(1);
  }
};

seedOfficers();