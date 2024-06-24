import express from 'express'
import dotenv from 'dotenv';
import connectDB from './DB/connect.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());

dotenv.config();

connectDB();


//Routes

app.use('api/v1/user', userRoutes);

app.listen(process.env.port,()=>{
    console.log(`Server is listening at ${port}`);
})