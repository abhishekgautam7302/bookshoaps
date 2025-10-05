import React, { useState } from "react";
import { NavLink, useNavigate} from "react-router-dom";
import { useAuth } from "../../context/auth.jsx";
import toast from "react-hot-toast";

const Navbar = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [auth, setAuth] = useAuth();

    const handleLogout = () => {
        setAuth({ ...auth, user: null, token: '' });
        localStorage.removeItem('auth');
        toast.success('Logged out successfully');
        navigate('/login');
    };


    return (
        <>
            {/* Main Navbar */}
            <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-3xl bg-white/5 border-b border-white/10 px-6 py-4 flex justify-between items-center transition-all duration-300 hover:bg-white/10 hover:border-white/20">
                {/* Logo with Glass Effect */}
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-glow">
                        <span className="text-white font-bold text-lg">AG</span>
                    </div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                        Abhishek
                    </div>
                </div>

                {/* Desktop Menu Links */}
                <ul className="hidden md:flex space-x-8 font-medium">
                    <NavLink
                        to='/'
                        className={({ isActive }) =>
                            `relative text-sm transition-all duration-300 group ${isActive
                                ? 'text-cyan-300 scale-110'
                                : 'text-white/60 hover:text-white'
                            }`
                        }
                    >
                        <li className="relative">
                            Home
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 transition-all duration-300 group-hover:w-full"></span>
                        </li>
                    </NavLink>

                    <NavLink
                        to='/about'
                        className={({ isActive }) =>
                            `relative text-sm transition-all duration-300 group ${isActive
                                ? 'text-cyan-300 scale-110'
                                : 'text-white/60 hover:text-white'
                            }`
                        }
                    >
                        <li className="relative">
                            About
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 transition-all duration-300 group-hover:w-full"></span>
                        </li>
                    </NavLink>

                    <NavLink
                        to='/dashboardsss'
                        className={({ isActive }) =>
                            `relative text-sm transition-all duration-300 group ${isActive
                                ? 'text-cyan-300 scale-110'
                                : 'text-white/60 hover:text-white'
                            }`
                        }
                    >
                        <li className="relative">
                            Services
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 transition-all duration-300 group-hover:w-full"></span>
                        </li>
                    </NavLink>

                    <NavLink
                        to='#'
                        className={({ isActive }) =>
                            `relative text-sm transition-all duration-300 group ${isActive
                                ? 'text-cyan-300 scale-110'
                                : 'text-white/60 hover:text-white'
                            }`
                        }
                    >
                        <li className="relative">
                            Contact
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 transition-all duration-300 group-hover:w-full"></span>
                        </li>
                    </NavLink>
                </ul>
                {!auth.user ? (
                    <div className="hidden md:flex items-center space-x-4">
                        <NavLink to='/login'>
                            <button className="px-6 py-2 rounded-2xl bg-white/10 border border-white/15 text-white font-semibold hover:bg-white/15 hover:border-white/25 transform hover:scale-105 transition-all duration-300 backdrop-blur-lg text-sm">
                                Login
                            </button>
                        </NavLink>

                        <NavLink to='/signup'>
                            <button className="px-6 py-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 backdrop-blur-lg border border-white/20 shadow-glow text-sm">
                                Sign Up
                            </button>
                        </NavLink>
                    </div>) : (
                    <div className="hidden md:flex items-center space-x-4">
                        <NavLink to={`/dashboard/${auth.user.role === 'Teacher' ? 'teacher' : 'student'}`}>
                            <button className="px-6 py-2 rounded-2xl bg-white/10 border border-white/15 text-white font-semibold hover:bg-white/15 hover:border-white/25 transform hover:scale-105 transition-all duration-300 backdrop-blur-lg text-sm"
                            >
                                Dashboard
                            </button>
                        </NavLink>

                        <NavLink>
                            <button className="px-6 py-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 backdrop-blur-lg border border-white/20 shadow-glow text-sm"
                                onClick={handleLogout}>
                                Logout
                            </button>
                        </NavLink>
                    </div>)}

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden w-10 h-10 flex flex-col items-center justify-center space-y-1.5 group"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                    <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </button>
            </nav >

            {/* Mobile Menu */}
            {
                isMenuOpen && (
                    <div className="fixed top-20 left-0 w-full z-40 md:hidden backdrop-blur-3xl bg-white/5 border-b border-white/10">
                        <div className="flex flex-col space-y-2 p-6">
                            <NavLink
                                to='/'
                                onClick={() => setIsMenuOpen(false)}
                                className={({ isActive }) =>
                                    `py-3 px-4 rounded-xl transition-all duration-300 text-center ${isActive
                                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30'
                                        : 'text-white/60 hover:text-white hover:bg-white/5'
                                    }`
                                }
                            >
                                Home
                            </NavLink>

                            <NavLink
                                to='/about'
                                onClick={() => setIsMenuOpen(false)}
                                className={({ isActive }) =>
                                    `py-3 px-4 rounded-xl transition-all duration-300 text-center ${isActive
                                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30'
                                        : 'text-white/60 hover:text-white hover:bg-white/5'
                                    }`
                                }
                            >
                                About
                            </NavLink>

                            <NavLink
                                to='/services'
                                onClick={() => setIsMenuOpen(false)}
                                className={({ isActive }) =>
                                    `py-3 px-4 rounded-xl transition-all duration-300 text-center ${isActive
                                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30'
                                        : 'text-white/60 hover:text-white hover:bg-white/5'
                                    }`
                                }
                            >
                                Services
                            </NavLink>

                            <NavLink
                                to='/contact'
                                onClick={() => setIsMenuOpen(false)}
                                className={({ isActive }) =>
                                    `py-3 px-4 rounded-xl transition-all duration-300 text-center ${isActive
                                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30'
                                        : 'text-white/60 hover:text-white hover:bg-white/5'
                                    }`
                                }
                            >
                                Contact
                            </NavLink>


                            {/* Mobile Auth Buttons */}
                            <div className="flex flex-col space-y-3 pt-4 border-t border-white/10">
                                <NavLink to='/login' onClick={() => setIsMenuOpen(false)}>
                                    <button className="w-full py-3 rounded-xl bg-white/10 border border-white/15 text-white font-semibold hover:bg-white/15 hover:border-white/25 transition-all duration-300">
                                        Login
                                    </button>
                                </NavLink>

                                <NavLink to='/signup' onClick={() => setIsMenuOpen(false)}>
                                    <button className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:shadow-xl transition-all duration-300 border border-white/20">
                                        Sign Up
                                    </button>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Overlay for mobile menu */}
            {
                isMenuOpen && (
                    <div
                        className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm md:hidden"
                        onClick={() => setIsMenuOpen(false)}
                    ></div>
                )
            }
        </>
    );
};

export default Navbar;