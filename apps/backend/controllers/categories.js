import { query } from "../db/db.js";

const addCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Category name is required",
    });
  }
  const queryText = `INSERT INTO categories (name) VALUES ($1) RETURNING *`;
  try {
    const result = await query(queryText, [name]);

    res.status(201).json({
      success: true,
      message: "Category added successfully",
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

const getAllCategory = async (req, res) => {
  const queryText = `SELECT * FROM categories WHERE "is_deleted "=0;`;

  try {
    const result = await query(queryText);

    if (result.rows.length !== 0) {
      res.status(200).json({
        success: true,
        message: "Retrieved all categories successfully",
        data: result.rows,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "There are no categories",
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

const getCategoryById = async (req, res) => {
  const id = req.params.id;
  const queryText = `SELECT * FROM categories WHERE id = $1;`;

  try {
    const result = await query(queryText, [id]);

    if (result.rows.length !== 0) {
      res.status(200).json({
        success: true,
        message: `Category with id: ${id}`,
        data: result.rows[0],
      });
    } else {
      res.status(404).json({
        success: false,
        message: `No category found with id: ${id}`,
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

const getPlacesByCategoryId = async (req, res) => {
  const { category_Id } = req.params;
  const queryText = `SELECT * FROM places WHERE category_id = $1 AND is_deleted = 0;`;

  try {
    const result = await query(queryText, [category_Id]);

    if (result.rows.length !== 0) {
      res.status(200).json({
        success: true,
        message: `Places found for category with id: ${category_Id}`,
        data: result.rows,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `No places found for category with id: ${category_Id}`,
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

const updateCategory = async (req, res) => {
  const { name } = req.body;
  const id = req.params.id;

  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: "Category name are required" });
  }

  const checkQuery = `SELECT name FROM categories WHERE id = $1;`;
  try {
    const checkResult = await query(checkQuery, [id]);
    if (checkResult.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: `No category found with id: ${id}` });
    }

    if (checkResult.rows[0].name === name) {
      return res.status(400).json({
        success: false,
        message: "New category name must be different from the current name",
      });
    }

    const queryText = `UPDATE categories SET name = $1 WHERE id = $2 RETURNING *;`;
    const result = await query(queryText, [name, id]);

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: result.rows[0],
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

const deleteCategoryById = async (req, res) => {
  const id = req.params.id;
  const queryText = `UPDATE categories SET "is_deleted "=1 WHERE id=$1;`;
  try {
    const result = await query(queryText, [id]);

    if (result.rows.length !== 0) {
      res.status(200).json({
        success: true,
        message: "Category not found",
      });
    } else {
      res.status(404).json({
        success: true,
        message: "Category deleted successfully",
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

export {
  addCategory,
  getAllCategory,
  getCategoryById,
  getPlacesByCategoryId,
  updateCategory,
  deleteCategoryById,
};
