import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.scss'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Feed from './pages/feed/Feed'
import UsersPage from './pages/users/UsersPage'
import UserProfile from './pages/users/UserProfile'
import Profile from './pages/profile/Profile'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/find-users" element={<UsersPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user/:userId" element={<UserProfile />} />
          {/*<Route path="/post/:postId" element={<SinglePost />} />*/}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
