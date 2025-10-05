// App.js
import React, { useState } from 'react';
import Sidebar from '../../component/common/Sidebar';
import { useAuth } from '../../context/auth';


const UserDashboard = () => {
   const [auth]=useAuth();
    const userProfile = {
        name: auth?.user?.name,
        email: auth?.user?.email,
        avatar: '👨‍💼',
        role: 'Student'
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
                <header className="flex justify-between items-center mb-8 pb-6 border-b border-gray-700 mt-16">
                    <h1 className="text-3xl font-bold text-white">
                        Welcome back, {userProfile.name}!
                    </h1>
                   
                </header>

                {/* Profile Section */}
                <div className="bg-gray-800 border border-gray-700 p-6 rounded-2xl mb-6 mx-10 w-[40%] ">
                    <h2 className="text-2xl font-bold text-white mb-4">Profile Overview</h2>
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-3xl">
                            {userProfile.avatar}
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-white">{userProfile.name}</h3>
                            <p className="text-gray-400">{userProfile.email}</p>
                            <div className="flex items-center gap-4 mt-3">
                                <span className="bg-purple-600 text-purple-100 px-3 py-1 rounded-full text-sm">
                                    {userProfile.role}
                                </span>
                                
                            </div>
                        </div>
                       
                    </div>

                    
                </div>

                
            </div>
        </div>
    );
};

export default UserDashboard;