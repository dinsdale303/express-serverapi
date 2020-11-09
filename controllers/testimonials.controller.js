const Testimonial = require('../models/testimonial.model');

exports.getAll = async (req, res) => {

  try {
    res.json(await Testimonial.find());
  } catch(err) {
    res.status(500).json(err);
  }
};

exports.getRandom = async (req, res) => {

  try {
    const count = await Testimonial.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const testi = await Testimonial.findOne().skip(rand);

    if (!testi) {
      res.status(404).json({ message: 'Not found...' });
    } else {
      res.json(testi);
    }
  } catch(err) {
    res.status(500).json(err);
  }
};

exports.getOne = async (req, res) => {

  try {
    const test = await Testimonial.findById(req.params.id);

    if (!test) {
      res.status(404).json({ message: 'Not found...' });
    } else {
      res.json(test);
    }
  } catch(err) {
    res.status(500).json(err);
  }
};

exports.post = async (req, res) => {
  const { author, text } = req.body;

  try {
    const newTestimonial = new Testimonial({ author: author, text: text });
    await newTestimonial.save();
    res.json(newTestimonial);
  } catch(err) {
    res.status(500).json(err);
  }
};

exports.delete = async (req, res) => {

  try {
    const test = await Testimonial.findById(req.params.id);

    if (!test) {
      res.status(404).json({ message: 'Not found...' });
    } else {
      await Testimonial.deleteOne({ _id: req.params.id });
      res.json(test);
    }
  } catch(err) {
    res.status(500).json(err);
  }
};

exports.put = async (req, res) => {
  const { author, text } = req.body;

  try {
    const test = await Testimonial.findById(req.params.id);

    if (!test) {
      res.status(404).json({ message: 'Not found...' });
    } else {
      test.author = author;
      test.text = text;
      await test.save();
      res.json(test);
    }
  } catch(err) {
    res.status(500).json(err);
  }
};