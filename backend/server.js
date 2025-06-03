const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 7777;

// Middleware
app.use(cors());
app.use(express.json());

// ======== ROUTE: /aboutMe ========

// GET aboutMe
app.get('/aboutMe', (req, res) => {
  fs.readFile('aboutMe.json', 'utf8', (err, data) => {
    if (err) return res.json({ body: '' });
    try {
      const parsed = JSON.parse(data);
      res.json(parsed);
    } catch (e) {
      res.json({ body: '' });
    }
  });
});

// POST aboutMe
app.post('/aboutMe', (req, res) => {
  const body = { body: req.body.body };
  fs.writeFile('aboutMe.json', JSON.stringify(body), err => {
    if (err) return res.status(500).send('Error saving aboutMe');
    res.status(200).json(body);
  });
});

// ======== ROUTE: /contactMe ========

// GET contactMe
app.get('/contactMe', (req, res) => {
  fs.readFile('contactMe.json', 'utf8', (err, data) => {
    if (err) return res.json([]);
    try {
      const parsed = JSON.parse(data);
      res.json(parsed);
    } catch (e) {
      res.json([]);
    }
  });
});

// POST contactMe
app.post('/contactMe', (req, res) => {
  const newEntry = req.body;

  fs.readFile('contactMe.json', 'utf8', (err, data) => {
    let current = [];
    if (!err && data) {
      try {
        current = JSON.parse(data);
      } catch (e) {}
    }
    current.push(newEntry);

    fs.writeFile('contactMe.json', JSON.stringify(current, null, 2), err => {
      if (err) return res.status(500).send('Error saving contact data');
      res.status(200).json(newEntry);
    });
  });
});

// ======== Start Server ========
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
