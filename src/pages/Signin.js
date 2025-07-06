import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    
    if (result.success) {
      navigate('/times');
    } else {
      setError(result.message || 'Sign in failed');
    }
    
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-green-800">
        <div className="w-full max-w-md rounded-lg p-8 bg-slate-900/40 backdrop-blur-md shadow-md shadow-blue-900"> 
        <h1 className="text-4xl font-bold mb-2 text-center text-white">Welcome Back</h1>
        <p className="text-1xl font-light mb-6 text-center text-blue-200">Sign In to your TimeSync account</p>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-200 mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="Enter your email address"
              className="w-full px-3 py-2 border bg-slate-300 border-blue-900 placeholder:text-blue-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-gray-200 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="w-full px-3 py-2 border bg-slate-300 border-blue-900 placeholder:text-blue-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-semibold py-2 px-4 rounded transition duration-200"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
          <p className="text-center text-gray-200">
            Don't have an account? <Link to="/signup" className="text-blue-500 hover:text-blue-600">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
} 