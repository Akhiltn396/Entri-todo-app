const Todo = require("../models/task");
const addTask = async (req, res, next) => {
  try {
    const newTodo = new Todo({
      ...req.body,
    });

    await newTodo.save();
    res.status(200).json("New task has been created");
  } catch (error) {
    next(error);
  }
};
const getTask = async (req, res, next) => {
  try {
    const newTodo = await Todo.find();

    res.status(200).json(newTodo);
  } catch (error) {
    next(error);
  }
};

const editTask = async (req, res, next) => {
  try {
    const task = req.body;

    const updateTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { checked: task.check },
      { new: true }
    );
    res.status(200).json(updateTodo);
  } catch (error) {
    next(error);
  }
};
const deleteTask = async (req, res, next) => {
  try {
    const updateTodo = await Todo.findByIdAndDelete(req.params.id);

    res.status(200).json("Item Deleted Successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = { addTask, getTask, editTask, deleteTask };
