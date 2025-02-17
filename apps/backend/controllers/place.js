import { query } from "../db/db.js";

const addPlace = async (req, res) => {
  const user_id = req.user.id;
  const { name, description, category_id, location } = req.body;

  if (!name || !description || !category_id || !location) {
    return res.status(400).json({
      success: false,
      message:
        "All fields (name, description, category_id, location) are required.",
    });
  }

  const userCheckQuery = `SELECT id FROM users WHERE id = $1`;
  try {
    const userCheckResult = await query(userCheckQuery, [user_id]);

    if (userCheckResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `User with ID ${user_id} not found.`,
      });
    }

    const categoryCheckQuery = `SELECT id FROM categories WHERE id = $1`;
    const categoryCheckResult = await query(categoryCheckQuery, [category_id]);

    if (categoryCheckResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Category with ID ${category_id} not found.`,
      });
    }

    const queryText = `INSERT INTO places (name, description, user_id, category_id, location) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const values = [name, description, user_id, category_id, location];
    const result = await query(queryText, values);

    res.status(201).json({
      success: true,
      message: "Place added successfully",
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

const getAllPlaces = async (req, res) => {
  const queryText = `SELECT * FROM places WHERE places.is_deleted = 0;`;

  try {
    const result = await query(queryText);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No places found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Fetched all places successfully.",
      data: result.rows,
    });
  } catch (err) {
    console.error("Error fetching places:", err);
    res.status(500).json({
      success: false,
      message: "Server error occurred while fetching places.",
      error: err.message,
    });
  }
};

const getPlaceByUser = async (req, res) => {
  const user_id = req.user.id;

  try {
    const queryText = `
      SELECT 
        places.id,
        places.name,
        places.description,
        places.category_id,
        places.location,
        users.username AS owner_username,
        users.email AS owner_email,
        COALESCE(json_agg(DISTINCT place_images.url) FILTER (WHERE place_images.id IS NOT NULL), '[]') AS images,
        COALESCE(json_agg(DISTINCT place_videos.url) FILTER (WHERE place_videos.id IS NOT NULL), '[]') AS videos
      FROM places
      INNER JOIN users ON users.id = places.user_id
      LEFT JOIN place_images ON place_images.place_id = places.id
      LEFT JOIN place_videos ON place_videos.place_id = places.id
      WHERE places.user_id = $1 AND places.is_deleted = 0
      GROUP BY places.id, users.username, users.email;
    `;

    const result = await query(queryText, [user_id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `User ${user_id} has no places`,
      });
    }

    res.status(200).json({
      success: true,
      message: `All places for the owner: ${user_id}`,
      data: result.rows,
    });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

const getPlaceById = async (req, res) => {
  const { placeId } = req.params;
  // TODO: refactor images and videos
  const queryText = `
    SELECT 
      places.id,
      places.name,
      places.description,
      places.user_id,
      places.category_id,
      places.location,
      users.username AS owner_username,
      users.email AS owner_email,
      users.phone_number,
      COALESCE(json_agg(DISTINCT place_images.url) FILTER (WHERE place_images.id IS NOT NULL), '[]') AS images,
      COALESCE(json_agg(DISTINCT place_videos.url) FILTER (WHERE place_videos.id IS NOT NULL), '[]') AS videos
    FROM places
    INNER JOIN users ON users.id = places.user_id
    LEFT JOIN place_images ON place_images.place_id = places.id
    LEFT JOIN place_videos ON place_videos.place_id = places.id
    WHERE places.id = $1 AND places.is_deleted = 0
    GROUP BY places.id, users.username, users.email, phone_number;
  `;

  try {
    const result = await query(queryText, [placeId]);

    if (result.rows.length !== 0) {
      res.status(200).json({
        success: true,
        message: `The place with id: ${placeId}`,
        data: result.rows[0],
      });
    } else {
      res.status(404).json({
        success: false,
        message: `No place found with id: ${placeId}`,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

const updatePlaceById = async (req, res) => {
  const user_id = req.user.id;
  const { placeId } = req.params;
  const { name, description, category_id, location, images, videos } = req.body;

  try {
    const placeCheckQuery = `SELECT user_id FROM places WHERE id = $1 AND is_deleted = 0`;
    const placeCheckResult = await query(placeCheckQuery, [placeId]);

    if (placeCheckResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Place with ID ${placeId} not found`,
      });
    }

    const placeOwnerId = placeCheckResult.rows[0].user_id;

    if (user_id !== placeOwnerId) {
      return res.status(403).json({
        success: false,
        message: `You are not authorized to update this place`,
      });
    }

    const updateQuery = `
      UPDATE places SET 
        name = COALESCE($1, name),
        description = COALESCE($2, description),
        category_id = COALESCE($3, category_id),
        location = COALESCE($4, location),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $5 AND is_deleted = 0
      RETURNING *;
    `;

    const updateResult = await query(updateQuery, [
      name || null,
      description || null,
      category_id || null,
      location || null,
      placeId,
    ]);

    if (updateResult.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Failed to update place",
      });
    }

    // TODO: refactor images and videos
    if (images && images.length > 0) {
      await query(`DELETE FROM place_images WHERE place_id = $1`, [placeId]);
      for (const img of images) {
        await query(
          `INSERT INTO place_images (place_id, url) VALUES ($1, $2)`,
          [placeId, img]
        );
      }
    }

    // TODO: refactor images and videos
    if (videos && videos.length > 0) {
      await query(`DELETE FROM place_videos WHERE place_id = $1`, [placeId]);
      for (const vid of videos) {
        await query(
          `INSERT INTO place_videos (place_id, url) VALUES ($1, $2)`,
          [placeId, vid]
        );
      }
    }

    res.status(200).json({
      success: true,
      message: `Place with ID: ${placeId} updated successfully`,
      data: updateResult.rows[0],
    });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

const deletePlaceById = async (req, res) => {
  const user_id = req.user.id;
  const placeId = req.params.id;

  try {
    const placeCheckQuery = `SELECT user_id FROM places WHERE id = $1 AND is_deleted = 0`;
    const placeCheckResult = await query(placeCheckQuery, [placeId]);

    if (placeCheckResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No place found with ID: ${placeId}`,
      });
    }

    const placeOwnerId = placeCheckResult.rows[0].user_id;

    if (user_id !== placeOwnerId) {
      return res.status(403).json({
        success: false,
        message: `You are not authorized to delete this place`,
      });
    }

    const queryText = `UPDATE places SET is_deleted = 1, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *;`;
    const result = await query(queryText, [placeId]);

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: `No place found with ID: ${placeId}`,
      });
    }

    res.status(200).json({
      success: true,
      message: `Place with ID: ${placeId} deleted successfully`,
      data: result.rows[0],
    });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

const deletePlaceByUser = async (req, res) => {
  const user_id = req.user.id;
  const id = req.params.id;

  try {
    const placesCheckQuery = `SELECT id, user_id FROM places WHERE user_id = $1 AND is_deleted = 0`;
    const placesCheckResult = await query(placesCheckQuery, [id]);

    if (placesCheckResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No places found for user with ID: ${id}`,
      });
    }

    if (user_id !== id) {
      return res.status(403).json({
        success: false,
        message: `You are not authorized to delete these places`,
      });
    }

    const queryText = `UPDATE places SET is_deleted = 1, updated_at = CURRENT_TIMESTAMP WHERE user_id = $1 RETURNING *;`;
    const result = await query(queryText, [id]);

    res.status(200).json({
      success: true,
      message: `All places for user ID: ${id} deleted successfully`,
      data: result.rows,
    });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

const getPlacesByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const numericCategoryId = parseInt(categoryId, 10);

    if (isNaN(numericCategoryId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID format",
      });
    }

    const queryText = `
      SELECT 
        p.id,
        p.name,
        p.description,
        p.location,
        p.category_id,
        p.created_at,
        p.updated_at,
        p.is_deleted,
        json_build_object(
          'id', users.id,
          'username', users.username,
          'email', users.email,
          'avatar_url', users.avatar_url
        ) as owner,
        COALESCE(
          (
            SELECT json_agg(json_build_object('url', pi.url))
            FROM place_images pi
            WHERE pi.place_id = p.id
          ),
          '[]'
        ) as images,
        COALESCE(
          (
            SELECT json_agg(json_build_object('url', pv.url))
            FROM place_videos pv
            WHERE pv.place_id = p.id
          ),
          '[]'
        ) as videos,
        COALESCE(AVG(reviews.rate), 0) as average_rating,
        COUNT(DISTINCT reviews.id) as review_count
      FROM places p
      INNER JOIN users ON users.id = p.user_id
      LEFT JOIN reviews ON reviews.place_id = p.id AND reviews.is_deleted = 0
      WHERE p.category_id = $1 AND p.is_deleted = 0
      GROUP BY p.id, users.id, users.username, users.email, users.avatar_url
      ORDER BY p.created_at DESC;
    `;

    const result = await query(queryText, [numericCategoryId]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No places found for category ID: ${categoryId}`,
      });
    }

    res.status(200).json({
      success: true,
      message: `Places found for category ID: ${categoryId}`,
      data: result.rows,
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      success: false,
      message: "Error retrieving places by category",
      error: error.message,
    });
  }
};

export {
  addPlace,
  getAllPlaces,
  getPlaceById,
  getPlaceByUser,
  updatePlaceById,
  deletePlaceById,
  deletePlaceByUser,
  getPlacesByCategory,
};
