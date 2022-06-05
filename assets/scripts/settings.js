import { clear } from "./IDB.js"

if (document.querySelector("#toggleDarkMode")) {
  document.querySelector("#toggleDarkMode").addEventListener("click", toggleDarkMode);
}

function toggleDarkMode() {
  if (document.documentElement.classList.contains('dark')) {
    document.documentElement.classList.remove('dark');
    window.localStorage.setItem('theme', '');
    document.querySelector("#lightIcon").classList.remove("hidden");
    document.querySelector("#darkIcon").classList.add("hidden");
  }
  else {
    document.documentElement.classList.add('dark');
    window.localStorage.setItem('theme', 'dark');
    document.querySelector("#lightIcon").classList.add("hidden");
    document.querySelector("#darkIcon").classList.remove("hidden");
  }
}

if (window.localStorage.getItem('theme', 'dark')) {
  document.documentElement.classList.add('dark');
  document.querySelector("#lightIcon").classList.add("hidden");
  document.querySelector("#darkIcon").classList.remove("hidden");
}
else {
  document.documentElement.classList.remove('dark');
  document.querySelector("#lightIcon").classList.remove("hidden");
  document.querySelector("#darkIcon").classList.add("hidden");
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