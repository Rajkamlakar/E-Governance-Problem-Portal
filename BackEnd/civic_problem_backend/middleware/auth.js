const jwt = require("jsonwebtoken");
const Officer = require("../models/Officer");

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized to access this route. Please login.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.officer = await Officer.findById(decoded.id);

    if (!req.officer || !req.officer.isActive) {
      return res.status(401).json({
        success: false,
        message: "Officer not found or account is inactive",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, token failed",
    });
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.officer.role)) {
      return res.status(403).json({
        success: false,
        message: `Role '${req.officer.role}' is not authorized`,
      });
    }
    next();
  };
};
