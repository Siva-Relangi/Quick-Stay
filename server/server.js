import cors from "cors";
import "dotenv/config";
import express from "express";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express'
import clerkwebHooks from "./controllers/clerkWebhooks.js";

connectDB();

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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
