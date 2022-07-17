/* dependencies */

const { findByIdAndUpdate } = require("../../models/Todo");
const Todo = require("../../models/Todo");

/* todo task Handler */
const todoHandler = async (req, res) => {
  try {
    const { taskname, priority, date } = req.body;
    if (!taskname || !priority || !date) {
      res.redirect("/");
    } else {
      const todo = new Todo({
        taskname,
        priority,
        status: "pending",
        date,
        user: req.email,
      });
      const result = await todo.save();
      if (result) {
        return res.redirect(`/`);
      }
    }
  } catch (error) {
    throw error;
  }
};

/* delete a task */
const deleteHandler = async (req, res) => {
  try {
    const _id = req.params.id;
    const result = await Todo.findOneAndDelete({ _id, use: req.user });
    if (result) {
      return res.redirect("/");
    }
  } catch (error) {
    throw error;
  }
};

/* change task status */

const changeStatusHandler = async (req, res) => {
  try {
    const _id = req.params.id;
    const task = await Todo.findOne({ _id, user: req.email });
    const status = task.status === "pending" ? "completed" : "pending";
    const result = await Todo.findOneAndUpdate(
      { _id, user: req.email },
      { $set: { status } }
    );

    if (result) {
      return res.redirect("/");
    }
  } catch (error) {
    throw error;
  }
};

/* task update handler */

const TaskUpdateHandler = async (req, res) => {
  const _id = req.params.id;
  const { taskname, priority, date } = req.body;
  await Todo.findOneAndUpdate(
    { _id, user: req.email },
    { $set: { taskname, priority, date } }
  );
  res.redirect("/");
};

module.exports = {
  todoHandler,
  deleteHandler,
  changeStatusHandler,
  TaskUpdateHandler,
};
