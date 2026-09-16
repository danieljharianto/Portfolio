// Categories reflect the subject of each existing project; a project can span disciplines.
const projectCategories = {
  '02': ['computation'],
  '03': ['computation'],
  '04': ['computation'],
  '05': ['urbanism', 'writing'],
  '06': ['urbanism', 'architecture', 'computation'],
  '07': ['urbanism', 'computation'],
  '08': ['architecture', 'computation'],
  '09': ['architecture', 'computation'],
  '10': ['urbanism', 'computation'],
  '11': ['urbanism', 'computation'],
  '12': ['urbanism', 'architecture', 'computation'],
  '13': ['urbanism', 'computation'],
  '14': ['urbanism', 'architecture', 'computation'],
  '15': ['urbanism', 'computation'],
  '16': ['urbanism', 'computation'],
  '17': ['urbanism', 'computation'],
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
  const heading = element('div', 'project-heading');
  heading.append(element('h2', 'project-title', project.title), element('p', 'project-year', project.year));
  const summary = element('div', 'project-summary');
  if (project.location) summary.append(element('p', 'project-location', project.location));
  summary.append(element('p', 'project-description', project.desc));
  const media = element('div', 'project-image-wrap');
  if (project.image) {
    const img = element('img', 'project-img');
    img.src = project.image;
    img.alt = ''; // The adjacent project title names this link.
    img.loading = index < 2 ? 'eager' : 'lazy';
    img.decoding = 'async';
    img.addEventListener('error', () => img.replaceWith(element('div', 'project-placeholder', project.medium)), { once: true });
    media.append(img);
  } else media.append(element('div', 'project-placeholder', project.medium));
  card.append(heading, summary, media);
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
  const featured = ['06', '05', '07', '12', '02'].map(id => projects.find(project => project.id === id)).filter(project => project?.image);
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
