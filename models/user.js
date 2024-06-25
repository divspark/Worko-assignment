import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username:{ type:String,required:true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  city: { type: String, required: true },
  zipCode: { type: String, required: true },
  password: { type: String, required:true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date }
});

const User = mongoose.model('User', UserSchema);

export default User;
