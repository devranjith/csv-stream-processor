import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './layout/DashboardLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

// Lazy loading the component
const AdvancedExplorer = lazy(() => import('./pages/AdvancedExplorer'));

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route 
            path="/advanced" 
            element={
              // Suspense boundary for lazy loading
              <Suspense fallback={<div>Loading Advanced Features... (this might take a while if network is slow)</div>}>
                <AdvancedExplorer />
              </Suspense>
            } 
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
