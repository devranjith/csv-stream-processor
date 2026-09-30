import React from 'react';

const Settings = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b border-gray-100 pb-2">Notifications</h2>
          <div className="space-y-3">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500" defaultChecked />
              <span className="text-gray-700 text-sm">Email notifications for new messages</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
              <span className="text-gray-700 text-sm">Push notifications on mobile</span>
            </label>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b border-gray-100 pb-2">Privacy</h2>
          <div className="space-y-3">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500" defaultChecked />
              <span className="text-gray-700 text-sm">Show profile to public</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
              <span className="text-gray-700 text-sm">Allow search engines to index profile</span>
            </label>
          </div>
        </div>
        
        <div className="pt-4 border-t border-gray-100">
          <button className="bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-sm">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
