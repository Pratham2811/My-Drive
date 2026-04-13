import mongoose from "mongoose";
import Session from "../../models/Session.js";
import User from "../../models/UserModel.js";
import { AppError } from "../../utils/AppError.js";
import Otp from "../../models/OtpModel.js";
import { AuthProvider } from "../../models/AuthProvider.js";
import IntegratedAppsModel from "../../models/IntegratedAppsModel.js";
import FileModel from "../../models/FileModel.js";
import { directoryModel } from "../../models/DirectoryModel.js";

export async function suspendUserService(userId) {
  
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    await Session.deleteMany({ userId }, { session });

    await User.findOneAndUpdate(
      { _id: userId },
      { state: "SUSPENDED" },
      { session }, // 🔥 REQUIRED
    );

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw AppError("Internal Server error", 500, error);
  } finally {
    session.endSession();
  }
}
export async function reactivateUserService(userId) {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const user = await User.findById(userId).session(session);
    if (!user) {
      throw new Error("User not found");
    }
    user.state = "ACTIVE";
    await user.save({ session });
    await FileModel.updateMany({ userId }, { state: "ACTIVE" }).session(
      session,
    );
    await directoryModel
      .updateMany({ userId }, { state: "DELETED" })
      .session(session);
    await session.commitTransaction();
    return user;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}
export async function softDeleteUserService(userId) {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const user = await User.findById(userId).session(session);
    if (!user) {
      throw new Error("User not found");
    }
    console.log(user);

    if (user.state === "DISABLED") {
      throw new Error("User already deleted");
    }
    await Session.deleteMany({ userId }).session(session);
    await Otp.deleteMany({ userId }).session(session);
    await AuthProvider.deleteMany({ userId }).session(session);
    await IntegratedAppsModel.deleteMany({ userId }).session(session);
    await FileModel.updateMany({ userId }, { state: "DELETED" }).session(
      session,
    );
    await directoryModel
      .updateMany({ userId }, { state: "DELETED" })
      .session(session);
    user.state = "DISABLED";
    user.deletedAt = new Date();
    await user.save({ session });
    await session.commitTransaction();
    return user;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}
