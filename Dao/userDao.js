import User from '../models/user.js';

export const getAllUsers = async () => {
  return await User.find({ deletedAt: { $exists: false } });
};

export const getUserById = async (id) => {
  return await User.findById(id);
};

export const createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

export const updateUserById = async (id, updateData) => {
  return await User.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteUserById = async (id) => {
  return await User.findByIdAndUpdate(id, { deletedAt: new Date() });
};
