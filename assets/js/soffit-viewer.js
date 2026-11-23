const viewer = document.querySelector('.soffit-viewer');
const button = viewer.querySelector('button');
const viewport = viewer.querySelector('.soffit-viewport');
const status = viewer.querySelector('.soffit-status');
const hint = viewer.querySelector('.soffit-hint');

button.hidden = false;
button.addEventListener('click', async () => {
  button.disabled = true;
  status.textContent = viewer.dataset.loading;
  let model;

  try {
    await import('https://cdn.jsdelivr.net/npm/@google/model-viewer@4.1.0/dist/model-viewer.min.js');
    customElements.get('model-viewer').meshoptDecoderLocation =
      'https://cdn.jsdelivr.net/npm/meshoptimizer@0.24.0/meshopt_decoder.js';
    model = document.createElement('model-viewer');
    model.alt = viewer.dataset.alt;
    model.setAttribute('camera-controls', '');
    model.setAttribute('camera-orbit', '35deg 63deg ' + (viewport.clientWidth < 620 ? '100%' : '83%'));
    model.setAttribute('min-camera-orbit', 'auto auto 8%');
    model.setAttribute('min-field-of-view', '6deg');
    model.setAttribute('tone-mapping', 'neutral');
    model.setAttribute('exposure', '0.78');
    model.setAttribute('touch-action', 'pan-y');
    model.setAttribute('interaction-prompt', 'none');

    await new Promise((resolve, reject) => {
      const events = new AbortController();
      const options = { signal: events.signal };
      const timeout = setTimeout(() => finish(reject), 45000);
      function finish(settle) {
        clearTimeout(timeout);
        events.abort();
        settle();
      }
      model.addEventListener('load', () => finish(resolve), options);
      model.addEventListener('error', () => finish(reject), options);
      model.src = viewer.dataset.modelSrc;
      viewport.append(model);
    });

    model.classList.add('is-ready');
    model.tabIndex = 0;
    model.focus({ preventScroll: true });
    button.hidden = true;
    hint.hidden = false;
    status.textContent = '';
  } catch {
    model?.remove();
    button.disabled = false;
    status.textContent = viewer.dataset.error;
  }
});
