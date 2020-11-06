const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  {
    id: 2,
    author: 'Amanda Doe',
    text: 'They really know how to make you happy.',
  },
  { id: 3, author: 'John Dim', text: 'This company is my!' },
  { id: 4, author: 'Amanda Dim', text: 'Hey!' },
];

app.get('/testimonials', (req, res) => {
  res.json(db);
});

app.get('/testimonials/random', (req, res) => {
  res.json(db[Math.floor(Math.random() * db.length)]);
});

app.get('/testimonials/:id', (req, res) => {
  res.json(db[req.params.id]);
});

app.post('/testimonials', (req, res) => {
  const registration = {
    id: uuidv4(),
    author: req.body.author,
    text: req.body.text,
  };
  db.push(registration);
  res.json({ message: 'OK' });
});

app.put('/testimonials/:id', (req, res) => {
  const registration = {
    id: db.length + 1,
    author: req.body.author,
    text: req.body.text,
  };
  db.splice(req.params.id - 1, 1, registration);
  res.json({ message: 'OK' });
});

app.delete('/testimonials/:id', (req, res) => {
  db.splice(req.params.id - 1, 1);
  res.json({ message: 'OK' });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
