import express from "express";
import { getHotels, createHotel, deleteHotel } from "../controllers/hotel.js";

const router = express.Router();

router.get("/", getHotels);
router.post("/", createHotel);
router.delete("/:id", deleteHotel);

export default router;
