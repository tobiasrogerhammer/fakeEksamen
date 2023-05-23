import React, { useState } from "react";
import axios from "axios";
import styles from "../multipleUsers.module.css";

const Signup = () => {
  const [users, setUsers] = useState([
    { username: "", mailadress: "", password: "" },
  ]);
  const [createdUsers, setCreatedUsers] = useState([]);
  const [error, setError] = useState(null);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedUsers = [...users];
    updatedUsers[index][name] = value;
    setUsers(updatedUsers);
  };

  const handleAddUser = () => {
    setUsers([...users, { username: "", mailadress: "", password: "" }]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await axios.post("http://localhost:5000/user/multiple", {
        users,
      });
      setCreatedUsers(response.data);
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className={styles.login}>
      <form onSubmit={handleSubmit}>
        {users.map((user, index) => (
          <div key={index}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={user.username}
              onChange={(event) => handleChange(index, event)}
              required
            />
            <input
              type="email"
              name="mailadress"
              placeholder="Email Address"
              value={user.mailadress}
              onChange={(event) => handleChange(index, event)}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={(event) => handleChange(index, event)}
              required
            />
          </div>
        ))}
        <button type="button" onClick={handleAddUser}>
          Add User
        </button>
        <div className={styles.buttons}>
          <button type="submit">Create Users</button>
          <a className={styles.link} href="/signup">
            Sign up
          </a>
        </div>
      </form>

      {createdUsers.length > 0 && (
        <div>
          <h3>Created Users:</h3>
          <ul>
            {createdUsers.map((user) => (
              <li key={user._id}>{user.username}</li>
            ))}
          </ul>
        </div>
      )}

      {error && <p>{error}</p>}
    </div>
  );
};

export default Signup;
