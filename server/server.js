import cors from "cors";
import "dotenv/config";
import express from "express";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express'
import clerkwebHooks from "./controllers/clerkWebhooks.js";
import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import roomRouter from "./routes/roomRoutes.js";

connectDB();
connectCloudinary();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors()); // Enable Cross-Origin Resource Sharing

//Middlewares
app.use(express.json());
app.use(clerkMiddleware());

//API to listen for Clerk webhooks
app.use("/api/clerk", clerkwebHooks);

app.get("/", (req, res) => {
  res.send("API is working");
});

app.use('/api/user', userRouter);

app.use('/api/hotels', hotelRouter);

app.use('/api/rooms', roomRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
