import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../context/user";
import AdminUsers from "../pages/AdminUsers";

const Header = () => {
  const { user, setUser, isAdmin } = useContext(UserContext);
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
    <header className="header">
      <div className="container">
        <h1 className="logo">KMarket</h1>
        <div>
          <h1>Hello, {user?.name || "Guest"}</h1>
        </div>
        <nav className="nav">
          <NavLink to="/home" className="nav-link">
            Home
          </NavLink>

          <NavLink to="/admin" className="nav-link">
            Admin
          </NavLink>

          <NavLink to="/profile" className="nav-link">
            Profile
          </NavLink>

          <NavLink
            to="https://6660ff4786958d10a5b9af08--stirring-panda-8201e8.netlify.app/"
            target="_blank"
            className="nav-link"
          >
            About
          </NavLink>
          <button onClick={handleLogout} className="nav-link button-link">
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
