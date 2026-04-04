import { RolePermission } from "../../models/rolePermission.model.js";

export async function getPermissions(roleId) {
  const result = await RolePermission.aggregate([
    {
      $match: { roleId },
    },
    {
      $lookup: {
        from: "permissions",
        localField: "permissionId",
        foreignField: "_id",
        as: "permission",
      },
    },
    {
      $unwind: "$permission",
    },
    {
      $project: {
        name: "$permission.name",
      },
    },
  ]);

  return result.map((p) => p.name);
}
