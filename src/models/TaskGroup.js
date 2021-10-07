const { Schema, model } = require("mongoose");

const TaskGroupSchema = new Schema(
  {
    name: { type: String, default: "New Group" },
    dashboard: {
      type: Schema.Types.ObjectId,
      ref: "Dashboard",
      required: true,
    },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
    position: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = model("TaskGroup", TaskGroupSchema);
