import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      enum: [
        "USER_VIEW",
        "USER_DELETE",
        "USER_SUSPEND",
        "USER_UPDATE",
        "USER_FORCE_LOGOUT",
        "FILE_UPLOAD",
        "FILE_DELETE",
        "FILE_DOWNLOAD",
        "FILE_UPDATE",
        "ADMIN_DASHBOARD_VIEW",
      ],
      index: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

// // Index for fast lookup
// permissionSchema.index({ name: 1 });

export const Permission = mongoose.model("Permission", permissionSchema);
