import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.scss'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Feed from './pages/feed/Feed'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/feed" element={<Feed />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
