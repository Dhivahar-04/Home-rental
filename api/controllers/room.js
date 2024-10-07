import Room from "../models/Room.js";

// Get all rooms
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    res.status(500).json({ message: "Error getting rooms", error: err });
  }
};

// Create a new room
export const createRoom = async (req, res) => {
  const newRoom = new Room(req.body);
  try {
    const savedRoom = await newRoom.save();
    res.status(201).json(savedRoom);
  } catch (err) {
    res.status(500).json({ message: "Error creating room", error: err });
  }
};

// Delete a room
export const deleteRoom = async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.status(200).json("Room deleted successfully");
  } catch (err) {
    res.status(500).json({ message: "Error deleting room", error: err });
  }
};
