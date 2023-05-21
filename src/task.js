import { saveLibrary } from "./localStorage";

function showPopup() {
  const addTask = document.getElementById('add-task');
  addTask.addEventListener('click', (e) => {
    e.stopPropagation();
    const task_pop = document.getElementById('task-popup');
    task_pop.classList.add('task-popup');
    task_pop.classList.remove('hidden');
    const taskName = document.getElementById('task-name');
    taskName.focus();
  });
};
function hidePopup() {
  const cancelT = document.getElementById('cancelT');
  cancelT.addEventListener('click', () => {
    const task_pop = document.getElementById('task-popup');
    task_pop.classList.remove('task-popup');
    task_pop.classList.add('hidden');
  });
};

function getDataFromPopup(Library,taskFactory) {
  const task_pop = document.getElementById('task-popup');
  task_pop.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskName = document.getElementById('task-name');
    for (let i = 0; i < Library.currentTodo.tasks.length; i++) {
      if (taskName.value === Library.currentTodo.tasks[i].name) {
        taskName.setCustomValidity('There is already a task with this name!');
        taskName.reportValidity();
        taskName.setCustomValidity("");
        return;
      };
    };
    const dueDate = document.getElementById('due-date');
    const priority = document.getElementById('priority');
    const task = taskFactory(taskName.value,dueDate.value,priority.value);
    taskName.value = '';
    dueDate.value = '';
    const ct = Library.currentTodo;
    ct.addTask(task);
    renderTask(ct);
    task_pop.reset();
    const cancelT = document.getElementById('cancelT');
    cancelT.click()
    // save library updates to local storage.
    saveLibrary(Library);
  });
};

function renderTask(project, Library) {
  if (!project) return;
  let h1 = document.getElementById('current-project');
  h1.innerText = project.name;
  const ul = document.getElementById('tasks');
  ul.innerHTML = '';
  project.tasks.forEach(task => {
    const li = document.createElement('li');
    const doneButton = document.createElement('button');
    const nameP = document.createElement('p');
    const dateP = document.createElement('p');
    const removeButton = document.createElement('button');
    li.classList.add('task', task.priority);
    doneButton.classList.add('done');
    nameP.classList.add('task-name');
    dateP.classList.add('date');
    removeButton.classList.add('remove', 'remove-task');
    removeButton.innerHTML = '&times'
    removeButton.addEventListener('click', removeTask(project, Library))
    nameP.textContent = task.name;
    dateP.textContent = task.dueDate;
    doneButton.addEventListener('click', () => {
      if (task.isDone) {
        task.isDone = false;
        li.classList.remove('completed');
        saveLibrary(Library);
        return;
      }
      task.isDone = true;
      li.classList.add('completed');
    });
    if (task.isDone) {
      li.classList.add('completed');
    }
    li.append(doneButton,nameP,dateP,removeButton);
    li.dataset.name = task.name;
    ul.append(li);
  });
};

function removeTask(project, Library) {
  return function (e) {
    const task = e.target.parentElement;
    project.removeTask(task.dataset.name);
    task.remove();
    saveLibrary(Library);
  };
};

export{
  showPopup,hidePopup,
  getDataFromPopup,renderTask,removeTask
};