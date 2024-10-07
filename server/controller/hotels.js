// controllers/hotels.js

// Mock data for hotels (this can be replaced with actual database logic)
const hotels = [];

// Create a new hotel
export const createHotel = (req, res) => {
  const { id, name, location, price } = req.body; // Assume these fields are required
  if (!id || !name || !location || !price) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const newHotel = { id, name, location, price }; // Create a hotel object
  hotels.push(newHotel);
  res.status(201).json(newHotel);
};

// Get all hotels
export const getHotels = (req, res) => {
  res.status(200).json(hotels);
};

// Get a hotel by ID
export const getHotelById = (req, res) => {
  const hotelId = req.params.id;
  const hotel = hotels.find(h => h.id === hotelId);
  if (!hotel) return res.status(404).json({ message: "Hotel not found" });
  res.status(200).json(hotel);
};

// Update a hotel by ID
export const updateHotel = (req, res) => {
  const hotelId = req.params.id;
  const updatedHotelData = req.body;
  const hotelIndex = hotels.findIndex(h => h.id === hotelId);

  if (hotelIndex === -1) return res.status(404).json({ message: "Hotel not found" });

  // Update hotel while preserving the original id
  const updatedHotel = { ...hotels[hotelIndex], ...updatedHotelData };
  hotels[hotelIndex] = updatedHotel;
  res.status(200).json(updatedHotel);
};

// Delete a hotel by ID
export const deleteHotel = (req, res) => {
  const hotelId = req.params.id;
  const hotelIndex = hotels.findIndex(h => h.id === hotelId);

  if (hotelIndex === -1) return res.status(404).json({ message: "Hotel not found" });

  hotels.splice(hotelIndex, 1);
  res.status(200).json({ message: "Hotel deleted successfully" });
};
