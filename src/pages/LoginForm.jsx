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
    } 

 }
}