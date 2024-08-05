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
    <main className="bg-gray-100 min-h-screen py-8 px-4">
      <Header />
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8 max-w-2xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">User Profile</h1>
        <p className="text-lg text-gray-700 mb-2"><strong>Name:</strong> {user.name}</p>
        <p className="text-lg text-gray-700 mb-2"><strong>Email:</strong> {user.email}</p>
        <p className="text-lg text-gray-700"><strong>Phone Number:</strong> {user.phone_number}</p>
      </div>
      <div className="flex flex-wrap justify-center">
        {userGoods.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-gray-300 rounded-lg p-4 m-2 w-64 text-center shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={item.img}
              alt={item.description}
              className="w-full h-40 object-cover mb-3 rounded-md"
            />
            <p className="text-lg font-medium text-gray-800">{item.description}</p>
            <p className="text-gray-600 text-lg">${item.price}</p>
            <button
              className="mt-4 py-2 px-4 bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-600 transition-colors duration-300"
              onClick={() => handleDeleteGood(item.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}

export default UserProfile;
