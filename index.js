const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('could not connect to MongoDB', err));