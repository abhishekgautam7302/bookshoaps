// controllers/bookController.js
const pool = require("../config/database");


// ================== CREATE BOOK ==================
const createBook = async (req, res) => {
    try {
        const { title, author, condition, description } = req.body;

        // Validate required fields
        if (!title || !author || !condition) {
            return res.status(400).json({
                success: false,
                message: "Title, Author, and Condition are required",
            });
        }

        // Validate condition against ENUM
        const validConditions = ["Like New", "Good", "Fair"];
        if (!validConditions.includes(condition)) {
            return res.status(400).json({
                success: false,
                message: "Invalid condition value. Allowed: Like New, Good, Fair",
            });
        }

        // Handle image upload
        const image = req.file ? `/uploads/${req.file.filename}` : null;

        // Insert book into DB with default status 'pending' and null message
        const [result] = await pool.query(
            `INSERT INTO books (user_id, title, author, \`condition\`, image, description, status, message) 
       VALUES (?, ?, ?, ?, ?, ?, 'pending', NULL)`,
            [req.user.id, title, author, condition, image, description || null]
        );

        res.status(201).json({
            success: true,
            message: "Book added successfully",
            book: {
                id: result.insertId,
                title,
                author,
                condition,
                image,
                description: description || null,
                status: 'pending', // Default status
                message: null // Default null message
            },
        });
    } catch (err) {
        console.error("CreateBook Error:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};



// ================== GET ALL BOOKS ==================
const getAllBooks = async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT b.*, u.name AS owner_name, u.email AS owner_email
       FROM books b 
       JOIN users u ON b.user_id = u.id
       ORDER BY b.created_at DESC`
        );

        res.json({
            success: true,
            count: rows.length,
            books: rows,
        });
    } catch (err) {
        console.error("GetAllBooks Error:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// ================== GET MY BOOKS ==================
const getMyBooks = async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT * FROM books 
       WHERE user_id = ? 
       ORDER BY created_at DESC`,
            [req.user.id]
        );

        res.json({
            success: true,
            count: rows.length,
            books: rows,
        });
    } catch (err) {
        console.error("GetMyBooks Error:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};



// ================== GET BOOK BY ID ==================
const getBookById = async (req, res) => {
    try {
        const { id } = req.params;

        const [rows] = await pool.query(
            `SELECT b.*, u.name AS owner_name, u.email AS owner_email
       FROM books b 
       JOIN users u ON b.user_id = u.id
       WHERE b.id = ?`,
            [id]
        );

        if (!rows.length) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }

        res.json({
            success: true,
            book: rows[0],
        });
    } catch (err) {
        console.error("GetBookById Error:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


const AdmingetBookById = async (req, res) => {
    try {
        const { id } = req.params;

        const [rows] = await pool.query(
            `SELECT b.*, u.name AS owner_name, u.email AS owner_email
       FROM books b 
       JOIN users u ON b.user_id = u.id
       WHERE b.id = ?`,
            [id]
        );

        if (!rows.length) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }

        res.json({
            success: true,
            book: rows[0],
        });
    } catch (err) {
        console.error("GetBookById Error:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// ================== UPDATE BOOK ==================
const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, condition, description } = req.body;

        // Validate required fields
        if (!title || !author || !condition) {
            return res.status(400).json({
                success: false,
                message: "Title, Author, and Condition are required",
            });
        }

        // Validate condition against ENUM
        const validConditions = ["Like New", "Good", "Fair"];
        if (!validConditions.includes(condition)) {
            return res.status(400).json({
                success: false,
                message: "Invalid condition value. Allowed: Like New, Good, Fair",
            });
        }

        // Handle image upload
        const image = req.file ? `/uploads/${req.file.filename}` : undefined;

        // Build update query
        let updateQuery = `UPDATE books SET title = ?, author = ?, \`condition\` = ?, description = ?`;
        let queryParams = [title, author, condition, description || null];

        // Add image to update if provided
        if (image) {
            updateQuery += `, image = ?`;
            queryParams.push(image);
        }

        updateQuery += ` WHERE id = ?`;
        queryParams.push(id);

        const [result] = await pool.query(updateQuery, queryParams);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }

        res.json({
            success: true,
            message: "Book updated successfully",
        });
    } catch (err) {
        console.error("UpdateBook Error:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


// ================== UPDATE BOOK ==================
const AdminUpdateBook = async (req, res) => {

    try {
        const { id } = req.params;
        const { title, author, condition, description ,message,status } = req.body;

        // Validate required fields
        if (!message|| !status) {
            return res.status(400).json({
                success: false,
                message: "message and status  are required",
            });
        }

        // Handle image upload
        const image = req.file ? `/uploads/${req.file.filename}` : undefined;

        // Build update query
        let updateQuery = `UPDATE books SET status = ?, message = ?`;
        let queryParams = [status,message || null];

  

        updateQuery += ` WHERE id = ?`;
        queryParams.push(id);

        const [result] = await pool.query(updateQuery, queryParams);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }

        res.json({
            success: true,
            message: "Book updated successfully",
        });
    } catch (err) {
        console.error("UpdateBook Error:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// ================== DELETE BOOK ==================
const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;

        // Check ownership
        const [rows] = await pool.query(
            `SELECT * FROM books WHERE id = ? AND user_id = ?`,
            [id, req.user.id]
        );

        if (!rows.length) {
            return res.status(403).json({
                success: false,
                message: "Not allowed. Book not found or not owned by you.",
            });
        }

        // Delete book
        await pool.query(`DELETE FROM books WHERE id = ?`, [id]);

        res.json({
            success: true,
            message: "Book deleted successfully",
        });
    } catch (err) {
        console.error("DeleteBook Error:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};



module.exports = { createBook, getAllBooks, getMyBooks, deleteBook, updateBook, getBookById,AdminUpdateBook,AdmingetBookById  };