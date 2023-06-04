const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Roshni:P1234@cluster0.tjb9p6l.mongodb.net/');

module.exports = mongoose.connection;