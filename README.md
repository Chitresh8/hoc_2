# React + Vite.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

Installed npm install browser-image-compression (image compression package)
npm create vite@latest - Installed
npm install redux react-redux redux-thunk - Installed 
To create a login API for a React.js application, you'll typically set up a backend server with an endpoint to handle login requests. Here’s a step-by-step guide:

1. Backend API Setup (Node.js + Express)
First, set up an API endpoint on a server. Here's an example with Node.js and Express:

Install dependencies: Make sure to install express and bcrypt for password hashing (if storing passwords).

bash
Copy code
npm install express bcrypt jsonwebtoken
Create the server:

javascript
Copy code
// server.js
<!-- const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express(); -->

// Middleware to parse JSON bodies
<!-- app.use(express.json()); -->

// Sample user data (In real projects, use a database)
<!-- const users = [{ username: 'testUser', password: await bcrypt.hash('password123', 10) }]; -->

// Login route
<!-- app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username); -->

  // Check if user exists and password is correct
  <!-- if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // Create JWT token
  const token = jwt.sign({ username: user.username }, 'your-secret-key', { expiresIn: '1h' });
  res.json({ token });
}); -->

<!-- app.listen(3000, () => {
  console.log('Server running on port 3000');
}); -->
Configure CORS (optional) if your React app is on a different domain.

2. React Login Form and API Integration
Set up the login form:

javascript
Copy code
// Login.js
<!-- import React, { useState } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid login');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token); // Store the token
      alert('Login successful!');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
}

export default Login; -->
Authenticate Requests Using the Token: For authenticated routes, add the token to the Authorization header:

javascript
Copy code
<!-- const token = localStorage.getItem('token');

const response = await fetch('http://localhost:3000/protected-route', {
  headers: { Authorization: `Bearer ${token}` },
}); -->
3. Handling Protected Routes in React
Check Authentication Status: Use the presence of the token in localStorage to determine if a user is logged in.
Redirect Unauthorized Users: In your protected pages, check for the token and redirect if it's missing.
This basic setup should get you started with a login API for a React.js app, complete with token-based authentication and login handling.


<!--Getting error like this

when i login with the api, showing error like this

ajaxRequestInterceptor.ps.js:1 
 POST http://localhost:5173/login net::ERR_ABORTED 404 (Not Found)
n	@	ajaxRequestInterceptor.ps.js:1
fetch	@	ajaxRequestInterceptor.ps.js:1
await in fetch		
loginClickHandler	@	TodoList.jsx:84
Show 15 more frames -->


ChatGPT said:
ChatGPT
The error net::ERR_ABORTED 404 (Not Found) means that your React application is trying to access http://localhost:5173/login, but it’s not finding that route on your backend server. This typically happens if:

The backend server is not running on the correct port or has not started.
The frontend is trying to reach the backend at the wrong URL (wrong port or incorrect path).
There’s a CORS (Cross-Origin Resource Sharing) issue.
Steps to Resolve the Issue
1. Verify Your Backend Server is Running on the Correct Port
Make sure your backend server is running and listening on http://localhost:3000, as that’s where the login endpoint is defined in your backend code.

2. Update the API URL in Your React Application
It looks like your React app is trying to send requests to its own port (http://localhost:5173/login), which is incorrect if the backend is on a different port (e.g., 3000). To fix this:

Replace the fetch URL in your login request in Login.js with the correct backend address:

javascript
Copy code
const response = await fetch('http://localhost:3000/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username, password }),
});
This directs the request to http://localhost:3000/login, where your backend should be listening.

3. Check CORS Configuration (Optional)
If the backend server is on a different origin (e.g., localhost:3000 while React runs on localhost:5173), you’ll need to ensure your backend allows cross-origin requests. To enable CORS in an Express backend:

Install the cors package:

bash
Copy code
npm install cors
Then, update your backend code to use cors:

javascript
Copy code
const cors = require('cors');
app.use(cors());
This will allow requests from other origins, like your React development server.



Redux thunk step by step installation
1.In Terminal ==> npm install redux react-redux redux-thunk
