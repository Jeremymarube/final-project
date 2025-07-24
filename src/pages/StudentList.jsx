import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch students
    fetch("https://school-system-api-sl8o.onrender.com/students")
      .then((res) => res.json())
      .then(setStudents);

    // Fetch classes
    fetch("https://school-system-api-sl8o.onrender.com/classes")
      .then((res) => res.json())
      .then(setClasses);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      fetch(`https://school-system-api-sl8o.onrender.com/students/${id}`, { method: 'DELETE' })
        .then(() => setStudents((prev) => prev.filter((s) => s.id !== id)));
    }
  };

  const handleEdit = (id) => {
    navigate(`/students/edit/${id}`);
  };

  const getClassName = (classId) => {
    const cls = classes.find((c) => c.id === classId);
    return cls ? cls.name : 'Unknown';
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
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '10px', padding: '5px', width: '200px' }}
      />
      <button onClick={() => navigate('/students/new')} style={{ marginLeft: '10px' }}>
        Add Student
      </button>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filteredStudents.map((student) => (
          <li key={student.id} style={{ margin: '10px 0' }}>
            <strong>{student.name}</strong> - Age: {student.age} - Class: {getClassName(student.classId)}
            <div style={{ marginTop: '5px' }}>
              <button onClick={() => handleEdit(student.id)} style={{ marginRight: '10px' }}>
                Edit
              </button>
              <button onClick={() => handleDelete(student.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
