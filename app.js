const todoInput = document.querySelector("#todo-input");
const todoButton = document.querySelector("#todo-button");
const todoList = document.querySelector(".todo-list");
const todos = document.querySelectorAll(".todo-list .todo-list__item");

getTodos();

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);
todoList.addEventListener("click", completeTodo);

function addTodo() {
  const todo = todoInput.value;
  if (!todo) return;
  const todoObj = {
      name: todo,
      complete: false
  }
  setLocalTodo(todoObj);
  setTodo(todoObj);
  todoInput.value = "";
}

function deleteTodo(e) {
  const item = e.target;
  if (item.classList[0] == "delete") {
    const parent = item.parentElement.parentElement;
    parent.remove();
  }
}

function completeTodo(e) {
  const item = e.target;
  if (item.classList[0] == "complete") {
    const parent = item.parentElement.parentElement;
    parent.classList.toggle("completed");
  }
}

function getLocalTodo() {
  let todos = [];
  if (localStorage.getItem("todos") != null) {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

function setLocalTodo(todo) {
  const todos = getLocalTodo();
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function setTodo(todo) {
  const todoEl = document.createElement("div");
  todoEl.classList.add("todo-list__item");
  const spanEl = document.createElement("span");
  spanEl.textContent = todo;
  const buttonsEl = document.createElement("div");
  buttonsEl.classList.add("todo-list_buttons");

  // create complete button
  const completeButton = document.createElement("button");
  completeButton.setAttribute("type", "button");
  completeButton.classList.add("complete");
  completeButton.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>';
  buttonsEl.append(completeButton);

  // create delete button
  const deleteButton = document.createElement("button");
  deleteButton.setAttribute("type", "button");
  deleteButton.classList.add("delete");
  deleteButton.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
  buttonsEl.append(deleteButton);

  todoEl.append(spanEl, buttonsEl);
  console.log(todoEl);
  todoList.append(todoEl);
}

function getTodos() {
  const todos = getLocalTodo();
  for (const todo of todos) {
    setTodo(todo);
  }
}

// [
//     {
//         name: 'Apple',
//         complete: true
//     },
//     {
//         name: 'Home',
//         complete: true
//     }
// ]
