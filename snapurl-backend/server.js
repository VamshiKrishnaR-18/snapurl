import 'dotenv/config'; // Loads variables from the .env file
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { nanoid } from 'nanoid';
import Url from './Url.js';

const app = express();

app.use(express.json());
app.use(cors());

// Connect securely using the environment variable
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

app.post('/api/shorten', async (req, res) => {
  const { originalUrl, customAlias } = req.body;
  
  if (!originalUrl) {
    return res.status(400).json({ error: 'URL is required' });
  }

  let shortId;

  if (customAlias) {
    const existing = await Url.findOne({ shortId: customAlias });
    if (existing) {
      return res.status(400).json({ error: 'Alias already in use. Try another one.' });
    }
    shortId = customAlias;
  } else {
    shortId = nanoid(8);
  }
  
  try {
    const newUrl = await Url.create({ originalUrl, shortId });
    res.json(newUrl);
  } catch (error) {
    res.status(500).json({ error: 'Server error while saving URL' });
  }
});

app.get('/:shortId', async (req, res) => {
  const { shortId } = req.params;
  
  try {
    const url = await Url.findOneAndUpdate(
      { shortId },
      { $inc: { clicks: 1 } },
      { new: true }
    );

    if (!url) {
      return res.status(404).send('SnapURL not found');
    }

    res.redirect(url.originalUrl);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

app.get('/api/urls', async (req, res) => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 });
    res.json(urls);
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching URLs' });
  }
});

app.listen(5000, () => console.log('SnapURL Engine running on port 5000'));

export default app;