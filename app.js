import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import connectDB from "./DB/connect.js";
import userRoutes from "./routes/userRoutes.js";
import referralRoutes from "./routes/referralRoutes.js";

const app = express();
const port = process.env.PORT || 4000;

// Define __filename and __dirname to use in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Set up EJS as the template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static files (CSS, images, etc.) from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Parse JSON bodies
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.json("API is running....");
});
app.use("/user", userRoutes);
app.use("/referral", referralRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

// import express from 'express'
// import path from 'path';
// import { fileURLToPath } from 'url';
// import dotenv from 'dotenv';
// import connectDB from './DB/connect.js';
// import userRoutes from './routes/userRoutes.js';
// import referralRoutes from './routes/referralRoutes.js'

// const app = express();
// const port = process.env.PORT || 4000;

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Set up EJS as the template engine
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// // Middleware to parse form data
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

// app.use(express.json());

// dotenv.config();

// connectDB();

// //Routes

// app.use('/user', userRoutes);
// app.use('/refferal', referralRoutes);

// app.listen(port, () => {
//     console.log(`Server is listening at http://localhost:${port}`);
// });
