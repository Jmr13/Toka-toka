import { get, set, add, del, clear, keys, countKeys, getAll } from "./IDB.js"

/* Create the following Elements: */
/* 
  <div class="flex justify-between items-center border-2 border-gray-200 w-full lg:w-4/5 p-5 rounded-xl">
    <h1 class="font-bold">Daily UI Challenge</h1>
    <button class="fill-red-500">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
        <path
          d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-11.414L9.172 7.757 7.757 9.172 10.586 12l-2.829 2.828 1.415 1.415L12 13.414l2.828 2.829 1.415-1.415L13.414 12l2.829-2.828-1.415-1.415L12 10.586z" />
      </svg>
    </button>
  </div> 
*/

const todoCreateElements = (title, id) => {
  let childDiv = document.createElement("div");
  childDiv.setAttribute("class", "flex justify-between items-center border-2 border-gray-200 w-full lg:w-4/5 p-5 rounded-xl")

  let todoTitle = document.createElement("h1");
  todoTitle.setAttribute("class", "font-bold");
  todoTitle.textContent = title;

  let todoDelbtn = document.createElement("button");
  todoDelbtn.setAttribute("class", "font-bold bg-red-500 text-white px-4 py-2 rounded");
  todoDelbtn.setAttribute("value", id);
  todoDelbtn.textContent = "Delete";

  let parentDiv = document.querySelector("#todoDiv");

  childDiv.appendChild(todoTitle);
  childDiv.appendChild(todoDelbtn);
  parentDiv.appendChild(childDiv);
}

// Get All of Todos in IndexedDB and Display 
const getAllKeys = await getAll();
getAllKeys.forEach(key => {
  todoCreateElements(key.body, key.id);
});

/* Get Quantity of all Todos */
const QofAllKeys = await countKeys();
const QTodo = document.querySelector("#TodoQuantity");
QTodo.textContent = `You have ${QofAllKeys} task(s)`;

// Button Functions
const addButton = document.querySelector("#btnAdd");
addButton.addEventListener("click", btnAdd);

const wrapper = document.querySelector("#todoDiv");
wrapper.addEventListener('click', (event) => {
  const isButton = event.target.nodeName === "BUTTON";
  if (isButton) {
    const todoID = parseInt(event.target.value);
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this? This process cannot be undone',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Delete item'
    }).then((result) => {
      if (result.isConfirmed) {
        del(todoID);
        window.location.reload();
      }
    })
  }
})

async function btnAdd() {
  const { value: Todo } = await Swal.fire({
    title: 'Add Todo',
    input: 'text',
    inputLabel: 'Create a new task to be added to your Todo List',
    inputPlaceholder: 'Input new Todo',
    showCancelButton: true,
  })
  if (Todo) {
    add(Todo, Todo);
    window.location.reload();
  }
}