import { query } from "../db/db.js";
import { config } from "dotenv";

config();

// Create users table if it doesn't exist
const createUsersTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      google_id VARCHAR(255) UNIQUE NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      username VARCHAR(255) UNIQUE NOT NULL,
      full_name VARCHAR(255) NOT NULL,
      phone_number VARCHAR(20),
      avatar_url VARCHAR(1000),
      role VARCHAR(20) DEFAULT 'user',
      is_verified BOOLEAN DEFAULT true,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await query(createTableQuery);
    console.log("Users table created successfully");
  } catch (error) {
    console.error("Error creating users table:", error);
    throw error;
  }
};

// TODO: create migrate system and move this to it later
// createUsersTable().catch(console.error);

export const User = {
  async findByGoogleId(googleId) {
    const queryText = "SELECT * FROM users WHERE google_id = $1";
    const result = await query(queryText, [googleId]);
    return result.rows[0];
  },

  async findById(id) {
    const queryText = "SELECT * FROM users WHERE id = $1";
    const result = await query(queryText, [id]);
    return result.rows[0];
  },

  async findByUsername(username) {
    const queryText = "SELECT * FROM users WHERE username = $1";
    const result = await query(queryText, [username]);
    return result.rows[0];
  },

  async create(userData) {
    const {
      googleId,
      email,
      username,
      fullName,
      phoneNumber = null,
      avatarUrl,
      role = "user",
    } = userData;

    const queryText = `
      INSERT INTO users (
        google_id, email, username, full_name, 
        phone_number, avatar_url, role
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;

    const values = [
      googleId,
      email,
      username,
      fullName,
      phoneNumber,
      avatarUrl,
      role,
    ];

    const result = await query(queryText, values);
    return result.rows[0];
  },

  async update(id, updateData) {
    const allowedUpdates = [
      "username",
      "full_name",
      "phone_number",
      "avatar_url",
    ];

    const updates = [];
    const values = [id];
    let setData = "";

    Object.keys(updateData).forEach((key, index) => {
      if (allowedUpdates.includes(key)) {
        updates.push(`${key} = $${index + 2}`);
        values.push(updateData[key]);
      }
    });

    if (updates.length === 0) return null;

    setData = updates.join(", ");
    const queryText = `
      UPDATE users 
      SET ${setData}, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $1 
      RETURNING *
    `;

    const result = await query(queryText, values);
    return result.rows[0];
  },
};

export default User;
