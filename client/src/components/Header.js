import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../context/user";

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch("http://localhost:5555/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          setUser(null);
          navigate("/");
        } else {
          return res.json().then((error) => {
            console.error("Logout failed", error);
          });
        }
      })
      .catch((err) => console.error("Logout failed", err));
  };

  return (
    <header className="bg-gray-800 text-white p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-2xl font-bold">KMarket</h1>
        <div className="mt-2 md:mt-0">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-100 tracking-tight shadow-lg p-2 rounded-lg bg-gray-800 bg-opacity-50">
            Hello, {user?.name || "Guest"}
          </h1>
        </div>

        <nav className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mt-4 md:mt-0">
          <NavLink
            to="/home"
            className="text-white hover:underline px-3 py-2 rounded transition duration-300 ease-in-out hover:bg-gray-700"
          >
            Home
          </NavLink>

          {user?.admin && (
            <NavLink
              to="/admin"
              className="text-white hover:underline px-3 py-2 rounded transition duration-300 ease-in-out hover:bg-gray-700"
            >
              Admin
            </NavLink>
          )}

          <NavLink
            to="/profile"
            className="text-white hover:underline px-3 py-2 rounded transition duration-300 ease-in-out hover:bg-gray-700"
          >
            Profile
          </NavLink>

          <NavLink
            to="https://6660ff4786958d10a5b9af08--stirring-panda-8201e8.netlify.app/"
            target="_blank"
            className="text-white hover:underline px-3 py-2 rounded transition duration-300 ease-in-out hover:bg-gray-700"
          >
            About
          </NavLink>
          <button
            onClick={handleLogout}
            className="text-white px-3 py-2 rounded transition duration-300 ease-in-out bg-gray-600 hover:bg-gray-700"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
