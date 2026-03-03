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

// 8b. Prototype link
const protoWrap = document.getElementById('projectPrototype');
if (protoWrap) {
  if (p.prototype) {
    protoWrap.innerHTML = `
      <div class="prototype-band">
        <a href="${p.prototype.url}" class="prototype-link" target="_blank" rel="noopener">
          ${p.prototype.label || 'Launch Prototype'} →
        </a>
      </div>
    `;
  } else {
    protoWrap.innerHTML = '';
  }
}

        // <div class="prototype-band-text">
        //   <span class="prototype-label">Prototype</span>
        //   <p class="prototype-desc">Try out the live version of this project.</p>
        // </div>

// 9. Image grid — extra images or placeholders
const grid = document.getElementById('projectImageGrid');
const imgs = p.images ? p.images : [];

if (imgs.length > 0) {

  grid.innerHTML = imgs.map((img, i) => {
    const layout = typeof img === 'object' ? (img.layout || 'single') : 'single';
    
    // ── FULL: one image full width + description below ──
    if (layout === 'full') {
      const src     = img.src || '';
      const title   = img.title || '';
      const textRaw = img.text || '';
      const text    = Array.isArray(textRaw)
        ? textRaw.map(para => `<p class="image-block-text">${para}</p>`).join('')
        : textRaw ? `<p class="image-block-text">${textRaw}</p>` : '';

      return `
        <div class="image-block image-block--full">
          <div class="grid-img-wrap" data-src="${src}">
            <div class="grid-img-inner">
              <img src="${src}" alt="${title || p.title}" />
              
            </div>
          </div>
          ${title || text ? `
            <div class="image-block-full-desc">
              ${title ? `<h4 class="image-block-title">${title}</h4>` : ''}
              ${text}
            </div>` : ''}
        </div>
      `;
    }

    // ── DUO: 2 images side by side ──
    if (layout === 'duo') {
      const srcs    = img.srcs || [];
      const title   = img.title || '';
      const textRaw = img.text || '';
      const text    = Array.isArray(textRaw)
        ? textRaw.map(para => `<p class="image-block-text">${para}</p>`).join('')
        : textRaw ? `<p class="image-block-text">${textRaw}</p>` : '';

      return `
        <div class="image-block image-block--duo">
          <div class="image-block-duo-photos">
            ${srcs.map((src, j) => `
              <div class="grid-img-wrap" data-src="${src}">
                <div class="grid-img-inner">
                  <img src="${src}" alt="${title} ${j + 1}" />

                </div>
              </div>
            `).join('')}
          </div>
          ${title || text ? `
            <div class="image-block-duo-desc">
              ${title ? `<h4 class="image-block-title">${title}</h4>` : ''}
              ${text}
            </div>` : ''}
        </div>
      `;
    }

    // ── SINGLE: image + description side by side ──
    const src     = typeof img === 'string' ? img : img.src;
    const title   = typeof img === 'object' ? (img.title   || '') : '';
    const textRaw = typeof img === 'object' ? (img.text    || '') : '';
    const reverse = typeof img === 'object' ? (img.reverse || false) : false;
    const text    = Array.isArray(textRaw)
      ? textRaw.map(para => `<p class="image-block-text">${para}</p>`).join('')
      : textRaw ? `<p class="image-block-text">${textRaw}</p>` : '';

    const photoCol = `
      <div class="image-block-photos">
        <div class="grid-img-wrap" data-src="${src}">
          <div class="grid-img-inner">
            <img src="${src}" alt="${title || p.title}" />

          </div>
        </div>
      </div>
    `;

    const descCol = `
      <div class="image-block-desc">
        ${title ? `<h4 class="image-block-title">${title}</h4>` : ''}
        ${text}
      </div>
    `;

    return `
      <div class="image-block ${reverse ? 'image-block--reverse' : ''}">
        ${reverse ? descCol + photoCol : photoCol + descCol}
      </div>
    `;

  }).join('');

  // ── Lightbox — collect all srcs across all layouts ──
  // const allSrcs = [];
  // imgs.forEach(img => {
  //   if (typeof img === 'object' && img.layout === 'duo') {
  //     (img.srcs || []).forEach(s => allSrcs.push(s));
  //   } else {
  //     const s = typeof img === 'string' ? img : img.src;
  //     if (s) allSrcs.push(s);
  //   }
  // });

  // document.querySelectorAll('.grid-img-wrap').forEach((wrap) => {
  //   wrap.addEventListener('click', () => {
  //     const src   = wrap.dataset.src;
  //     const idx   = allSrcs.indexOf(src);
  //     openLightbox(allSrcs, idx >= 0 ? idx : 0);
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

// 11. Disable save 
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('contextmenu', e => e.preventDefault());
});
