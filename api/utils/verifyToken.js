import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token; // Ensure you're setting this in your requests
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => { // Use JWT_SECRET from .env
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user; // Set the user object in the request
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user && (req.user.id === req.params.id || req.user.isAdmin)) { // Check if user exists
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user && req.user.isAdmin) { // Check if user exists and is admin
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};
