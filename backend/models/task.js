const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Create schema for todo
const TodoSchema = new Schema({
  task: {
    type: String,
    required: true,
  },
  date:{
  type: String,
  required:true
  },
  time: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  checked:{
  type:Boolean,
  default:false
  }
});
// Create model for todo
const Todo = mongoose.model('todo', TodoSchema);
module.exports = Todo;