import "bootstrap";

import "./main.scss";
import Project from "./project.js";

let projects = [];
let currentProj; // corresponding object for the last project clicked on
let currentTodo; // same thing for todos

function addProject(title, description, dueDate) {
  projects.push(new Project(title, description, dueDate));
}

// updates the page with new data
function generateDisplay() {

  // update todoList orders based on priority
  projects.forEach(function (proj) {
    proj.todos = proj.todos.sort(function (a, b) {
      return b.priority - a.priority;
    });
  });
  
  // actually generates the content
  const projsElement = document.querySelector("#projects");
  projsElement.innerHTML = "";
  for(let i = 0; i < projects.length; i++) {
    const project = projects[i];
    const newProj = project.generateDisplay(i);
    newProj.addEventListener("click", ev => currentProj = project, true);
    projsElement.append(newProj);
  }

  // sets currentProj
  const allTodos = document.querySelectorAll("[data-todo-index]");
  allTodos.forEach(function (todo) {
    todo.addEventListener("click", function () {
      const index = todo.dataset.todoIndex;
      currentTodo = currentProj.todos[index];
    }, true);
  });

  // fills edit project form
  const editProjBtns = document.querySelectorAll('[data-bs-target="#edit-project"]');
  editProjBtns.forEach(function (btn) {
    btn.addEventListener("click", function (ev) {
      document.querySelector("#project-title-edit").value = currentProj.title;
      document.querySelector("#project-description-edit").value = currentProj.description;
      document.querySelector("#project-due-date-edit").value = currentProj.dueDate;
    });
  });

  // fills edit todo form
  const editTodoBtns = document.querySelectorAll('[data-bs-target="#edit-todo"]');
  editTodoBtns.forEach(function (btn) {
    btn.addEventListener("click", function (ev) {
      document.querySelector("#todo-title-edit").value = currentTodo.title;
      document.querySelector("#todo-description-edit").value = currentTodo.description;
      document.querySelector("#todo-priority-edit").value = currentTodo.priority;
    });
  });

  // adds function to the trash buttons (clear done todos)
  const trashBtns = document.querySelectorAll(".trash-button");
  for(let i = 0; i < trashBtns.length; i++) {
    trashBtns[i].addEventListener("click", function () {
      currentProj.removeDoneTodos();
      generateDisplay();
    });
  }

  // connects checkboxes to js booleans
  document.querySelectorAll('input[type="checkbox"]').forEach(function (check) {
    check.addEventListener("click", function () {
      currentTodo.done = !currentTodo.done;
    });;
  });
}

// check if new project title is unique
const submit = document.querySelector('button[form="new-project-form"]');
submit.addEventListener("click", function () {
  const titleInput = document.querySelector('#new-project-form input[type="text"]');
  let titleUnique = true;
  projects.forEach(function (project) {
    if(project.title == titleInput.value)
      titleUnique = false;
  });
  const custValidity = titleUnique ? "" : "Please enter a unique project title.";
  titleInput.setCustomValidity(custValidity);
});

// add new project
document.querySelector("#new-project-form").addEventListener("submit", function (ev) {
  ev.preventDefault();

  const titleInput = document.querySelector('#new-project-form input[type="text"]');
  const descInput = document.querySelector('#new-project-form textarea');
  const dueInput = document.querySelector('#new-project-form input[type="date"]');

  addProject(titleInput.value, descInput.value, dueInput.value);
  generateDisplay();
  ev.target.reset();
});

// add new todo to a project
const newTodoForm = document.querySelector("#new-todo-form");
newTodoForm.addEventListener("submit", function (ev) {
  ev.preventDefault();

  const titleInput = newTodoForm.querySelector('input[type="text"]');
  const descInput = newTodoForm.querySelector("textarea");
  const priorityInput = newTodoForm.querySelector("select");

  currentProj.addTodo(titleInput.value, descInput.value, priorityInput.value);
  generateDisplay();
  ev.target.reset();
});

// edit project form
const editProjForm = document.querySelector("#edit-project-form");
editProjForm.addEventListener("submit", function (ev) {
  ev.preventDefault();

  currentProj.title = document.querySelector('#edit-project-form input[type="text"]').value;
  currentProj.description = document.querySelector('#edit-project-form textarea').value;
  currentProj.dueDate = document.querySelector('#edit-project-form input[type="date"]').value;
  generateDisplay();
});

// delete project using edit project modal
document.querySelector("#delete-project-btn").addEventListener("click", function (ev) {
  projects = projects.filter(proj => proj != currentProj);
  generateDisplay();
});

// edit todo form
const editTodoForm = document.querySelector("#edit-todo-form");
editTodoForm.addEventListener("submit", function (ev) {
  ev.preventDefault();

  currentTodo.title = editTodoForm.querySelector('input[type="text"]').value;
  currentTodo.description = editTodoForm.querySelector('textarea').value;
  currentTodo.priority = editTodoForm.querySelector("select").value;
  generateDisplay();
});

// delete todo using edit todo modal
document.querySelector("#delete-todo-btn").addEventListener("click", function (ev) {
  currentProj.todos = currentProj.todos.filter(todo => todo != currentTodo);
  generateDisplay();
});

// delete all done todos + completed projects
document.querySelector("#delete-all-completed").addEventListener("click", function (ev) {
  projects.forEach(function (proj) {
    proj.removeDoneTodos();
  });
  generateDisplay();
});

addProject("test", "pretty sure this should work", "6969-09-24");
projects[0].addTodo("test 1", "ok its working", 1);
projects[0].addTodo("test 2", "pog", 0);
generateDisplay();
