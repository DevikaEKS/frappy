import React, { useState } from 'react';

const Loginpage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const loginUser = async () => {
    try {
        alert("enter")
      const response = await fetch('http://kgglcrm.com:8000/api/method/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `usr=${username}&pwd=${password}`,
        credentials:`include`,
      });

      const data = await response.json();
      if (data.message === 'Logged in') {
        setMessage('Logged in successfully!');
        console.log('Logged in successfully');
        // Redirect to the ERPNext dashboard
        window.location.href = '/dashboard'; // Replace with the correct route for your application
      } else {
        setMessage('Login failed. Please check your credentials.');
        console.log('Login failed');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
    //   console.error('Error:', error);
    // setMessage("error",)
    console.log(error)
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser();
  };

  return (
    <div style={styles.container}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <button type="submit" style={styles.button}>Login</button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    maxWidth: '400px',
    margin: '50px auto',
    textAlign: 'center',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '15px',
    textAlign: 'left',
  },
  input: {
    width: '100%',
    padding: '8px',
    margin: '5px 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 15px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  message: {
    marginTop: '15px',
    color: 'red',
  },
};

export default Loginpage;
