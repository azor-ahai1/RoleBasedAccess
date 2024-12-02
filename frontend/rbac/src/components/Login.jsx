import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { 
  FaEye, 
  FaEyeSlash, 
  FaLock, 
  FaEnvelope 
} from 'react-icons/fa';
import axios from 'axios';
import { login, setAdminAuth } from '../store/authSlice';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginType, setLoginType] = useState('user'); // 'user' or 'admin'
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const endpoint = loginType === 'admin' 
        ? '/api/admin/login' 
        : '/api/user/login';

      const payload = {
        email: data.email,
        password: data.password,
      };

      const response = await axios.post(endpoint, payload);

      // Dispatch login action based on login type
      if (loginType === 'admin') {
        dispatch(login(response.data.admin));
        dispatch(setAdminAuth(true));
        navigate('/admin/dashboard');
      } else {
        dispatch(login(response.data.user));
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      // Handle login error (show toast, error message, etc.)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-primary">
      <div className="max-w-md w-full bg-dark-primary/90 backdrop-blur-sm p-10 rounded-xl shadow-2xl border border-dark-primary/50">
        {/* Login Type Selector */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-dark-primary border border-slate-gray rounded-lg">
            <button
              type="button"
              onClick={() => setLoginType('user')}
              className={`
                flex items-center px-6 py-2 rounded-lg transition-all
                ${loginType === 'user' 
                  ? 'bg-light-blue text-dark-primary' 
                  : 'text-gray-300 hover:bg-dark-primary/50'}
              `}
            >
              User Login
            </button>
            <button
              type="button"
              onClick={() => setLoginType('admin')}
              className={`
                flex items-center px-6 py-2 rounded-lg transition-all
                ${loginType === 'admin' 
                  ? 'bg-light-blue text-dark-primary' 
                  : 'text-gray-300 hover:bg-dark-primary/50'}
              `}
            >
              Admin Login
            </button>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-light-blue">
            {loginType === 'admin' ? 'Admin Login' : 'Welcome Back'}
          </h2>
          <p className="mt-2 text-sm text-gray-300">
            {loginType === 'admin' 
              ? 'Login to admin dashboard' 
              : 'Sign in to access your account'}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="text-gray-400" />
              </div>
              <input
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Invalid email address',
                  },
                })}
                className={`
                  appearance-none block w-full px-4 py-3 pl-10
                  bg-dark-primary border rounded-lg
                  ${errors.email ? 'border-red-500' : 'border-slate-gray'}
                  text-white placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-light-blue
                `}
                placeholder="you@example.com"
              />
            </div>
            {errors.email && (
              <p className="mt-2 text-sm text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password', {
                  required: 'Password is required',
                })}
                className={`
                  appearance-none block w-full px-4 py-3 pl-10 pr-10
                  bg-dark-primary border rounded-lg
                  ${errors.password ? 'border-red-500' : 'border-slate-gray'}
                  text-white placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-light-blue
                `}
                placeholder="********"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-2 text-sm text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`
                w-full py-3 rounded-lg text-dark-primary font-semibold
                ${loading 
                  ? 'bg-gray-600 cursor-not-allowed' 
                  : 'bg-light-blue hover:bg-opacity-90'}
                transition-all duration-300
              `}
            >
              {loading 
                ? 'Logging In...' 
                : `Login as ${loginType === 'admin' ? 'Admin' : 'User'}`
              }
            </button>
          </div>

          {/* Footer Links */}
          <div className="text-center">
            <div className="mt-4 text-sm text-gray-300">
              Don't have an account? {' '}
              <Link 
                to="/signup" 
                className="text-light-blue hover:underline"
              >
                Sign Up
              </Link >
            </div>
            <div className="mt-2 text-sm text-gray-300">
              <Link 
                to="/forgot-password" 
                className="text-light-blue hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;