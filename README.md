#  Hall Booking Application

## Overview

The Hall Booking Application is a full-stack web application designed to manage and book rooms for various events. It allows users to create rooms, book them, and view booking details. The application is built using  MongoDB, Express.js,  Node.js and includes APIs for room management and booking.

## Features

- **Create Rooms**: Define new rooms with details such as the number of seats, amenities, and hourly price.
- **Book Rooms**: Book a room by specifying customer details, date, start time, and end time.
- **List Rooms**: View all rooms along with their booking statuses.
- **List Customers**: View all customers and their bookings.
- **Customer Booking History**: View booking history for a specific customer.

# Testing the API
- Create a Room: POST /api/rooms
- Book a Room: POST /api/bookings
- List All Rooms with Booking Data: GET /api/rooms
- List All Customers with Booking Data: GET /api/customers
- List Customer’s Bookings: GET /api/customer-bookings/:customerName

# Deployment Url: 
- **Back-end Deployment used render.com**
- https://hall-booking-vg19.onrender.com
