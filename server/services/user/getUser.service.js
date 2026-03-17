import User from "../../models/UserModel.js";
import { AppError } from "../../utils/AppError.js";
export const getUserService = async (userId) => {
  const user = await User.findById({ _id: userId }).lean();

  if (!user) {
    throw new AppError("User Not Found", 404);
  }
  return user;
};
