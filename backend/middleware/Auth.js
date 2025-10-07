const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// ======================
// 🔐 Verify JWT Token
// ======================
const authenticateToken = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Access token required" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Attach user info from decoded token
    // (It’s safer to fetch user from DB to confirm validity)
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user; // attach the full user object to the request
    next();
  } catch (err) {
    console.error("Auth Error:", err.message);
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};

// ======================
// 🎓 Check Student Role
// ======================
const isStudent = (req, res, next) => {
  if (req.user && req.user.role === "Student") {
    next();
  } else {
    return res
      .status(403)
      .json({ message: "Access denied. Student role required." });
  }
};

// ======================
// 👨‍🏫 Check Teacher Role
// ======================
const isTeacher = (req, res, next) => {
  if (req.user && req.user.role === "Teacher") {
    next();
  } else {
    return res
      .status(403)
      .json({ message: "Access denied. Teacher role required." });
  }
};

module.exports = {
  authenticateToken,
  isStudent,
  isTeacher,
};
