import { getUserService } from "../../services/user/getUser.service.js";

export const getUserController = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId);
    
    const user = await getUserService(userId);
    console.log(user);
    
    return res.status(200).json({
      status: "success",
      user,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error || "Internal Server Error",
    });
  }
};
