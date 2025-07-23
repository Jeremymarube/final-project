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
}
export default StudentList;