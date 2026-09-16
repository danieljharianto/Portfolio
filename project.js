(() => {
// project.js

// 1. Read ?id= from the URL
const params = new URLSearchParams(window.location.search);
const id     = params.get('id');

// 2. Find the matching project
const index = projects.findIndex(p => p.id === id);
const p     = projects[index];

// 3. If no match, go back to home
if (!p) {
  window.location.replace('index.html');
  return;
}

// 4. Update browser tab title
document.title = `${p.title} — Daniel J Harianto`;

// 5. Hero
// document.getElementById('projectNumber').textContent =
//   `${p.id} / 0${projects.length}`;

document.getElementById('projectTitle').textContent = p.title;
document.getElementById('projectYear').textContent = p.year || '';
document.getElementById('projectLocation').textContent = p.location || '';
document.getElementById('projectMetadata').innerHTML = [['Medium', p.medium], ['Status', p.status]]
  .filter(([, value]) => value).map(([label, value]) => '<dt>' + label + '</dt><dd>' + value + '</dd>').join('');

// 6. Cover — real image or gradient placeholder
const cover = document.getElementById('projectCover');

if (p.video) {
  cover.innerHTML = `<div class="project-cover-video"><iframe src="${p.video}" title="${p.title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
} else if (p.image) {
  const image = document.createElement('img');
  image.src = p.image;
  image.alt = p.title;
  image.fetchPriority = 'high';
  image.decoding = 'async';
  cover.append(image);
} else {
  cover.innerHTML = '<div class="project-cover-placeholder">' + (p.medium || p.title) + '</div>';
}


// 7. Info bar + Overview
document.getElementById('projectIntroSection').innerHTML = `
  <div class="project-intro-overview">
    ${p.highlight ? `<p class="project-overview-highlight">${p.highlight}</p>` : ''}
    <p>${p.long || p.desc || ''}</p>
  </div>
`;

// 8b. Prototype link + tags
const protoWrap = document.getElementById('projectPrototype');
const tagsHTML = (p.tags || []).filter(Boolean).map(t => `<span class="tag">${t}</span>`).join('');
if (protoWrap) {
  if (p.prototype) {
    protoWrap.innerHTML = `
      <div class="prototype-band">
        <a href="${p.prototype.url}" class="prototype-link" target="_blank" rel="noopener">
          ${p.prototype.label || 'Launch Prototype'}
        </a>
        <div><strong>Category</strong><div class="prototype-tags">${tagsHTML}</div></div>
      </div>
    `;
  } else {
    protoWrap.innerHTML = `<div class="prototype-band"><div></div><div><strong>Category</strong><div class="prototype-tags">${tagsHTML}</div></div></div>`;
  }
}

// 9. Image grid — extra images or placeholders
const grid = document.getElementById('projectImageGrid');
const imgs = p.images ? p.images : [];

if (imgs.length > 0) {

  grid.innerHTML = imgs.map((img, i) => {
    const layout = typeof img === 'object' ? (img.layout || 'single') : 'single';

    // ── FEATURE: 2/3 image(s) + 1/3 text side by side ──
    if (layout === 'feature') {
      const title   = img.title || '';
      const textRaw = img.text || '';
      const reverse = img.reverse || false;
      const text    = Array.isArray(textRaw)
        ? textRaw.map(para => `<p class="image-block-text">${para}</p>`).join('')
        : textRaw ? `<p class="image-block-text">${textRaw}</p>` : '';

      // multi-image: srcs[0] besar, srcs[1]+srcs[2] kecil di bawah
      const srcs = img.srcs || [];
      const photoCol = srcs.length > 0 ? `
        <div class="image-block-photos feature-photos">
          <div class="grid-img-inner">
            <img src="${srcs[0]}" alt="${title || p.title}" />
          </div>
          ${srcs.length > 1 ? `
            <div class="feature-photos-small">
              ${srcs.slice(1).map(s => `
                <div class="grid-img-inner">
                  <img src="${s}" alt="${title || p.title}" />
                </div>
              `).join('')}
            </div>
          ` : ''}
        </div>
      ` : `
        <div class="image-block-photos">
          <div class="grid-img-wrap" data-src="${img.src || ''}">
            <div class="grid-img-inner">
              <img src="${img.src || ''}" alt="${title || p.title}" />
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
        <div class="image-block image-block--feature ${reverse ? 'image-block--reverse' : ''}">
          ${reverse ? descCol + photoCol : photoCol + descCol}
        </div>
      `;
    }

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
      const images  = img.images || img.srcs || [];
      const title   = img.title || '';
      const textRaw = img.text || '';
      const text    = Array.isArray(textRaw)
        ? textRaw.map(para => `<p class="image-block-text">${para}</p>`).join('')
        : textRaw ? `<p class="image-block-text">${textRaw}</p>` : '';

      return `
        <div class="image-block image-block--duo">
          <div class="image-block-duo-photos">
            ${images.map((imgData, j) => {
              const src = typeof imgData === 'string' ? imgData : imgData.src;
              const imgTitle = typeof imgData === 'object' ? (imgData.title || '') : '';
              const imgTextRaw = typeof imgData === 'object' ? (imgData.text || '') : '';
              const imgText = Array.isArray(imgTextRaw)
                ? imgTextRaw.map(para => `<p class="image-block-text">${para}</p>`).join('')
                : imgTextRaw ? `<p class="image-block-text">${imgTextRaw}</p>` : '';

              return `
                <div class="duo-item">
                  <div class="grid-img-wrap" data-src="${src}">
                    <div class="grid-img-inner">
                      <img src="${src}" alt="${imgTitle || title} ${j + 1}" />
                    </div>
                  </div>
                  ${imgTitle || imgText ? `
                    <div class="duo-item-desc">
                      ${imgTitle ? `<h4 class="image-block-title-duo">${imgTitle}</h4>` : ''}
                      ${imgText}
                    </div>` : ''}
                </div>
              `;
            }).join('')}
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

  

} else {
  grid.innerHTML = '';
}

document.querySelectorAll('#projectImageGrid img').forEach(img => {
  img.loading = 'lazy';
  img.decoding = 'async';
});

})();
