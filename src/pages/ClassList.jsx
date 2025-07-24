import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ClassList = () => {
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://school-system-api-sl8o.onrender.com/classes")
      .then((res) => res.json())
      .then(setClasses);

    fetch("https://school-system-api-sl8o.onrender.com/teachers")
      .then((res) => res.json())
      .then(setTeachers);
  }, []);

  const getTeacherName = (id) => {
    const teacher = teachers.find((t) => t.id === id);
    return teacher ? teacher.name : 'Unknown';
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this class?")) {
      fetch(`https://school-system-api-sl8o.onrender.com/classes/${id}`, { method: 'DELETE' })
        .then(() => setClasses(classes.filter((c) => c.id !== id)));
    }
  };

  const handleEdit = (id) => {
    navigate(`/classes/edit/${id}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Classes</h2>
      <button onClick={() => navigate('/classes/new')} style={{ marginBottom: '10px' }}>
        Add Class
      </button>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {classes.map((cls) => (
          <li key={cls.id} style={{ margin: '10px 0' }}>
            <strong>{cls.name}</strong> - Room: {cls.room} - Teacher: {getTeacherName(cls.teacherId)}
            <div style={{ marginTop: '5px' }}>
              <button onClick={() => handleEdit(cls.id)} style={{ marginRight: '10px' }}>
                Edit
              </button>
              <button onClick={() => handleDelete(cls.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClassList;