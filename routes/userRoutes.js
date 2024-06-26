import {
  HandleUserLogin,
  HandleUserSignup,
  Login,
  Signup,
  Update,
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from "../controllers/user.js";
import express from "express";

const app = express();

//User Routes /api/v1/user

app.get("/signup", Signup);
app.post("/signup", HandleUserSignup);
app.get("/login", Login);
app.post("/login", HandleUserLogin);
app.get("/all", getAllUsers);
app.get("/:id", getUserById);
app.get("/:id/update", Update);
app.post("/:id/update", updateUserById);
//app.patch("/:id",updateSiById);
app.delete("/:id", deleteUserById);

export default app;
