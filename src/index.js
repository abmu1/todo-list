import { library, projectFactory, taskFactory } from "./factories";
import * as myProject from "./project";
import * as myTask from "./task.js"
import { getLibrary } from "./localStorage";

const tempLibrary = library();
const defualtProject = projectFactory('Default');
tempLibrary.addTodo(defualtProject);
tempLibrary.currentTodo = defualtProject;

const Library = getLibrary() || tempLibrary;

myProject.showProjectPopup();
myProject.hideProjectPopup();
myProject.getDataFromProjectForm(Library, projectFactory);
myTask.showPopup();
myTask.hidePopup();
myTask.getDataFromPopup(Library, taskFactory);
Library.todos.forEach(project => {
  myProject.renderProject(Library, project);
});
Library.currentTodo = Library.todos[0];
document.getElementById('projects').firstChild?.click()

document.addEventListener('click', (event) => {
  const task_pop = document.getElementById('task-popup');
  const projectPopup = document.getElementById('project-popup');
  if (!task_pop.contains(event.target) && (!task_pop.classList.contains('hidden'))) {
    task_pop.classList.add('hidden');
  }
  if (!projectPopup.contains(event.target)) {
    projectPopup.classList.add('hidden');
  }
})