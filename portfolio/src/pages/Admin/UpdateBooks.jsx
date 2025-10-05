// components/EditBook.js
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminSidebar from '../../component/common/AdminSidebar';
import toast from 'react-hot-toast';

const UpdateBook = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        condition: '',
        description: '',
        status: '',
        message: ''
    });
    const [currentImage, setCurrentImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchBookData();
    }, [id]);

    const fetchBookData = async () => {
        try {
            setFetchLoading(true);
            const response = await axios.post(`/api/v1/books/admin/get-books/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.data.success) {
                const book = response.data.book;
                setCurrentImage(book.image ? `http://localhost:4000${book.image}` : '');
                setFormData({
                    title: book.title || '',
                    author: book.author || '',
                    condition: book.condition || '',
                    description: book.description || '',
                    status: book.status || '',
                    message: book.message || '',
                });
            } else {
                setErrors({ fetch: 'Failed to fetch book data' });
            }
        } catch (error) {
            console.error('Error fetching book:', error);
            setErrors({ fetch: 'Failed to fetch book data' });
        } finally {
            setFetchLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: '',
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { message, status } = formData;
            const response = await axios.put(`/api/v1/books/admin/status/${id}`, { message, status });
            if (response.data.success) {
                toast.success('Book updated successfully!');
                navigate('/dashboard/teacher/books');
            } else {
                setErrors({ submit: response.data.message || 'Failed to update book' });
            }
        } catch (error) {
            console.error('Error updating book:', error);
            setErrors({ submit: 'Failed to update book' });
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "accepted":
                return "text-green-400 bg-green-900/20 border-green-800";
            case "declined":
                return "text-red-400 bg-red-900/20 border-red-800";
            default:
                return "text-yellow-400 bg-yellow-900/20 border-yellow-800";
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

    if (fetchLoading) {
        return (
            <div className="flex min-h-screen bg-gray-950">
                <AdminSidebar />
                <div className="flex-1 flex flex-col items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                    <div className="text-gray-300 text-lg">Loading book data...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gray-950">
            <AdminSidebar />

            <div className="flex-1 p-6 lg:p-8 mt-16">
                {/* Header */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8 pb-6 border-b border-gray-800">
                    <div>
                        <h1 className="text-3xl lg:text-4xl font-bold text-white flex items-center gap-3">
                            <span className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-2xl">✏️</span>
                            Edit Book Status
                        </h1>
                        <p className="text-gray-400 mt-2">Update book approval status and add comments</p>
                    </div>
                    <button
                        onClick={() => navigate('/dashboard/student/books')}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 font-medium shadow-lg transition-all duration-200 hover:shadow-xl"
                    >
                        <span>←</span>
                        Back to Books
                    </button>
                </div>

                {/* Error Alert */}
                {errors.fetch && (
                    <div className="max-w-6xl mx-auto mb-6 bg-red-900/20 border border-red-800 text-red-200 px-6 py-4 rounded-xl flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <span className="text-xl">⚠️</span>
                            <span>{errors.fetch}</span>
                        </div>
                        <button
                            onClick={fetchBookData}
                            className="ml-4 bg-red-800 hover:bg-red-700 px-4 py-2 rounded-lg text-sm transition"
                        >
                            Retry
                        </button>
                    </div>
                )}

                {/* Main Content - Single Row Layout */}
                <div className="max-w-6xl mx-auto">
                    <div className="bg-gray-900/50 border border-gray-800 rounded-2xl shadow-xl p-6 lg:p-8 backdrop-blur-sm">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                            {/* Left Column - Book Details */}
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                    <span className="text-blue-400">📖</span>
                                    Book Information
                                </h2>

                                {/* Book Cover */}
                                {currentImage && (
                                    <div className="flex justify-center lg:justify-start">
                                        <div className="relative group">
                                            <img
                                                src={currentImage}
                                                alt="Book cover"
                                                className="w-48 h-64 object-cover rounded-xl border-2 border-gray-700 shadow-lg group-hover:border-blue-500 transition-all duration-300"
                                            />
                                            <div className="absolute inset-0 bg-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        </div>
                                    </div>
                                )}

                                {/* Book Details Grid */}
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                                        <label className="block text-sm font-semibold text-blue-400 mb-1">Title</label>
                                        <p className="text-white text-lg font-medium">{formData.title}</p>
                                    </div>

                                    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                                        <label className="block text-sm font-semibold text-blue-400 mb-1">Author</label>
                                        <p className="text-gray-200">{formData.author}</p>
                                    </div>

                                    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                                        <label className="block text-sm font-semibold text-blue-400 mb-1">Condition</label>
                                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-700 rounded-full">
                                            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                                            <span className="text-gray-200 text-sm capitalize">{formData.condition}</span>
                                        </div>
                                    </div>

                                    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                                        <label className="block text-sm font-semibold text-blue-400 mb-1">Current Status</label>
                                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${getStatusColor(formData.status)}`}>
                                            <span className="text-sm">{getStatusIcon(formData.status)}</span>
                                            <span className="text-sm font-medium capitalize">{formData.status || 'Pending'}</span>
                                        </div>
                                    </div>

                                    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                                        <label className="block text-sm font-semibold text-blue-400 mb-1">Description</label>
                                        <p className="text-gray-300 text-sm leading-relaxed">
                                            {formData.description || 'No description provided.'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Update Form */}
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                    <span className="text-blue-400">📋</span>
                                    Update Status
                                </h2>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Status Selection */}
                                    <div>
                                        <label className="block text-gray-200 text-md font-semibold mb-3">
                                            Approval Status <span className="text-red-400">*</span>
                                        </label>
                                        <select
                                            name="status"
                                            value={formData.status}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-4 rounded-xl bg-gray-800 border border-gray-700 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-md"
                                        >
                                            <option value="">Select Status</option>
                                            <option value="accepted" className="text-green-400">Accepted</option>
                                            <option value="declined" className="text-red-400">Declined</option>
                                        </select>
                                    </div>

                                    {/* Message Input */}
                                    <div>
                                        <label className="block text-gray-200 text-lg font-semibold mb-3">
                                            Message to User
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            rows="5"
                                            placeholder="Enter a message explaining your decision (optional)..."
                                            className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none text-lg"
                                        />
                                    </div>

                                    {/* Submit Error */}
                                    {errors.submit && (
                                        <div className="bg-red-900/20 border border-red-800 text-red-200 px-4 py-3 rounded-xl flex items-center gap-3">
                                            <span>⚠️</span>
                                            <span>{errors.submit}</span>
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                        <button
                                            type="button"
                                            onClick={() => navigate('/dashboard/student/books')}
                                            className="flex-1 px-6 py-4 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold shadow-lg transition-all duration-200 hover:shadow-xl"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="flex-1 px-6 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold shadow-lg transition-all duration-200 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                        >
                                            {loading ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                                                    Updating...
                                                </>
                                            ) : (
                                                <>
                                                    <span>💾</span>
                                                    Update Book Status
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateBook;