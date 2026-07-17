The Exhibit — Responsive Image Gallery

A responsive image gallery with category filters, hover effects, and a fullscreen lightbox — built with plain HTML, CSS, and JavaScript (no frameworks, no build step).

📁 Files

├── index.html    → Page structure/markup
├── style.css     → All styling (layout, animations, responsive rules)
├── script.js     → Gallery logic (rendering, filters, lightbox)
└── README.md     → This file

Keep all three files in the same folder — index.html links to style.css and script.js by relative path, so moving them apart will break the page.

🚀 How to Run

No installation or server needed.


Download/keep index.html, style.css, and script.js together in one folder.
Double-click index.html — it opens directly in your browser.


(Optional) To avoid any browser quirks with local file loading, you can also serve it with a simple local server:

bash# from inside the project folder
python3 -m http.server 8000
# then open http://localhost:8000

✨ Features

FeatureDetailsResponsive grid4 columns (desktop) → 3 (tablet) → 2 (small tablet/mobile) → 1 (small phone)15 imagesReal, keyword-matched photos across 5 categoriesCategory filtersAll, Nature, Animals, Cars, Architecture, TravelLightboxClick any image to open a fullscreen viewPrev / NextArrow buttons, keyboard ← → keys, and touch swipe on mobileCloseClose button, click outside the image, or Esc keyHover effectsImage zoom, gradient overlay, title "plaque" slide-up, zoom iconAnimationsStaggered fade-in on load, smooth lightbox transitions, filter transitionsProgress counterShows current position (e.g. 03 / 12) relative to the active filter

🖼️ Image Source

Images are served live from LoremFlickr using keyword matching (e.g. forest,trees → an actual forest photo), so each image genuinely matches its title and category. Images load from the internet each time the page opens — an internet connection is required.

Using your own images

Open script.js and edit the items array at the top:

jsconst items = [
  { seed: "forest-1", kw: "forest,trees", title: "Quiet Canopy", cat: "nature" },
  // ...
];

To use your own local images instead of LoremFlickr, replace the imgUrl() function:

jsfunction imgUrl(item, w, h){
  return `images/${item.seed}.jpg`; // put your images in an /images folder
}

🎨 Design Notes


Fonts: Playfair Display (headings), Inter (body), JetBrains Mono (labels/UI)
Palette: Dark charcoal background with a brass/gold accent, styled like a museum exhibit — each image gets a "Fig. 01" style plaque on hover
No external JS libraries — pure vanilla JavaScript


🛠️ Customize


Add/remove images: edit the items array in script.js
Add a category: add a new <button class="filter-btn" data-filter="yourcategory"> in index.html and tag matching items with cat: "yourcategory" in script.js
Change colors: edit the CSS variables at the top of style.css (:root { --brass: ...; --bg: ...; })
Grid columns: adjust grid-template-columns in the .gallery rules in style.css


📱 Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge). Uses standard CSS Grid, Flexbox, and vanilla JS — no polyfills needed.
