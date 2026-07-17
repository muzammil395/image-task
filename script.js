const items = [
  { seed: "forest-1",   kw: "forest,trees",      title: "Quiet Canopy",      cat: "nature" },
  { seed: "mountain-2", kw: "mountain,sunrise",  title: "First Light Ridge", cat: "nature" },
  { seed: "river-3",    kw: "river,water",       title: "Slow Water",        cat: "nature" },
  { seed: "fox-4",      kw: "fox,wildlife",      title: "The Watcher",       cat: "animals" },
  { seed: "eagle-5",    kw: "eagle,bird",        title: "Wingspan",          cat: "animals" },
  { seed: "horse-6",    kw: "horse,field",       title: "Field Runner",      cat: "animals" },
  { seed: "car-7",      kw: "classiccar,chrome", title: "Chrome & Dust",     cat: "cars" },
  { seed: "car-8",      kw: "car,night",         title: "Night Drive",       cat: "cars" },
  { seed: "car-9",      kw: "car,road",          title: "Open Road",         cat: "cars" },
  { seed: "building-10",kw: "skyscraper,glass",  title: "Glass Vertical",    cat: "architecture" },
  { seed: "building-11",kw: "building,concrete", title: "Concrete Poetry",   cat: "architecture" },
  { seed: "bridge-12",  kw: "bridge,structure",  title: "Span",              cat: "architecture" },
  { seed: "city-13",    kw: "city,street",       title: "Foreign Streets",   cat: "travel" },
  { seed: "beach-14",   kw: "beach,coast",       title: "Coastline Drift",   cat: "travel" },
  { seed: "market-15",  kw: "market,oldtown",    title: "Old Town Market",   cat: "travel" },
];
 
const gallery = document.getElementById('gallery');
const filterCount = document.getElementById('filterCount');
 
// LoremFlickr serves real, keyword-matched photos (no API key needed).
// lock=<seed> keeps the same photo consistent across the grid and lightbox
// instead of re-rolling a random one on every request.
function imgUrl(item, w, h){
  return `https://loremflickr.com/${w}/${h}/${item.kw}?lock=${item.seed.replace(/\D/g,'')}`;
}
 
items.forEach((item, i) => {
  const card = document.createElement('div');
  card.className = 'card';
  card.dataset.cat = item.cat;
  card.dataset.index = i;
  card.style.animationDelay = (i * 0.05) + 's';
  card.innerHTML = `
    <img src="${imgUrl(item, 600, 750)}" alt="${item.title}" loading="lazy">
    <div class="zoom-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
    </div>
    <div class="plaque">
      <div>
        <span class="fig">Fig. ${String(i+1).padStart(2,'0')}</span>
        <span class="title">${item.title}</span>
      </div>
      <span class="cat">${item.cat}</span>
    </div>
  `;
  card.addEventListener('click', () => openLightbox(i));
  gallery.appendChild(card);
});
 
// ===== Filters =====
const filterBtns = document.querySelectorAll('.filter-btn');
let currentFilter = 'all';
 
function applyFilter(cat){
  currentFilter = cat;
  const cards = document.querySelectorAll('.card');
  let visible = 0;
  cards.forEach(card => {
    const match = cat === 'all' || card.dataset.cat === cat;
    card.classList.toggle('hide', !match);
    if (match) visible++;
  });
  filterCount.textContent = `${visible} of ${items.length} pieces`;
}
 
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    applyFilter(btn.dataset.filter);
  });
});
 
applyFilter('all');
 
// ===== Lightbox =====
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbTitle = document.getElementById('lbTitle');
const lbCat = document.getElementById('lbCat');
const lbProgress = document.getElementById('lbProgress');
let currentIndex = 0;
 
function visibleIndices(){
  return items
    .map((it, i) => i)
    .filter(i => currentFilter === 'all' || items[i].cat === currentFilter);
}
 
function openLightbox(index){
  currentIndex = index;
  updateLightbox();
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}
 
function closeLightbox(){
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}
 
function updateLightbox(){
  const item = items[currentIndex];
  lbImg.classList.remove('show');
  const newSrc = imgUrl(item, 1400, 950);
  const tempImg = new Image();
  tempImg.onload = () => {
    lbImg.src = newSrc;
    requestAnimationFrame(() => lbImg.classList.add('show'));
  };
  tempImg.src = newSrc;
  lbTitle.textContent = item.title;
  lbCat.textContent = item.cat.charAt(0).toUpperCase() + item.cat.slice(1);
  const vis = visibleIndices();
  const pos = vis.indexOf(currentIndex) + 1;
  lbProgress.textContent = `${String(pos).padStart(2,'0')} / ${String(vis.length).padStart(2,'0')}`;
}
 
function step(dir){
  const vis = visibleIndices();
  let pos = vis.indexOf(currentIndex);
  pos = (pos + dir + vis.length) % vis.length;
  currentIndex = vis[pos];
  updateLightbox();
}
 
document.getElementById('lbClose').addEventListener('click', closeLightbox);
document.getElementById('lbPrev').addEventListener('click', () => step(-1));
document.getElementById('lbNext').addEventListener('click', () => step(1));
 
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
 
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') step(-1);
  if (e.key === 'ArrowRight') step(1);
});
 
// touch swipe support
let touchStartX = 0;
lightbox.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; });
lightbox.addEventListener('touchend', (e) => {
  const dx = e.changedTouches[0].screenX - touchStartX;
  if (Math.abs(dx) > 50) step(dx > 0 ? -1 : 1);
});