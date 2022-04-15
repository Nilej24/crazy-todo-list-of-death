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

Project.prototype.removeDoneTodos = function () {
  this.todos = this.todos.filter(todo => !todo.done);
};

Project.prototype.generateDisplay = function (projectIndex) {

  // title + top buttons
  const head = document.createElement("h3");
  head.classList.add("mb-3", "d-flex");
  head.innerText = this.title;
  head.innerHTML += `
    <button class="btn btn-dark ms-auto" data-bs-toggle="modal" data-bs-target="#new-todo">
      <i class="bi bi-plus-lg"></i>
    </button>
    <button class="btn btn-dark mx-2 trash-button">
      <i class="bi bi-trash"></i>
    </button>
    <button class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#edit-project">
      <i class="bi bi-pencil-square"></i>
    </button>
  `;

  // description
  const desc = document.createElement("p");
  desc.innerText = this.description;

  // due date
  const due = document.createElement("p");
  due.innerText = this.dueDate ? "due: " + this.dueDate : "";

  //todos
  const todoList = document.createElement("div");
  todoList.classList.add("accordion", "text-dark");
  for(let i = 0; i < this.todos.length; i++) {
    const todoElement = this.todos[i].generateDisplay(projectIndex, i);
    todoList.append(todoElement);
  }

  // add to dom
  const element = document.createElement("div");
  element.classList.add("p-4", "card", "bg-primary", "mt-4");
  element.dataset.projectIndex = projectIndex;
  element.append(head, desc, due, todoList);
  return element;
};

export default Project;
