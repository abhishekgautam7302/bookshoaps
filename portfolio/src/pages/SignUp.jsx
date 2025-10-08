import React, { useState } from 'react';
import {useLocation, useNavigate } from 'react-router';
import { useAuth } from '../context/auth.jsx';
import axios from 'axios';
import toast from 'react-hot-toast';
const BASE_URL = import.meta.env.VITE_BASE_URL;

const SignUp = () => {
    const navigate = useNavigate();
    const location = useLocation();
     const [auth, setAuth] = useAuth();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const { name, email, password } = formData;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match!');
            return;
        }

        try {
            const result = await axios.post(`${BASE_URL}/api/v1/auth/signup`, { name, email, password });

            if (result.data.success) {
                toast.success(result.data.message);
                setAuth({
                    user: result.data.user,
                    token: result.data.token,
                });
                localStorage.setItem('auth', JSON.stringify(result.data));

                // FIX: Redirect based on role and intended destination
                const intendedPath = location.state?.from ||
                    (result.data.user.role === "Teacher" ? "/dashboard/Teacher" : "/dashboard/Student");
                navigate(intendedPath, { replace: true });
            } else {
                toast.error(result.data.message || 'Sign up failed. Please try again.');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong. Please try again.');
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
            style={{
                background: 'linear-gradient(135deg, #0c0c2e 0%, #000033 50%, #000020 100%)'
            }}>


            {/* Ultra Glass Morphism Card */}
            <div className="relative w-full max-w-md z-10">
                {/* Card Glow Effect */}
                <div className="absolute -inset-4 bg-purple-500/20 rounded-3xl filter blur-3xl opacity-30 animate-pulse-slow"></div>

                <div className="backdrop-blur-3xl bg-white/8 rounded-3xl shadow-2xl border border-white/15 p-8 transform transition-all duration-500 mt-16">

                    {/* Animated Water Ripple Effect */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-400/5 via-transparent to-blue-400/5 animate-shimmer"></div>

                    {/* Inner Glow */}
                    <div className="absolute inset-0 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>

                    {/* Header */}
                    <div className="text-center mb-8 relative z-10">

                        <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-100 to-blue-100 bg-clip-text text-transparent filter drop-shadow-lg">
                            Create Account
                        </h2>
                        <p className="text-white/60 mt-3 text-lg">Join us today</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        {/* Full Name Input */}
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl filter blur-sm opacity-0"></div>
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-5 py-3 bg-white/10 border border-white/15 rounded-md text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-400/30 backdrop-blur-2xl transition-all duration-300 group-hover:bg-white/12 group-hover:border-white/20 relative z-10"
                            />
                            <div className="absolute right-5 top-1/2 transform -translate-y-1/2 text-white/50 group-hover:text-white/70 transition-colors duration-300 z-10 text-xl">
                                👤
                            </div>
                        </div>

                        {/* Email Input */}
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl filter blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-5 py-3 bg-white/10 border border-white/15 rounded-md text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-400/30 backdrop-blur-2xl transition-all duration-300 group-hover:bg-white/12 group-hover:border-white/20 relative z-10"
                            />
                            <div className="absolute right-5 top-1/2 transform -translate-y-1/2 text-white/50 group-hover:text-white/70 transition-colors duration-300 z-10 text-xl">
                                ✉️
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl filter blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full px-5 py-3 bg-white/10 border border-white/15 rounded-md text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-400/30 backdrop-blur-2xl transition-all duration-300 group-hover:bg-white/12 group-hover:border-white/20 relative z-10"
                            />
                            <div className="absolute right-5 top-1/2 transform -translate-y-1/2 text-white/50 group-hover:text-white/70 transition-colors duration-300 z-10 text-xl">
                                🔒
                            </div>
                        </div>

                        {/* Confirm Password Input */}
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl filter blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className="w-full px-5 py-3 bg-white/10 border border-white/15 rounded-md text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-400/30 backdrop-blur-2xl transition-all duration-300 group-hover:bg-white/12 group-hover:border-white/20 relative z-10"
                            />
                            <div className="absolute right-5 top-1/2 transform -translate-y-1/2 text-white/50 group-hover:text-white/70 transition-colors duration-300 z-10 text-xl">
                                🔒
                            </div>
                        </div>



                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-md font-semibold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 hover:from-purple-500 hover:to-blue-500 backdrop-blur-lg border border-white/20 relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                            <span className="relative z-10">Create Account</span>
                        </button>
                    </form>
                    {/* Footer */}
                    <div className="text-center mt-8 relative z-10">
                        <p className="text-white/50 text-sm">
                            Already have an account?{' '}
                            <a href="/login" className="text-purple-300 hover:text-blue-200 font-semibold transition-all duration-300 hover:underline bg-white/5 px-3 py-1 rounded-lg backdrop-blur-lg">
                                Sign in
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;