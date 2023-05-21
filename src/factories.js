const library = ( todos = []) => {
  let currentTodo;
  const addTodo = (todo) => {
    todos.push(todo);
  };
  const removeTodo = (name) => {
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].name === name) {
        todos.splice(i, 1);
      };
    };
  };
  const updateCT = (todo) => {
    currentTodo = todo
  };
  const index = () => {
    return todos.length;
  };
  return {todos,currentTodo,addTodo,removeTodo,updateCT,index};
};

const projectFactory = (name, tasks = []) => {
  const addTask = (task) => {
    tasks.push(task);
  };
  const removeTask = (name) => {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].name === name) {
        tasks.splice(i, 1);
      };
    };
  };
  const index = () => {
    return tasks.length;
  };
  return {name,tasks,addTask,removeTask,index};
};

const taskFactory = (name, dueDate, priority) => {
  let description = '';
  let isDone = false;
  const addDescription = (d) => {
    description = d;
  };
  const updateDone = (done) => {
    isDone = done;
  };
  return {name,dueDate,isDone,priority,description,updateDone,addDescription};
};

export{library,projectFactory,taskFactory};