import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import usersRoute from "./routes/users.js";
import errorHandler from "./utils/error.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8805;

// Middleware
app.use(express.json());

// Routes Middleware
app.use("/api/auth", authRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/users", usersRoute);

// Error Handling Middleware
app.use(errorHandler);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB.");
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });

// Starting the Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
