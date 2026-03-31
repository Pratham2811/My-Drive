import Session from "../../models/Session.js";
import User from "../../models/UserModel.js";

export async function getAllUsersService() {
  const users = await User.find().lean().select("name state email createdAt avatarUrl ");
  const allSession=await Session.find().lean().select("userId")
  return {users,allSession};
}
