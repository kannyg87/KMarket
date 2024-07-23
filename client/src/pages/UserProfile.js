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

  return (
    <main>
      <Header />
      <h1>This is the user profile component</h1>
      <h1>User name: {user.name}</h1>
      <h1>User email: {user.email}</h1>
      <div style={styles.container}>
        {userGoods.map((item) => (
          <div key={item.id} style={styles.card}>
            <img src={item.img} alt={item.description} style={styles.image} />
            <p>{item.description}</p>
            <p>${item.price}</p>
          </div>
        ))}
      </div>
    </main>
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

export default UserProfile;