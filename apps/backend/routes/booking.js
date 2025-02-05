import express from "express";
import {
  addBooking,
  cancelBooking,
  getUserBookings,
  getPlaceBookings,
  checkAvailability,
} from "../controllers/booking.js";

import { authenticateUser } from "../middleware/authN.js";

const bookingRouter = express.Router();

// favoriteRouter.use(authenticateUser);

bookingRouter.post("/add", addBooking);
bookingRouter.put("/cancel/:booking_id", cancelBooking);
bookingRouter.get("/user/:user_id", getUserBookings);
bookingRouter.get("/place/:place_id", getPlaceBookings);
bookingRouter.post("/check-availability", checkAvailability);

export default bookingRouter;
