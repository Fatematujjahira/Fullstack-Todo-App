const { Router } = require("express");
const {
  todoHandler,
  deleteHandler,
  changeStatusHandler,
  TaskUpdateHandler,
} = require("../controllers/todo/todo");
const { authChecker } = require("../middleWare/auth/authMiddleWear");

const todoRoute = Router();

/* add a task */
todoRoute.post("/addtask", authChecker, todoHandler);
/* delete a task */
todoRoute.get("/deleteTask/:id", authChecker, deleteHandler);
/* change status */
todoRoute.get("/changeStatus/:id", authChecker, changeStatusHandler);
/* update task */
todoRoute.post("/updatetask/:id", authChecker, TaskUpdateHandler);
module.exports = {
  todoRoute,
};
