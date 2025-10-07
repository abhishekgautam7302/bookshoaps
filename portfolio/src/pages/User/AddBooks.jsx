// components/AddBook.js
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../component/common/Sidebar';
import toast from 'react-hot-toast';

const AddBooks = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        condition: '',
        description: ''
    });
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        
        // Clear error when user starts typing
        if (errors[e.target.name]) {
            setErrors(prev => ({
                ...prev,
                [e.target.name]: ''
            }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
            if (!validTypes.includes(file.type)) {
                setErrors(prev => ({
                    ...prev,
                    image: 'Please select a valid image file (JPEG, PNG, GIF)'
                }));
                return;
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setErrors(prev => ({
                    ...prev,
                    image: 'Image size should be less than 5MB'
                }));
                return;
            }

            setImage(file);
            setErrors(prev => ({
                ...prev,
                image: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        }

        if (!formData.author.trim()) {
            newErrors.author = 'Author is required';
        }

        if (!formData.condition) {
            newErrors.condition = 'Condition is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form before submission
        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            const submitData = new FormData();
            submitData.append('title', formData.title);
            submitData.append('author', formData.author);
            submitData.append('condition', formData.condition);
            submitData.append('description', formData.description);
            
            if (image) {
                submitData.append('image', image);
            }

            // IMPORTANT: Send FormData directly, not wrapped in an object
            const response = await axios.post('/api/v1/books/add-books', submitData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                // Add withCredentials if you're using cookies for authentication
                // withCredentials: true
            });

            // Axios wraps the response in data property
            if (response.data.success) {
                toast.success('Book added successfully!');
                navigate('/dashboard/student/books');
            } else {
                toast.error({ submit: response.data.message || 'Failed to add book' });
            }
        } catch (error) {
            toast.error('Error adding book:', error);
           
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar Component */}
            <Sidebar />

            {/* Main Content */}
            <div
                className="flex-1 p-6"
                style={{
                    background: 'linear-gradient(135deg, #0c0c2e 0%, #000033 50%, #000020 100%)'
                }}
            >
                {/* Header */}
                <header className="flex justify-between items-center mb-8 pb-6 border-b border-gray-700">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Add New Book</h1>
                        <p className="text-gray-400 mt-2">Add a new book to your inventory</p>
                    </div>
                    <button 
                        onClick={() => navigate('/dashboard/admin/books')}
                        className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        ← Back to Books
                    </button>
                </header>

                {/* Add Book Form */}
                <div className="bg-gray-800 border border-gray-700 p-6 rounded-2xl max-w-2xl mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Title Field */}
                        <div>
                            <label className="block text-white text-sm font-medium mb-2">
                                Book Title *
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.title ? 'border-red-500' : 'border-gray-600'
                                }`}
                                placeholder="Enter book title"
                            />
                            {errors.title && (
                                <p className="text-red-400 text-sm mt-1">{errors.title}</p>
                            )}
                        </div>

                        {/* Author Field */}
                        <div>
                            <label className="block text-white text-sm font-medium mb-2">
                                Author *
                            </label>
                            <input
                                type="text"
                                name="author"
                                value={formData.author}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.author ? 'border-red-500' : 'border-gray-600'
                                }`}
                                placeholder="Enter author name"
                            />
                            {errors.author && (
                                <p className="text-red-400 text-sm mt-1">{errors.author}</p>
                            )}
                        </div>

                        {/* Condition Field */}
                        <div>
                            <label className="block text-white text-sm font-medium mb-2">
                                Condition *
                            </label>
                            <select
                                name="condition"
                                value={formData.condition}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.condition ? 'border-red-500' : 'border-gray-600'
                                }`}
                            >
                                <option value="">Select Condition</option>
                                <option value="Like New">Like New</option>
                                <option value="Good">Good</option>
                                <option value="Fair">Fair</option>
                            </select>
                            {errors.condition && (
                                <p className="text-red-400 text-sm mt-1">{errors.condition}</p>
                            )}
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="block text-white text-sm font-medium mb-2">
                                Book Cover Image
                            </label>
                            <div className="flex items-center gap-4">
                                <label className="flex-1 cursor-pointer">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                    <div className="px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white text-center hover:bg-gray-600 transition-colors">
                                        {image ? 'Change Image' : 'Choose Image'}
                                    </div>
                                </label>
                                {image && (
                                    <span className="text-green-400 text-sm">
                                        {image.name}
                                    </span>
                                )}
                            </div>
                            {errors.image && (
                                <p className="text-red-400 text-sm mt-1">{errors.image}</p>
                            )}
                            <p className="text-gray-400 text-xs mt-2">
                                Supported formats: JPEG, PNG, GIF (Max 5MB)
                            </p>
                        </div>

                        {/* Description Field */}
                        <div>
                            <label className="block text-white text-sm font-medium mb-2">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows="4"
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter book description (optional)"
                            />
                        </div>

                        {/* Submit Button */}
                        {errors.submit && (
                            <div className="bg-red-900 border border-red-700 text-red-300 px-4 py-3 rounded-lg">
                                {errors.submit}
                            </div>
                        )}

                        <div className="flex gap-4 pt-4">
                            <button
                                type="button"
                                onClick={() => navigate('/dashboard/admin/books')}
                                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Adding Book...' : 'Add Book'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Quick Tips */}
                <div className="max-w-2xl mx-auto mt-6">
                    <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg">
                        <h3 className="text-white font-medium mb-2">📝 Quick Tips</h3>
                        <ul className="text-gray-400 text-sm space-y-1">
                            <li>• Fields marked with * are required</li>
                            <li>• Choose high-quality images for better presentation</li>
                            <li>• Provide accurate condition details for better user experience</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddBooks;