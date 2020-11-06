const express = require('express');
const router = express.Router();
const db = require('../db');

router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
  res.json(db.concerts[req.params.id]);
});

router.route('/concerts').post((req, res) => {
  const registration = {
    id: uuidv4(),
    author: req.body.author,
    text: req.body.text,
  };
  db.concerts.push(registration);
  res.json({ message: 'OK' });
});

router.route('/concerts/:id').put((req, res) => {
  const registration = {
    id: req.params.id,
    author: req.body.author,
    text: req.body.text,
  };
  db.concerts.splice(req.params.id - 1, 1, registration);
  res.json({ message: 'OK' });
});

router.route('/concerts:id').delete((req, res) => {
  db.concerts.splice(req.params.id - 1, 1);
  res.json({ message: 'OK' });
});

module.exports = router;
