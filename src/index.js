import "bootstrap";

import "./main.scss";
import Project from "./project.js";

const projects = [];
let currentProj; // corresponding object for the last project clicked on

function addProject(title, description, dueDate) {
  projects.push(new Project(title, description, dueDate));
}

// updates the page with new data
function generateDisplay() {
  const projsElement = document.querySelector("#projects");
  projsElement.innerHTML = "";
  for(let i = 0; i < projects.length; i++) {
    const project = projects[i];
    const newProj = project.generateDisplay(i);
    newProj.addEventListener("click", ev => currentProj = project, true);
    projsElement.append(newProj);
  }

  // adds function to the trash buttons (clear done todos)
  const trashBtns = document.querySelectorAll(".trash-button");
  for(let i = 0; i < trashBtns.length; i++) {
    trashBtns[i].addEventListener("click", function () {
      currentProj.removeDoneTodos(i);
      generateDisplay();
    });
  }
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

addProject("test", "pretty sure this should work", "69/420/6969");
projects[0].addTodo("test 1", "ok its working", 1);
projects[0].addTodo("test 2", "pog", 0);
generateDisplay();
