const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create To Do Schema
const todoSchema = new Schema(
  {
    todo: { type: String, required: true },
    done: { type: Boolean },
  },

  { timestamps: true } // add a timestamp to each document
);

// create Model from Schema (singular)
const Todo = mongoose.model('Todo', todoSchema);

// export the Model
module.exports = Todo;
