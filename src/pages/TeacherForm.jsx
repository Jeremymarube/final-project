import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const TeacherForm = () => {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

    useEffect(() => {
        if (isEdit) {
      fetch(`http:localhost:3000/teachers/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setName(data.name);
          setSubject(data.subject);
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const teacher = { name, subject };

    const url = isEdit
      ? `http:localhost:3000/teachers/${id}`
      : "http://localhost:3000/teachers";

    const method = isEdit ? 'PATCH' : 'POST';

    fetch(url, {
        method,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(teacher),
    }).then(() => navigate('/teachers'));
};

    return (
        <form onSubmit={handleSubmit}>
      <h2>{isEdit ? 'Edit' : 'Add'} Teacher</h2>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
      <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" required />
      <button type="submit">Save</button>
    </form>
  );
};

export default TeacherForm;
    