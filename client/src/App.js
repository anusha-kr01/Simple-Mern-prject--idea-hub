import React, { useState, useEffect } from 'react';

function App() {
  const [ideas, setIdeas] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Fetch ideas from backend
  const fetchIdeas = async () => {
    try {
      const res = await fetch('http://localhost:5000/ideas');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setIdeas(data);
    } catch (error) {
      console.error(error);
      alert('Could not load ideas');
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, []);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return alert('Please fill in both fields.');

    try {
      const res = await fetch('http://localhost:5000/ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      });
      if (!res.ok) throw new Error('Failed to add idea');

      setTitle('');
      setDescription('');
      fetchIdeas();
    } catch (error) {
      console.error(error);
      alert('Failed to add idea');
    }
  };

  return (
    <div
      style={{
        padding: '30px',
        maxWidth: '600px',
        margin: '40px auto',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: '#f9fafb',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
      }}
    >
      <h1 style={{ textAlign: 'center', color: '#222', marginBottom: '30px' }}>Dev Ideas Hub</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          marginBottom: '30px',
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        }}
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '15px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            fontSize: '16px',
          }}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '15px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            fontSize: '16px',
            resize: 'vertical',
          }}
        />
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#007bff',
            border: 'none',
            borderRadius: '6px',
            color: 'white',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={e => (e.target.style.backgroundColor = '#0056b3')}
          onMouseLeave={e => (e.target.style.backgroundColor = '#007bff')}
        >
          Add Idea
        </button>
      </form>

      <h2 style={{ color: '#444', marginBottom: '20px' }}>Ideas List</h2>
      {ideas.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#777' }}>No ideas yet.</p>
      ) : (
        ideas.map((idea) => (
          <div
            key={idea._id}
            style={{
              backgroundColor: 'white',
              padding: '15px 20px',
              borderRadius: '8px',
              marginBottom: '15px',
              boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
              color: '#333',
              fontSize: '18px',
              lineHeight: '1.3',
            }}
          >
            <strong>{idea.title}</strong>: {idea.description}
          </div>
        ))
      )}
    </div>
  );
}

export default App;
