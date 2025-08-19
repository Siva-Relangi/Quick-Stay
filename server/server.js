import { clerkMiddleware } from "@clerk/express"
import cors from "cors"
import "dotenv/config"
import express from "express"
import connectCloudinary from "./configs/cloudinary.js"
import connectDB from "./configs/db.js"
import clerkwebHooks from "./controllers/clerkWebhooks.js"
import hotelRouter from "./routes/hotelRoutes.js"
import roomRouter from "./routes/roomRoutes.js"
import userRouter from "./routes/userRoutes.js"
import bookingRouter from "./routes/bookingRoutes.js"

connectDB()
connectCloudinary()

const PORT = process.env.PORT || 3000
const app = express()

app.use(cors()) // Enable Cross-Origin Resource Sharing

app.use("/api/clerk", express.raw({ type: "application/json" }))

//Middlewares
app.use(express.json())
app.use(clerkMiddleware())

app.post("/api/clerk", clerkwebHooks)

app.get("/", (req, res) => {
  res.send("API is working")
})

app.use("/api/user", userRouter)

app.use("/api/hotels", hotelRouter)

app.use("/api/rooms", roomRouter)

app.use("/api/bookings", bookingRouter)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
