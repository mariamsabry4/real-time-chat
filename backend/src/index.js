import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const baseURL = process.env.BASE_URL;

app.get('/', (req, res) => {
  res.send(`Base URL is: ${baseURL}`);
});

app.use(express.json());
app.use ("/api/auth", authRoutes )

app.listen(PORT, ()=> {
    console.log(" server is running on PORT:" + PORT);
    connectDB();
    })