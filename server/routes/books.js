const express = require("express");
const router = express.Router();
const { createBook, getAllBooks, getMyBooks, deleteBook, updateBook, getBookById } = require("../controllers/bookController");
const { authenticateToken ,isStudent, isTeacher } = require("../middleware/Auth");
const upload = require("../middleware/upload"); // your multer config
const { adminGetAllBooks } = require("../controllers/bookController");
const { updateBookStatus } = require("../controllers/bookController");
const { AdminUpdateBook } = require("../controllers/bookController");
const { AdmingetBookById } = require("../controllers/bookController");



// ---------------- BOOK ROUTES ----------------

router.get("/get-all-books",authenticateToken, getAllBooks);
router.get("/my-books", authenticateToken,isStudent, getMyBooks);
router.get('/get-books/:id', authenticateToken,isStudent, getBookById);
router.post("/add-books",authenticateToken,isStudent, upload.single("image"), createBook);
router.put('/edit-books/:id',authenticateToken,isStudent, upload.single('image'), updateBook);
router.delete("/delete/:id",authenticateToken,isStudent, authenticateToken, deleteBook);

// CORRECT - Match the frontend endpoints
router.put('/admin/status/:id', authenticateToken,isTeacher, AdminUpdateBook);
router.post('/admin/get-books/:id', authenticateToken,isTeacher, AdmingetBookById);

AdmingetBookById

module.exports = router;
