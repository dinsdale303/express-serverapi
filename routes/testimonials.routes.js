const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/testimonials/:id').get((req, res) => {
  const index = db.testimonials.findIndex((item) => item.id == req.params.id);
  res.json(db.testimonials[index]);
});

router.route('/testimonials').post((req, res) => {
  const registration = {
    id: uuidv4(),
    author: req.body.author,
    text: req.body.text,
  };
  db.testimonials.push(registration);
  res.json({ message: 'OK' });
});

router.route('/testimonials/:id').put((req, res) => {
  const registration = {
    id: req.params.id,
    author: req.body.author,
    text: req.body.text,
  };
  const index = db.testimonials.findIndex((item) => item.id == req.params.id);
  db.testimonials.splice(index, 1, registration);
  res.json({ message: 'OK' });
});

router.route('/testimonials/:id').delete((req, res) => {
  const index = db.testimonials.findIndex((item) => item.id == req.params.id);
  db.testimonials.splice(index, 1);
  res.json({ message: 'OK' });
});

module.exports = router;
