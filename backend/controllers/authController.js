// controllers/authController.js
const pool = require("../config/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

// Utility: Generate JWT
const generateToken = (user) => {
    return jwt.sign(
        { 
            id: user.id,
            role: user.role // ADD THIS LINE - include role in token
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );
};

// ================== SIGNUP ==================
const signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Validate
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Check if email exists
        const [exists] = await pool.query("SELECT id FROM users WHERE email = ?", [email]);
        if (exists.length) {
            return res.status(400).json({ success: false, message: "Email already in use" });
        }

        // Hash password
        const saltRounds = parseInt(process.env.BCRYPT_SALT) || 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insert into DB
        const userRole = role && (role === "Teacher" || role === "Student") ? role : "Student";
        const [result] = await pool.query(
            "INSERT INTO users (name, email, password, role) VALUES (?,?,?,?)",
            [name, email, hashedPassword, userRole]
        );

        const newUser = {
            id: result.insertId,
            name: name,
            email: email,
            role: userRole
        };

        // Generate Token
        const token = generateToken(newUser);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token,
            user: newUser,
        });
    } catch (err) {
        console.error("Signup Error:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// ================== LOGIN ==================
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Find user
        const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
        if (!rows.length) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const user = rows[0];

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        // Generate Token
        const token = generateToken(user);

        res.json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

module.exports = { signup, login };
