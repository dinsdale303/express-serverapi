
const express = require('express');
const router = express.Router();

const ConcertController = require('../controllers/concerts.controller');

router.route('/concerts').get(ConcertController.getAll);

router.route('/concerts/:id').get(ConcertController.getOne);

router.route('/concerts').post(ConcertController.post);

router.route('/concerts/:id').delete(ConcertController.delete);

router.route('/concerts/:id').put(ConcertController.put);

module.exports = router;