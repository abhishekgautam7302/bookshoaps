// components/ViewBook.js
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../component/common/Sidebar";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const ViewBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [currentImage, setCurrentImage] = useState('');
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchBookData();
    }, [id]);

    const fetchBookData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${BASE_URL}/api/v1/books/get-books/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.success) {
                const book = response.data.book;
                setCurrentImage(book.image ? `https://bookshoaps-3.onrender.com${book.image}` : '');
                setFormData({
                    title: book.title || '',
                    author: book.author || '',
                    condition: book.condition || '',
                    description: book.description || '',
                    status: book.status,
                    message: book.message
                });
            } else {
                setError("Failed to fetch book details");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "accepted":
                return "bg-green-900/30 text-green-400 border-green-800";
            case "declined":
                return "bg-red-900/30 text-red-400 border-red-800";
            default:
                return "bg-yellow-900/30 text-yellow-400 border-yellow-800";
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "accepted":
                return "✅";
            case "declined":
                return "❌";
            default:
                return "⏳";
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen bg-gray-950">
                <Sidebar />
                <div className="flex-1 flex flex-col items-center justify-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                    <div className="text-gray-300 text-lg font-medium">
                        Loading book details...
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen bg-gray-950">
                <Sidebar />
                <div className="flex-1 flex items-center justify-center p-8">
                    <div className="bg-red-900/20 border border-red-800 text-red-200 px-8 py-6 rounded-xl shadow-lg max-w-md w-full text-center">
                        <div className="text-4xl mb-3">⚠️</div>
                        <h3 className="text-xl font-semibold mb-2">Error Loading Book</h3>
                        <p className="text-red-300">{error}</p>
                        <button
                            onClick={() => navigate(-1)}
                            className="mt-4 px-6 py-2 bg-red-800 hover:bg-red-700 text-white rounded-lg transition duration-200"
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gray-950">
            <Sidebar />

            <div className="flex-1 p-6 lg:p-8 mt-16">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-gray-800">
                    <div>
                        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                            <span className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-2xl">📖</span>
                            Book Details
                        </h1>
                        <p className="text-gray-400 mt-2">Complete information about the book</p>
                    </div>
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 font-medium shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
                    >
                        <span>←</span>
                        Back to List
                    </button>
                </div>

                {/* Main Content */}
                <div className="max-w-4xl mx-auto">
                    {/* Book Card */}
                    <div className="bg-gray-900/50 border border-gray-800 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-sm">
                        {/* Status Banner */}
                        <div className={`px-6 py-4 border-b ${getStatusColor(formData?.status)}`}>
                            <div className="flex items-center gap-3">
                                <span className="text-xl">{getStatusIcon(formData?.status)}</span>
                                <div>
                                    <h3 className="font-semibold">Status: {formData?.status?.toUpperCase() || "PENDING"}</h3>
                                    {formData?.message && (
                                        <p className="text-sm opacity-90 mt-1">{formData.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="p-6 lg:p-8">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Book Cover Section */}
                                <div className="lg:col-span-1 flex justify-center">
                                    <div className="relative group">
                                        {currentImage ? (
                                            <img
                                                src={currentImage}
                                                alt={formData?.title}
                                                className="w-48 h-64 lg:w-56 lg:h-80 object-cover rounded-2xl shadow-2xl border-2 border-gray-700 group-hover:border-blue-500 transition-all duration-300 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-48 h-64 lg:w-56 lg:h-80 bg-gray-800 rounded-2xl flex items-center justify-center border-2 border-gray-700">
                                                <span className="text-6xl text-gray-600">📚</span>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                </div>

                                {/* Book Details Section */}
                                <div className="lg:col-span-2">
                                    <div className="space-y-6">
                                        {/* Title */}
                                        <div className="bg-gray-800/30 rounded-2xl p-5 border border-gray-700/50">
                                            <label className="block text-sm font-semibold text-blue-400 mb-2 uppercase tracking-wide">
                                                Title
                                            </label>
                                            <h2 className="text-2xl font-bold text-white">{formData?.title}</h2>
                                        </div>

                                        {/* Author */}
                                        <div className="bg-gray-800/30 rounded-2xl p-5 border border-gray-700/50">
                                            <label className="block text-sm font-semibold text-blue-400 mb-2 uppercase tracking-wide">
                                                Author
                                            </label>
                                            <p className="text-xl text-gray-200 font-medium">{formData?.author}</p>
                                        </div>

                                        {/* Condition & Status Grid */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="bg-gray-800/30 rounded-2xl p-5 border border-gray-700/50">
                                                <label className="block text-sm font-semibold text-blue-400 mb-2 uppercase tracking-wide">
                                                    Condition
                                                </label>
                                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-700/50 rounded-full">
                                                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                                                    <span className="text-gray-200 font-medium capitalize">{formData?.condition}</span>
                                                </div>
                                            </div>

                                            <div className="bg-gray-800/30 rounded-2xl p-5 border border-gray-700/50">
                                                <label className="block text-sm font-semibold text-blue-400 mb-2 uppercase tracking-wide">
                                                    Current Status
                                                </label>
                                                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${getStatusColor(formData?.status)}`}>
                                                    <span className="text-lg">{getStatusIcon(formData?.status)}</span>
                                                    <span className="font-medium capitalize">{formData?.status || "Pending"}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <div className="bg-gray-800/30 rounded-2xl p-5 border border-gray-700/50">
                                            <label className="block text-sm font-semibold text-blue-400 mb-2 uppercase tracking-wide">
                                                Description
                                            </label>
                                            <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                                                {formData?.description || "No description provided."}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Info Box */}
                    <div className="mt-8 bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-6 shadow-lg">
                        <div className="flex items-start gap-4">
                            <div className="bg-blue-500/20 p-3 rounded-2xl">
                                <span className="text-2xl">💡</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-2">Read-Only View</h3>
                                <p className="text-gray-400">
                                    This page displays the book information in read-only mode. To make changes to this book, 
                                    please navigate to the <span className="text-blue-400 font-medium">Edit Book</span> section 
                                    from the main books list.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewBook;