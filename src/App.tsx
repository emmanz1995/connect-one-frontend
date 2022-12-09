import React from 'react';
import './App.css';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Feed from './pages/feed/Feed';
import Profile from './pages/profile/Profile';
import { PrivateRouteUtil } from './utils/privateRouteUtil';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    background-color: rgb(31 41 55);
    font-family: 'Inter', sans-serif;
  }
  h1, h2, h3, h4, h5, h6, p {
    margin: 0;
    padding: 0;
  }
`;

function App() {
  return (
    <div className="App">
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/feed" element={
            <PrivateRouteUtil>
              <Feed />
            </PrivateRouteUtil>
          } />
          <Route path="/profile" element={
            <PrivateRouteUtil>
              <Profile />
            </PrivateRouteUtil>
          } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
