import "bootstrap";

import "./main.scss";
import Project from "./project.js";

const projects = [];

function addProject(title, description, dueDate) {
  projects.push(new Project(title, description, dueDate));
}

function generateDisplay() {
  document.querySelector("#projects").innerHTML = "";
  projects.forEach(project => project.generateDisplay());
}

addProject("test", "pretty sure this should work", "69/420/6969");
projects[0].addTodo("test 1", "ok its working", 1);
projects[0].addTodo("test 2", "pog", "3");
generateDisplay();
