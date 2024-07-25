import React, { useEffect, useState } from "react";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    fetch("http://127.0.0.1:5555/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  const handleDelete = (userId) => {
    fetch(`http://127.0.0.1:5555/users/${userId}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        setUsers(users.filter((user) => user.id !== userId));
      }
    });
  };

  const handleEditClick = (user) => {
    setEditUserId(user.id);
    setFormData({ name: user.name, email: user.email, password: "" });
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (editUserId) {
      // Update user
      fetch(`http://127.0.0.1:5555/users/${editUserId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }).then((response) => {
        if (response.ok) {
          setUsers(
            users.map((user) =>
              user.id === editUserId ? { ...user, ...formData } : user
            )
          );
          setEditUserId(null);
          setFormData({ name: "", email: "", password: "" });
        }
      });
    } else {
      // Create user
      fetch("http://127.0.0.1:5555/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }).then((response) => {
        if (response.ok) {
          response.json().then((newUser) => {
            setUsers([...users, newUser]);
            setFormData({ name: "", email: "", password: "" });
          });
        }
      });
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>All Users</h1>
      <form onSubmit={handleFormSubmit} style={styles.form}>
        <h2>{editUserId ? "Edit User" : "Create User"}</h2>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleFormChange}
          placeholder="Name"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleFormChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleFormChange}
          placeholder="Password"
          required={!editUserId}
        />
        <button type="submit">{editUserId ? "Update User" : "Create User"}</button>
      </form>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td style={styles.td}>{user.id}</td>
              <td style={styles.td}>{user.name}</td>
              <td style={styles.td}>{user.email}</td>
              <td style={styles.td}>
                <button onClick={() => handleEditClick(user)}>Edit</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#f0f4f8",
    borderRadius: "10px",
    width: "80%",
    margin: "0 auto",
    marginTop: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  title: {
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    marginBottom: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    border: "1px solid #ddd",
    padding: "8px",
    backgroundColor: "#f2f2f2",
  },
  td: {
    border: "1px solid #ddd",
    padding: "8px",
  },
};

export default AdminUsers;