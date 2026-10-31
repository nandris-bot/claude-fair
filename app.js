const box = document.getElementById('products');
const filterBox = document.getElementById('filters');
let items = [];
let active = 'Mind';

const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function render() {
  const list = active === 'Mind' ? items : items.filter(p => p.category === active);
  box.innerHTML = list.map(p => `
    <article class="card">
      <span class="tag">${esc(p.category)}</span>
      <h3>${esc(p.name)}</h3>
      <p>${esc(p.description)}</p>
      <p class="price">${p.price.toLocaleString('hu-HU')} Ft</p>
      <p><a class="btn" href="mailto:info@obudapc.hu?subject=${encodeURIComponent('Érdeklődés: ' + p.name)}">Érdeklődöm</a></p>
    </article>`).join('');
}

function renderFilters() {
  const cats = ['Mind', ...new Set(items.map(p => p.category))];
  filterBox.innerHTML = cats.map(c =>
    `<button type="button" aria-pressed="${c === active}" data-cat="${esc(c)}">${esc(c)}</button>`).join('');
}

filterBox.addEventListener('click', e => {
  const b = e.target.closest('button');
  if (!b) return;
  active = b.dataset.cat;
  renderFilters();
  render();
});

fetch('products.json')
  .then(r => r.json())
  .then(data => { items = data; renderFilters(); render(); })
  .catch(() => { box.textContent = 'A termékek most nem tölthetők be.'; });
