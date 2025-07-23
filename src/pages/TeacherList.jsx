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
};
    