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
  FaShieldAlt 
} from 'react-icons/fa';
import axios from 'axios';

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
      const response = await axios.post('/api/signup', {
        name: data.name,
        email: data.email,
        password: data.password
      });

      // Dispatch signup action
      dispatch(signupSuccess(response.data.user));
      
      // Navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Signup error:', error);
      // Handle signup error (show toast, etc.)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="flex items-center justify-center py-4 pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-primary"
    >
      <div className="max-w-md w-full bg-dark-primary/90 backdrop-blur-sm p-10 rounded-xl shadow-2xl border border-dark-primary/50">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-light-blue">
            Create Your Account
          </h2>
          <p className="mt-2 text-sm text-gray-300">
            Sign up to access your dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              {...register('name', { required: 'Name is required' })}
              className={`
                appearance-none block w-full px-4 py-3
                bg-dark-primary border rounded-lg
                ${errors.name ? 'border-red-500' : 'border-slate-gray'}
                text-white placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-light-blue
              `}
              placeholder="John Doe"
            />
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
                appearance-none block w-full px-4 py-3
                bg-dark-primary border rounded-lg
                ${errors.email ? 'border-red-500' : 'border-slate-gray'}
                text-white placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-light-blue
              `}
              placeholder="you@example.com"
            />
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
                  appearance-none block w-full px-4 py-3
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
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </div>

          {/* Footer Links */}
          <div className="text-center">
            <div className="mt-4 text-sm text-gray-300">
              Already have an account? {' '}
              <Link 
                to="/login" 
                className="text-light-blue hover :underline"
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