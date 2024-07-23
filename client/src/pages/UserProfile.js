import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/user';
import Header from '../components/Header';

function UserProfile() {
  const { user } = useContext(UserContext);
  const [userGoods, setUserGoods] = useState([]);

  useEffect(() => {
    const fetchUserGoods = async () => {
      if (user && user.id) {
        try {
          const response = await fetch(`http://localhost:5555/users/${user.id}/goods`);
          if (!response.ok) {
            throw new Error('Failed to fetch user goods');
          }
          const data = await response.json();
          setUserGoods(data);
        } catch (error) {
          console.error('Error fetching user goods:', error);
        }
      }
    };
    fetchUserGoods();
  }, [user]);

  const handleDeleteGood = async (goodId) => {
    try {
      const response = await fetch(`http://localhost:5555/users/${user.id}/goods/${goodId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete good from user');
      }
      setUserGoods(userGoods.filter(item => item.id !== goodId));
    } catch (error) {
      console.error('Error deleting good:', error);
    }
  };

  return (
    <main >
      <Header />
      <div style={styles.profileInfo}>
        <h1 style={styles.title}>User Profile</h1>
        <p style={styles.detail}><strong>Name:</strong> {user.name}</p>
        <p style={styles.detail}><strong>Email:</strong> {user.email}</p>
        <p style={styles.detail}><strong>Phone Number:</strong> {user.phone_number}</p>
      </div>
      <div style={styles.container}>
        {userGoods.map((item) => (
          <div key={item.id} style={styles.card}>
            <img src={item.img} alt={item.description} style={styles.image} />
            <p>{item.description}</p>
            <p>${item.price}</p>
            <button style={styles.button} onClick={() => handleDeleteGood(item.id)}>Delete</button>
          </div>
        ))}
      </div>
    </main>
  );
}

const styles = {
  main: {
    fontFamily: "'Roboto', sans-serif",
    backgroundColor: '#f9f9f9',
    padding: '20px',
  },
  profileInfo: {
    textAlign: 'center',
    marginBottom: '40px',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '2.5em',
    marginBottom: '10px',
    color: '#333',
  },
  detail: {
    fontSize: '1.2em',
    margin: '5px 0',
    color: '#555',
  },
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
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  image: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '5px',
  },
  button: {
    marginTop: '10px',
    padding: '5px 10px',
    fontSize: '14px',
    borderRadius: '5px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#c82333',
  },
};

export default UserProfile;