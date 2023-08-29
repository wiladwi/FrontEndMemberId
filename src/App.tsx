/* eslint-disable react-hooks/exhaustive-deps */
// app.tsx

import React, { useState, useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Card from './components/Card';
import Profile from './components/Profile';
import Sidebar from './components/Sidebar';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className="flex">
        <Routes>
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />}
          />
          <Route
            index
            path="/"
            element={<AuthenticatedPage Element={Home} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            index
            path="/home"
            element={<AuthenticatedPage Element={Home} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/card" element={<AuthenticatedPage Element={Card} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}  /> } />
          <Route path="/profile" element={<AuthenticatedPage Element={Profile} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}  /> } />
        </Routes>
      </div>
    </Router>
  );
};

const AuthenticatedPage = (param: any) => {
  const {Element, isLoggedIn, setIsLoggedIn} = param;
  const navigate = useNavigate();
  useEffect(() => {
    if(!isLoggedIn) {
      const token = localStorage.getItem('token');
      if(token) {
        setIsLoggedIn(true);
        return;
      }
      navigate('/login')
    }
  }, []);

  return (
    <>
      <Sidebar />
      <Element />
    </>
  );
};
 
export default App;
