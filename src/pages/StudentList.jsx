import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/students")
      .then((res) => res.json())
      .then(setStudents);
  }, []);
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      fetch(`http://localhost:3000/students/${id}`, { method: 'DELETE' })
        .then(() => setStudents(students.filter((s) => s.id !== id)));
    }
  };
   const handleEdit = (id) => {
    navigate(`/students/edit/${id}`);
  };
   const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
   return (
    <div style={{ padding: '20px' }}>
    <h2>Students</h2>
    <input
        type="text"
        placeholder="Search by name..."
        />
    </div>
   )
}
export default StudentList;