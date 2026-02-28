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
  <div class="project-index">${p.id} / 0${projects.length}</div>

  ${p.image
    ? `<img class="project-img" src="${p.image}" alt="${p.title}" />`
    : `<div class="project-img-placeholder" style="background:${p.color}">${p.medium}</div>`
  }

  <div class="project-tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
  <h3 class="project-title">${p.title.replace(p.italicWord, `<em>${p.italicWord}</em>`)}</h3>
  <p class="project-desc">${p.desc}</p>
  <div class="project-arrow">View project <span>→</span></div>
`;
  // set a custom CSS variable so hover state can use the project's color/gradient
  card.style.setProperty('--hover-bg', p.color);

  card.addEventListener('click', () => {
    window.location.href = `project.html?id=${p.id}`;
  });
  grid.appendChild(card);
});