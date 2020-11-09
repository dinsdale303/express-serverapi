const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

// import routes
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/api', testimonialsRoutes); // add testimonials routes to server
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

mongoose.connect(`mongodb+srv://admin:${process.env.dbPwd}@cluster0-98b5u.azure.mongodb.net/NewWaveDB?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});

db.on('error', err => console.log('Error' + err));

app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});
