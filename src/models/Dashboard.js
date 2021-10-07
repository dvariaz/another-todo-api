const { Schema, model } = require("mongoose");

const DashboardSchema = new Schema(
  {
    title: { type: String, required: true, default: "New Dashboard" },
    description: { type: String, default: "" },
    background_photo: { type: String, default: "" },
    shared_users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    fake: Boolean,
  },
  { timestamps: true }
);

module.exports = model("Dashboard", DashboardSchema);
