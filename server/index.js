import express from "express";
import cookieParser from "cookie-parser";
import multer from "multer";
// import postRouter from "./routes/posts.js";
// import authRouter from "./routes/auth.js";
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

// app.use("/api/post", postRouter)
// app.use("/api/auth", authRouter)
app.use("/api/user", userRoute)

app.listen(8080, () => {
    console.log("connected to backend")
})