fetch('products.json')
  .then(r => r.json())
  .then(items => {
    const box = document.getElementById('products');
    box.innerHTML = items.map(p => `
      <article class="card">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <p class="price">${p.price.toLocaleString('hu-HU')} Ft</p>
      </article>`).join('');
  })
  .catch(() => {
    document.getElementById('products').textContent = 'A termékek most nem tölthetők be.';
  });
