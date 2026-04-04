import User from "../models/UserModel.js";
import { AppError } from "../utils/AppError.js";

export async function isActiveUser(req, res, next) {
  try {
    const userId = req.user?.id; // comes from auth middleware (JWT)

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const user = await User.findById(userId);

    if (!user || user.state !== "ACTIVE") {
      return res.status(403).json({
        success: false,
        message: "Account is suspended or inactive",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

export const userActiveCheck = (user) => {
  if (!user || user.state !== "ACTIVE") {
    throw new AppError("User is suspended. Contact support.",400);
  }
};
