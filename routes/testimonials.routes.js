const express = require('express');
const router = express.Router();
const db = require('../db');

router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/testimonials/:id').get((req, res) => {
  res.json(db.testimonials[req.params.id]);
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
  db.testimonials.splice(req.params.id - 1, 1, registration);
  res.json({ message: 'OK' });
});

router.route('/testimonials:id').delete((req, res) => {
  db.testimonials.splice(req.params.id - 1, 1);
  res.json({ message: 'OK' });
});

module.exports = router;
