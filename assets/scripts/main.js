import { get, set, add, del, clear, keys, countKeys, getAll } from "./IDB.js"

/* Create the following Elements: */
{/* 
  <div class="flex justify-between items-center border-2 border-gray-200 w-full lg:w-4/5 p-5 rounded-xl">
    <h1 class="font-bold">Daily UI Challenge</h1>
    <button class="fill-red-500">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
        <path
          d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-11.414L9.172 7.757 7.757 9.172 10.586 12l-2.829 2.828 1.415 1.415L12 13.414l2.828 2.829 1.415-1.415L13.414 12l2.829-2.828-1.415-1.415L12 10.586z" />
      </svg>
    </button>
  </div> 
*/}

const todoCreateElements = (title, id) => {
  console.log(title);
  console.log(id);
  let childDiv = document.createElement("div");
  childDiv.setAttribute("class", "flex justify-between items-center border-2 border-gray-200 w-full lg:w-4/5 p-5 rounded-xl")

  const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const iconPath = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'path'
  );

  iconSvg.setAttribute('viewBox', '0 0 24 24');
  iconSvg.setAttribute('width', '32');
  iconSvg.setAttribute('height', '32');

  iconPath.setAttribute(
    'd',
    'M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-11.414L9.172 7.757 7.757 9.172 10.586 12l-2.829 2.828 1.415 1.415L12 13.414l2.828 2.829 1.415-1.415L13.414 12l2.829-2.828-1.415-1.415L12 10.586z'
  );

  let todoTitle = document.createElement("h1");
  todoTitle.setAttribute("class", "font-bold");
  todoTitle.textContent = title;

  let todoDelbtn = document.createElement("button");
  todoDelbtn.setAttribute("class", "fill-red-500");
  todoDelbtn.setAttribute("id", "btnDel");
  todoDelbtn.setAttribute("data-todo-id", id);

  let parentDiv = document.querySelector("#todoDiv");

  iconSvg.appendChild(iconPath);
  todoDelbtn.appendChild(iconSvg);

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
QTodo.textContent = `You have ${QofAllKeys} tasks`;

// Button Functions

const addButton = document.querySelector("#btnAdd");
addButton.addEventListener("click", btnAdd);

var delButton;
if (document.querySelector("#btnDel")) {
  delButton = document.querySelector("#btnDel");
  delButton.addEventListener("click", btnDel);
}

async function btnAdd() {
  const { value: Todo } = await Swal.fire({
    title: 'Add Todo',
    input: 'text',
    inputLabel: 'Todo Activity',
    inputPlaceholder: 'Input new Todo',
    showCancelButton: true,
  })
  if (Todo) {
    add(Todo, Todo);
    window.location.reload();
  }
}

async function btnDel() {
  const todoID = parseInt(delButton.getAttribute('data-todo-id'));
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      del(todoID);
      window.location.reload();
    }
  })
}