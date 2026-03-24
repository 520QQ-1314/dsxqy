const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());
app.use(require('cors')());

const TARGET = 'https://api.nanobanana.pro/v1/generate';
const BACKEND_TOKEN = 'your_secret_token_here';

app.post('/generate', async (req, res) => {
  try {
    const resp = await axios.post(TARGET, req.body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${BACKEND_TOKEN}`
      },
      timeout: 60000
    });
    res.json(resp.data);
  } catch (e) {
    res.status(500).json({error: e.message});
  }
});

app.listen(3000, ()=> console.log('API proxy https://localhost:3000/generate'));
