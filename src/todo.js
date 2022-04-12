function Todo(title, description, priority) {
  this.title = title;
  this.description = description;
  this.priority = priority;
  this.done = false;
}

// gonna be generateDisplay later
Todo.prototype.generateText = function () {
  let message = "";
  message += "title: " + this.title;
  message += "\ndescription: " + this.description;
  message += "\npriority: " + this.priority;
  return message;
};

export default Todo;
