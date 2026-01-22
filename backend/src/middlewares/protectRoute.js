import { requireAuth } from "@clerk/express";
import User from "../models/User.js";

export const protectRoute = [
  requireAuth(),
  async (req, res, next) => {
    try {
      const clerkId = req.auth().userId;

      if (!clerkId) {
        return res.status(401).json({ msg: "Unauthorized - invalid user" });
      }

      const user = await User.findOne({ clerkId });

      if (!user) {
        return res.status(401).json({ msg: "User not found" });
      }

      req.user = user;
    } catch (error) {
      console.error("Error in protecRoute middleware", error);
      return res.status(500).json({ msg: "Internal Server error" });
    }
    next();
  },
];
