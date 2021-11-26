const Todo = require("../models/Todo");
const { todoValidation } = require("../validation");

exports.create = async (req, res, next) => {
  const { error } = todoValidation(req.body);
  if (error) {
    res.status(402).json({ error: error.details[0].message, status: "error" });
    return;
  }
  const newTodo = new Todo(req.body);
  try {
    await newTodo
      .save()
      .then((todo) => res.status(200).json(todo))
      .catch((err) => next(err));
  } catch (error) {
    next(error);
  }
};
exports.index = async (req, res, next) => {
  try {
    const todos = await Todo.find({});
    res.json(todos);
  } catch (error) {
    next(error);
  }
};
exports.show = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);
    res.json(todo);
  } catch (error) {
    next(error);
  }
};

exports.edit = async (req, res, next) => {
  try {
    const oldTodo = await Todo.findById(req.params.id);
    oldTodo.title=req.body.title;
    oldTodo.status=req.body.status;
    const todo=await oldTodo.save();
    res.json(todo);
  } catch (error) {
    next(error);
  }
};
exports.delete = async (req, res, next) => {
    const todo = await Todo.deleteOne({"_id":req.params.id});
    if(todo.deletedCount === 1){
      return res.status(200).json({success:"1 word deleted successful..."})
    }else{
      return res.status(404).json({success:"word not found"})
    }
};
