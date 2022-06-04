import { get, set, add, del, clear, keys, countKeys, getAll } from "./IDB.js"

/* Create the following Elements: */
/* 
  <div class="flex justify-between items-center border-2 border-gray-200 w-full lg:w-4/5 p-5 rounded-xl">
    <h1 class="font-bold">Daily UI Challenge</h1>
    <button class="font-bold bg-red-500 text-white px-4 py-2 rounded">Delete</button>
  </div> 
*/

const todoCreateElements = (title, id) => {
  let childDiv = document.createElement("div");
  childDiv.setAttribute("class", "flex justify-between items-center border-2 border-gray-200 w-full lg:w-4/5 p-5 rounded-xl")

  let todoTitle = document.createElement("h1");
  todoTitle.setAttribute("class", "font-bold");
  todoTitle.textContent = title;

  let buttonDiv = document.createElement("div");
  buttonDiv.setAttribute("class", "flex justify-around gap-x-2");
  buttonDiv.setAttribute("id", "btnDiv");

  let todoEditbtn = document.createElement("button");
  todoEditbtn.setAttribute("class", "font-bold bg-sky-500 text-white px-4 py-2 rounded");
  todoEditbtn.setAttribute("value", id);
  todoEditbtn.setAttribute("id", "editBtn");
  todoEditbtn.textContent = "Edit";

  let todoDelbtn = document.createElement("button");
  todoDelbtn.setAttribute("class", "font-bold bg-red-500 text-white px-4 py-2 rounded");
  todoDelbtn.setAttribute("value", id);
  todoDelbtn.setAttribute("id", "delBtn");
  todoDelbtn.textContent = "Delete";

  let parentDiv = document.querySelector("#todoDiv");

  childDiv.appendChild(todoTitle);
  buttonDiv.appendChild(todoEditbtn);
  buttonDiv.appendChild(todoDelbtn);
  childDiv.appendChild(buttonDiv);
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
// Wrapper for Todo List
const wrapper = document.querySelector("#todoDiv");
wrapper.addEventListener("click", btnEditDelete);

async function btnAdd() {
  const { value: Todo } = await Swal.fire({
    title: 'Add Todo',
    input: 'text',
    inputLabel: 'Create a new task to be added to your Todo List',
    inputPlaceholder: 'Input new Todo',
    showCancelButton: true,
  })
  if (Todo) {
    console.log(getAllKeys.length)
    add(getAllKeys.length, Todo, Todo);
    Swal.fire({
      icon: 'success',
      text: 'Successfully added a Todo',
      title: 'Successful',
      confirmButtonText: 'Great!',
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      }
    })
  }
}

async function btnEditDelete(event) {
  const todoID = parseInt(event.target.value);
  const btnIdName = event.srcElement.id;
  console.log("TodoID:" + todoID + " ID name:" + btnIdName)
  if (btnIdName === "editBtn") {
    const { value: EditTodo } = await Swal.fire({
      title: 'Edit Todo',
      input: 'text',
      inputLabel: 'Edit the information of selected Todo',
      inputPlaceholder: 'Edit Todo',
      showCancelButton: true,
      confirmButtonText: 'Edit'
    })
    if (EditTodo) {
      set(todoID, EditTodo, EditTodo);
      Swal.fire({
        icon: 'success',
        text: 'Successfully edited the informations',
        title: 'Successful',
        confirmButtonText: 'Great!',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      })
    }
  }
  if (btnIdName === "delBtn") {
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
}