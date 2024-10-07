// routes/hotels.js

import express from 'express';
import {
  createHotel,
  getHotels,
  getHotelById,
  updateHotel,
  deleteHotel
} from '../controller/hotels.js';

const router = express.Router();

// Routes
router.post('/', createHotel);       // Create a new hotel
router.get('/', getHotels);          // Get all hotels
router.get('/:id', getHotelById);    // Get a single hotel by ID
router.put('/:id', updateHotel);     // Update a hotel by ID
router.delete('/:id', deleteHotel);  // Delete a hotel by ID

export default router;
