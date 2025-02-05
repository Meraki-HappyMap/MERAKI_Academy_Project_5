import { query } from "../db/db.js";

// TODO: use req.user to get the user info
// TODO: where we have data return it in the response with "data" key (for example .json({data: result.rows}) )


const addPlace = async (req, res) => {
  const { name, description, user_id, category_id, location } = req.body;
  const queryText = `INSERT INTO places (name,description,user_id,category_id,location) VALUES ($1,$2,$3,$4,$5) RETURNING *`;
  const values = [name, description, user_id, category_id, location];
  try {
    const result = await query(queryText, values);

    res.status(201).json({
      success: true,
      message: "place added successfully",
      result: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      err: err,
    });
  }
};
const getAllPlaces = async (req, res) => {
  const queryText = `SELECT * FROM places WHERE places.is_deleted=0;`;

  try {
    const result = await query(queryText);
    res.status(200).json({
      success: true,
      message: "get all the places",
      articles: result.rows,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      Error: err,
    });
  }
};
const getPlaceByUser = async (req, res) => {
  const user_id = req.params.id;

  try {
    const userCheckQuery = `SELECT id FROM users WHERE id = $1`;
    const userCheckResult = await query(userCheckQuery, [user_id]);

    if (userCheckResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `User with ID ${user_id} not found`,
      });
    }

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
      places: result.rows,
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
  const id = req.params.id;

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
      COALESCE(json_agg(DISTINCT place_images.url) FILTER (WHERE place_images.id IS NOT NULL), '[]') AS images,
      COALESCE(json_agg(DISTINCT place_videos.url) FILTER (WHERE place_videos.id IS NOT NULL), '[]') AS videos
    FROM places
    INNER JOIN users ON users.id = places.user_id
    LEFT JOIN place_images ON place_images.place_id = places.id
    LEFT JOIN place_videos ON place_videos.place_id = places.id
    WHERE places.id = $1 AND places.is_deleted = 0
    GROUP BY places.id, users.username, users.email;
  `;

  try {
    const result = await query(queryText, [id]);

    if (result.rows.length !== 0) {
      res.status(200).json({
        success: true,
        message: `The place with id: ${id}`,
        result: result.rows[0],
      });
    } else {
      res.status(404).json({
        success: false,
        message: `No place found with id: ${id}`,
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
  const placeId = req.params.id;
  const { name, description, user_id, category_id, location, images, videos } =
    req.body;

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

    // TODO: refactor 
    if (images && images.length > 0) {
      await query(`DELETE FROM place_images WHERE place_id = $1`, [placeId]);
      for (const img of images) {
        await query(
          `INSERT INTO place_images (place_id, url) VALUES ($1, $2)`,
          [placeId, img]
        );
      }
    }

    // TODO: refactor
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
      updatedPlace: updateResult.rows[0],
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
  const id = req.params.id;

  if (!id || isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid or missing place ID",
    });
  }

  const queryText = `UPDATE places SET is_deleted = 1, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *;`;

  try {
    const result = await query(queryText, [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: `No place found with ID: ${id}`,
      });
    }

    res.status(200).json({
      success: true,
      message: `Place with ID: ${id} deleted successfully`,
      deletedPlace: result.rows[0],
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
  const id = req.params.id;

  if (!id || isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid or missing user ID",
    });
  }

  const queryText = `UPDATE places SET is_deleted = 1, updated_at = CURRENT_TIMESTAMP WHERE user_id = $1 RETURNING *;`;

  try {
    const result = await query(queryText, [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: `No places found for user with ID: ${id}`,
      });
    }

    res.status(200).json({
      success: true,
      message: `All places for user ID: ${id} deleted successfully`,
      deletedPlaces: result.rows,
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

export {
  addPlace,
  getAllPlaces,
  getPlaceById,
  getPlaceByUser,
  updatePlaceById,
  deletePlaceById,
  deletePlaceByUser,
};
