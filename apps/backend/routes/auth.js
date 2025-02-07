import passport from "passport";
import express from "express";
import jwt from "jsonwebtoken";

import { config } from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/user.js";

config();

const authRoutes = express.Router();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findByGoogleId(profile.id);

        if (!user) {
          const baseUsername = profile.emails[0].value.split("@")[0];
          let username = baseUsername;
          let counter = 1;

          // Check username availability
          while (await User.findByUsername(username)) {
            username = `${baseUsername}${counter}`;
            counter++;
          }

          user = await User.create({
            googleId: profile.id,
            email: profile.emails[0].value,
            fullName: profile.displayName,
            username: username,
            avatarUrl: profile.photos?.[0]?.value,
            role: "unassigned",
          });
        }

        return done(null, user);
      } catch (error) {
        console.error("Google auth error:", error);
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    req.user = user;
    next();
  });
};

// Get current user info
authRoutes.get("/me", authenticateToken, async (req, res) => {
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
    console.error("Auth/me error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Endpoint to initiate google authentication
authRoutes.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Endpoint to handle google authentication callback
authRoutes.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/google/failure",
  }),
  (req, res) => {
    // Generate JWT token
    const token = jwt.sign(
      {
        id: req.user.id,
        email: req.user.email,
        username: req.user.username,
        role: req.user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Redirect to frontend with token
    res.redirect(`${process.env.FRONTEND_URL}/signin?token=${token}`);
  }
);

// Endpoint to handle google authentication failure
authRoutes.get("/google/failure", (req, res) => {
  res.redirect(`${process.env.FRONTEND_URL}/signin?error=auth_failed`);
});

export default authRoutes;
