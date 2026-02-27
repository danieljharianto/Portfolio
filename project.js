// project.js

// 1. Read ?id= from the URL
const params = new URLSearchParams(window.location.search);
const id     = params.get('id');

// 2. Find the matching project
const index = projects.findIndex(p => p.id === id);
const p     = projects[index];

// 3. If no match, go back to home
if (!p) {
  window.location.href = 'index.html';
}

// 4. Update browser tab title
document.title = `${p.title} — Daniel J Harianto`;

// 5. Hero
// document.getElementById('projectNumber').textContent =
//   `${p.id} / 0${projects.length}`;

document.getElementById('projectTitle').innerHTML =
  p.title.replace(p.italicWord, `<em>${p.italicWord}</em>`);

document.getElementById('projectTags').innerHTML =
  p.tags.map(t => `<span class="tag">${t}</span>`).join('');

// 6. Cover — real image or gradient placeholder
const cover = document.getElementById('projectCover');

if (p.video) {
  cover.innerHTML = `
    <div class="project-cover-video">
      <iframe
        src="${p.video}"
        title="${p.title}"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
      </iframe>
    </div>
  `;
} else if (p.image) {
  cover.innerHTML = `<img src="${p.image}" alt="${p.title}" />`;
} else {
  cover.innerHTML = `
    <div class="project-cover-placeholder" style="background:${p.color}">
      ${p.medium}
    </div>`;
}

// 7. Info bar
document.getElementById('projectInfoBar').innerHTML = `
  <div class="project-info-item">
    <span class="detail-label">Year</span>
    <span class="detail-value">${p.year}</span>
  </div>
  <div class="project-info-item">
    <span class="detail-label">Medium</span>
    <span class="detail-value">${p.medium}</span>
  </div>
  <div class="project-info-item">
    <span class="detail-label">Location</span>
    <span class="detail-value">${p.location}</span>
  </div>
  <div class="project-info-item">
    <span class="detail-label">Status</span>
    <span class="detail-value">${p.status}</span>
  </div>
`;

// 8. Overview
document.getElementById('projectOverview').innerHTML = `<p>${p.long}</p>`;

// 9. Image grid — extra images or placeholders
const grid = document.getElementById('projectImageGrid');
const imgs = p.images ? p.images : [];

if (imgs.length > 0) {
  const allSrcs = imgs.map(i => typeof i === 'string' ? i : i.src);

  grid.innerHTML = imgs.map((img, i) => {
    const src     = typeof img === 'string' ? img : img.src;
    const title   = typeof img === 'object' ? (img.title   || '') : '';
    const text    = typeof img === 'object' ? (img.text    || '') : '';
    const reverse = typeof img === 'object' ? (img.reverse || false) : false; 

    const photoCol = `                                                          
      <div class="image-block-photos">
        <div class="grid-img-wrap" data-index="${i}">
          <div class="grid-img-inner">
            <img src="${src}" alt="${title || p.title}" />
            
          </div>
        </div>
      </div>
    `;                                                                          

    const descCol = `                                                           
      <div class="image-block-desc">
        ${title ? `<h4 class="image-block-title">${title}</h4>` : ''}
        ${text  ? `<p  class="image-block-text">${text}</p>`   : ''}
      </div>
    `;                                                                          

    return `
      <div class="image-block ${reverse ? 'image-block--reverse' : ''}">  
        ${reverse ? descCol + photoCol : photoCol + descCol}               
      </div>
    `;
  }).join('');

  // lightbox
  // document.querySelectorAll('.grid-img-wrap').forEach((wrap) => {
  //   wrap.addEventListener('click', () => {
  //     openLightbox(allSrcs, parseInt(wrap.dataset.index));
  //   });
  // });

} else {
  grid.innerHTML = '';
}


// 10. Prev / Next navigation
const prev = projects[index - 1];
const next = projects[index + 1];

document.getElementById('projectNav').innerHTML = `
  <a href="index.html" class="project-nav-back">← All Projects</a>

  <div class="project-nav-arrows">
    ${next ? `
      <a href="project.html?id=${next.id}" class="project-nav-next">
        Next Project →<br />
        <span>${next.title}</span>
      </a>` : ''}
  </div>
`;
