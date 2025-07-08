function loadContent(path) {
  const iframe = document.getElementById("doc-frame");
  iframe.src = path;

  const activeLink = Array.from(document.querySelectorAll("nav a"))
    .find(link => link.getAttribute("onclick").includes(path));
  if (activeLink) {
    document.getElementById("page-title").textContent = activeLink.textContent;
  }
}
