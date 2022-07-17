/* dependencies */
const { Schema, model } = require("mongoose");

/* Todo Schema */
const todoSchema = new Schema(
  {
    taskname: {
      type: String,
      required: true,
      trim: true,
    },
    priority: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
      trim: true,
    },
    user: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

/* todo model */
const Todo = model("Todo", todoSchema);

/* exports */
module.exports = Todo;
