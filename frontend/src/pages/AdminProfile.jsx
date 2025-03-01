import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

const AdminProfile = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoogedIn);
    const role = useSelector((state) => state.auth.role);
    const navigate = useNavigate();

    // Redirect if not logged in or not an admin
    if (!isLoggedIn || role !== "admin") {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] pt-20 px-4">
            <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md p-5 md:p-8 rounded-lg shadow-lg text-white">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400">
                    Admin Profile
                </h2>
                
                <div className="space-y-6">
                    {/* Quick Actions */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">Quick Actions</h3>
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
                            <button 
                                onClick={() => navigate('/add-books')}
                                className="p-3 bg-gradient-to-r from-blue-600 to-purple-400 text-white rounded-lg hover:opacity-90 transition-all duration-300 text-sm md:text-base"
                            >
                                Add New Book
                            </button>
                            <button 
                                onClick={() => navigate('/manage-books')}
                                className="p-3 bg-gradient-to-r from-blue-600 to-purple-400 text-white rounded-lg hover:opacity-90 transition-all duration-300 text-sm md:text-base"
                            >
                                Manage Books
                            </button>
                        </div>
                    </div>

                    {/* Admin Information */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">Admin Information</h3>
                        <div className="bg-white/5 backdrop-blur-md p-4 rounded-lg border border-white/10">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-1">
                                    <p className="text-gray-400 text-sm">Role</p>
                                    <p className="font-semibold text-white">Administrator</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-gray-400 text-sm">Status</p>
                                    <p className="font-semibold text-green-400">Active</p>
                                </div>
                                <div className="space-y-1 md:col-span-2">
                                    <p className="text-gray-400 text-sm">Admin ID</p>
                                    <p className="font-semibold text-white break-all">{localStorage.getItem("id") || 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile; 