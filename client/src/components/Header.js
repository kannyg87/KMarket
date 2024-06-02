import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "../index.css";
import { UserContext } from "../context/user";

const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <header className="header">
      <div className="container">
        <h1 className="logo">KMarket</h1>
        <h1>Hello, {user?.name || "Guest"}</h1> {/* Use optional chaining and fallback */}
        <nav className="nav">
          <NavLink to="/home" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/about" className="nav-link">
            About
          </NavLink>
          <NavLink to="/login" className="nav-link">
            Login
          </NavLink>
          <NavLink to="/profile" className="nav-link">
            Profile
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
