// components/Home.js - Simplified Awesome Version
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Main = () => {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
            </div>

            <div className="text-center relative z-10">
                {/* Animated Book Icon */}
                <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'scale-100 rotate-0 opacity-100' : 'scale-50 rotate-45 opacity-0'}`}>
                    <div className="text-7xl animate-bounce hover:animate-spin cursor-pointer">📖</div>
                </div>

                {/* Title */}
                <h1 className={`text-4xl font-bold text-white mb-4 transition-all duration-700 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                    Book<span className="text-blue-400">Swap</span>
                </h1>

                {/* Subtitle */}
                <p className={`text-gray-300 mb-8 transition-all duration-700 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                    Manage your library with ease
                </p>

                {/* Login Button */}
                <button 
                    onClick={() => navigate("/login")}
                    className={`bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-blue-500/25 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                >
                    🚀 Start Reading
                </button>
            </div>

            {/* Floating Elements */}
            <div className="absolute bottom-10 text-gray-500 animate-pulse">
                Click the book to see magic!
            </div>
        </div>
    );
};

export default Main;