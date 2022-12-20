window.addEventListener("DOMContentLoaded", initTodos);

/** Lagrar våra skapade todo:s och gör så att dessa fortfarande visas
 * på skärmen även om sidan laddas om.
 */
let todos = JSON.parse(localStorage.getItem("todos")) || [];
console.log(todos);

/** Startar funktionerna för skapandet och rendering av todo:s. */
function initTodos() {
  addEventListeners();
  showTodos();
  togglePopup();
}

/** Aktiverar funktionen togglePopup vid klick av knappen på Skapa ToDo.
 * Spara-knappen leder vidare till addTodoFormEventListener.
 */
function addEventListeners() {
  const createTodoButton = document.getElementById("createTodoButton");
  createTodoButton.addEventListener("click", togglePopup);

  const saveTodoButton = document.getElementById("saveButton");
  saveTodoButton.addEventListener("click", addTodoFormEventListener);
}

/** Visar / döljer popup fönstret för att skapa Todo. */
function togglePopup() {
  const todoPopup = document.getElementById("todoPopup");
  const warning = document.getElementById("warning");
  const feedback = document.getElementById("feedback");

  todoPopup.classList.toggle("show-popup");
  warning.innerHTML = "";
  feedback.textContent = "";
}

/** Tar vara på datan som användaren skriver in vid skapandet av en todo.
 * Båda input-fälten måste vara ifyllda.
 */
function addTodoFormEventListener(event) {
  const todoInput = document.getElementById("todoInput").value;
  const dateInput = document.getElementById("dateInput").value;
  const form = document.getElementById("add-todo-form");
  const warning = document.getElementById("warning");
  const feedback = document.getElementById("feedback");

  if (todoInput === "" || dateInput === "") {
    warning.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i>';
    feedback.textContent = "Var vänlig fyll i ToDo och datum.";
    event.preventDefault();
  } else {
    form.addEventListener("submit", createNewTodoObject);
    warning.innerHTML = "";
    feedback.textContent = "";
  }
}

/** Skapar ny data i ett objekt och pushar in det i arrayen (todos). */
function createNewTodoObject(event) {
  event.preventDefault();

  const todo = {
    id: Date.now().toLocaleString(),
    content: event.target.elements.text.value,
    date: event.target.elements.date.value,
    completed: false,
  };

  todos.push(todo);

  // Lägger till den nya todo:n i LS.
  localStorage.setItem("todos", JSON.stringify(todos));

  event.target.reset();

  showTodos();
}

/** Skapar element, tillämpar klasser och renderar de skapade todo:sen. */
function showTodos() {
  const allTodo = document.querySelector("#allTodo");
  allTodo.innerHTML = "";

  for (const todo of todos) {
    const todoItem = document.createElement("li");
    todoItem.classList.add("todo");

    const todoContent = document.createElement("div");
    const todoTitle = document.createElement("p");
    const todoDate = document.createElement("p");
    const todoButtons = document.createElement("div");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    todoContent.classList.add("todo-content");
    todoTitle.classList.add("todo-title");
    todoDate.classList.add("todo-date");
    todoButtons.classList.add("todo-buttons");
    editButton.classList.add("todo-button-edit");
    deleteButton.classList.add("todo-button-delete");

    todoContent.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
    todoDate.innerHTML = `${todo.date}`;
    editButton.innerHTML = "Ändra";
    deleteButton.innerHTML = "Ta bort";

    todoContent.appendChild(todoTitle);
    todoContent.appendChild(todoDate);
    todoButtons.appendChild(editButton);
    todoButtons.appendChild(deleteButton);
    todoItem.appendChild(todoContent);
    todoItem.appendChild(todoContent);
    todoItem.appendChild(todoButtons);

    allTodo.appendChild(todoItem);

    // Ändrar todo.
    editButton.addEventListener("click", (event) => {
      const todoInput = todoContent.querySelector("input");
      todoInput.removeAttribute("readonly");
      todoInput.focus();
      todoInput.addEventListener("blur", (event) => {
        todoInput.setAttribute("readonly", true);
        todo.content = event.target.value;
        // Lägger todos i LS.
        localStorage.setItem("todos", JSON.stringify(todos));
        showTodos();
      });
    });

    // Tar bort todo.
    deleteButton.addEventListener("click", () => {
      todos = todos.filter((t) => t != todo);
      // Tar bort todo:n från LS.
      localStorage.setItem("todos", JSON.stringify(todos));
      showTodos();
      togglePopup();
    });
  }
  togglePopup();
}
