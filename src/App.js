import React, { useState } from 'react';
import Times from './pages/Times';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {


  return (
    <div className='bg-gradient-to-br from-slate-900 via-blue-900 to-green-800'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Times />} />
          <Route path="/times" element={<Times />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
