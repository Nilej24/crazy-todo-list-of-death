function Project(title, description, dueDate) {
  this.title = title;
  this.description = description;
  this.dueDate = dueDate;

  this.todos = [];
}

Project.prototype.addTodo = function (title, description, priority) {
  this.todos.push({
    title,
    description,
    priority,
  });
};

Project.prototype.removeTodoAt = function (index) {
  this.todos.splice(index, 1);
}
