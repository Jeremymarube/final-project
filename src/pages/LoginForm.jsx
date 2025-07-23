import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = 'http://localhost:3000/users';

    if (isLogin) {
      const res = await fetch(`${endpoint}?email=${email}&password=${password}`);
      const users = await res.json();
      if (users.length > 0) {
        localStorage.setItem('token', 'loggedin');
        localStorage.setItem('user', JSON.stringify(users[0]));
        navigate('/'); // Redirect to Home
      } else {
        alert('Invalid email or password');
      }
    } else {
      const newUser = { id: Date.now(), firstName, lastName, email, password };
      const check = await fetch(`${endpoint}?email=${email}`);
      const exists = await check.json();
      if (exists.length > 0) {
        alert('User already exists');
        return;
      }
      await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });
      alert('Registration successful. You can now log in.');
      setIsLogin(true);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <br />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <br />
          </>
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
        <p>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <button type="button" onClick={toggleForm}>
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
