import React, { useEffect, useState } from 'react';

function IdeasList() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/ideas')
      .then(res => res.json())
      .then(data => {
        setIdeas(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching ideas:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading ideas...</p>;
  }

  if (ideas.length === 0) {
    return <p>No ideas found.</p>;
  }

  return (
    <div>
      <h2>Ideas List</h2>
      <ul>
        {ideas.map(idea => (
          <li key={idea._id}>
            <strong>{idea.title}</strong>: {idea.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IdeasList;
