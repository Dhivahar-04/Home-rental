import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

// CREATE ROOM
export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } });
    } catch (err) {
      next(err);
    }
    res.status(201).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

// DELETE ROOM
export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: req.params.id } });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Room deleted.");
  } catch (err) {
    next(err);
  }
};

// GET ROOM
export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};

// GET ALL ROOMS
export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};
