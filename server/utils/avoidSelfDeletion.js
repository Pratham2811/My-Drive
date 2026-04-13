import { AppError } from "./AppError.js";

export const avoidUserSelftDeletion = (userId, req, message) => {
  if (userId === req.user.id) {
    throw new AppError(`User can not ${message} itself`, 400);
  } else {
    return;
  }
};
