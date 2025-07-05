import React, { useState } from 'react';
import Times from './pages/Times';
import Navbar from './components/Navbar';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoutes';
import { AuthProvider } from './context/AuthContext';

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

function App() {
  return (
    <AuthProvider>
      <div className='bg-gradient-to-br from-slate-900 via-blue-900 to-green-800'>
        <Router>
          <AppContent />
        </Router>
      </div>
    </AuthProvider>
  );
}

function AppContent() {
  const location = useLocation();
  const hideNavbarRoutes = ['/', '/signup'];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <div>
    {shouldShowNavbar && <Navbar />}
    <Routes>
      <Route path='/' element={<Signin />} />
      <Route path='/signup' element={<Signup />} />
      <Route path="/times" element={<ProtectedRoute><Times /></ProtectedRoute>} />
    </Routes>
    </div>
  )
}
export default App;
