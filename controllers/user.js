import User from '../models/user.js';
import jwt from "jsonwebtoken";
import Joi from 'joi';
const secretKey = "Dabbemein4098";
const JWT_EXPIRATION = '1d';

const userSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  age: Joi.number().required(),
  city: Joi.string().required(),
  zipCode: Joi.string().required()
});

export const Signup = async (req, res) => {
  res.render('login');
};

export const Login = async (req, res) => {
  res.render('signup');
};

export const HandleUserSignup = async (req, res) => {
  try {
    // Validate the request body
    const { error } = userSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { username, password, email, name, age, city, zipCode } = req.body;

    // Check if user already exists
    let existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists.' });
    }

    // Create new user with the provided details
    const newUser = new User({ username, password, email, name, age, city, zipCode });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    // Save the new user to the database
    await newUser.save();

    // Generate a JWT token
    const token = jwt.sign({ id: newUser._id }, secretKey, { expiresIn: JWT_EXPIRATION });

    // Respond with the token and user data
    res.status(201).json({ token, user: { id: newUser._id, username: newUser.username, email: newUser.email, name: newUser.name, age: newUser.age, city: newUser.city, zipCode: newUser.zipCode } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const HandleUserLogin = async (req, res) => {
  try {
    const { email, zipCode, password } = req.body;

    // Validate input
    if (!email || !zipCode || !password) {
      return res.status(400).json({ message: 'Email, zip code, and password are required.' });
    }

    // Find user by email and zip code
    const user = await User.findOne({ email, zipCode });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email, zip code, or password.' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email, zip code, or password.' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: JWT_EXPIRATION });

    // Respond with token and user data
    res.status(200).json({ token, user: { id: user._id, email: user.email, zipCode: user.zipCode } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from the decoded token

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUserById = async (req, res) => {
  try {
    const { error } = userSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const userId = req.user.id; // Extract user ID from the decoded token

    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// export const updateSiById = async (req, res) => {
//   try {
//     const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updatedUser) return res.status(404).json({ message: 'User not found' });

//     res.status(200).json(updatedUser);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const deleteUserById = async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from the decoded token

    const deletedUser = await User.findByIdAndUpdate(userId, { deletedAt: new Date() }, { new: true });
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'User successfully deleted', deletedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

