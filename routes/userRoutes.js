import { createUser,getAllUsers,getUserById } from '../controllers/user.js';
import express from 'express'

const app = express();

app.post('/new',createUser);
app.get("/all",getAllUsers);
app.get("/:id",getUserById);
app.put("/:id".updateUserById);
app.patch("/:id",updateSiById);
app.delete("/:id",deleteUserById);

export default app;