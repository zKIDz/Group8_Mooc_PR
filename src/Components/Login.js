// src/Components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(`http://localhost:9999/users?email=${email}&password=${password}`);

      if (response.data.length > 0) {
        const user = response.data[0];
        localStorage.setItem('token', 'fake-jwt-token');
        localStorage.setItem('role', user.role);
        login(user.role);

        if (user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="body">
      <div className="container">
        <div className="row justify-content-center">
          <div className="inner-wrap col">
            <h2>Login</h2>
            <form
              id="form"
              className="form"
              onSubmit={handleLogin}>
              <div  className="form-group" >
                <label>Email:</label>
                <input
                  type="email"
                  placeholder="Email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div  className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  placeholder="Password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <div className="form-group">
                <button className="btn form-control btn-success" type="submit">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
