// models/Book.js
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    // Reference to the user who added the book
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Linked to the User model
      required: true,
    },

    // Book Title
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },

    // Book Author
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },

    // Physical Condition of the Book
    condition: {
      type: String,
      enum: ["Like New", "Good", "Fair"],
      required: [true, "Condition is required"],
    },

    // Uploaded Image (stored as path)
    image: {
      type: String,
      default: null,
    },

    // Optional Description
    description: {
      type: String,
      default: null,
      trim: true,
    },

    // Admin Review Status
    status: {
      type: String,
      enum: ["pending", "accepted", "declined"],
      default: "pending",
    },

    // Admin Message (if rejected or approved)
    message: {
      type: String,
      default: null,
      trim: true,
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt automatically
  }
);

// Optional: Hide internal Mongoose fields when returning JSON
bookSchema.methods.toJSON = function () {
  const book = this.toObject();
  delete book.__v;
  return book;
};

module.exports = mongoose.model("Book", bookSchema);
