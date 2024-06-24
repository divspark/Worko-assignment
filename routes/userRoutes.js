import { createUser,getUserById } from '../controllers/user.js';
import express from 'express'

const app = express();

app.post('/new',createUser);

app.get("/all",getUserById);

export default app;