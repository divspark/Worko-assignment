import * as userDao from "../Dao/userDao.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Joi from "joi";

const secretKey = "Dabbemein4098";
const JWT_EXPIRATION = "1d";

const userSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  age: Joi.number().required(),
  city: Joi.string().required(),
  zipCode: Joi.string().required(),
});

export const getAllUsers = async () => {
  return await userDao.getAllUsers();
};

export const getUserById = async (id) => {
  return await userDao.getUserById(id);
};

export const createUser = async (userData) => {
  const { error } = userSchema.validate(userData);
  if (error) throw new Error(error.details[0].message);

  const { username, password, email, name, age, city, zipCode } = userData;

  let existingUser = await User.findOne({ username });
  if (existingUser) throw new Error("Username already exists.");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    username,
    password: hashedPassword,
    email,
    name,
    age,
    city,
    zipCode,
  });

  return await newUser.save();
};

export const updateUserById = async (id, updateData) => {
  const { error } = userSchema.validate(updateData);
  if (error) throw new Error(error.details[0].message);

  return await userDao.updateUserById(id, updateData);
};

export const deleteUserById = async (id) => {
  return await userDao.deleteUserById(id);
};

export const loginUser = async (email, zipCode, password) => {
  const user = await User.findOne({ email, zipCode });
  if (!user) throw new Error("Invalid email, zip code, or password.");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid email, zip code, or password.");

  const token = jwt.sign({ id: user._id }, secretKey, {
    expiresIn: JWT_EXPIRATION,
  });
  return {
    token,
    user: { id: user._id, email: user.email, zipCode: user.zipCode },
  };
};
