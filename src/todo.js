function Todo(title, description, priority) {
  this.title = title;
  this.description = description;
  this.priority = priority;
  this.done = false;
}

// generates element to be appended to project
Todo.prototype.generateDisplay = function (projectIndex, todoIndex) {

  // header
  const header = document.createElement("div");
  header.classList.add("accordion-header", "d-flex");

  // check group
  const checkInput = document.createElement("input");
  checkInput.classList.add("form-check-input");
  checkInput.type = "checkbox";
  checkInput.id = `p${projectIndex}-${todoIndex}-check`;

  const checkLabel = document.createElement("label");
  checkLabel.classList.add("form-check-label");
  checkLabel.htmlFor = checkInput.id;
  checkLabel.innerText = this.title;

  const checkGroup = document.createElement("div");
  checkGroup.classList.add("form-check", "m-3");
  checkGroup.append(checkInput, checkLabel);
  header.append(checkGroup);

  // rest of header
  let prioColor;
  switch(+this.priority) {
    case 1:
      prioColor = "info";
      break;
    case 2:
      prioColor = "warning";
      break;
    case 3:
      prioColor = "danger";
      break;
  }
  
  if(!!(+this.priority)) {
    header.innerHTML += `
      <div class="alert alert-${prioColor} m-0 ms-auto">
        <i class="bi bi-exclamation-triangle"></i>
      </div>
      <button class="btn mx-2" data-bs-toggle="modal" data-bs-target="#edit-todo">
        <i class="bi bi-pencil-square"></i>
      </button>
      <button class="accordion-button collapsed w-auto bg-dark text-white" type="button" data-bs-toggle="collapse" data-bs-target="#${projectIndex}-${todoIndex}-collapse"></button>
    `;
  } else {
    header.innerHTML += `
      <button class="btn mx-2 ms-auto" data-bs-toggle="modal" data-bs-target="#edit-todo">
        <i class="bi bi-pencil-square"></i>
      </button>
      <button class="accordion-button collapsed w-auto bg-dark text-white" type="button" data-bs-toggle="collapse" data-bs-target="#${projectIndex}-${todoIndex}-collapse"></button>
    `;
  }
  // header end

  // collapsing description
  const collapse = document.createElement("div");
  collapse.id = `${projectIndex}-${todoIndex}-collapse`;
  collapse.classList.add("accordion-collapse", "collapse");

  const hr = document.createElement("hr");
  hr.classList.add("m-0");

  const desc = document.createElement("div");
  desc.classList.add("accordion-body");
  desc.innerText = this.description;

  collapse.append(hr, desc);
  // description end

  // return element
  const element = document.createElement("div");
  element.id = projectIndex + "-" + todoIndex;
  element.classList.add("accordion-item");
  element.dataset.todoIndex = todoIndex;
  element.append(header, collapse);
  return element;
};

export default Todo;
