import bcrypt from 'bcryptjs';
import User from "../models/User.js"; 

// Register new user with hashed password
export const register = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save the new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
};

// User login with password comparison
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json("User not found");

    // Compare hashed password
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) return res.status(400).json("Incorrect password");

    res.status(200).json("Logged in successfully");
  } catch (err) {
    next(err);
  }
};
