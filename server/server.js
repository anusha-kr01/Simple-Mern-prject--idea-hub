require('dotenv').config(); // ✅ Load environment variables FIRST
console.log('MONGO_URI:', process.env.MONGO_URI); // ✅ Debug log to check if loaded

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Idea = require('./models/Idea');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Dev Ideas Hub API is running');
});

app.get('/ideas', async (req, res) => {
  try {
    const ideas = await Idea.find();
    res.json(ideas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/ideas', async (req, res) => {
  const idea = new Idea({
    title: req.body.title,
    description: req.body.description,
  });

  try {
    const newIdea = await idea.save();
    res.status(201).json(newIdea);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
