import express from "express";
import dotenv from "dotenv"
import cors from "cors";
import connectDB from "./configs/database.js";
dotenv.config();

const PORT = process.env.PORT || 5050;
const app = express();
connectDB(process.env.ATLAS_URI)

app.use(cors());
app.use(express.json());

// start the Express server
app.listen(PORT, () => {
  console.log(`Server running efficiently on port ${PORT}`);
});