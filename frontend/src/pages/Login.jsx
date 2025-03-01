import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { login } from '../redux/slices/authSlice';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (formData) => {
        try {
            const response = await axios.post('http://localhost:3000/api/v1/login', formData);
            
            if (response.data.status === "Success") {
                const userData = {
                    role: response.data.role,
                    token: response.data.token,
                    userId: response.data.userId
                };
                
                // Store in localStorage
                localStorage.setItem('token', userData.token);
                localStorage.setItem('role', userData.role);
                localStorage.setItem('id', userData.userId);
                
                // Dispatch to Redux
                dispatch(login(userData));
                
                toast.success('Login successful!');
                navigate('/');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
            console.error('Login error:', error);
        }
    };

    // ... rest of the component ...
};

export default Login; 