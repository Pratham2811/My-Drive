import Session from "../../models/Session.js";
import {
  reactivateUserService,
  softDeleteUserService,
  suspendUserService,
} from "../../services/admin/adminAction.service.js";

export async function LogoutUserController(req, res, next) {
  try {
    const { userId } = req.body;

    // users.forEach(async (user) => {
    //   await Session.deleteMany({ userId: user.id });
    // });
    await Session.deleteMany({ userId: userId });
    return res.status(200).json({
      success: true,
      message: "user logged out successfully",
    });
  } catch (error) {
    next(error);
  }
}
export async function suspendUserController(req, res, next) {
  try {
    const { userId } = req.body;
    const suspendedUser = await suspendUserService(userId);
    return res.status(200).json({
      success: true,
      message: "user logged out successfully",
    });
  } catch (error) {
    next(error);
  }
}

export async function reactivateUserController(req, res) {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const user = await reactivateUserService(userId);

    return res.status(200).json({
      success: true,
      message: "User reactivated successfully",
      data: user,
    });
  } catch (error) {
    console.error("Reactivate User Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
}

export async function softDeleteUserController(req, res) {
  try {
    const { userId } = req.params;
console.log(userId);

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const user = await softDeleteUserService(userId);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: user,
    });
  } catch (error) {
    console.error("softDelete User Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
}
