const mongoose = require('mongoose');

// Room Schema and Model
const roomSchema = new mongoose.Schema({
  seats: {
    type: Number,
    required: true,
  },
  amenities: {
    type: [String], // Array of amenities
    required: true,
  },
  pricePerHour: {
    type: Number,
    required: true,
  },
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;

