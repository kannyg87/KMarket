import React, { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom"; // Import useLocation hook
import { UserContext } from "../context/user";

const Header = () => {
  const { user, logout } = useContext(UserContext); // Access user context value and logout function
  const location = useLocation(); // Get current location

  const handleLogout = () => {
    logout(); // Call the logout function when the logout link is clicked
  };

  return (
    <header className="header">
      <div className="container">
        <h1 className="logo">KMarket</h1>
        <div>
          <h1>Hello, {user?.name || "Guest"}</h1> {/* Use optional chaining and fallback */}
          {!user && <NavLink to="/login" className="nav-link">Log In</NavLink>} {/* Render login link if user is not logged in */}
          {user && location.pathname !== "/" && <NavLink to="#" className="nav-link" onClick={handleLogout}>Logout</NavLink>} {/* Render logout link if user is logged in and not on "/" route */}
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
