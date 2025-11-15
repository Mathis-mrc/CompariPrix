async function loadProducts(){
  const res = await fetch('products.json');
  const products = await res.json();
  renderProducts(products);
}

function renderProducts(products){
  const container = document.getElementById('products');
  container.innerHTML = '';
  products.forEach(p => {
    const bestOffer = p.offers.reduce((a,b)=> a.price <= b.price ? a : b);
    const card = document.createElement('div'); card.className='card';
    card.innerHTML = `
      <img src="${p.image}" alt="${p.title}" />
      <div class="title">${p.title}</div>
      <div class="features">${p.features.join(' • ')}</div>
      <table class="table-offers">
        ${p.offers.map(o => `
          <tr>
            <td>${o.seller}</td>
            <td class="${o.price === bestOffer.price ? 'best' : ''}">${o.price.toFixed(2)}€</td>
            <td><a class="btn-buy" href="${o.link}" target="_blank" rel="nofollow noopener noreferrer">Voir l'offre</a></td>
          </tr>`).join('')}
      </table>
    `;
    container.appendChild(card);
  });
  attachFilters(products);
}

function attachFilters(products){
  const buttons = document.querySelectorAll('.cat-btn');
  buttons.forEach(btn=>{
    btn.onclick = ()=>{
      buttons.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-cat');
      const filtered = cat === 'all' ? products : products.filter(p=>p.category === cat);
      renderProducts(filtered);
    }
  });
}

loadProducts();
