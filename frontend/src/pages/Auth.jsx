import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const navigate = useNavigate();

    const handleAuth = async (e) => {
        e.preventDefault();
        setError('');

        if (!username || !password) {
            setError('Please fill in all fields.');
            return;
        }

        if (isSignUp && password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        const endpoint = isSignUp ? '/auth/register' : '/auth/login';

        try {
            const response = await axios.post(`http://localhost:8000${endpoint}`, {
                username,
                password
            });

            if (isSignUp) {
                setShowSuccessModal(true);
                // Reset form fields
                setUsername('');
                setPassword('');
                setConfirmPassword('');
            } else {
                if (response.data.message === "Login successful") {
                    localStorage.setItem('username', response.data.username);
                    navigate('/dashboard');
                }
            }
        } catch (err) {
            setError(err.response?.data?.detail || 'Authentication failed');
        }
    };

    const closeSuccessModal = () => {
        setShowSuccessModal(false);
        setIsSignUp(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl min-h-[500px] flex">

                {/* Left Panel (Blue) - Shows when in SignUp mode */}
                <div className={`absolute top-0 left-0 h-full w-1/2 bg-blue-500 text-white flex flex-col items-center justify-center p-12 transition-transform duration-500 ease-in-out z-20 ${isSignUp ? 'translate-x-0' : '-translate-x-full'}`}>
                    <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
                    <p className="text-center mb-8">To keep connected with us please login with your personal info</p>
                    <button
                        onClick={() => setIsSignUp(false)}
                        className="border-2 border-white text-white px-8 py-2 rounded-full font-bold uppercase tracking-wider hover:bg-white hover:text-blue-500 transition-colors text-sm"
                    >
                        Sign In
                    </button>
                </div>

                {/* Right Panel (Blue) - Shows when in Login mode */}
                <div className={`absolute top-0 right-0 h-full w-1/2 bg-blue-500 text-white flex flex-col items-center justify-center p-12 transition-transform duration-500 ease-in-out z-20 ${isSignUp ? 'translate-x-full' : 'translate-x-0'}`}>
                    <h1 className="text-4xl font-bold mb-4">Hello, Friend!</h1>
                    <p className="text-center mb-8">Enter your personal details and start journey with us</p>
                    <button
                        onClick={() => setIsSignUp(true)}
                        className="border-2 border-white text-white px-8 py-2 rounded-full font-bold uppercase tracking-wider hover:bg-white hover:text-blue-500 transition-colors text-sm"
                    >
                        Sign Up
                    </button>
                </div>

                {/* Form Container */}
                <div className={`w-full h-full absolute top-0 left-0 flex transition-all duration-500 ease-in-out`}>

                    {/* Sign In Form (Left side when Login mode) */}
                    <div className={`w-1/2 h-full flex flex-col items-center justify-center p-12 bg-white transition-transform duration-500 ${isSignUp ? 'translate-x-full opacity-0 z-10' : 'translate-x-0 opacity-100 z-30'}`}>
                        <h1 className="text-3xl font-bold mb-6 text-gray-800">Sign in</h1>
                        <div className="flex space-x-4 mb-6">
                            <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-blue-600 hover:border-blue-600 hover:bg-blue-50 cursor-pointer transition-colors font-bold">f</div>
                            <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-red-500 hover:border-red-500 hover:bg-red-50 cursor-pointer transition-colors font-bold">G</div>
                            <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-blue-700 hover:border-blue-700 hover:bg-blue-50 cursor-pointer transition-colors font-bold">in</div>
                        </div>
                        <p className="text-gray-400 text-sm mb-6">or use your account</p>

                        {error && !isSignUp && <div className="text-red-500 text-sm mb-4">{error}</div>}

                        <form onSubmit={handleAuth} className="w-full flex flex-col space-y-4">
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="bg-gray-100 border-none outline-none px-3 py-2 rounded-lg w-full text-sm"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-gray-100 border-none outline-none px-3 py-2 rounded-lg w-full text-sm"
                            />
                            <a href="#" className="text-sm text-gray-500 hover:text-gray-800 text-center mt-2">Forgot your password?</a>
                            <button className="bg-blue-500 text-white px-8 py-2 rounded-full font-bold uppercase tracking-wider hover:bg-blue-600 transition-colors mt-4 mx-auto block text-sm">
                                Sign In
                            </button>
                        </form>
                    </div>

                    {/* Sign Up Form (Right side when SignUp mode) */}
                    <div className={`w-1/2 h-full flex flex-col items-center justify-center p-12 bg-white transition-transform duration-500 ${isSignUp ? 'translate-x-0 opacity-100 z-30' : '-translate-x-full opacity-0 z-10'}`}>
                        <h1 className="text-3xl font-bold mb-6 text-gray-800">Create Account</h1>
                        <div className="flex space-x-4 mb-6">
                            <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-blue-600 hover:border-blue-600 hover:bg-blue-50 cursor-pointer transition-colors font-bold">f</div>
                            <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-red-500 hover:border-red-500 hover:bg-red-50 cursor-pointer transition-colors font-bold">G</div>
                            <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-blue-700 hover:border-blue-700 hover:bg-blue-50 cursor-pointer transition-colors font-bold">in</div>
                        </div>
                        <p className="text-gray-400 text-sm mb-6">or use your email for registration</p>

                        {error && isSignUp && <div className="text-red-500 text-sm mb-4">{error}</div>}

                        <form onSubmit={handleAuth} className="w-full flex flex-col space-y-4">
                            <input
                                type="text"
                                placeholder="Name"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="bg-gray-100 border-none outline-none px-3 py-2 rounded-lg w-full text-sm"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-gray-100 border-none outline-none px-3 py-2 rounded-lg w-full text-sm"
                            />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="bg-gray-100 border-none outline-none px-3 py-2 rounded-lg w-full text-sm"
                            />
                            <button className="bg-blue-500 text-white px-8 py-2 rounded-full font-bold uppercase tracking-wider hover:bg-blue-600 transition-colors mt-4 mx-auto block text-sm">
                                Sign Up
                            </button>
                        </form>
                    </div>

                </div>
            </div>

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
                    <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl transform transition-all scale-100 text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Success!</h3>
                        <p className="text-gray-600 mb-6">Registration successful! Please login to continue.</p>
                        <button
                            onClick={closeSuccessModal}
                            className="w-full bg-blue-500 text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            Go to Login
                        </button>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out;
                }
            `}</style>
        </div>
    );
};

export default Auth;
