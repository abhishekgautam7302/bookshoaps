import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/auth';

const AdminSidebar = () => {
    const [auth] = useAuth();
    const sidebarOpen = true; 

    return (
        <div
            className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white transition-all duration-300 flex flex-col w-80"
            style={{ minHeight: "100vh" }}
        >
            {/* Sidebar Header */}
            <div className="flex justify-between items-center p-5 border-b border-gray-700">
                <div className="flex items-center gap-3">
                    <span className="text-2xl">🛡️</span>
                    {sidebarOpen && (
                        <span className="text-xl font-bold">Admin Dashboard</span>
                    )}
                </div>
                <button
                    className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
                >
                    {sidebarOpen ? '◀' : '▶'}
                </button>
            </div>

            {/* User Profile */}
            <div className="p-5 border-b border-gray-700 flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-xl">
                    👤
                </div>
                {sidebarOpen && (
                    <div className="flex-1">
                        <h3 className="font-semibold text-sm">{auth?.user?.name}</h3>
                        <p className="text-gray-300 text-xs">{auth?.user?.email}</p>
                        <span className="inline-block mt-1 px-2 py-1 bg-gray-700 text-gray-200 text-xs rounded-full">
                            Administrator
                        </span>
                    </div>
                )}
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 py-4">
                <NavLink
                    to="/dashboard/teacher"
                    className={({ isActive }) => 
                        `w-full flex items-center gap-4 p-4 transition-colors ${
                            isActive 
                                ? 'bg-gray-700 border-r-4 border-white' 
                                : 'hover:bg-gray-800'
                        }`
                    }
                >
                    <span className="text-lg">📊</span>
                    {sidebarOpen && <span className="text-sm">Profile</span>}
                </NavLink>

                <NavLink
                    to="/dashboard/teacher/books"
                    className={({ isActive }) => 
                        `w-full flex items-center gap-4 p-4 transition-colors ${
                            isActive 
                                ? 'bg-gray-700 border-r-4 border-white' 
                                : 'hover:bg-gray-800'
                        }`
                    }
                >
                    <span className="text-lg">📂</span>
                    {sidebarOpen && <span className="text-sm">Books</span>}
                </NavLink>

               
            </nav>

            {/* Bottom Section */}
            <div className="p-4 border-t border-gray-700">
                <NavLink
                    to="/dashboard/teacher"
                    className={({ isActive }) => 
                        `w-full flex items-center gap-4 p-4 transition-colors rounded-xl ${
                            isActive 
                                ? 'bg-gray-700' 
                                : 'hover:bg-gray-800'
                        }`
                    }
                >
                    <span className="text-lg">👤</span>
                    {sidebarOpen && <span className="text-sm font-semibold">Admin Profile</span>}
                </NavLink>
                
                
            </div>
        </div>
    );
};

export default AdminSidebar;