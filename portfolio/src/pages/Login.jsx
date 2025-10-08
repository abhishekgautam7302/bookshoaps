import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router';
import { useAuth } from '../context/auth.jsx';
import axios from 'axios';
import toast from 'react-hot-toast';



const BASE_URL = import.meta.env.VITE_BASE_URL;
const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [auth, setAuth] = useAuth();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const { email, password } = formData;
  

    console.log(BASE_URL)



    // FIX: Get intended destination or default dashboard based on role
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post(`${BASE_URL}/api/v1/auth/login`, { email, password });

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
                toast.error(result.data.message || 'Login failed. Please try again.');
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
                <div className="absolute -inset-4 bg-blue-500/20 rounded-3xl filter blur-3xl opacity-30 animate-pulse-slow"></div>

                <div className="backdrop-blur-3xl bg-white/8 rounded-3xl shadow-2xl border border-white/15 p-8 transform transition-all duration-500 ">

                    {/* Animated Water Ripple Effect */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/5 via-transparent to-purple-400/5 animate-shimmer"></div>

                    {/* Inner Glow */}
                    <div className="absolute inset-0 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>

                    {/* Header */}
                    <div className="text-center mb-8 relative z-10">
                        <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent filter drop-shadow-lg">
                            Welcome Back
                        </h2>
                        <p className="text-white/60 mt-3 text-lg">Sign in to your account</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        {/* Email Input */}
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl filter blur-sm opacity-0 group-hover:opacity-800 transition-opacity duration-300"></div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-5 py-4 bg-white/10 border border-white/15 rounded-md text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/40 focus:border-blue-400/30 backdrop-blur-2xl transition-all duration-300 group-hover:bg-white/12 group-hover:border-white/20 relative z-10"
                            />
                            <div className="absolute right-5 top-1/2 transform -translate-y-1/2 text-white/50 group-hover:text-white/70 transition-colors duration-300 z-10 text-xl">
                                ✉️
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl filter blur-sm opacity-0"></div>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full px-5 py-4 bg-white/10 border border-white/15 rounded-md text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/40 focus:border-blue-400/30 backdrop-blur-2xl transition-all duration-300 group-hover:bg-white/12 group-hover:border-white/20 relative z-10"
                            />
                            <div className="absolute right-5 top-1/2 transform -translate-y-1/2 text-white/50 group-hover:text-white/70 transition-colors duration-300 z-10 text-xl">
                                🔒
                            </div>
                        </div>

                        {/* Options */}
                        <div className="flex items-center justify-between px-1">
                            <label className="flex items-center text-white/70 text-sm cursor-pointer group">
                                <div className="w-5 h-5 bg-white/10 border border-white/20 rounded mr-3 group-hover:border-white/30 transition-all duration-300 flex items-center justify-center relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-purple-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="w-2 h-2 bg-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                                Remember me
                            </label>
                            <NavLink to='#'>
                                <button
                                    type="button"
                                    className="text-blue-300 hover:text-cyan-200 text-sm transition-all duration-300 hover:underline bg-white/5 px-3 py-1 rounded-lg backdrop-blur-lg"
                                >
                                    Forgot Password?
                                </button>
                            </NavLink>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full from-blue-600 to-purple-600 text-white py-3 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 hover:from-blue-500 hover:to-purple-500 backdrop-blur-lg border border-white/20 relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                            <span className="relative z-10">Sign In</span>
                        </button>
                    </form>
                    {/* Footer */}
                    <div className="text-center mt-8 relative z-10">
                        <p className="text-white/50 text-sm">
                            Don't have an account?{' '}
                            <a href="/signup" className="text-blue-300 hover:text-cyan-200 font-semibold transition-all duration-300 hover:underline bg-white/5 px-3 py-1 rounded-lg backdrop-blur-lg">
                                Sign up
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;