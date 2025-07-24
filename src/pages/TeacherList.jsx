import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://school-system-api-sl8o.onrender.com/teachers")
      .then((res) => res.json())
      .then(setTeachers);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      fetch(`https://school-system-api-sl8o.onrender.com/teachers/${id}`, { method: 'DELETE' })
        .then(() => setTeachers(teachers.filter((t) => t.id !== id)));
    }
  };

    const handleEdit = (id) => {
    navigate(`/teachers/edit/${id}`);
  };

  const filteredTeachers = teachers.filter((teacher) =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

    return (
    <div style={{ padding: '20px' }}>
      <h2>Teachers</h2>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '10px', padding: '5px', width: '200px' }}
      />
      <button onClick={() => navigate('/teachers/new')} style={{ marginLeft: '10px' }}>
        Add Teacher
      </button>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filteredTeachers.map((teacher) => (
          <li key={teacher.id} style={{ margin: '10px 0' }}>
            <strong>{teacher.name}</strong> - {teacher.subject}
            <div style={{ marginTop: '5px' }}>
              <button onClick={() => handleEdit(teacher.id)} style={{ marginRight: '10px' }}>
                Edit
              </button>
              <button onClick={() => handleDelete(teacher.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeacherList;

