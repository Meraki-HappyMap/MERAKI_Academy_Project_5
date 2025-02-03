import { query } from "../db/db.js";

const addPlace = async (req, res) => {
  const {
    name,
    description,
    user_id,
    category_id,
    location,
    place_images,
    place_videos,
  } = req.body;
  const queryText = `INSERT INTO places (name,description,user_id,category_id,location, place_images, place_videos) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`;
  const values = [
    name,
    description,
    user_id,
    category_id,
    location,
    place_images,
    place_videos,
  ];
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

  const queryText = `SELECT * FROM places WHERE user_id = $1 AND is_deleted = 0`;

  try {
    const result = await query(queryText, [user_id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `The user: ${user_id} has no places`,
      });
    }

    res.status(200).json({
      success: true,
      message: `All places for the owner: ${user_id}`,
      places: result.rows,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      err: err.message,
    });
  }
};
const getPlaceById = async (req, res) => {
  const id = req.params.id;

  const queryText = `SELECT 
    name,
    description,
    user_id,
    category_id,
    location,
    place_images,
    place_videos,
     FROM users INNER JOIN places ON users.id=places.user_id WHERE places.id=$1 AND places.is_deleted=0;`;

  try {
    const result = await query(queryText, [id]);

    if (result.rows.length !== 0) {
      res.status(200).json({
        success: true,
        message: `The place with id: ${id}`,
        result: result.rows,
      });
    } else {
      throw new Error("Error happened while getting places");
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      err: err,
    });
  }
};
const updatePlaceById = async (req, res) => {
  const id = req.params.id;
  let {
    name,
    description,
    user_id,
    category_id,
    location,
    place_images,
    place_videos,
  } = req.body;

  const queryText = `UPDATE places SET 
  name = COALESCE($1,name),
  description = COALESCE($2, description) 
  user_id = COALESCE($3,user-id)
  category_id = COALESCE($4,category_id)
  location = COALESCE($5,location)
  place_images = COALESCE($6,place_images)
  place_videos = COALESCE($7,place_videos)
   WHERE id=$8 AND is_deleted = 0  RETURNING *`;

  const values = [
    name || null,
    description || null,
    user_id,
    category_id,
    location,
    place_images,
    place_videos,
    id,
  ];
  try {
    const result = await query(queryText, values);

    if (result.rows.length !== 0) {
      res.status(200).json({
        success: true,
        message: `place with id: ${id} updated successfully `,
        result: result.rows[0],
      });
    } else {
      throw new Error("Error happened while updating place");
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      err: err,
    });
  }
};
const deletePlaceById = async (req, res) => {
  const id = req.params.id;

  const queryText = `UPDATE places SET is_deleted=1 WHERE id=$1`;

  try {
    const result = await query(queryText, [id]);

    if (result.rowCount !== 0) {
      res.status(200).json({
        success: true,
        message: `place with id: ${id} deleted successfully`,
      });
    } else {
      throw new Error("Error happened while deleting place");
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      err: err,
    });
  }
};
const deletePlaceByUser = async (req, res) => {
  const id = req.params.id;

  const queryText = `UPDATE places SET is_deleted=1 WHERE user_id=$1`;

  try {
    const result = await query(queryText, [id]);

    if (result.rowCount !== 0) {
      res.status(200).json({
        success: true,
        message: `places with owner: ${id} deleted successfully`,
      });
    } else {
      throw new Error("Error happened while deleting places");
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      err: err,
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
