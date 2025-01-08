// server.js
// const express = require('express');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const cors = require('cors');

//we can write like this for 2,3,4 lines
// import express, { json } from 'express';
// import { hash, compare } from 'bcrypt';
// import { sign } from 'jsonwebtoken';
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';
const app = express();

// Middleware to parse JSON bodies
app.use(express.json()); // Parse JSON request bodies

//TO avoid CORS error
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // Allows cookies if needed
  }));
  app.options('/login', cors()); // Allow OPTIONS requests for /login
// Sample user data (In real projects, use a database)
// const users = [{ email: 'testuser@gmail.com', password: await bcrypt.hash('password123', 10) }];
const initializeUsers = async () => {
    const users = [
      { email: 'testuser@gmail.com', password: await bcrypt.hash('password123', 10) }
    ];
    return users;
  };
  
  let users = [];
  initializeUsers().then((data) => { users = data; });

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  res.status(200).json({ message: 'Login successful' });

  // Check if user exists and password is correct
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // Create JWT token
  const token = jwt.sign({ email: user.email }, 'your-secret-key', { expiresIn: '1h' });
  res.json({ token });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
