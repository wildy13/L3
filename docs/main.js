function loadContent(path) {
  const iframe = document.getElementById("doc-frame");
  iframe.src = path;

  document.querySelectorAll("nav a").forEach(link => {
    link.classList.remove("active");
  });

  const activeLink = Array.from(document.querySelectorAll("nav a"))
    .find(link => link.getAttribute("onclick").includes(path));

  if (activeLink) {
    document.getElementById("page-title").textContent = activeLink.textContent;
    activeLink.classList.add("active");
  }
}

window.onload = function () {
  loadContent("intro.html");
};
