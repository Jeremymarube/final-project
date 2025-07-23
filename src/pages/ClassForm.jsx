// ClassForm.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ClassForm = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [teachers, setTeachers] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  useEffect(() => {
    fetch("http://localhost:3000/teachers")
      .then((res) => res.json())
      .then(setTeachers);

    if (isEdit) {
      fetch(`http://localhost:3000/classes/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setName(data.name);
          setRoom(data.room);
          setTeacherId(data.teacherId);
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const classObj = { name, room, teacherId: parseInt(teacherId) };

    const url = isEdit
      ? `http://localhost:3000/classes/${id}`
      : "http://localhost:3000/classes";

    const method = isEdit ? 'PATCH' : 'POST';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(classObj),
    }).then(() => navigate('/classes'));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isEdit ? 'Edit' : 'Add'} Class</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Class Name"
        required
      />
      <input
        value={room}
        onChange={(e) => setRoom(e.target.value)}
        placeholder="Room"
        required
      />
      <select value={teacherId} onChange={(e) => setTeacherId(e.target.value)} required>
        <option value="">Select Teacher</option>
        {teachers.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>
      <button type="submit">Save</button>
    </form>
  );
};

export default ClassForm;