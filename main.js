(()=>{"use strict";const e=(e=[])=>{let t;return{todos:e,currentTodo:t,addTodo:t=>{e.push(t)},removeTodo:t=>{for(let n=0;n<e.length;n++)e[n].name===t&&e.splice(n,1)},updateCT:e=>{t=e},index:()=>e.length}},t=(e,t=[])=>({name:e,tasks:t,addTask:e=>{t.push(e)},removeTask:e=>{for(let n=0;n<t.length;n++)t[n].name===e&&t.splice(n,1)},index:()=>t.length}),n=(e,t,n)=>{let o="",d=!1;return{name:e,dueDate:t,isDone:d,priority:n,description:o,updateDone:e=>{d=e},addDescription:e=>{o=e}}};function o(e){localStorage.setItem("library",JSON.stringify(e))}function d(e,t){if(!e)return;document.getElementById("current-project").innerText=e.name;const n=document.getElementById("tasks");n.innerHTML="",e.tasks.forEach((d=>{const s=document.createElement("li"),a=document.createElement("button"),c=document.createElement("p"),i=document.createElement("p"),r=document.createElement("button");s.classList.add("task",d.priority),a.classList.add("done"),c.classList.add("task-name"),i.classList.add("date"),r.classList.add("remove","remove-task"),r.innerHTML="&times",r.addEventListener("click",function(e,t){return function(n){const d=n.target.parentElement;e.removeTask(d.dataset.name),d.remove(),o(t)}}(e,t)),c.textContent=d.name,i.textContent=d.dueDate,a.addEventListener("click",(()=>{if(d.isDone)return d.isDone=!1,s.classList.remove("completed"),void o(t);d.isDone=!0,s.classList.add("completed")})),d.isDone&&s.classList.add("completed"),s.append(a,c,i,r),s.dataset.name=d.name,n.append(s)}))}function s(e,t){const n=document.getElementById("projects"),s=document.createElement("li"),a=document.createElement("p"),c=document.createElement("button");s.classList.add("project"),s.dataset.name=t.name,s.addEventListener("click",(()=>{e.currentTodo=t,d(t);const n=document.querySelector(".clicked");n?.classList.remove("clicked"),s.classList.add("clicked")})),a.classList.add("project-name"),a.textContent=t.name,c.classList.add("remove","remove-project"),c.innerHTML="&times",c.addEventListener("click",function(e,t){return function(n){n.stopPropagation();const s=n.target.parentElement,a=s.dataset.name;e.removeTodo(a),s.remove(),e.currentTodo===t&&d(e.todos[0],e),o(e)}}(e,t)),s.append(a,c),n.append(s)}o(e());const a=function(){const o=JSON.parse(localStorage.getItem("library")).todos.map((e=>{let o=e.tasks.map((e=>{let{name:t,dueDate:o,priority:d}=e;return n(t,o,d)}));return t(e.name,o)}));return e(o)}()||e();console.log("hiiii");const c=t("Default");a.addTodo(c),a.currentTodo=c,document.getElementById("add-project").addEventListener("click",(e=>{e.stopPropagation();const t=document.getElementById("project-popup");t.classList.add("project-popup"),t.classList.remove("hidden"),document.getElementById("project-title").focus()})),document.getElementById("cancelP").addEventListener("click",(()=>{const e=document.getElementById("project-popup");e.classList.remove("project-popup"),e.classList.add("hidden")})),function(e,t){const n=document.getElementById("project-popup");n.addEventListener("submit",(d=>{d.preventDefault();const a=document.getElementById("project-title"),c=a.value;for(let t=0;t<e.todos.length;t++)if(c===e.todos[t].name)return a.setCustomValidity("There is already a project with this name!"),a.reportValidity(),void a.setCustomValidity("");const i=t(c);e.addTodo(i),s(e,i),a.value="",n.reset(),document.getElementById("cancelP").click(),o(e)}))}(a,t),document.getElementById("add-task").addEventListener("click",(e=>{e.stopPropagation();const t=document.getElementById("task-popup");t.classList.add("task-popup"),t.classList.remove("hidden"),document.getElementById("task-name").focus()})),document.getElementById("cancelT").addEventListener("click",(()=>{const e=document.getElementById("task-popup");e.classList.remove("task-popup"),e.classList.add("hidden")})),function(e,t){const n=document.getElementById("task-popup");n.addEventListener("submit",(s=>{s.preventDefault();const a=document.getElementById("task-name");for(let t=0;t<e.currentTodo.tasks.length;t++)if(a.value===e.currentTodo.tasks[t].name)return a.setCustomValidity("There is already a task with this name!"),a.reportValidity(),void a.setCustomValidity("");const c=document.getElementById("due-date"),i=document.getElementById("priority"),r=t(a.value,c.value,i.value);a.value="",c.value="";const l=e.currentTodo;l.addTask(r),d(l),n.reset(),document.getElementById("cancelT").click(),o(e)}))}(a,n),a.todos.forEach((e=>{s(a,e)})),d(c),document.getElementById("projects").firstChild.click(),document.addEventListener("click",(e=>{const t=document.getElementById("task-popup"),n=document.getElementById("project-popup");t.contains(e.target)||t.classList.contains("hidden")||t.classList.add("hidden"),n.contains(e.target)||n.classList.add("hidden")}))})();
//# sourceMappingURL=main.js.map