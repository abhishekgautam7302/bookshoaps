// App.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminSidebar from '../../component/common/AdminSidebar';

const AdminBookSection = () => {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch books from API
    const fetchBooks = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/v1/books/get-all-books');
            if (response.data.success) {
                setBooks(response.data.books);
            }
        } catch (error) {
            console.error('Error fetching books:', error);
            setError('Failed to load books');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);


    const handleEdit = (bookId) => {
        navigate(`/dashboard/teacher/edit-books/${bookId}`);
    };

    // Status badge styling
    const getStatusBadge = (status) => {
        const statusStyles = {
            'Pending': 'bg-yellow-900 text-yellow-300',
            'Approved': 'bg-green-900 text-green-300',
            'Rejected': 'bg-red-900 text-red-300',
            'New': 'bg-green-900 text-green-300',
            'Good': 'bg-blue-900 text-blue-300',
            'Fair': 'bg-yellow-900 text-yellow-300'
        };

        return statusStyles[status] || 'bg-gray-700 text-gray-300';
    };

    // Condition badge styling
    const getConditionBadge = (condition) => {
        const conditionStyles = {
            'Like New': 'bg-green-900 text-green-300',
            'Good': 'bg-blue-900 text-blue-300',
            'Fair': 'bg-yellow-900 text-yellow-300'
        };

        return conditionStyles[condition] || 'bg-gray-700 text-gray-300';
    };

    if (loading) {
        return (
            <div className="flex min-h-screen bg-gray-50">
                <AdminSidebar />
                <div className="flex-1 p-6 flex items-center justify-center" style={{
                    background: 'linear-gradient(135deg, #0c0c2e 0%, #000033 50%, #000020 100%)'
                }}>
                    <div className="text-white text-xl">Loading books...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar Component */}
            <AdminSidebar />

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
                        <h1 className="text-3xl font-bold text-white">Book Management</h1>
                        <p className="text-gray-400 mt-2">Manage your book submissions</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="bg-gray-800 border border-gray-700 text-white p-3 rounded-xl hover:bg-gray-700 transition-colors">
                            🔔
                        </button>
                        <button className="bg-gray-800 border border-gray-700 text-white p-3 rounded-xl hover:bg-gray-700 transition-colors">
                            🔍
                        </button>
                    </div>
                </header>

                {error && (
                    <div className="bg-red-900 border border-red-700 text-red-300 px-4 py-3 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                {/* Books Section */}
                <div className="bg-gray-800 border border-gray-700 p-6 rounded-2xl mb-6">
                    {/* Section Header with Add Button */}
                    {/* Books Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-white">
                            {/* Table Header */}
                            <thead>
                                <tr className="border-b border-gray-700">
                                    <th className="text-left py-4 px-4 font-semibold text-gray-300">Book Title</th>
                                    <th className="text-left py-4 px-4 font-semibold text-gray-300">Author</th>
                                    <th className="text-left py-4 px-4 font-semibold text-gray-300">Condition</th>
                                    <th className="text-left py-4 px-4 font-semibold text-gray-300">Status</th>
                                    <th className="text-left py-4 px-4 font-semibold text-gray-300">Submitted Date</th>
                                    <th className="text-left py-4 px-4 font-semibold text-gray-300">Created By</th>
                                    <th className="text-left py-4 px-4 font-semibold text-gray-300">Actions</th>
                                </tr>
                            </thead>

                            {/* Table Body */}
                            <tbody>
                                {books.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="py-8 text-center text-gray-400">
                                            No books found. <Link to="/dashboard/student/add-books" className="text-blue-400 hover:text-blue-300">Add your first book</Link>
                                        </td>
                                    </tr>
                                ) : (
                                    books.map((book) => (
                                        <tr
                                            key={book._id}
                                            className="border-b border-gray-700 hover:bg-gray-750 transition-colors"
                                        >
                                            <td className="py-4 px-4">
                                                <div className="font-medium">{book.title}</div>
                                                {book.description && (
                                                    <div className="text-gray-400 text-sm mt-1 truncate max-w-xs">
                                                        {book.description}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="py-4 px-4 text-gray-300">{book.author}</td>

                                            <td className="py-4 px-4">
                                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getConditionBadge(book.condition)}`}>
                                                    {book.condition}
                                                </span>
                                            </td>

                                            <td className="py-4 px-4">
                                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(book.status)}`}>
                                                    {book.status || 'Pending'}
                                                </span>
                                            </td>

                                           <td className="py-4 px-4 text-gray-300">
                                                {new Date(book.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="py-4 px-4 text-gray-300">
                                                {(book?.user.name)}
                                            </td>

                                            <td className="py-4 px-4">
                                                <div className="flex gap-3">
                                                    {/* Edit Icon - Only show if status is Pending */}
                                                    
                                                        <button 
                                                            onClick={() => handleEdit(book._id)}
                                                            className="text-blue-400 hover:text-blue-300 transition-colors"
                                                            title="Edit Book"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                            </svg>
                                                        </button>                                                                                                                                                     
                                                 </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Table Footer */}
                    {books.length > 0 && (
                        <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-700">
                            <div className="text-gray-400 text-sm">
                                Showing {books.length} of {books.length} books
                            </div>
                            <div className="flex gap-2">
                                <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">
                                    Previous
                                </button>
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-gray-800 border border-gray-700 p-4 rounded-xl text-center">
                        <div className="text-2xl font-bold text-white">{books.length}</div>
                        <div className="text-gray-400 text-sm">Total Books</div>
                    </div>
                    <div className="bg-gray-800 border border-gray-700 p-4 rounded-xl text-center">
                        <div className="text-2xl font-bold text-yellow-400">
                            {books.filter(book => book.status === 'pending' || !book.status).length}
                        </div>
                        <div className="text-gray-400 text-sm">Pending</div>
                    </div>
                    <div className="bg-gray-800 border border-gray-700 p-4 rounded-xl text-center">
                        <div className="text-2xl font-bold text-green-400">
                            {books.filter(book => book.status === 'accepted').length}
                        </div>
                        <div className="text-gray-400 text-sm">Accepted</div>
                    </div>
                    <div className="bg-gray-800 border border-gray-700 p-4 rounded-xl text-center">
                        <div className="text-2xl font-bold text-red-400">
                            {books.filter(book => book.status === 'declined').length}
                        </div>
                        <div className="text-gray-400 text-sm">Declined</div>
                    </div>
                </div>

                {/* Status Legend */}
                <div className="bg-gray-800 border border-gray-700 p-4 rounded-xl">
                    <h3 className="text-white font-medium mb-3">Status Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                            <span className="text-gray-300">Pending - Waiting for admin approval</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                            <span className="text-gray-300">Accepted - Book is live in the system</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                            <span className="text-gray-300">Declined - Book was not approved</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminBookSection;