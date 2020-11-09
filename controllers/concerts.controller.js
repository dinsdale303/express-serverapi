const Concert = require('../models/concert.model');

exports.getAll = async (req, res) => {

  try {
    res.json(await Concert.find());
  } catch(err) {
    res.status(500).json(err);
  }
};

exports.getOne = async (req, res) => {

  try {
    const concert = await Concert.findById(req.params.id);

    if (!concert) {
      res.status(404).json({ message: 'Concert not found...' });
    } else {
      res.json(concert);
    }
  } catch(err) {
    res.status(500).json(err);
  }
};


exports.post = async (req, res) => {
  const { performer, genre, price, day } = req.body;

  try {
    const newConcert = new Concert({
      performer: performer,
      genre: genre,
      price: price,
      day: day,
    });
    await newConcert.save();
    res.json(newConcert);
  } catch(err) {
    res.status(500).json(err);
  }
};

exports.delete = async (req, res) => {

  try {
    const concert = await(Concert.findById(req.params.id));

    if (!concert) {
      res.status(404).json({ message: 'Concert not found...' });
    } else {
      await Concert.deleteOne({ _id: req.params.id });
      res.json(concert);
    }
  } catch(err) {
    res.status(500).json(err);
  }
};

exports.put = async (req, res) => {
  const { performer, genre, price, day } = req.body;

  try {
    const concert = await Concert.findById(req.params.id);

    if (!concert) {
      res.status(404).json({ message: 'Concert not found...' });
    } else {
      concert.performer = performer;
      concert.genre = genre;
      concert.price = price;
      concert.day = day;
      await concert.save();
      res.json(concert);
    }
  } catch(err) {
    res.status(500).json(err);
  }
};