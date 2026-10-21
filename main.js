// Categories reflect the subject of each existing project; a project can span disciplines.
const projectCategories = {
  '22': ['architecture', 'computation'],
  '19': ['urbanism', 'computation'],
  '02': ['computation'],
  '03': ['computation'],
  '04': ['computation'],
  '05': ['urbanism', 'writing'],
  '06': ['urbanism', 'writing'],
  '07': ['urbanism', 'architecture', 'computation'],
  '08': ['urbanism', 'computation'],
  '09': ['architecture', 'computation'],
  '10': ['architecture', 'computation'],
  '11': ['urbanism', 'computation'],
  '12': ['urbanism', 'computation'],
  '13': ['urbanism', 'architecture', 'computation'],
  '14': ['urbanism', 'computation'],
  '20': ['architecture'],
  '15': ['urbanism', 'architecture', 'computation'],
  '21': ['urbanism'],
  '16': ['urbanism', 'computation'],
  '17': ['urbanism', 'computation'],
  '18': ['urbanism', 'computation'],
};
const grid = document.getElementById('projectGrid');
const count = document.getElementById('project-count');
const filters = document.querySelectorAll('[data-filter]');
function element(tag, className, text) {
  const node = document.createElement(tag);
  node.className = className;
  if (text) node.textContent = text;
  return node;
}
const cards = projects.map((project, index) => {
  const card = element('a', 'project-card');
  card.href = `project.html?id=${encodeURIComponent(project.id)}`;
  // Image fills the tile; year, title and one-line caption appear only on hover/focus (always shown on touch screens).
  const media = element('div', 'project-image-wrap');
  const src = project.thumb || project.image;
  if (src) {
    const img = element('img', 'project-img');
    img.src = src;
    img.alt = ''; // The caption names this link.
    img.loading = index < 3 ? 'eager' : 'lazy';
    img.decoding = 'async';
    img.addEventListener('error', () => img.replaceWith(element('div', 'project-placeholder', project.medium)), { once: true });
    media.append(img);
  } else media.append(element('div', 'project-placeholder', project.medium));
  const caption = element('div', 'project-caption');
  caption.append(element('p', 'project-year', project.year), element('h2', 'project-title', project.title));
  const line = project.caption || project.medium;
  if (line) caption.append(element('p', 'project-medium', line));
  card.append(media, caption);
  grid.append(card);
  return { card, categories: projectCategories[project.id] || [] };
});
function filterProjects(category) {
  let visible = 0;
  cards.forEach(({ card, categories }) => {
    card.hidden = category !== 'all' && !categories.includes(category);
    if (!card.hidden) visible++;
  });
  filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === category)));
  count.textContent = `${String(visible).padStart(2, '0')} ${visible === 1 ? 'project' : 'projects'}`;
}
filters.forEach(button => button.addEventListener('click', () => filterProjects(button.dataset.filter)));
filterProjects('all');


// Featured projects rotate automatically every five seconds.
const heroContainer = document.getElementById('heroSlides');
if (heroContainer) {
  const featured = ['07', '05', '08', '13', '02'].map(id => projects.find(project => project.id === id)).filter(project => project?.image);
  let activeSlide = 0;
  const dots = document.getElementById('heroDots');
  const slides = featured.map((project, index) => {
    const link = element('a', 'hero-slide');
    link.href = `project.html?id=${encodeURIComponent(project.id)}`;
    link.setAttribute('aria-label', `View ${project.title}`);
    const img = element('img', '');
    img.src = project.image;
    img.alt = project.title;
    img.decoding = 'async';
    img.loading = index === 0 ? 'eager' : 'lazy';
    link.append(img);
    heroContainer.append(link);
    if (dots) {
      const dot = element('button', 'hero-dot');
      dot.type = 'button';
      dot.setAttribute('aria-label', `Show ${project.title}`);
      dot.addEventListener('click', () => showSlide(index));
      dots.append(dot);
    }
    return link;
  });
  function showSlide(index) {
    activeSlide = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => { slide.hidden = i !== activeSlide; });
    if (dots) dots.querySelectorAll('.hero-dot').forEach((dot, i) => dot.setAttribute('aria-current', String(i === activeSlide)));
  }
  if (slides.length) {
    showSlide(0);
    window.setInterval(() => showSlide(activeSlide + 1), 5000);
  }
}
