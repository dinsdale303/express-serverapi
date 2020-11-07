const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
  const index = db.seats.findIndex((item) => item.id == req.params.id);
  res.json(db.seats[index]);
});

router.route('/seats').post((req, res) => {
  const registration = {
    id: uuidv4(),
    day: req.body.day,
    seat: req.body.seat,
    client: req.body.client,
    email: req.body.email,
  };
  if (
    db.seats.some(
      (item) => item.seat === registration.seat && item.day === registration.day
    )
  ) {
    res.json({ message: 'The slot is already taken...' });
  } else {
    db.seats.push(registration);
    res.json({ message: 'OK' });
  }
});

router.route('/seats/:id').put((req, res) => {
  const registration = {
    id: req.params.id,
    day: req.body.day,
    seat: req.body.seat,
    client: req.body.client,
    email: req.body.email,
  };
  const index = db.seats.findIndex((item) => item.id == req.params.id);
  db.seats.splice(index, 1, registration);
  res.json({ message: 'OK' });
});

router.route('/seats/:id').delete((req, res) => {
  const index = db.seats.findIndex((item) => item.id == req.params.id);
  db.seats.splice(index, 1);
  res.json({ message: 'OK' });
});

module.exports = router;
