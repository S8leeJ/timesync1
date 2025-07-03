import React, { useState } from 'react';
import Times from './pages/Times';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {


  return (
    <div>
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
