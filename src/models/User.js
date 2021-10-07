const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    name: { type: String, require: true },
    email: { type: String, required: true, unique: true },
    password: String,
    profile_photo: String,
    role: {
      type: String,
      enum: ["USER_ROLE", "ADMIN_ROLE"],
      default: "USER_ROLE",
    },
    fake: Boolean,
  },
  { timestamps: true }
);

module.exports = model("User", UserSchema);
