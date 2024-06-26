import * as userService from "../services/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Joi from "joi";

const secretKey = "Dabbemein4098";
const JWT_EXPIRATION = "1d";

export const Signup = (req, res) => {
  res.render("signup");
};

export const Login = (req, res) => {
  res.render("login");
};

export const Update = (req, res) => {
  res.render("update");
};

export const HandleUserSignup = async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body);
    const { email, zipCode } = newUser;
    const token = jwt.sign({ email, zipCode }, secretKey, {
      expiresIn: JWT_EXPIRATION,
    });
    res.status(201).json({ token, user: newUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const HandleUserLogin = async (req, res) => {
  try {
    const { email, zipCode, password } = req.body;

    // Validate input
    if (!email || !zipCode || !password) {
      throw new Error("Email, zip code, and password are required.");
    }

    const { user } = await userService.loginUser(email, zipCode, password);

    // Regenerate the token with email and zipCode in the payload
    const updatedToken = jwt.sign({ email, zipCode }, secretKey, {
      expiresIn: JWT_EXPIRATION,
    });

    res.status(200).json({ token: updatedToken, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUserById = async (req, res) => {
  try {
    const updatedUser = await userService.updateUserById(
      req.params.id,
      req.body
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const deletedUser = await userService.deleteUserById(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
