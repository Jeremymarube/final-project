import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const StudentForm = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit) {
      fetch(`http://localhost:3000/students/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setName(data.name);
          setAge(data.age);
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const student = { name, age: parseInt(age) };

    const url = isEdit
      ? `http://localhost:3000/students/${id}`
      : "http://localhost:3000/students";

    const method = isEdit ? 'PATCH' : 'POST';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student),
    }).then(() => navigate('/students'));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isEdit ? 'Edit' : 'Add'} Student</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        value={age}
        type="number"
        onChange={(e) => setAge(e.target.value)}
        placeholder="Age"
        required
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default StudentForm;