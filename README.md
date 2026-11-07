# AmberKnightor — Tekla Structures developer portfolio

Static landing page (GitHub Pages) presenting Tekla Open API tools, plugins and macros:
Report checker, Convertstp, Drawer and the Tekla deployment macros.

- `index.html` — the page, `assets/css/style.css`, `assets/js/main.js`
- `assets/img/` — screenshots (the real programs with their UI switched to English) and macro icons

Live at https://amberknightor.github.io/ (English) and https://amberknightor.github.io/ru/ (Russian).
`ru/index.html` is a full Russian copy of the page: when you change text in one language, change the other too.

## Changing a video

Each tool has a slot with the YouTube video id:

```html
<div class="video-slot" data-youtube="R72VR7GYjIA" data-title="Report checker walkthrough">
```

Replace the id in `data-youtube` and the link inside the slot (for `https://youtu.be/AbC123xyz` the id is
`AbC123xyz`).

## Local preview

```
py -m http.server 8765
```

then open http://localhost:8765.
