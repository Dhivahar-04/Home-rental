import Hotel from "../models/Hotel.js";

// Get all hotels
export const getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (err) {
    res.status(500).json({ message: "Error getting hotels", error: err });
  }
};

// Create a new hotel
export const createHotel = async (req, res) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(201).json(savedHotel);
  } catch (err) {
    res.status(500).json({ message: "Error creating hotel", error: err });
  }
};

// Delete a hotel
export const deleteHotel = async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel deleted successfully");
  } catch (err) {
    res.status(500).json({ message: "Error deleting hotel", error: err });
  }
};
