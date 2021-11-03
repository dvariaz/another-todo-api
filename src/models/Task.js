const { Schema, model } = require("mongoose");

const TaskSchema = new Schema(
  {
    title: { type: String, trim: true, default: "New Task" },
    description: { type: String, trim: true, default: "" },
    shared_users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    due_date: { type: Schema.Types.Date },
    created_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
    fake: Boolean,
  },
  { timestamps: true }
);

module.exports = model("Task", TaskSchema);
