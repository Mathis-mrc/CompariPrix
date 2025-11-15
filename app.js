let currentView='home';
let currentCategory='';
let products=[];

async function loadProducts(){
  const res = await fetch('products.json');
  products = await res.json();
  showThemes();
}

function showThemes(){
  currentView='home';
  document.getElementById('nav-back').style.display='none';
  const main = document.getElementById('main-content');
  main.innerHTML='';
  const categories=[...new Set(products.map(p=>p.category))];
  const grid=document.createElement('div'); grid.className='grid';
  categories.forEach(cat=>{
    const card=document.createElement('div'); card.className='card';
    card.innerHTML=`<img src="https://via.placeholder.com/300x140.png?text=${cat}" alt="${cat}"><div class="title">${cat}</div>`;
    card.onclick=()=>showArticles(cat);
    grid.appendChild(card);
  });
  main.appendChild(grid);
}

function showArticles(cat){
  currentView='category';
  currentCategory=cat;
  document.getElementById('nav-back').style.display='block';
  const main=document.getElementById('main-content'); main.innerHTML='';
  const grid=document.createElement('div'); grid.className='grid';
  const filtered=products.filter(p=>p.category===cat);
  filtered.forEach(p=>{
    const card=document.createElement('div'); card.className='card';
    card.innerHTML=`<img src="${p.image}" alt="${p.title}"><div class="title">${p.title}</div>`;
    card.onclick=()=>showProduct(p.id);
    grid.appendChild(card);
  });
  main.appendChild(grid);
}

function showProduct(id){
  currentView='product';
  document.getElementById('nav-back').style.display='block';
  const main=document.getElementById('main-content'); main.innerHTML='';
  const p=products.find(x=>x.id===id);
  const container=document.createElement('div'); container.className='card';
  container.innerHTML=`
    <img src="${p.image}" alt="${p.title}" style="height:250px;object-fit:cover;">
    <h2 class="title">${p.title}</h2>
    <p class="features">${p.description}</p>
    <table class="table-offers">
      ${p.offers.map(o=>`
        <tr>
          <td>${o.seller}</td>
          <td class="${o.price===Math.min(...p.offers.map(x=>x.price)) ? 'best' : ''}">${o.price.toFixed(2)}€</td>
          <td><a class="btn-buy" href="${o.link}" target="_blank" rel="nofollow noopener noreferrer">Voir l'offre</a></td>
        </tr>`).join('')}
    </table>
  `;
  main.appendChild(container);
}

// Bouton retour
document.getElementById('back-btn').onclick=()=>{
  if(currentView==='category') showThemes();
  else if(currentView==='product') showArticles(currentCategory);
}

loadProducts();
