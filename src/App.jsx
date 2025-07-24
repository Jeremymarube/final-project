import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginForm from './pages/LoginForm';
import Homepage from './pages/Homepage';
import StudentList from './pages/StudentList';
import StudentForm from './pages/StudentForm';
import TeacherList from './pages/TeacherList';
import TeacherForm from './pages/TeacherForm';
import ClassList from './pages/ClassList'
import ClassForm from './pages/ClassForm';
import './index.css';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<ProtectedRoute><Homepage /></ProtectedRoute>} />

        {/* Students */}
        <Route path="/students" element={<ProtectedRoute><StudentList /></ProtectedRoute>} />
        <Route path="/students/new" element={<ProtectedRoute><StudentForm /></ProtectedRoute>} />
        <Route path="/students/edit/:id" element={<ProtectedRoute><StudentForm /></ProtectedRoute>} />

        {/* Teachers */}
        <Route path="/teachers" element={<ProtectedRoute><TeacherList /></ProtectedRoute>} />
        <Route path="/teachers/new" element={<ProtectedRoute><TeacherForm /></ProtectedRoute>} />
        <Route path="/teachers/edit/:id" element={<ProtectedRoute><TeacherForm /></ProtectedRoute>} />

        {/* Classes */}
        <Route path="/classes" element={<ProtectedRoute><ClassList /></ProtectedRoute>} />
        <Route path="/classes/new" element={<ProtectedRoute><ClassForm /></ProtectedRoute>} />
        <Route path="/classes/edit/:id" element={<ProtectedRoute><ClassForm /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}
