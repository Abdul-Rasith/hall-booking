const express = require('express');
const Room = require('../models/Room');
const Booking = require('../models/Booking');

const router = express.Router();

// Create a Room
router.post('/rooms', async (req, res) => {
  const { seats, amenities, pricePerHour } = req.body;

  try {
    const newRoom = new Room({ seats, amenities, pricePerHour });
    await newRoom.save();
    res.status(201).json({ message: 'Room created successfully', room: newRoom });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create room', details: error.message });
  }
});

// Book a Room
router.post('/bookings', async (req, res) => {
  const { customerName, date, startTime, endTime, roomId } = req.body;

  try {
    const booking = new Booking({ customerName, date, startTime, endTime, roomId });
    await booking.save();
    res.status(201).json({ message: 'Room booked successfully', booking });
  } catch (error) {
    res.status(500).json({ error: 'Failed to book room', details: error.message });
  }
});

// List All Rooms with Booking Data
// List All Rooms with Booking Data
router.get('/rooms', async (req, res) => {
    try {
      const rooms = await Room.find();
      const bookings = await Booking.find().populate('roomId');
  
      const roomData = rooms.map(room => {
        const roomBookings = bookings.filter(booking => booking.roomId && booking.roomId._id.equals(room._id));
        return {
          roomName: `Room ${room._id}`,
          bookedStatus: roomBookings.length > 0,
          bookings: roomBookings.map(booking => ({
            customerName: booking.customerName,
            date: booking.date,
            startTime: booking.startTime,
            endTime: booking.endTime,
          })),
        };
      });
  
      res.status(200).json(roomData);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch rooms data', details: error.message });
    }
  });
  
// List All Customers with Booking Data
// List All Customers with Booking Data
router.get('/customers', async (req, res) => {
    try {
      const bookings = await Booking.find().populate('roomId');
  
      const customerData = bookings.map(booking => {
        // Check if roomId is valid and not null
        if (!booking.roomId) {
          console.log(`Booking with ID ${booking._id} has no valid roomId`);
          return null; // Skip this entry
        }
  
        return {
          customerName: booking.customerName,
          roomName: `Room ${booking.roomId._id}`,
          date: booking.date,
          startTime: booking.startTime,
          endTime: booking.endTime,
        };
      }).filter(data => data !== null); // Filter out null entries
  
      res.status(200).json(customerData);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch customer data', details: error.message });
    }
  });

// individual customer list
router.get('/customer-bookings/:customerName', async (req, res) => {
    const { customerName } = req.params;
  
    try {
      const bookings = await Booking.find({ customerName }).populate('roomId');
  
      if (bookings.length === 0) {
        return res.status(404).json({ message: `No bookings found for customer: ${customerName}` });
      }
  
      const customerBookings = bookings.map(booking => ({
        customerName: booking.customerName,
        roomName: booking.roomId ? `Room ${booking.roomId._id}` : 'Unknown Room',
        date: booking.date,
        startTime: booking.startTime,
        endTime: booking.endTime,
        bookingId: booking._id,
        bookingDate: booking.createdAt,
        bookingStatus: booking.status // Assuming you have a status field
      }));
  
      res.status(200).json(customerBookings);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch customer bookings', details: error.message });
    }
  });
module.exports = router;
