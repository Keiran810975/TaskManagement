import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Chart from './pages/chart';
import NestedList from './conponents/navList';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        {/* <nav style={{ width: '20%', background: '#333', height: '100vh', color: 'white', padding: '20px' }}>
          <NestedList>

          </NestedList>
        </nav> */}
        <NestedList></NestedList>
        <div style={{ width: '80%', padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/chart" element={<Chart />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;