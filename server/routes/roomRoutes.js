import express from "express";
import upload from "../middlewares/upload.js";
import { protect } from "../middleware/authMiddleware.js";
import { createRoom, getRooms, getOwnerRooms, toggleRoomAvailability } from "../controllers/roomController.js";

const roomRouter = express.Router();

roomRouter.post('/', upload.array("images", 4), protect, createRoom);
roomRouter.get('/', protect, getRooms);
roomRouter.get('/owner', protect, getOwnerRooms);
roomRouter.post('/toggle-availability', protect, toggleRoomAvailability);

export default roomRouter;