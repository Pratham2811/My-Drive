import mongoose from "mongoose";

const rolePermissionSchema = new mongoose.Schema(
  {
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
    permissionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Permission",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// 🔥 Prevent duplicate mappings
rolePermissionSchema.index(
  { roleId: 1, permissionId: 1 },
  { unique: true }
);

// 🔥 Optimize queries
rolePermissionSchema.index({ roleId: 1 });
rolePermissionSchema.index({ permissionId: 1 });

export const RolePermission = mongoose.model(
  "RolePermission",
  rolePermissionSchema
);