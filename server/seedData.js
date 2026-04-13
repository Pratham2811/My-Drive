// import { Permission } from "./models/permission.model.js";
// import { Role } from "./models/role.model.js";

// const insertData = await Role.create([
//  { name: "ADMIN" },
//   { name: "MANAGER" },
//   { name: "USER" }
// ]);
// console.log(insertData);

// // seedRolePermissions.js

// export const rolePermissionsSeed = {
//   ADMIN: [
//     "USER_VIEW",
//     "USER_UPDATE",
//     "USER_DELETE",
//     "USER_SUSPEND",
//     "USER_FORCE_LOGOUT",
//     "FILE_UPLOAD",
//     "FILE_DOWNLOAD",
//     "FILE_DELETE",
//     "FILE_UPDATE",
//     "ADMIN_DASHBOARD_VIEW",
//   ],

//   MANAGER: [
//     "USER_VIEW",
//     "USER_UPDATE",
//     "FILE_UPLOAD",
//     "FILE_DOWNLOAD",
//     "FILE_DELETE",
//   ],

//   USER: [
//     "FILE_UPLOAD",
//     "FILE_DOWNLOAD",
//     "FILE_DELETE",
 //      "FILE_VIEW"
//   ],
// };
// import mongoose from "mongoose";
// import { Role } from "./models/role.model.js";
// import { Permission } from "./models/permission.model.js";
// import { RolePermission } from "./models/rolePermission.model.js";


// async function seedRolePermissions() {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("DB connected");

//     for (const roleName in rolePermissionsSeed) {
//       // 1. Get role
//       const role = await Role.findOne({ name: roleName });

//       if (!role) {
//         console.log(`Role not found: ${roleName}`);
//         continue;
//       }

//       // 2. Loop permissions
//       for (const permName of rolePermissionsSeed[roleName]) {
//         const permission = await Permission.findOne({
//           name: permName,
//         });

//         if (!permission) {
//           console.log(`Permission not found: ${permName}`);
//           continue;
//         }

//         // 3. Insert mapping (idempotent)
//         await RolePermission.updateOne(
//           {
//             roleId: role._id,
//             permissionId: permission._id,
//           },
//           {
//             $setOnInsert: {
//               roleId: role._id,
//               permissionId: permission._id,
//             },
//           },
//           { upsert: true }
//         );
//       }

//       console.log(`Mapped permissions for role: ${roleName}`);
//     }

//     console.log("Role-Permission mapping completed");
//     process.exit(0);
//   } catch (err) {
//     console.error(err);
//     process.exit(1);
//   }
// }

// seedRolePermissions();