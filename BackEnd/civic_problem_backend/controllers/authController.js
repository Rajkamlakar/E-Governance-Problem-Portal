const jwt = require("jsonwebtoken");
const Officer = require("../models/Officer");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    const officer = await Officer.findOne({ email }).select("+password");

    if (!officer) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (!officer.isActive) {
      return res.status(401).json({
        success: false,
        message: "Your account is inactive. Please contact administrator.",
      });
    }

    const isPasswordMatch = await officer.comparePassword(password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        id: officer._id,
        name: officer.name,
        email: officer.email,
        employeeId: officer.employeeId,
        department: officer.department,
        ward: officer.ward,
        role: officer.role,
        token: generateToken(officer._id),
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, employeeId, department, ward, role } =
      req.body;

    if (!name || !email || !password || !employeeId || !department || !ward) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const officerExists = await Officer.findOne({
      $or: [{ email }, { employeeId }],
    });

    if (officerExists) {
      return res.status(400).json({
        success: false,
        message: "Officer with this email or employee ID already exists",
      });
    }

    const officer = await Officer.create({
      name,
      email,
      password,
      employeeId,
      department,
      ward,
      role: role || "officer",
    });

    res.status(201).json({
      success: true,
      message: "Officer registered successfully",
      data: {
        id: officer._id,
        name: officer.name,
        email: officer.email,
        employeeId: officer.employeeId,
        department: officer.department,
        ward: officer.ward,
        role: officer.role,
        token: generateToken(officer._id),
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during registration",
    });
  }
};

exports.getMe = async (req, res) => {
  try {
    const officer = await Officer.findById(req.officer.id);
    res.status(200).json({
      success: true,
      data: officer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.logout = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};
