const Book = require("../models/booksModel");
const User = require("../models/userModel");

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

        // Validate condition
        const validConditions = ["Like New", "Good", "Fair"];
        if (!validConditions.includes(condition)) {
            return res.status(400).json({
                success: false,
                message: "Invalid condition value. Allowed: Like New, Good, Fair",
            });
        }

        // Handle image upload
        const image = req.file ? `/uploads/${req.file.filename}` : null;

        // Create book
        const book = await Book.create({
            user: req.user.id,
            title,
            author,
            condition,
            image,
            description: description || null,
            status: "pending",
            message: null,
        });

        res.status(201).json({
            success: true,
            message: "Book added successfully",
            book,
        });
    } catch (err) {
        console.error("CreateBook Error:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// ================== GET ALL BOOKS ==================
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find()
            .populate("user", "name email")
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: books.length,
            books,
        });
    } catch (err) {
        console.error("GetAllBooks Error:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// ================== GET MY BOOKS ==================
const getMyBooks = async (req, res) => {
    try {
        const books = await Book.find({ user: req.user.id }).sort({ createdAt: -1 });

        res.json({
            success: true,
            count: books.length,
            books,
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

        const book = await Book.findById(id).populate("user", "name email");

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }

        res.json({
            success: true,
            book,
        });
    } catch (err) {
        console.error("GetBookById Error:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// ================== ADMIN GET BOOK BY ID ==================
const AdmingetBookById = async (req, res) => {
    try {
        const { id } = req.params;

        const book = await Book.findById(id).populate("user", "name email");

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }

        res.json({
            success: true,
            book,
        });
    } catch (err) {
        console.error("AdmingetBookById Error:", err);
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

        const validConditions = ["Like New", "Good", "Fair"];
        if (!validConditions.includes(condition)) {
            return res.status(400).json({
                success: false,
                message: "Invalid condition value. Allowed: Like New, Good, Fair",
            });
        }

        const image = req.file ? `/uploads/${req.file.filename}` : undefined;

        // Find and update (owned only)
        const book = await Book.findOne({ _id: id, user: req.user.id });

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found or not owned by you",
            });
        }

        book.title = title;
        book.author = author;
        book.condition = condition;
        book.description = description || null;
        if (image) book.image = image;

        await book.save();

        res.json({
            success: true,
            message: "Book updated successfully",
        });
    } catch (err) {
        console.error("UpdateBook Error:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// ================== ADMIN UPDATE BOOK ==================
const AdminUpdateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const { message, status } = req.body;

        if (!message || !status) {
            return res.status(400).json({
                success: false,
                message: "Message and Status are required",
            });
        }

        const book = await Book.findById({_id:id});

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }

        book.status = status;
        book.message = message;

        await book.save();

        res.json({
            success: true,
            message: "Book updated successfully",
        });
    } catch (err) {
        console.error("AdminUpdateBook Error:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// ================== DELETE BOOK ==================
const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;

        const book = await Book.findOne({ _id: id, user: req.user.id });

        if (!book) {
            return res.status(403).json({
                success: false,
                message: "Not allowed. Book not found or not owned by you.",
            });
        }

        await Book.findByIdAndDelete(id);

        res.json({
            success: true,
            message: "Book deleted successfully",
        });
    } catch (err) {
        console.error("DeleteBook Error:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

module.exports = {
    createBook,
    getAllBooks,
    getMyBooks,
    getBookById,
    AdmingetBookById,
    updateBook,
    AdminUpdateBook,
    deleteBook,
};
