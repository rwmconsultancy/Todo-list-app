const express = require("express");
const route = express.Router();
const Todo = require("../models/todo");


route.get('/', async (req, res) => {
  const getAllTodos = await Todo.find({});
  const getAllOpenTodos = await Todo.find({done: false});
  res.render("index", { getAllTodos, getAllOpenTodos });
});

route.post('/CreateTodo', async (req, res) => {
  const todo = req.body.todo;
  const desc = req.body.description;

  if (todo) {
    const newTodo = new Todo({ todo: todo, description: desc });
    newTodo.save();
  } else {
    console.log('empty!');
  }
  res.redirect('/');
});

route.post('/deleteTodo/:id', async (req, res) => {
    const id = req.params.id;
    if(id) {
    await Todo.findByIdAndDelete(id);
    } else {
        console.log('empty id');
    }

});

route.get('/editTodo/:id', async (req, res) => {
    const id = req.params.id;
    
    if(id) {
        const getOneTodo = await Todo.findById(id);
        const todoTitle = getOneTodo.todo;
        const todoDone = getOneTodo.done;
        const todoDescription = getOneTodo.description;
        res.render('editTodo', {todoTitle, todoDone, todoDescription, id});
    } else {
        console.log('empty ID');
    }
  });

route.post('/editTodo/:id', async (req, res) => {
    const id = req.params.id;
    const foundTodo = await Todo.findById(id);

    if (foundTodo) {
    if(req.body.done === 'on' || req.body.done == true) {
        done = true;
    } else {
        done = false;
    }
    const update = {todo: req.body.title, description: req.body.description, done: done};
    await foundTodo.updateOne(update);
    res.redirect('/')
    
    } else {
        console.log('todo not found');
    }
});


module.exports = route;
