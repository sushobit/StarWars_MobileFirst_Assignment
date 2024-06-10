import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store';
import './index.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const setToken = useAuthStore((state) => state.setToken);
  const navigate = useNavigate();

  const handleLogin = () => {
    // Validate inputs
    if (!username || !password) {
      alert('Please fill in both username and password.');
      return;
    }

    const token = btoa(`${username}:${password}`); // Simulating JWT
    setToken(token);
    navigate('/home');
  };

  return (
    <div className="login-container">
      <h1 className="login-title">🔐 Login</h1>
      <input type="text" placeholder="Username 📋" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password: 🔑" onChange={(e) => setPassword(e.target.value)} />
      <button className='loginbutton' onClick={handleLogin}>Login 🖊️</button>
    </div>
  );
};

export default Login;
