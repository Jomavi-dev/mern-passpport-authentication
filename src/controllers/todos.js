"use strict";
let User = require('../models/user')
let Todo = require('../models/todo')

exports.getTodos = (req, res) => {
  User.findById({ _id: req.user._id }).populate('todos').exec((err, doc) => {
    if (err) res.status(500).json({ message: { msgBody: 'Error occured', msgError: true } })
    else res.status(201).json({ todos: doc.todos, authenticated: true })
  })
}

exports.createTodo = (req, res) => {
  const todo = new Todo(req.body)
  todo.save(err => {
    if (err) res.status(500).json({ message: { msgBody: 'Error occured', msgError: true } })
    else {
      req.user.todos.push(todo)
      req.user.save(err => {
        if (err) res.status(500).json({ message: { msgBody: 'Error occured', msgError: true } })
        else res.status(201).json({ message: { msgBody: 'Todo created succesfully', msgError: false } })
      })
    }
  })
}