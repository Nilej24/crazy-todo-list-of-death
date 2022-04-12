import "bootstrap";

import "./main.scss";
import "./project.js";

const projects = [];

function fixCheckBoxes() {
  const checks = document.querySelectorAll(".form-check-input");
  checks.forEach(check => check.addEventListener("click", ev => ev.stopImmediatePropagation()));
}

fixCheckBoxes();
