import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import connectDB from './DB/connect.js';
import userRoutes from './routes/userRoutes.js';
import referralRoutes from './routes/referralRoutes.js'

const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

connectDB();

// Set up EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


//Routes

app.use('/user', userRoutes);
app.use('/refferal', referralRoutes);


app.listen(process.env.port,()=>{
    console.log(`Server is listening at ${port}`);
})