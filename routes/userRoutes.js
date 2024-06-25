import { HandleUserLogin, HandleUserSignup,Login,Signup,deleteUserById,getAllUsers,getUserById, updateUserById } from '../controllers/user.js';
import express from 'express'

const app = express();

//User Routes /api/v1/user

app.get('/signup', Signup );
app.post('/signup',HandleUserSignup);
app.get('/login', Login );
app.post('/login',HandleUserLogin);
app.get("/all",getAllUsers);
app.get("/:id",getUserById);
app.put("/:id",updateUserById);
//app.patch("/:id",updateSiById);
app.delete("/:id",deleteUserById);

export default app;