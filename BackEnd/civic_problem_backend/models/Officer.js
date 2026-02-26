const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const officerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
    employeeId: {
      type: String,
      required: true,
      unique: true,
    },
    department: {
      type: String,
      required: true,
      enum: ["Roads", "Water", "Electricity", "Sanitation", "Parks", "Admin"],
    },
    ward: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["officer", "supervisor", "admin"],
      default: "officer",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
officerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password
officerSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Officer", officerSchema);
