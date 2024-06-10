import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store';
import './index.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const setToken = useAuthStore((state) => state.setToken);
  const navigate = useNavigate();

  const handleRegister = () => {
    // Validate inputs
    if (!username || !password || !email) {
      alert('Please fill in all fields.');
      return;
    }

    const token = btoa(`${username}:${password}:${email}`); // Simulating JWT
    setToken(token);
    navigate('/home');
  };

  return (
    <div className="register-container">
      <h1 className="register-title">📝 Register ✍️</h1>
      <input className='input' type="text" placeholder="Username 📋" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input className='input' type="password" placeholder="Password 🔐" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input className='input' type="email" placeholder="Email 📧" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button className='button0sign' onClick={handleRegister}>Sign Up 🖊️</button>
    </div>
  );
};

export default Register;
