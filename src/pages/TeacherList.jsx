import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/teachers")
      .then((res) => res.json())
      .then(setTeachers);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      fetch(`http:localhost:3000/teachers/${id}`, { method: 'DELETE' })
        .then(() => setTeachers(teachers.filter((t) => t.id !== id)));
    }
  };

    const handleEdit = (id) => {
    navigate(/teachers/edit/`${id}`);
  };

  const filteredTeachers = teachers.filter((teacher) =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};
