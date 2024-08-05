import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { UserContext } from "../context/user";

function Home() {
  const [data, setData] = useState([]);
  const [selectedGoods, setSelectedGoods] = useState([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5555/goods")
      .then((resp) => resp.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching goods:", error));
  }, []);

  const handleSelectGood = (goodId) => {
    setSelectedGoods((prevSelectedGoods) =>
      prevSelectedGoods.includes(goodId)
        ? prevSelectedGoods.filter((id) => id !== goodId)
        : [...prevSelectedGoods, goodId]
    );
  };

  const handleSubmit = async () => {
    if (!user || !user.id) {
      alert("User not logged in");
      return;
    }
    try {
      for (let goodId of selectedGoods) {
        const response = await fetch(
          `http://localhost:5555/users/${user.id}/goods`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ good_id: goodId }),
          }
        );
        if (response.status === 409) {
          console.log(`Good ID ${goodId} already added to user`);
        } else if (!response.ok) {
          throw new Error("Failed to add good to user");
        }
      }
      setSelectedGoods([]);
      navigate("/profile");
    } catch (error) {
      console.error("Error:", error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <Header />
      <div className="flex flex-wrap justify-center p-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-gray-300 rounded-lg p-4 m-2 text-center w-48 shadow-lg"
          >
            <img
              src={item.img}
              alt={item.description}
              className="w-full h-36 object-cover mb-2 rounded-md"
            />
            <p className="text-lg font-medium">{item.description}</p>
            <p className="text-gray-700">${item.price}</p>
            <label className="inline-flex items-center mt-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedGoods.includes(item.id)}
                onChange={() => handleSelectGood(item.id)}
                className="form-checkbox"
              />
              <span className="ml-2">Select</span>
            </label>
          </div>
        ))}
      </div>
      <button
        className="mt-6 py-2 px-4 text-lg font-semibold text-white bg-green-500 rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}

export default Home;
