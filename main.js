// main.js

// mobile navigation toggle (header button)
const menuToggle = document.getElementById('menu-toggle');
const navElem = document.querySelector('nav');
if (menuToggle && navElem) {
  menuToggle.addEventListener('click', () => {
    navElem.classList.toggle('open');
  });
}

const grid = document.getElementById('projectGrid');

projects.forEach((p) => {
  const card = document.createElement('div');
  card.className = 'project-card';
  card.innerHTML = `
  <div class="project-card-left">
    <h3 class="project-card-title">${p.title.replace(p.italicWord, `<em>${p.italicWord}</em>`)}</h3>
    <p class="project-card-desc">${p.desc}</p>
  </div>
  <div class="project-card-right">
    ${p.image
      ? `<img class="project-img" src="${p.image}" alt="${p.title}" />`
      : `<div class="project-img-placeholder" style="background:${p.color}">${p.medium}</div>`
    }
  </div>
`;
  card.addEventListener('click', () => {
    window.location.href = `project.html?id=${p.id}`;
  });
  grid.appendChild(card);
});