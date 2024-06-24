import express from 'express'
import dotenv from 'dotenv';

const app = express();

dotenv.config();

app.listen(PORT,()=>{
    console.log(`Server is listening at ${PORT}`);
})