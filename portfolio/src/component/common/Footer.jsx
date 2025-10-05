// components/Footer.js
import React from 'react';

const Footer = () => {
    return (
        <footer className="py-6 bg-gradient-to-r from-gray-900 to-black border-t border-gray-800">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center space-y-4">
                    
                    {/* Animated Dots */}
                    <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-150"></div>
                        <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-300"></div>
                    </div>

                    {/* Main Footer Text */}
                    <div className="text-center">
                        <p className="text-gray-400 text-sm font-medium">
                            Your Digital Library Awaits
                        </p>
                        <p className="text-gray-500 text-xs mt-1">
                            Organize • Discover • Share
                        </p>
                    </div>

                    {/* Copyright */}
                    <div className="text-gray-600 text-xs">
                        © 2025 abhishke. All rights reserved.
                    </div>

                    
                </div>
            </div>
        </footer>
    );
};

export default Footer;