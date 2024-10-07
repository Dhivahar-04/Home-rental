import express from "express";
const router = express.Router();

// Define the routes for rooms
router.get("/", (req, res) => {
    res.send("Rooms route");
});

export default router;
