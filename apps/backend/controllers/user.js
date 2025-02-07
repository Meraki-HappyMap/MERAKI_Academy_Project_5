import { User } from "../models/user.js";

export const updateRole = async (req, res) => {
  const roles = ["owner", "user"];
  try {
    const { role } = req.body;

    if (!roles.includes(role) || !role) {
      return res.status(400).json({ message: "Invalid or missing role" });
    }

    const user = await User.updateRole(req.user.id, role);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      id: user.id,
      email: user.email,
      username: user.username,
      fullName: user.full_name,
      phoneNumber: user.phone_number,
      avatarUrl: user.avatar_url,
      role: user.role,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    });
  } catch (error) {
    if (error.message === "Invalid role") {
      return res.status(400).json({ message: error.message });
    }
    console.error("Update role error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      id: user.id,
      email: user.email,
      username: user.username,
      fullName: user.full_name,
      phoneNumber: user.phone_number,
      avatarUrl: user.avatar_url,
      role: user.role,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
