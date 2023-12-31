import express from "express";
import cookieParser from "cookie-parser";
import multer from "multer";
import songRoute from "./routes/songRoute.js";
import artistRoute from "./routes/artistRoute.js";
import userRoute from "./routes/userRoute.js";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();



const app = express();

app.use(cors());

app.use(express.json())
app.use(cookieParser());

app.get("/test", (req, res) => {
    res.json("hello from backend")
})

app.use("/api", songRoute)
app.use("/api", artistRoute)
app.use("/api/user", userRoute)

app.listen(8080, () => {
    console.log("connected to backend")
})