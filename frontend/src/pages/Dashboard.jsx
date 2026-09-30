import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome to your Dashboard</h1>
      <p className="text-gray-600 mb-6">
        Hello, <span className="font-semibold text-gray-800">{user?.name}</span>! Here's an overview of your account.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Simple stat cards */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h3 className="text-sm font-medium text-blue-800 uppercase tracking-wider mb-1">Total Views</h3>
          <p className="text-3xl font-bold text-blue-900">1,245</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
          <h3 className="text-sm font-medium text-green-800 uppercase tracking-wider mb-1">Active Users</h3>
          <p className="text-3xl font-bold text-green-900">342</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
          <h3 className="text-sm font-medium text-purple-800 uppercase tracking-wider mb-1">New Signups</h3>
          <p className="text-3xl font-bold text-purple-900">89</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
