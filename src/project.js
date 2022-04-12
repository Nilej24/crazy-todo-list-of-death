import Todo from "./todo.js";

function Project(title, description, dueDate) {
  this.title = title;
  this.description = description;
  this.dueDate = dueDate;

  this.todos = [];
}

Project.prototype.addTodo = function (title, description, priority) {
  this.todos.push(new Todo(title, description, priority));
};

Project.prototype.removeDoneTodos = function (index) {

  for(let i = 0; i < this.todos.length; i++)
    if(this.todos[i].done)
      this.todos.splice(index, 1);

};

// gonna be generateDisplay later
Project.prototype.generateText = function () {
  let message = "";
  message += "title: " + this.title;
  message += "\ndescription: " + this.title;
  message += "\ndue date: " + this.dueDate;
  message += "\ntodos: " + this.todos.length;
  return message;
};

Project.prototype.showTodos = function () {
  this.todos.forEach(todo => console.log(todo.generateText()));
};
