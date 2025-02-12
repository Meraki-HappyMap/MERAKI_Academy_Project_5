import { query } from "../db/db.js";

const addReview = async (req, res) => {
  const { comment, rate } = req.body;
  const { place_id } = req.params;
  const commenter_id = req.user.id;

  if (!comment && (rate === undefined || rate === null)) {
    return res.status(400).json({
      success: false,
      message: "You must provide comment and rating.",
    });
  }

  if (rate !== undefined && rate !== null && (rate < 1 || rate > 5)) {
    return res.status(400).json({
      success: false,
      message: "Invalid rating.",
    });
  }

  try {
    const placeCheckQuery = `SELECT id FROM places WHERE id = $1 AND is_deleted = 0`;
    const placeCheckResult = await query(placeCheckQuery, [place_id]);

    if (placeCheckResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Place with ID ${place_id} not found`,
      });
    }

    const queryText = `
      INSERT INTO reviews (commenter_id, place_id, comment, rate)
      VALUES ($1, $2, $3, $4) RETURNING *;
    `;
    const values = [commenter_id, place_id, comment || null, rate];

    const result = await query(queryText, values);

    res.status(201).json({
      success: true,
      message: "Review added successfully.",
      data: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "server error",
      error: err,
    });
  }
};

const getReviewsByPlace = async (req, res) => {
  const { place_id } = req.params;

  try {
    const queryText = `
        SELECT 
          reviews.id,
          reviews.comment,
          reviews.rate,
          reviews.created_at,
          users.id AS user_id,
          users.username,
          users.avatar_url
        FROM reviews
        INNER JOIN users ON reviews.commenter_id = users.id
        WHERE reviews.place_id = $1 AND reviews.is_deleted = 0
        ORDER BY reviews.created_at DESC;
      `;

    const result = await query(queryText, [place_id]);

    if (result.rows.length === 0) {
      return res.status(200).json({
        success: true,
        message: "There are no reviews for this place.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Reviews fetched successfully.",
      data: result.rows,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "server error",
      error: err.message,
    });
  }
};

const updateReview = async (req, res) => {
  const { id } = req.params;
  const { comment, rate } = req.body;

  if (!comment && (rate === undefined || rate === null)) {
    return res.status(400).json({
      success: false,
      message: "You must provide either a comment or a rating to update.",
    });
  }

  if (rate !== undefined && rate !== null && (rate < 1 || rate > 5)) {
    return res.status(400).json({
      success: false,
      message: "The rating must be between 1 and 5.",
    });
  }

  try {
    const reviewCheckQuery = `SELECT commenter_id FROM reviews WHERE id = $1 AND is_deleted = 0`;
    const reviewCheckResult = await query(reviewCheckQuery, [id]);

    if (reviewCheckResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Review not found or already deleted.",
      });
    }

    const reviewOwnerId = reviewCheckResult.rows[0].commenter_id;

    if (req.user.id !== reviewOwnerId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this review.",
      });
    }

    const queryText = `
      UPDATE reviews SET 
        comment = COALESCE($1, comment),
        rate = COALESCE($2, rate),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $3 AND is_deleted = 0
      RETURNING *;
    `;

    const result = await query(queryText, [comment || null, rate, id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Review not found or already deleted.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Review updated successfully.",
      data: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "server error",
      error: err.message,
    });
  }
};

const deleteReview = async (req, res) => {
  const { id } = req.params;

  try {
    const reviewCheckQuery = `SELECT commenter_id FROM reviews WHERE id = $1 AND is_deleted = 0`;
    const reviewCheckResult = await query(reviewCheckQuery, [id]);

    if (reviewCheckResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Review not found or already deleted.",
      });
    }

    const reviewOwnerId = reviewCheckResult.rows[0].commenter_id;

    if (req.user.id !== reviewOwnerId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this review.",
      });
    }

    const queryText = `
      UPDATE reviews SET is_deleted = 1 WHERE id = $1 RETURNING *;
    `;
    const result = await query(queryText, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Review not found or already deleted.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Review deleted successfully.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "server error",
      error: err.message,
    });
  }
};

export { addReview, getReviewsByPlace, updateReview, deleteReview };
