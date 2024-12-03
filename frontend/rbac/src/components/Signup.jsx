import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { 
  FaEye, 
  FaEyeSlash, 
  FaLock, 
  FaEnvelope, 
  FaUser,
  FaUserShield,
  FaIdBadge 
} from 'react-icons/fa';
import axios from 'axios';

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [signupType, setSignupType] = useState('user'); // 'user' or 'admin'
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const endpoint = signupType === 'admin' 
        ? '/api/admin/signup' 
        : '/api/user/signup';

      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
        ...(signupType === 'admin' && { 
          adminCode: data.adminCode 
        })
      };

      const response = await axios.post(endpoint, payload);

      // Dispatch signup action based on signup type
      if (signupType === 'admin') {
        dispatch(adminSignupSuccess(response.data.admin));
        navigate('/admin/dashboard');
      } else {
        dispatch(userSignupSuccess(response.data.user));
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Signup error:', error);
      // Handle signup error (show toast, etc.)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-primary"
    >
      <div className="max-w-md w-full bg-dark-primary/90 backdrop-blur-sm p-10 rounded-xl shadow-2xl border border-dark-primary/50">
        {/* Signup Type Selector */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-dark-primary border border-slate-gray rounded-lg">
            <button
              type="button"
              onClick={() => setSignupType('user')}
              className={`
                flex items-center px-6 py-2 rounded-lg transition-all
                ${signupType === 'user' 
                  ? 'bg-light-blue text-dark-primary' 
                  : 'text-gray-300 hover:bg-dark-primary/50'}
              `}
            >
              <FaUser className="mr-2" /> User
            </button>
            <button
              type="button"
              onClick={() => setSignupType('admin')}
              className={`
                flex items-center px-6 py-2 rounded-lg transition-all
                ${signupType === 'admin' 
                  ? 'bg-light-blue text-dark-primary' 
                  : 'text-gray-300 hover:bg-dark-primary/50'}
              `}
            >
              <FaUserShield className="mr-2" /> Admin
            </button>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-light-blue">
            {signupType === 'admin' ? 'Admin Signup' : 'Create Your Account'}
          </h2>
          <p className="mt-2 text-sm text-gray-300">
            {signupType === 'admin' 
              ? 'Create an admin account' 
              : 'Sign up to access your dashboard'}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaIdBadge className="text-gray-400" />
              </div>
              <input
                type="text"
                {...register('name', { 
                  required: 'Name is required',
                  minLength: {
                    value: 2,
                    message: 'Name must be at least 2 characters'
                  }
                })}
                className={`
                  appearance-none block w-full px-4 py-3 pl-10
                  bg-dark-primary border rounded-lg
                  ${errors.name ? 'border-red-500' : 'border-slate-gray'}
                  text-white placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-light-blue
                `}
                placeholder="John Doe"
              />
            </div>
            {errors.name && (
              <p className="mt-2 text-sm text-red-400">
                {errors.name.message}
              </p>
            )}
          </div>

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
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  },
                })}
                className={`
                  appearance-none block w-full px-4 py-3 pl-10 pr-10
                  bg-dark-primary border rounded-lg
                  ${errors.password ? 'border-red-500' : 'border- slate-gray'}
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

          {/* Admin Code Input (only for Admin signup) */}
          {signupType === 'admin' && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Admin Code
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type="text"
                  {...register('adminCode', {
                    required: 'Admin code is required',
                  })}
                  className={`
                    appearance-none block w-full px-4 py-3 pl-10
                    bg-dark-primary border rounded-lg
                    ${errors.adminCode ? 'border-red-500' : 'border-slate-gray'}
                    text-white placeholder-gray-400
                    focus:outline-none focus:ring-2 focus:ring-light-blue
                  `}
                  placeholder="Enter admin code"
                />
              </div>
              {errors.adminCode && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.adminCode.message}
                </p>
              )}
            </div>
          )}

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
                ? 'Signing Up...' 
                : `Sign Up as ${signupType === 'admin' ? 'Admin' : 'User '}`
              }
            </button>
          </div>

          {/* Footer Links */}
          <div className="text-center">
            <div className="mt-4 text-sm text-gray-300">
              Already have an account? {' '}
              <Link 
                to="/login" 
                className="text-light-blue hover:underline"
              >
                Log In
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;