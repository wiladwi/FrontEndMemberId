/* eslint-disable react-hooks/exhaustive-deps */
// src/components/Login.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  isLoggedIn: boolean
}

const Login: React.FC<LoginProps> = (props) => {
  const { setIsLoggedIn, isLoggedIn } = props;
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const handleLogin = async () => {
    const response = await fetch('http://localhost:8000/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    const responseData = await response.json();
    if (response.ok) {
        localStorage.setItem("token", JSON.stringify(responseData.token));
      setIsLoggedIn(true);
      navigate('/home');
    } else {
      setErrorMessage("Email doesn't exist");
    }
  };
  useEffect(()=>{
    const token  = localStorage.getItem('token')
    if(token){
      navigate('/home');
    }
  },[])

  return (
    <div className="flex items-center justify-center h-screen bg-white-50 mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md  text-center">
        <div>
          <img src="icons8-star-48.png" alt="Logo" className="w-16 h-16 mx-auto" />
          <h1 className="mb-4 font-bold text-lg mt-2">AWARD</h1>
        </div>
        <h1 className="text-2xl mb-4">Login</h1>
        <h1 className="text-2xl mb-4">Status: {isLoggedIn ? 'loged' : 'not'}</h1>
        <input
          type="email"
          placeholder="Enter your email address"
          className="border rounded-md p-2 mb-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={() => handleLogin()}
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Login
        </button>
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Login;
