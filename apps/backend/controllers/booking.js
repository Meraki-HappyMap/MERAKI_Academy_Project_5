import { query } from "../db/db.js";

const addBooking = async (req, res) => {
  const { user_id, place_id, start_time, end_time } = req.body;

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

  const queryText = `
      UPDATE booking 
      SET is_deleted = 1 
      WHERE id = $1 
      RETURNING *;
    `;

  try {
    const result = await query(queryText, [booking_id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

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
  const { user_id } = req.params;

  const queryText = `
      SELECT booking.*, places.name AS place_name
      FROM booking
      INNER JOIN places ON booking.place_id = places.id
      WHERE booking.user_id = $1 
      AND booking.is_deleted = 0;
    `;

  try {
    const result = await query(queryText, [user_id]);

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

export {
  addBooking,
  cancelBooking,
  getUserBookings,
  getPlaceBookings,
  checkAvailability,
};
