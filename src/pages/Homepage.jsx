import React, { useEffect, useState } from 'react';

const Homepage = () => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetch('https://school-system-api-sl8o.onrender.com/students')
      .then(res => res.json())
      .then(setStudents);

    fetch('https://school-system-api-sl8o.onrender.com/teachers')
      .then(res => res.json())
      .then(setTeachers);

    fetch('https://school-system-api-sl8o.onrender.com/classes')
      .then(res => res.json())
      .then(setClasses);
  }, []);

  return (
    <div style={{ padding: '30px' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '30px' }}>
        Welcome to the School Management Dashboard
      </h1>
        <p style={{ fontSize: '1.1rem', marginBottom: '30px' }}>
        Manage and track students, teachers, and class records below.
      </p>
      {/* Summary Cards */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '40px', flexWrap: 'wrap' }}>
        <SummaryCard title="Students" count={students.length} color="#3b82f6" />
        <SummaryCard title="Teachers" count={teachers.length} color="#10b981" />
        <SummaryCard title="Classes" count={classes.length} color="#f59e0b" />
      </div>

      {/* Recent Items Preview */}
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <DetailCard title="Recent Students" data={students} getLine={s => `${s.name} (${s.age} yrs)`} />
        <DetailCard title="Recent Teachers" data={teachers} getLine={t => `${t.name} - ${t.subject}`} />
        <DetailCard title="Recent Classes" data={classes} getLine={c => `${c.name} (Room: ${c.room})`} />
      </div>
    </div>
  );
};

// Summary Card Component
const SummaryCard = ({ title, count, color }) => (
  <div style={{
    background: color,
    color: 'white',
    padding: '20px',
    borderRadius: '10px',
    flex: '1',
    minWidth: '200px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
  }}>
    <h2>{title}</h2>
    <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{count}</p>
  </div>
);

// Detail Card Component
const DetailCard = ({ title, data, getLine }) => (
  <div style={{
    background: '#f9f9f9',
    padding: '20px',
    borderRadius: '10px',
    flex: '1',
    minWidth: '250px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
  }}>
    <h3>{title}</h3>
    <ul style={{ marginTop: '10px' }}>
      {data.slice(0, 5).map(item => (
        <li key={item.id}>{getLine(item)}</li>
      ))}
    </ul>
  </div>
);

export default Homepage;