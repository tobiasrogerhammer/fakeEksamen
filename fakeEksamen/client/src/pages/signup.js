import React, { useState } from 'react';
import styles from '../login.module.css';
import axios from "axios";
import bcrypt from 'bcryptjs';

function Signup({ onSignup }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const saltRounds = 10; // the number of rounds used for salting

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const salt = await bcrypt.genSalt(saltRounds); // generate a unique salt
      const hashedPassword = await bcrypt.hash(password, salt); // hash the password with the salt
      const response = await axios.post("http://localhost:5000/user/create", {
        username: username,
        mailadress: email,
        password: hashedPassword
      }, {withCredentials: true});
      console.log(response);
      if (response.data.exists) {
        setError('Username or email already taken');
      }
      if(response.status === 200){
        sessionStorage.setItem("username", username);
        window.location.href = "/chat";
      }
    } catch (error) {
      console.log('dette er en feil')
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/user/login", {
        username: username,
        password: password
      }, {withCredentials: true});
      console.log(response);
      if (response.status === 200) {
        sessionStorage.setItem("username", username);
        window.location.href = "/chat";
      }
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className={styles.login}>
      <h2>Sign up</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <br />
        <button type="submit">Sign up</button>
      </form>
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Signup;
