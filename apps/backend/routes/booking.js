import express from "express";
import {
  addBooking,
  cancelBooking,
  getUserBookings,
  getPlaceBookings,
  checkAvailability,
  updateBooking,
} from "../controllers/booking.js";

import { authenticateUser } from "../middleware/authN.js";

const bookingRouter = express.Router();

bookingRouter.use(authenticateUser);

bookingRouter.get("/user", getUserBookings);
bookingRouter.get("/place/:place_id", getPlaceBookings);

bookingRouter.post("/add/:place_id", addBooking);
bookingRouter.post("/check-availability", checkAvailability);

bookingRouter.put("/cancel/:booking_id", cancelBooking);
bookingRouter.put("/update/:booking_id", updateBooking);

export default bookingRouter;
