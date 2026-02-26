const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Officer = require("../models/Officer");

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    const existingAdmin = await Officer.findOne({ email: "admin@civic.com" });
    if (existingAdmin) {
      console.log("⚠️  Admin already exists!");
      console.log("Email:", existingAdmin.email);
      process.exit(0);
    }

    const admin = await Officer.create({
      name: "Admin Officer",
      email: "admin@civic.com",
      password: "admin123",
      employeeId: "ADMIN001",
      department: "Admin",
      ward: "All",
      role: "admin",
      isActive: true,
    });

    console.log("✅ Admin officer created successfully!");
    console.log("------------------------");
    console.log("📧 Email:", admin.email);
    console.log("🔑 Password: admin123");
    console.log("👤 Role:", admin.role);
    console.log("------------------------");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

createAdmin();
