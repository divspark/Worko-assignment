import express from 'express'
import { getRefferal, submitRefferal } from '../controllers/refferal.js';

const app = express();

//Refferal Routes /api/v1/refferal
app.get('/apply', getRefferal );

// Route to handle form submission
app.post('/submit', submitRefferal );

export default app;