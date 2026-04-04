import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // ADMIN, USER, etc.
      enum: ["ADMIN", "USER", "MANAGER"],
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

roleSchema.index({ name: 1 });

export const Role = mongoose.model("Role", roleSchema);