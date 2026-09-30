import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);



  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Profile</h1>
      
      <div className="flex items-center space-x-6 mb-8 pb-8 border-b border-gray-100">
        <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-3xl font-bold">
          {user?.name?.charAt(0) || 'U'}
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{user?.name}</h2>
          <p className="text-gray-500">{user?.email}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
          <div className="text-gray-800 p-3 bg-gray-50 rounded-md border border-gray-200">
            {user?.name}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">Email Address</label>
          <div className="text-gray-800 p-3 bg-gray-50 rounded-md border border-gray-200">
            {user?.email}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">Role</label>
          <div className="text-gray-800 p-3 bg-gray-50 rounded-md border border-gray-200">
            Administrator
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
