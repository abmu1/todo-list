import { projectFactory, taskFactory } from "./factories";
import { library } from "./factories";

function saveLibrary(Library) {
  localStorage.setItem('library', JSON.stringify(Library));
};
function getLibrary() {
  let Library = JSON.parse(localStorage.getItem('library'));
  if (Library) {
    const todos = Library.todos.map(todo => {
      let tasks = todo.tasks.map(task => {
        let { name, dueDate, priority, isDone } = task;
        return taskFactory(name, dueDate, priority, isDone);
      })
      return projectFactory(todo.name, tasks);
    })
    return library(todos);
  }
}

export {
  saveLibrary,
  getLibrary
};