const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
  const index = db.concerts.findIndex((item) => item.id == req.params.id);
  res.json(db.concerts[index]);
});

router.route('/concerts').post((req, res) => {
  const registration = {
    id: uuidv4(),
    performer: req.body.performer,
    genre: req.body.genre,
    price: req.body.price,
    day: req.body.day,
    image: req.body.image,
  };
  db.concerts.push(registration);
  res.json({ message: 'OK' });
});

router.route('/concerts/:id').put((req, res) => {
  const registration = {
    id: req.params.id,
    performer: req.body.performer,
    genre: req.body.genre,
    price: req.body.price,
    day: req.body.day,
    image: req.body.image,
  };
  const index = db.concerts.findIndex((item) => item.id == req.params.id);
  db.concerts.splice(index, 1, registration);
  res.json({ message: 'OK' });
});

router.route('/concerts/:id').delete((req, res) => {
  const index = db.concerts.findIndex((item) => item.id == req.params.id);
  db.concerts.splice(index, 1);
  res.json({ message: 'OK' });
});

module.exports = router;
