const express = require('express');
const router = express.Router();
const db = require('../db');

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
  res.json(db.seats[req.params.id]);
});

router.route('/seats').post((req, res) => {
  const registration = {
    id: uuidv4(),
    author: req.body.author,
    text: req.body.text,
  };
  db.seats.push(registration);
  res.json({ message: 'OK' });
});

router.route('/seats/:id').put((req, res) => {
  const registration = {
    id: req.params.id,
    author: req.body.author,
    text: req.body.text,
  };
  db.seats.splice(req.params.id - 1, 1, registration);
  res.json({ message: 'OK' });
});

router.route('/seats:id').delete((req, res) => {
  db.seats.splice(req.params.id - 1, 1);
  res.json({ message: 'OK' });
});

module.exports = router;
