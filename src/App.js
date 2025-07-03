import React, { useState } from 'react';
import Times from './pages/Times';
import Navbar from './components/Navbar';
import Signin from './pages/Signin';
import Signup from './pages/Signup';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {


  return (
    <div className='bg-gradient-to-br from-slate-900 via-blue-900 to-green-800'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Times />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path="/times" element={<Times />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
