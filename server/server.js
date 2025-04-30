const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const User = require('./models/User');
const bcrypt = require('bcrypt');

const app = express();

const frontend = 'http://localhost:3000';

const corsOptions = {
  origin: frontend,
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions)); 
// app.options('/signup', cors(corsOptions)); // Handle preflight requests

app.use(express.json());

mongoose.connect(process.env.MONGO_URI_TOKEN)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    try {
      const existing = await User.findOne({ email });
      if (existing) return res.status(400).json({ message: 'User already exists' });

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hashedPassword });
      res.status(201).json({ message: 'User created!', user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error creating user' });
    }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error logging in' });
  }
});


app.get('/', (req, res) => {
  res.send('Hello from backend!');
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
