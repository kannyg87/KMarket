import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/user";

const Header = () => {
  const { user, logout } = useContext(UserContext);

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
          <NavLink to="/profile" className="nav-link">
            Profile
          </NavLink>
          <NavLink to="https://6660ff4786958d10a5b9af08--stirring-panda-8201e8.netlify.app/" target="_blank" className="nav-link">
            About
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
