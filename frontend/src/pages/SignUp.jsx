import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserIcon, EnvelopeIcon, LockClosedIcon, IdentificationIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.name || !formData.username || !formData.email || !formData.password) {
            setError('Please fill in all fields.');
            return;
        }

        if (formData.name.length < 2) {
            setError('Name must be at least 2 characters.');
            return;
        }

        if (formData.username.length < 4) {
            setError('Username must be at least 4 characters.');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Invalid email format.');
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post("https://davispatlibrary-s0pe.onrender.com/api/v1/sign-up", formData);

            if (response.data.success) {
                navigate('/login');
            } else {
                setError(response.data.message || 'Registration failed.');
            }
        } catch (err) {
            const message = err.response?.data?.message || 'Failed to create account. Please try again.';
            setError(message);
            console.error('Signup error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">

            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-700"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <h2 className="px-4 text-4xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                                Create Account
                            </h2>
                        </div>
                    </div>
                    <p className="mt-1 text-gray-400">Join Our DAV ISPAT Library Today</p>
                </div>

                <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25"></div>
                    <div className="relative bg-gray-800 rounded-lg p-8 shadow-xl border border-gray-700">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {error && (
                                <div className="p-4 bg-red-900/50 border border-red-500/50 rounded-lg text-red-200 text-sm">
                                    {error}
                                </div>
                            )}

                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <UserIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        className="pl-10 w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                        placeholder="Enter your full name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                                    Username
                                </label>
                                <div className="relative">
                                    <IdentificationIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        required
                                        className="pl-10 w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                        placeholder="e.g. virat_18 (min. 4 characters)"
                                        value={formData.username}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                    Email address
                                </label>
                                <div className="relative">
                                    <EnvelopeIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        className="pl-10 w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <LockClosedIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        className="pl-10 w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                        placeholder="Create a password (min. 6 characters)"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : 'transform hover:scale-[1.02]'
                                    }`}
                            >
                                {loading ? (
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : 'Create Account'}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="text-center">
                    <p className="text-sm text-gray-400">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-blue-400 hover:text-blue-300 transition-colors duration-200">
                            Log in instead
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
