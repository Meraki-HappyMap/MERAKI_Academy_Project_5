import { query } from "../db/db.js";

const addBooking = async (req, res) => {
  const { place_id } = req.params;
  const { start_time, end_time } = req.body;
  const user_id = req.user.id;

  if (!start_time || !end_time) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields: start_time, and end_time.",
    });
  }

  if (new Date(start_time) >= new Date(end_time)) {
    return res.status(400).json({
      success: false,
      message: "Invalid time range: start_time must be before end_time.",
    });
  }

  const checkAvailabilityQuery = `
      SELECT * FROM booking 
      WHERE place_id = $1 
      AND is_deleted = 0
      AND (
        (start_time, end_time) OVERLAPS ($2::TIMESTAMP, $3::TIMESTAMP)
      );
    `;

  const insertBookingQuery = `
      INSERT INTO booking (user_id, place_id, start_time, end_time) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *;
    `;

  try {
    const availabilityResult = await query(checkAvailabilityQuery, [
      place_id,
      start_time,
      end_time,
    ]);

    if (availabilityResult.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "The selected time is already booked.",
      });
    }

    const result = await query(insertBookingQuery, [
      user_id,
      place_id,
      start_time,
      end_time,
    ]);

    res.status(201).json({
      success: true,
      message: "Booking created successfully.",
      data: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

const cancelBooking = async (req, res) => {
  const { booking_id } = req.params;
  const user_id = req.user.id;

  if (!booking_id) {
    return res.status(400).json({
      success: false,
      message: "Missing required parameter: booking_id.",
    });
  }

  try {
    const checkBookingQuery = `
      SELECT * FROM booking 
      WHERE id = $1 AND user_id = $2 AND is_deleted = 0;
    `;
    const bookingResult = await query(checkBookingQuery, [booking_id, user_id]);

    if (bookingResult.rows.length === 0) {
      return res.status(403).json({
        success: false,
        message:
          "You do not have permission to cancel this booking or it does not exist.",
      });
    }

    const booking = bookingResult.rows[0];
    const currentTime = new Date();
    const bookingStartTime = new Date(booking.start_time);

    const oneDayBeforeBooking = new Date(bookingStartTime);
    oneDayBeforeBooking.setDate(oneDayBeforeBooking.getDate() - 1);

    if (currentTime >= oneDayBeforeBooking) {
      return res.status(400).json({
        success: false,
        message:
          "You can only cancel the booking at least 24 hours in advance.",
      });
    }

    const cancelQuery = `
      UPDATE booking 
      SET is_deleted = 1 
      WHERE id = $1 
      RETURNING *;
    `;

    const result = await query(cancelQuery, [booking_id]);

    res.status(200).json({
      success: true,
      message: "Booking canceled successfully.",
      data: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

const getUserBookings = async (req, res) => {
  const user_id = req.user.id;

  const queryText = `
      SELECT booking.*, places.name AS place_name
      FROM booking
      INNER JOIN places ON booking.place_id = places.id
      WHERE booking.user_id = $1 
      AND booking.is_deleted = 0;
    `;

  try {
    const result = await query(queryText, [user_id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No bookings found for this user.",
      });
    }

    res.status(200).json({
      success: true,
      message: `All bookings for user ${user_id}`,
      data: result.rows,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

const getPlaceBookings = async (req, res) => {
  const { place_id } = req.params;

  const queryText = `
      SELECT booking.*, users.username AS booked_by
      FROM booking
      INNER JOIN users ON booking.user_id = users.id
      WHERE booking.place_id = $1 
      AND booking.is_deleted = 0;
    `;

  try {
    const result = await query(queryText, [place_id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No bookings found for this place.",
      });
    }

    res.status(200).json({
      success: true,
      message: `All bookings for place ${place_id}`,
      data: result.rows,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

const checkAvailability = async (req, res) => {
  const { place_id, start_time, end_time } = req.body;

  if (!start_time || !end_time) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields: start_time, and end_time.",
    });
  }

  if (new Date(start_time) >= new Date(end_time)) {
    return res.status(400).json({
      success: false,
      message: "Invalid time range: start_time must be before end_time.",
    });
  }

  const queryText = `
      SELECT * FROM booking 
      WHERE place_id = $1 
      AND is_deleted = 0
      AND (
        (start_time, end_time) OVERLAPS ($2::TIMESTAMP, $3::TIMESTAMP)
      );
    `;

  try {
    const result = await query(queryText, [place_id, start_time, end_time]);

    res.status(200).json({
      success: true,
      isAvailable: result.rows.length === 0,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

const updateBooking = async (req, res) => {
  const { booking_id } = req.params;
  const { start_time, end_time } = req.body;
  const user_id = req.user.id;

  if (!booking_id) {
    return res.status(400).json({
      success: false,
      message: "Missing required parameter: booking_id.",
    });
  }

  try {
    const checkBookingQuery = `
      SELECT * FROM booking WHERE id = $1 AND user_id = $2 AND is_deleted = 0;
    `;
    const bookingResult = await query(checkBookingQuery, [booking_id, user_id]);

    if (bookingResult.rows.length === 0) {
      return res.status(403).json({
        success: false,
        message:
          "You do not have permission to modify this booking or it does not exist.",
      });
    }

    const booking = bookingResult.rows[0];
    const currentTime = new Date();
    const bookingStartTime = new Date(booking.start_time);

    const oneDayBeforeBooking = new Date(bookingStartTime);
    oneDayBeforeBooking.setDate(oneDayBeforeBooking.getDate() - 1);

    if (currentTime >= oneDayBeforeBooking) {
      return res.status(400).json({
        success: false,
        message:
          "You can only modify the booking at least 24 hours in advance.",
      });
    }

    if (!start_time && !end_time) {
      return res.status(400).json({
        success: false,
        message: "No valid fields provided for update.",
      });
    }

    let new_start_time = start_time || booking.start_time;
    let new_end_time = end_time || booking.end_time;

    if (new Date(new_start_time) >= new Date(new_end_time)) {
      return res.status(400).json({
        success: false,
        message: "Invalid time range: start_time must be before end_time.",
      });
    }

    const checkAvailabilityQuery = `
      SELECT * FROM booking 
      WHERE place_id = $1 
      AND is_deleted = 0
      AND id <> $2
      AND (start_time, end_time) OVERLAPS ($3::TIMESTAMP, $4::TIMESTAMP);
    `;

    const availabilityResult = await query(checkAvailabilityQuery, [
      booking.place_id,
      booking_id,
      new_start_time,
      new_end_time,
    ]);

    if (availabilityResult.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "The selected time conflicts with another booking.",
      });
    }

    const updateQuery = `
      UPDATE booking 
      SET start_time = $1, end_time = $2, updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
      RETURNING *;
    `;

    const updateResult = await query(updateQuery, [
      new_start_time,
      new_end_time,
      booking_id,
    ]);

    res.status(200).json({
      success: true,
      message: "Booking updated successfully.",
      data: updateResult.rows[0],
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

export {
  addBooking,
  cancelBooking,
  getUserBookings,
  getPlaceBookings,
  checkAvailability,
  updateBooking,
};
