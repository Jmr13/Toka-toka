if (document.querySelector("#toggleDarkMode")) {
  document.querySelector("#toggleDarkMode").addEventListener("click", toggleDarkMode);
}

function toggleDarkMode() {
  if (document.documentElement.classList.contains('dark')) {
    document.documentElement.classList.remove('dark');
    window.localStorage.setItem('theme', '');
  }
  else {
    document.documentElement.classList.add('dark');
    window.localStorage.setItem('theme', 'dark');
  }
}

if (window.localStorage.getItem('theme', 'dark')) {
  document.documentElement.classList.add('dark');
}
else {
  document.documentElement.classList.remove('dark');
}