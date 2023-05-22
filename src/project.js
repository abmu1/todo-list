import { saveLibrary } from "./localStorage";
import { renderTask } from "./task";

function showProjectPopup() {
  const addProject = document.getElementById('add-project');
  addProject.addEventListener('click', (e) => {
    e.stopPropagation();
    const projectPopup = document.getElementById('project-popup');
    projectPopup.classList.add('project-popup');
    projectPopup.classList.remove('hidden');
    const titleInput = document.getElementById('project-title');
    titleInput.focus();
  });
};

function hideProjectPopup() {
  const cancelP = document.getElementById('cancelP');
  cancelP.addEventListener('click', () => {
    const projectPopup = document.getElementById('project-popup');
    projectPopup.classList.remove('project-popup');
    projectPopup.classList.add('hidden');
  });
};

function getDataFromProjectForm(Library,projectFactory) {
  const projectPopup = document.getElementById('project-popup');
  projectPopup.addEventListener('submit', (e) => {
    e.preventDefault();
    const titleInput = document.getElementById('project-title');
    const projectTitle = titleInput.value;
    let name = projectTitle.toLowerCase().trim();
    for (let i = 0; i < Library.todos.length; i++) {
      let check = Library.todos[i].name.toLowerCase();
      if (name === check) {
        titleInput.setCustomValidity('There is already a project with this name!');
        titleInput.reportValidity();
        titleInput.setCustomValidity("");
        return;
      };
    };
    const project = projectFactory(projectTitle);
    Library.addTodo(project);
    renderProject(Library, project);
    if (Library.todos.length === 1) {
      Library.currentTodo = project;
      renderTask(Library);
    }
    titleInput.value = '';
    projectPopup.reset();
    const cancelP = document.getElementById('cancelP');
    cancelP.click();
    // save library updates to local storage.
    saveLibrary(Library);
  });
};

function renderProject(Library, project) {
  const ul = document.getElementById('projects');
  const li = document.createElement('li');
  const p = document.createElement('p');
  const button = document.createElement('button');
  li.classList.add('project');
  li.dataset.name = project.name;
  li.addEventListener('click', () => {
    Library.currentTodo = project;
    renderTask(Library);
    const clicked = document.querySelector('.clicked');
    clicked?.classList.remove('clicked');
    li.classList.add('clicked');
  });
  p.classList.add('project-name');
  p.textContent = project.name;
  button.classList.add('remove', 'remove-project');
  button.innerHTML = '&times';
  button.addEventListener('click',removeClosure(Library, project));
  li.append(p,button);
  ul.append(li);
};


function removeClosure(Library, project) {
  return function removeProject(e) {
    e.stopPropagation();
    const button = e.target;
    const parent = button.parentElement;
    const projName = parent.dataset.name;
    Library.removeTodo(projName);
    parent.remove();
    if (Library.currentTodo === project) {
      Library.currentTodo = Library.todos[0];
      renderTask(Library);
    }
    // save library updates to local storage.
    saveLibrary(Library);
  };
};

export{showProjectPopup,hideProjectPopup,
        getDataFromProjectForm,renderProject,
      };