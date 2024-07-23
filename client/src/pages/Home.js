import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { UserContext } from '../context/user';

function Home() {
  const [data, setData] = useState([]);
  const [selectedGoods, setSelectedGoods] = useState([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5555/goods")
      .then(resp => resp.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching goods:', error));
  }, []);

  const handleSelectGood = (goodId) => {
    setSelectedGoods(prevSelectedGoods =>
      prevSelectedGoods.includes(goodId)
        ? prevSelectedGoods.filter(id => id !== goodId)
        : [...prevSelectedGoods, goodId]
    );
  };

  const handleSubmit = async () => {
    if (!user || !user.id) {
      alert('User not logged in');
      return;
    }
    try {
      for (let goodId of selectedGoods) {
        const response = await fetch(`http://localhost:5555/users/${user.id}/goods`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ good_id: goodId })
        });
        if (response.status === 409) {
          console.log(`Good ID ${goodId} already added to user`);
        } else if (!response.ok) {
          throw new Error('Failed to add good to user');
        }
      }
      setSelectedGoods([]);
      navigate('/profile');
    } catch (error) {
      console.error('Error:', error);
      alert(`Error: ${error.message}`);
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
            <input
              type="checkbox"
              checked={selectedGoods.includes(item.id)}
              onChange={() => handleSelectGood(item.id)}
            />
          </div>
        ))}
      </div>
      <button style={styles.button} onClick={handleSubmit}>Submit</button>
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
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  }
};

export default Home;