import React, { useEffect, useState } from 'react';
import Header from "../components/Header";

function Home() {
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState(null); 

  useEffect(() => {
    fetch("http://localhost:5555/goods")
      .then(resp => resp.json())
      .then(data => setData(data));

    const storedUserId = sessionStorage.getItem('user_id');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleSelectGood = async (goodId) => {
    if (!userId) {
      alert('User not logged in');
      return;
    }
    try {
      const response = await fetch(`http://localhost:5555/users/${userId}/goods`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ good_id: goodId })
      });
      if (!response.ok) {
        throw new Error('Failed to add good to user');
      }
      alert('Good added to your list');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <Header />
      <h1>Home Page</h1>
      <div style={styles.container}>
        {data.map((item) => (
          <div key={item.id} style={styles.card}>
            <img src={item.img} alt={item.description} style={styles.image} />
            <p>{item.description}</p>
            <p>${item.price}</p>
            <button onClick={() => handleSelectGood(item.id)}>Select</button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '20px',
    margin: '10px',
    textAlign: 'center',
    width: '200px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  image: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
  },
};

export default Home;