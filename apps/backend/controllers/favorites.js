import { query } from "../db/db.js";

const addToFavorites = async (req, res) => {
  const { user_id, place_id } = req.body;

  const queryText = `
    INSERT INTO favorites (user_id, place_id)
    VALUES ($1, $2)
    ON CONFLICT (user_id, place_id) DO UPDATE SET is_deleted = 0
    RETURNING *;
  `;

  try {
    const result = await query(queryText, [user_id, place_id]);

    res.status(201).json({
      success: true,
      message: "Place added to favorites successfully",
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
const removeFromFavorites = async (req, res) => {
  const { user_id, place_id } = req.body;

  const queryText = `
    UPDATE favorites SET is_deleted = 1
    WHERE user_id = $1 AND place_id = $2
    RETURNING *;
  `;

  try {
    const result = await query(queryText, [user_id, place_id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Favorite not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Place removed from favorites successfully",
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
const getUserFavorites = async (req, res) => {
  const user_id = req.params.user_id;

  const queryText = `
    SELECT places.*
    FROM favorites
    INNER JOIN places ON favorites.place_id = places.id
    WHERE favorites.user_id = $1 AND favorites.is_deleted = 0;
  `;

  try {
    const result = await query(queryText, [user_id]);

    res.status(200).json({
      success: true,
      message: `All favorite places for user ${user_id}`,
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
const isPlaceFavorite = async (req, res) => {
  const { user_id, place_id } = req.params;

  const queryText = `
    SELECT * FROM favorites
    WHERE user_id = $1 AND place_id = $2 AND is_deleted = 0;
  `;

  try {
    const result = await query(queryText, [user_id, place_id]);

    res.status(200).json({
      success: true,
      isFavorite: result.rows.length > 0,
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
  addToFavorites,
  removeFromFavorites,
  getUserFavorites,
  isPlaceFavorite,
};
