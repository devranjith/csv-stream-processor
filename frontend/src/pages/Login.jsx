import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthContext } from '../context/AuthContext';
import { loginSchema } from '../validations/authSchema';
import Input from '../components/ui/Input';

const Login = () => {
  const [globalError, setGlobalError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    setGlobalError('');
    
    // Simulate a network delay (1 second)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Simple mock authentication
    if (data.email === 'test@example.com' && data.password === 'password123') {
      const mockUser = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com'
      };
      const mockToken = 'mock-jwt-token-12345';
      
      login(mockUser, mockToken);
      navigate('/');
    } else {
      setGlobalError('Invalid email or password. Try test@example.com / password123');
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign In</h2>
        
        {globalError && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm">
            {globalError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            id="email"
            label="Email"
            type="email"
            placeholder="test@example.com"
            error={errors.email}
            {...register('email')}
          />
          
          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="password123"
            error={errors.password}
            {...register('password')}
          />
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full text-white font-medium py-2 px-4 rounded-md transition-colors ${
              isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
