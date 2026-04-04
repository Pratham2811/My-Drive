import { getAllUsersService } from "../../services/admin/getAllUsers.service.js";

export async function getAllUsersController(req, res, next) {
  try {
    const id = req.user;
    const { users, allSession } = await getAllUsersService();

    const transformedUsers = users.map(
      ({ _id, name, state, createdAt, avatarUrl, email,role }) => {
        return {
          id: _id,
          name,
          email,
          state,
          role,
          createdAt,
          avatarUrl,
          isLoggedIn: allSession.some((session) => {
            return session.userId.toString() === _id.toString();
          }),
        };
      },
    );

    
    res.status(200).json({
      success: true,
      message: "Found the all users",
      users:transformedUsers,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
}
