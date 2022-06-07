import { clear } from "./IDB.js"

if (document.querySelector("#toggleDarkMode")) {
  document.querySelector("#toggleDarkMode").addEventListener("click", toggleDarkMode);
}

function toggleDarkMode() {
  if (document.documentElement.classList.contains('dark')) {
    document.documentElement.classList.remove('dark');
    window.localStorage.setItem('theme', '');
    lightIcon.classList.remove("hidden");
    darkIcon.classList.add("hidden");
  }
  else {
    document.documentElement.classList.add('dark');
    window.localStorage.setItem('theme', 'dark');
    darkIcon.classList.remove("hidden");
    lightIcon.classList.add("hidden");
  }
}

const lightIcon = document.querySelector("#lightIcon");
const darkIcon = document.querySelector("#darkIcon");

if (window.localStorage.getItem('theme', 'dark')) {
  document.documentElement.classList.add('dark');
  lightIcon.classList.add("hidden");
  darkIcon.classList.remove("hidden");
}
else {
  document.documentElement.classList.remove('dark');
  lightIcon.classList.remove("hidden");
  darkIcon.classList.add("hidden");
}

// Reset Button
document.querySelector("#btnReset").addEventListener("click", Reset);

function Reset() {
  Swal.fire({
    title: 'Are you sure?',
    text: 'Do you really want to delete all of the information? This process cannot be undone',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    confirmButtonText: 'Delete All item'
  }).then((result) => {
    if (result.isConfirmed) {
      clear();
      window.location.reload();
    }
  })
}