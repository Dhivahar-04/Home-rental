import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"; // Add this
import authRoute from "./routes/auth.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import usersRoute from "./routes/users.js";
import errorHandler from "./utils/error.js";

dotenv.config();
const app = express();

// Enable CORS for all requests
app.use(cors({ origin: 'http://localhost:8800' })); // Allow requests from React app

// Middleware to parse JSON data
app.use(express.json());

// API Routes
app.use("/api/auth", authRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/users", usersRoute);

// Global error handling
app.use(errorHandler);

// MongoDB connection
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("MongoDB connection failed:", error);
  }
};

app.listen(5000, () => {
  connect();
  console.log("Server is running on port 8800");
});
