import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const StudentForm = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [classId, setClassId] = useState('');
  const [classes, setClasses] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  useEffect(() => {
    // Fetch all classes for the select dropdown
    fetch('http://localhost:3000/classes')
      .then((res) => res.json())
      .then(setClasses);

    // If editing, load student data
    if (isEdit) {
      fetch(`http://localhost:3000/students/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setName(data.name);
          setAge(data.age);
          setClassId(data.classId || '');
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const student = {
      name,
      age: parseInt(age),
      classId: classId || null
    };

    const url = isEdit
      ? `http://localhost:3000/students/${id}`
      : 'http://localhost:3000/students';

    const method = isEdit ? 'PATCH' : 'POST';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student),
    }).then(() => navigate('/students'));
  };

  const handleCancel = () => {
    navigate('/students');
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
      <h2>{isEdit ? 'Edit' : 'Add'} Student</h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
        style={{ display: 'block', marginBottom: '10px' }}
      />

      <input
        value={age}
        type="number"
        onChange={(e) => setAge(e.target.value)}
        placeholder="Age"
        required
        style={{ display: 'block', marginBottom: '10px' }}
      />

      <select
        value={classId}
        onChange={(e) => setClassId(e.target.value)}
        style={{ display: 'block', marginBottom: '10px' }}
      >
        <option value="">-- Select Class --</option>
        {classes.map((cls) => (
          <option key={cls.id} value={cls.id}>
            {cls.name} ({cls.room})
          </option>
        ))}
      </select>

      <button type="submit" style={{ marginRight: '10px' }}>Save</button>
      <button type="button" onClick={handleCancel} style={{ backgroundColor: 'lightgray' }}>Cancel</button>
    </form>
  );
};

export default StudentForm;
