import { set, add, del, countKeys, getAll } from "./IDB.js"

/* Create the following Elements: */
/* 
  <div class="flex justify-between items-center border-2 border-gray-200 w-full lg:w-4/5 p-5 rounded-xl">
    <h1 class="font-bold">Daily UI Challenge</h1>
    <button class="font-bold bg-red-500 text-white px-4 py-2 rounded">Delete</button>
  </div> 
*/

const todoCreateElements = (id, category, title, date) => {
  let childDiv = document.createElement("div");
  childDiv.setAttribute("class", `flex flex-wrap justify-between items-center border-2 border-gray-200 w-full lg:w-4/5 p-5 rounded-xl`)

  let todoTitle = document.createElement("h1");
  todoTitle.setAttribute("class", "w-1/2 break-words font-bold dark:text-white");
  todoTitle.textContent = title;

  let upperDiv = document.createElement("div");
  upperDiv.setAttribute("class", "flex justify-between w-full mb-2 font-semibold");

  let todoCategory = document.createElement("h6");
  todoCategory.setAttribute("class", "text-xs dark:text-gray-200");
  todoCategory.textContent = category;

  let todoDate = document.createElement("h6");
  todoDate.setAttribute("class", "text-xs dark:text-gray-200");
  todoDate.textContent = date;

  let buttonDiv = document.createElement("div");
  buttonDiv.setAttribute("class", "flex justify-end gap-x-2");
  buttonDiv.setAttribute("id", "btnDiv");

  const editiconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const editiconPath = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'path'
  );
  editiconSvg.setAttribute('viewBox', '0 0 24 24');
  editiconSvg.setAttribute('width', '24');
  editiconSvg.setAttribute('height', '24');

  editiconPath.setAttribute(
    'd',
    'M16.757 3l-2 2H5v14h14V9.243l2-2V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12.757zm3.728-.9L21.9 3.516l-9.192 9.192-1.412.003-.002-1.417L20.485 2.1z'
  );

  let todoEditbtn = document.createElement("button");
  todoEditbtn.setAttribute("class", "font-bold bg-[#218380ff] text-white p-2 rounded fill-white");
  todoEditbtn.setAttribute("id", "editBtn");
  todoEditbtn.setAttribute("data-id", id);
  todoEditbtn.setAttribute("data-title", title);
  todoEditbtn.setAttribute("data-category", category);
  todoEditbtn.setAttribute("data-date", date);

  const deleteiconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const deleteiconPath = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'path'
  );
  deleteiconSvg.setAttribute('viewBox', '0 0 24 24');
  deleteiconSvg.setAttribute('width', '24');
  deleteiconSvg.setAttribute('height', '24');

  deleteiconPath.setAttribute(
    'd',
    'M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zM9 4v2h6V4H9z'
  );

  let todoDelbtn = document.createElement("button");
  todoDelbtn.setAttribute("class", "font-bold bg-[#d81159ff] text-white p-2 rounded fill-white");
  todoDelbtn.setAttribute("id", "delBtn");
  todoDelbtn.setAttribute("data-id", id);

  let parentDiv = document.querySelector("#todoDiv");

  upperDiv.appendChild(todoCategory);
  upperDiv.appendChild(todoDate);
  childDiv.appendChild(upperDiv);
  childDiv.appendChild(todoTitle);
  editiconSvg.appendChild(editiconPath);
  deleteiconSvg.appendChild(deleteiconPath);
  todoEditbtn.appendChild(editiconSvg);
  todoDelbtn.appendChild(deleteiconSvg);
  buttonDiv.appendChild(todoEditbtn);
  buttonDiv.appendChild(todoDelbtn);
  childDiv.appendChild(buttonDiv);
  parentDiv.appendChild(childDiv);
}

// Get All of Todos in IndexedDB and Display 
const getAllKeys = await getAll();
getAllKeys.forEach(key => {
  todoCreateElements(key.id, key.category, key.title, key.date);
});

/* Get Quantity of all Todos */
const QofAllKeys = await countKeys();
const QTodo = document.querySelector("#TodoQuantity");
if (QofAllKeys == 0) {
  QTodo.textContent = `You have no tasks`;
  document.querySelector("#completeSVG").classList.remove("hidden");
}
else {
  QTodo.textContent = `You have ${QofAllKeys} task(s)`;
}

// Button Functions
const addButtonPersonal = document.querySelector("#btnPersonal");
const addButtonHealth = document.querySelector("#btnHealth");
const addButtonWork = document.querySelector("#btnWork");
const addButtonShopping = document.querySelector("#btnShopping");

addButtonPersonal.addEventListener("click", btnAdd);
addButtonHealth.addEventListener("click", btnAdd);
addButtonWork.addEventListener("click", btnAdd);
addButtonShopping.addEventListener("click", btnAdd);

// Wrapper for Todo List
const wrapper = document.querySelector("#todoDiv");
wrapper.addEventListener("click", btnEditDelete);

async function btnAdd(event) {
  const btnCategory = event.srcElement.value;
  const { value: Todo } = await Swal.fire({
    title: `Add ${btnCategory} To-do`,
    input: 'text',
    inputLabel: 'Create a new task to be added to your To-do List',
    inputPlaceholder: 'Input new Todo',
    showCancelButton: true,
    confirmButtonText: 'Add',
    color: '#FFFFFF',
    background: '#fbb13cff',
    confirmButtonColor: '#218380ff',
  })
  if (Todo) {
    add(getAllKeys.length, btnCategory, Todo);
    Swal.fire({
      icon: 'success',
      text: 'Successfully added a Todo',
      title: 'Successful',
      confirmButtonText: 'Great!',
      color: '#FFFFFF',
      background: '#fbb13cff',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      }
    })
  }
}

async function btnEditDelete(event) {
  const todoID = parseInt(event.target.getAttribute("data-id"))
  const todoTitle = event.target.getAttribute("data-title")
  const todoCategory = event.target.getAttribute("data-category")
  const todoDate = event.target.getAttribute("data-date")
  const btnIdName = event.srcElement.id;
  if (btnIdName === "editBtn") {
    const { value: EditTodo } = await Swal.fire({
      title: 'Edit Todo',
      input: 'text',
      inputValue: todoTitle,
      inputLabel: 'Edit the information of selected To-do',
      inputPlaceholder: 'Edit Todo',
      showCancelButton: true,
      confirmButtonText: 'Edit',
      color: '#FFFFFF',
      background: '#fbb13cff',
      confirmButtonColor: '#218380ff',
    })
    if (EditTodo) {
      set(todoID, todoCategory, EditTodo, todoDate)
      Swal.fire({
        icon: 'success',
        text: 'Successfully edited the informations',
        title: 'Successful',
        confirmButtonText: 'Great!',
        color: '#FFFFFF',
        background: '#fbb13cff',
        confirmButtonColor: '#218380ff',
        allowOutsideClick: false
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
      confirmButtonText: 'Delete item',
      color: '#FFFFFF',
      background: '#fbb13cff',
      confirmButtonColor: '#d81159ff',
    }).then((result) => {
      if (result.isConfirmed) {
        del(todoID);
        window.location.reload();
      }
    })
  }
}

if (window.localStorage.getItem('theme', 'dark')) {
  document.documentElement.classList.add('dark');
}
else {
  document.documentElement.classList.remove('dark');
}