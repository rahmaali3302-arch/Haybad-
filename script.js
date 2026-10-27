/**
 * ==============================================================================
 * HAYBAD SUPERMARKET - MAIN JAVASCRIPT FILE
 * ==============================================================================
 * 
 * Faylkan wuxuu maamulaa dhammaan hawlaha website-ka Haybad Supermarket, sida:
 * 1. Kaydka xogta alaabta iyo qaybaha (Data Store)
 * 2. Soo bandhigista alaabta, shaandhaynta (Filter) iyo raadinta (Search)
 * 3. Gaariga wax iibsiga (Shopping Cart) iyo keydinta localStorage
 * 4. Xisaabinta kharashka delivery-ga iyo dalabka bilaashka ah
 * 5. Foomka dalabka (Checkout) iyo hubinta xogta (Validation)
 * 6. Soo saarista lambarka dalabka (Order ID) iyo xaqiijinta
 * 7. Nidaamka la socodka heerka dalabka (Order Status Tracking)
 * 
 * Koodhkan waxaa loo qoray qaab nadiif ah oo qof kasta oo bilow ah uu fahmi karo.
 */

// ==============================================================================
// 1. ISKU-HABEYNTA GUUD EE GANACSIGA (CONFIGURATION)
// ==============================================================================
const CONFIG = {
  // Kharashka caadiga ah ee delivery-ga
  STANDARD_DELIVERY_FEE: 2.00,

  // Qiimaha laga bilaabo delivery-ga bilaashka ah
  FREE_DELIVERY_THRESHOLD: 30.00,

  // Calaamadda lacagta
  CURRENCY: '$',

  // Furayaasha keydka localStorage
  CART_STORAGE_KEY: 'haybad_supermarket_cart_v1',
  ORDERS_STORAGE_KEY: 'haybad_supermarket_orders_v1'
};

// ==============================================================================
// 2. QAYBAHA ALAABTA (10 CATEGORIES)
// ==============================================================================
const CATEGORIES = [
  { id: 'all', name: 'Dhammaan', icon: 'fa-solid fa-border-all', count: 30 },
  { id: 'Raashinka iyo cuntada', name: 'Raashinka & Cuntada', icon: 'fa-solid fa-bowl-rice', count: 5 },
  { id: 'Cabitaannada', name: 'Cabitaannada', icon: 'fa-solid fa-bottle-water', count: 4 },
  { id: 'Khudaarta cusub', name: 'Khudaarta Cusub', icon: 'fa-solid fa-carrot', count: 5 },
  { id: 'Miraha cusub', name: 'Miraha Cusub', icon: 'fa-solid fa-apple-whole', count: 4 },
  { id: 'Caanaha iyo waxyaabaha laga sameeyo', name: 'Caanaha & Waxsoosaarka', icon: 'fa-solid fa-cheese', count: 3 },
  { id: 'Hilibka iyo kalluunka', name: 'Hilibka & Kalluunka', icon: 'fa-solid fa-drumstick-bite', count: 3 },
  { id: 'Rootiga iyo waxyaabaha foornada laga sameeyo', name: 'Rootiga & Foornada', icon: 'fa-solid fa-bread-slice', count: 2 },
  { id: 'Alaabta nadaafadda', name: 'Alaabta Nadaafadda', icon: 'fa-solid fa-soap', count: 2 },
  { id: 'Alaabta daryeelka qofka', name: 'Daryeelka Qofka', icon: 'fa-solid fa-pump-soap', count: 2 },
  { id: 'Alaabta guriga lagu isticmaalo', name: 'Alaabta Guriga', icon: 'fa-solid fa-kitchen-set', count: 2 }
];

// Sawir beddel ah haddii sawirku go'o
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80';

// ==============================================================================
// 3. XOGTA ALAABTA TUSAALAHA AH (30 ALAABOOD OO TAYO LEH)
// ==============================================================================
const PRODUCTS = [
  // --- 1. RAASHINKA IYO CUNTADA ---
  {
    id: 1,
    name: 'Bariis Baasmati Qalbi Daafi (5 Kg)',
    category: 'Raashinka iyo cuntada',
    price: 7.50,
    oldPrice: 8.50,
    unit: '5 Kg',
    rating: 4.9,
    badge: 'Dhimis',
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 2,
    name: 'Bur Qamadi Cad oo Tayo Sare leh (5 Kg)',
    category: 'Raashinka iyo cuntada',
    price: 4.20,
    oldPrice: 4.80,
    unit: '5 Kg',
    rating: 4.8,
    badge: 'Caanka ah',
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 3,
    name: 'Baasto Talyaani ah (Spaghetti 1 Kg)',
    category: 'Raashinka iyo cuntada',
    price: 1.80,
    oldPrice: null,
    unit: '1 Kg',
    rating: 4.7,
    badge: 'Cusub',
    isPopular: false,
    image: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 4,
    name: 'Saliidda Qorrax-ubaxa ee Saafi ah (3 Litir)',
    category: 'Raashinka iyo cuntada',
    price: 6.50,
    oldPrice: 7.20,
    unit: '3 Litir',
    rating: 4.9,
    badge: 'Dhimis',
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 5,
    name: 'Sonkor Cad oo Nadiif ah (2 Kg)',
    category: 'Raashinka iyo cuntada',
    price: 2.10,
    oldPrice: null,
    unit: '2 Kg',
    rating: 4.6,
    badge: null,
    isPopular: false,
    image: 'https://images.unsplash.com/photo-1581441363689-1f3c3c414635?auto=format&fit=crop&w=600&q=80'
  },

  // --- 2. CABITAANNADA ---
  {
    id: 6,
    name: 'Cabitaanka Cambaha Dabiiciga ah (1 Litir)',
    category: 'Cabitaannada',
    price: 1.50,
    oldPrice: 2.00,
    unit: '1 Litir',
    rating: 4.8,
    badge: 'Caanka ah',
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 7,
    name: 'Biyo Saafi ah oo Caag ah (12 x 500ml)',
    category: 'Cabitaannada',
    price: 2.40,
    oldPrice: null,
    unit: 'Xirmo (12 xabbo)',
    rating: 4.9,
    badge: 'Cusub',
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1560023907-5f339617ea30?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 8,
    name: 'Shaah Cagaaran oo Liin leh (25 Baakad)',
    category: 'Cabitaannada',
    price: 1.80,
    oldPrice: null,
    unit: '25 Baakad',
    rating: 4.7,
    badge: null,
    isPopular: false,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 9,
    name: 'Bun Soomaali Carfoon oo Xawaash leh (500g)',
    category: 'Cabitaannada',
    price: 3.50,
    oldPrice: 4.00,
    unit: '500g',
    rating: 5.0,
    badge: 'Caanka ah',
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=600&q=80'
  },

  // --- 3. KHUDAARTA CUSUB ---
  {
    id: 10,
    name: 'Yaanyo Cusub oo Dalka ah (1 Kg)',
    category: 'Khudaarta cusub',
    price: 1.20,
    oldPrice: 1.50,
    unit: '1 Kg',
    rating: 4.8,
    badge: 'Dhimis',
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 11,
    name: 'Basal Cas oo Macaan (1 Kg)',
    category: 'Khudaarta cusub',
    price: 0.90,
    oldPrice: null,
    unit: '1 Kg',
    rating: 4.6,
    badge: 'Cusub',
    isPopular: false,
    image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 12,
    name: 'Baradho Cusub oo Cad (1 Kg)',
    category: 'Khudaarta cusub',
    price: 1.10,
    oldPrice: null,
    unit: '1 Kg',
    rating: 4.7,
    badge: null,
    isPopular: false,
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 13,
    name: 'Karooto Qallafsan oo Dabiici ah (1 Kg)',
    category: 'Khudaarta cusub',
    price: 1.30,
    oldPrice: 1.60,
    unit: '1 Kg',
    rating: 4.8,
    badge: 'Cusub',
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5c717?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 14,
    name: 'Qajaar Cagaaran oo Cusub (1 Kg)',
    category: 'Khudaarta cusub',
    price: 1.00,
    oldPrice: null,
    unit: '1 Kg',
    rating: 4.5,
    badge: null,
    isPopular: false,
    image: 'https://images.unsplash.com/photo-1449339854873-750e6913301b?auto=format&fit=crop&w=600&q=80'
  },

  // --- 4. MIRAHA CUSUB ---
  {
    id: 15,
    name: 'Moos Shabeelle oo Bisil (1 Xirmo)',
    category: 'Miraha cusub',
    price: 1.00,
    oldPrice: null,
    unit: 'Xirmo (1 Kg)',
    rating: 4.9,
    badge: 'Caanka ah',
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 16,
    name: 'Tufaax Cas oo Macaan (1 Kg)',
    category: 'Miraha cusub',
    price: 2.80,
    oldPrice: 3.20,
    unit: '1 Kg',
    rating: 4.8,
    badge: 'Dhimis',
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 17,
    name: 'Liin Macaan oo Biyo badan (1 Kg)',
    category: 'Miraha cusub',
    price: 1.70,
    oldPrice: null,
    unit: '1 Kg',
    rating: 4.7,
    badge: 'Cusub',
    isPopular: false,
    image: 'https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 18,
    name: 'Canab Madow oo Dabiici ah (500g)',
    category: 'Miraha cusub',
    price: 3.00,
    oldPrice: 3.50,
    unit: '500g',
    rating: 4.9,
    badge: 'Caanka ah',
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=600&q=80'
  },

  // --- 5. CAANAHA IYO WAXSOOSAARKA ---
  {
    id: 19,
    name: 'Caano Geel oo Dabiici ah oo Cusub (1 Litir)',
    category: 'Caanaha iyo waxyaabaha laga sameeyo',
    price: 2.00,
    oldPrice: 2.30,
    unit: '1 Litir',
    rating: 5.0,
    badge: 'Caanka ah',
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 20,
    name: 'Jiis / Cheese Cheddar ah (400g)',
    category: 'Caanaha iyo waxyaabaha laga sameeyo',
    price: 3.75,
    oldPrice: 4.20,
    unit: '400g',
    rating: 4.7,
    badge: 'Dhimis',
    isPopular: false,
    image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 21,
    name: 'Ukun Dalka ah oo Cusub (Saxan 30 Xabbo)',
    category: 'Caanaha iyo waxyaabaha laga sameeyo',
    price: 4.00,
    oldPrice: null,
    unit: '30 Xabbo',
    rating: 4.9,
    badge: 'Cusub',
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=600&q=80'
  },

  // --- 6. HILIBKA IYO KALLUUNKA ---
  {
    id: 22,
    name: 'Hilib Ari oo Cusub oo Nadiif ah (1 Kg)',
    category: 'Hilibka iyo kalluunka',
    price: 8.50,
    oldPrice: 9.20,
    unit: '1 Kg',
    rating: 5.0,
    badge: 'Caanka ah',
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 23,
    name: 'Hilib Digaag Cusub oo Xubno ah (1 Kg)',
    category: 'Hilibka iyo kalluunka',
    price: 4.20,
    oldPrice: null,
    unit: '1 Kg',
    rating: 4.8,
    badge: 'Cusub',
    isPopular: false,
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 24,
    name: 'Kalluun Badeed Tuunno ah (1 Kg)',
    category: 'Hilibka iyo kalluunka',
    price: 5.50,
    oldPrice: 6.00,
    unit: '1 Kg',
    rating: 4.9,
    badge: 'Dhimis',
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1534948216015-843149f72be3?auto=format&fit=crop&w=600&q=80'
  },

  // --- 7. ROOTIGA IYO FOORNADA ---
  {
    id: 25,
    name: 'Rooti Foorno oo Qamadi ah (Baguette)',
    category: 'Rootiga iyo waxyaabaha foornada laga sameeyo',
    price: 0.80,
    oldPrice: null,
    unit: '1 Xabbo',
    rating: 4.7,
    badge: 'Cusub',
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 26,
    name: 'Sambuus Hilib Shiidan ah (10 Xabbo)',
    category: 'Rootiga iyo waxyaabaha foornada laga sameeyo',
    price: 3.00,
    oldPrice: 3.50,
    unit: '10 Xabbo',
    rating: 5.0,
    badge: 'Caanka ah',
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80'
  },

  // --- 8. ALAABTA NADAAFADDA ---
  {
    id: 27,
    name: 'Saabuunta Dharka ee Omo / Ariel (2 Kg)',
    category: 'Alaabta nadaafadda',
    price: 4.50,
    oldPrice: 5.00,
    unit: '2 Kg',
    rating: 4.8,
    badge: 'Caanka ah',
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 28,
    name: 'Dhaqaha Weelka oo Udgoon (1 Litir)',
    category: 'Alaabta nadaafadda',
    price: 1.90,
    oldPrice: null,
    unit: '1 Litir',
    rating: 4.6,
    badge: null,
    isPopular: false,
    image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=600&q=80'
  },

  // --- 9. DARYEELKA QOFKA ---
  {
    id: 29,
    name: 'Saabuunta Qubayska ee Dabiiciga ah (3 Xabbo)',
    category: 'Alaabta daryeelka qofka',
    price: 2.20,
    oldPrice: null,
    unit: 'Xirmo 3 xabbo',
    rating: 4.7,
    badge: 'Cusub',
    isPopular: false,
    image: 'https://images.unsplash.com/photo-1607006314185-1d0e513515ea?auto=format&fit=crop&w=600&q=80'
  },

  // --- 10. ALAABTA GURIGA ---
  {
    id: 30,
    name: 'Waraaqaha Jikada ee Tayada leh (4 Xirmo)',
    category: 'Alaabta guriga lagu isticmaalo',
    price: 2.50,
    oldPrice: 3.00,
    unit: '4 Xirmo',
    rating: 4.8,
    badge: 'Dhimis',
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80'
  }
];

// ==============================================================================
// 4. XAALADDA GUUD EE APPLICATION-KA (APP STATE)
// ==============================================================================
let appState = {
  cart: [],                  // Alaabta gaariga ku jirta: [{ id, quantity }]
  selectedCategory: 'all',   // Qaybta hadda la doortay
  searchQuery: '',           // Erayga la raadinayo
  sortBy: 'featured',        // Kala-saacidda: featured, price-low, price-high, name-asc, name-desc
  orders: []                 // Dalabyada la diiwaangeliyay
};

// ==============================================================================
// 5. BILOWGA BOGGA (INITIALIZATION ON DOM LOAD)
// ==============================================================================
document.addEventListener('DOMContentLoaded', () => {
  // 1. Soo rar gaariga iyo dalabyada localStorage
  loadCartFromStorage();
  loadOrdersFromStorage();

  // 2. Soo saar qaybaha iyo alaabta
  renderCategoryPills();
  renderCategoriesGrid();
  filterAndRenderProducts();

  // 3. Cusboonaysii gaariga
  updateCartUI();

  // 4. Xidh xirayaasha iyo dhagaystayaasha dhacdooyinka (Event Listeners)
  setupEventListeners();

  // 5. Hubi haddii loo baahan yahay in lagu shubo dalab tusaale ah
  seedDemoOrderIfEmpty();
});

// ==============================================================================
// 6. SOO SAARISTA QAYBAHA (RENDER CATEGORIES)
// ==============================================================================
function renderCategoryPills() {
  const pillsContainer = document.getElementById('categoryFilterPills');
  if (!pillsContainer) return;

  pillsContainer.innerHTML = CATEGORIES.map(cat => `
    <button type="button" 
            class="filter-pill ${appState.selectedCategory === cat.id ? 'active' : ''}" 
            onclick="filterByCategory('${cat.id}')">
      <i class="${cat.icon}"></i> ${cat.name}
    </button>
  `).join('');
}

function renderCategoriesGrid() {
  const gridContainer = document.getElementById('categoriesGrid');
  if (!gridContainer) return;

  // Ha soo darin 'all' grid-ka weyn ee 10-ka qaybood
  const tenCategories = CATEGORIES.filter(c => c.id !== 'all');

  gridContainer.innerHTML = tenCategories.map(cat => `
    <div class="category-card ${appState.selectedCategory === cat.id ? 'active' : ''}" 
         onclick="filterByCategory('${cat.id}', true)">
      <div class="cat-icon-box">
        <i class="${cat.icon}"></i>
      </div>
      <h3 class="cat-title">${cat.name}</h3>
      <span class="cat-count">${cat.count} Alaabood</span>
    </div>
  `).join('');
}

// ==============================================================================
// 7. SOO BANDHIGISTA ALAABTA & SHAANDHAYNTA (PRODUCTS FILTER & RENDER)
// ==============================================================================
function filterByCategory(categoryName, scrollToProducts = false) {
  appState.selectedCategory = categoryName;

  // Cusboonaysii muuqaalka badhamada shaandhada
  renderCategoryPills();
  renderCategoriesGrid();

  // Shaandhee alaabta
  filterAndRenderProducts();

  // Haddii laga soo gujiyay qaybaha weyn, u dhaadhac alaabta
  if (scrollToProducts) {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

function filterAndRenderProducts() {
  const productsGrid = document.getElementById('productsGrid');
  const emptyState = document.getElementById('emptyProductsState');
  const countBadge = document.getElementById('productsFoundCount');
  if (!productsGrid) return;

  let filtered = [...PRODUCTS];

  // 1. Shaandhaynta qaybta
  if (appState.selectedCategory !== 'all') {
    filtered = filtered.filter(item => item.category === appState.selectedCategory);
  }

  // 2. Shaandhaynta qoraalka raadinta
  if (appState.searchQuery.trim() !== '') {
    const query = appState.searchQuery.toLowerCase().trim();
    filtered = filtered.filter(item => 
      item.name.toLowerCase().includes(query) || 
      item.category.toLowerCase().includes(query)
    );
  }

  // 3. Kala-saacidda (Sorting)
  if (appState.sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (appState.sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (appState.sortBy === 'name-asc') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (appState.sortBy === 'name-desc') {
    filtered.sort((a, b) => b.name.localeCompare(a.name));
  } else {
    // Featured: U hormari kuwa caanka ah ama dhimista leh
    filtered.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
  }

  // Cusboonaysii tirada alaabta la helay
  if (countBadge) {
    countBadge.innerHTML = `Muujinaya: <strong>${filtered.length}</strong> alaabood`;
  }

  // Haddii aan waxba la helin
  if (filtered.length === 0) {
    productsGrid.innerHTML = '';
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  }

  if (emptyState) emptyState.classList.add('hidden');

  // Ku shub alaabta shaashadda
  productsGrid.innerHTML = filtered.map(product => {
    // Xisaabi calaamadda badge-ka
    let badgeHtml = '';
    if (product.badge) {
      let badgeClass = 'badge-fresh';
      if (product.badge === 'Dhimis') badgeClass = 'badge-discount';
      if (product.badge === 'Caanka ah') badgeClass = 'badge-popular';
      badgeHtml = `<span class="product-badge ${badgeClass}">${product.badge}</span>`;
    }

    // Qiimihii hore haddii uu jiro
    const oldPriceHtml = product.oldPrice 
      ? `<span class="old-price">${CONFIG.CURRENCY}${product.oldPrice.toFixed(2)}</span>` 
      : '';

    return `
      <article class="product-card" data-id="${product.id}">
        <div class="card-media">
          ${badgeHtml}
          <img src="${product.image}" 
               alt="${product.name}" 
               class="product-card-img" 
               loading="lazy"
               onerror="this.src='${FALLBACK_IMAGE}'">
        </div>
        <div class="product-card-body">
          <span class="card-category-tag">${product.category}</span>
          <h3 class="product-card-title" title="${product.name}">${product.name}</h3>
          
          <div class="product-card-meta">
            <span class="product-unit"><i class="fa-solid fa-scale-balanced"></i> ${product.unit}</span>
            <span class="product-rating"><i class="fa-solid fa-star"></i> ${product.rating}</span>
          </div>

          <div class="product-card-footer">
            <div class="price-box">
              <span class="current-price">${CONFIG.CURRENCY}${product.price.toFixed(2)}</span>
              ${oldPriceHtml}
            </div>
            <button type="button" 
                    class="btn-add-cart" 
                    onclick="addToCart(${product.id})" 
                    title="Ku dar Gaariga"
                    aria-label="Ku dar ${product.name} gaariga">
              <i class="fa-solid fa-cart-plus"></i>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// ==============================================================================
// 8. GAARIGA WAX IIBSIGA (SHOPPING CART ENGINE)
// ==============================================================================

/**
 * Ku dar alaab gaariga
 */
function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existingItem = appState.cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    appState.cart.push({
      id: productId,
      quantity: 1
    });
  }

  saveCartToStorage();
  updateCartUI();

  // Muuji farriin (Toast notification)
  showToast(`✅ "${product.name}" waxaa lagu daray gaariga!`);

  // Dhaqaaji badhanka gaariga (Bump animation)
  animateCartBadge();
}

/**
 * Wax ka beddel tirada alaabta ku jirta gaariga
 */
function updateCartQuantity(productId, delta) {
  const itemIndex = appState.cart.findIndex(item => item.id === productId);
  if (itemIndex === -1) return;

  appState.cart[itemIndex].quantity += delta;

  if (appState.cart[itemIndex].quantity <= 0) {
    appState.cart.splice(itemIndex, 1);
    showToast(`🗑️ Alaabta waxaa laga saaray gaariga.`);
  }

  saveCartToStorage();
  updateCartUI();
}

/**
 * Ka saar alaab gaariga gebi ahaanba
 */
function removeFromCart(productId) {
  const item = PRODUCTS.find(p => p.id === productId);
  appState.cart = appState.cart.filter(i => i.id !== productId);
  saveCartToStorage();
  updateCartUI();

  if (item) {
    showToast(`🗑️ "${item.name}" waa laga saaray gaariga.`);
  }
}

/**
 * Faaruqi dhammaan gaariga wax iibsiga
 */
function clearCartConfirm() {
  if (appState.cart.length === 0) return;

  if (confirm("Ma hubtaa inaad rabto inaad faaruqiso dhammaan gaarigaaga wax iibsiga?")) {
    appState.cart = [];
    saveCartToStorage();
    updateCartUI();
    showToast(`🧹 Gaarigaagii wax iibsiga waa la faaruqiyey.`);
  }
}

/**
 * Xisaabi wadarta guud ee gaariga
 */
function calculateCartTotals() {
  let subtotal = 0;
  let totalItemsCount = 0;

  appState.cart.forEach(cartItem => {
    const product = PRODUCTS.find(p => p.id === cartItem.id);
    if (product) {
      subtotal += product.price * cartItem.quantity;
      totalItemsCount += cartItem.quantity;
    }
  });

  // Kharashka delivery-ga: Haddii subtotal >= $30 ama gaarigu madhan yahay waa bilaash
  let deliveryFee = 0;
  if (totalItemsCount > 0) {
    deliveryFee = subtotal >= CONFIG.FREE_DELIVERY_THRESHOLD ? 0 : CONFIG.STANDARD_DELIVERY_FEE;
  }

  const grandTotal = subtotal + deliveryFee;

  return {
    subtotal,
    deliveryFee,
    grandTotal,
    totalItemsCount
  };
}

/**
 * Cusboonaysii dhammaan shaashadaha gaariga
 */
function updateCartUI() {
  const { subtotal, deliveryFee, grandTotal, totalItemsCount } = calculateCartTotals();

  // 1. Cusboonaysii calaamadaha Header-ka
  const headerCountBadge = document.getElementById('cartCountBadge');
  const headerTotal = document.getElementById('cartTotalHeader');
  const drawerHeaderBadge = document.getElementById('cartHeaderBadge');

  if (headerCountBadge) headerCountBadge.textContent = totalItemsCount;
  if (headerTotal) headerTotal.textContent = `${CONFIG.CURRENCY}${grandTotal.toFixed(2)}`;
  if (drawerHeaderBadge) drawerHeaderBadge.textContent = `${totalItemsCount} alaab`;

  // 2. Cusboonaysii baararka Delivery Bilaashka ah
  updateFreeDeliveryProgress(subtotal);

  // 3. Cusboonaysii Liiska Alaabta Gaariga (Drawer Items)
  const cartList = document.getElementById('cartItemsList');
  const cartEmptyView = document.getElementById('cartEmptyView');
  const cartFooter = document.getElementById('cartFooter');

  if (totalItemsCount === 0) {
    if (cartList) cartList.innerHTML = '';
    if (cartEmptyView) cartEmptyView.classList.remove('hidden');
    if (cartFooter) cartFooter.classList.add('hidden');
  } else {
    if (cartEmptyView) cartEmptyView.classList.add('hidden');
    if (cartFooter) cartFooter.classList.remove('hidden');

    if (cartList) {
      cartList.innerHTML = appState.cart.map(cartItem => {
        const product = PRODUCTS.find(p => p.id === cartItem.id);
        if (!product) return '';

        const itemTotal = (product.price * cartItem.quantity).toFixed(2);

        return `
          <div class="cart-item-row" data-id="${product.id}">
            <img src="${product.image}" 
                 alt="${product.name}" 
                 class="cart-item-img"
                 onerror="this.src='${FALLBACK_IMAGE}'">
            <div class="cart-item-details">
              <h4 class="cart-item-name">${product.name}</h4>
              <span class="cart-item-price-unit">${CONFIG.CURRENCY}${product.price.toFixed(2)} / ${product.unit}</span>
              
              <div class="cart-item-controls">
                <div class="qty-counter">
                  <button type="button" class="btn-qty" onclick="updateCartQuantity(${product.id}, -1)" title="Yaree">-</button>
                  <span class="qty-value">${cartItem.quantity}</span>
                  <button type="button" class="btn-qty" onclick="updateCartQuantity(${product.id}, 1)" title="Kordhi">+</button>
                </div>
                <button type="button" class="btn-remove-item" onclick="removeFromCart(${product.id})" title="Ka saar">
                  <i class="fa-regular fa-trash-can"></i>
                </button>
              </div>
            </div>
            <div class="cart-item-subtotal">
              ${CONFIG.CURRENCY}${itemTotal}
            </div>
          </div>
        `;
      }).join('');
    }
  }

  // 4. Cusboonaysii qiimayaasha footer-ka gaariga
  const subtotalEl = document.getElementById('cartSubtotal');
  const deliveryEl = document.getElementById('cartDeliveryFee');
  const grandTotalEl = document.getElementById('cartGrandTotal');

  if (subtotalEl) subtotalEl.textContent = `${CONFIG.CURRENCY}${subtotal.toFixed(2)}`;
  if (deliveryEl) {
    if (subtotal >= CONFIG.FREE_DELIVERY_THRESHOLD && totalItemsCount > 0) {
      deliveryEl.innerHTML = `<span class="badge-free-delivery">Bilaash</span>`;
    } else {
      deliveryEl.textContent = `${CONFIG.CURRENCY}${deliveryFee.toFixed(2)}`;
    }
  }
  if (grandTotalEl) grandTotalEl.textContent = `${CONFIG.CURRENCY}${grandTotal.toFixed(2)}`;
}

/**
 * Baarka Horumarka Delivery-ga Bilaashka ah
 */
function updateFreeDeliveryProgress(subtotal) {
  const msgEl = document.getElementById('freeDeliveryMessage');
  const barEl = document.getElementById('deliveryProgressBar');
  if (!msgEl || !barEl) return;

  const threshold = CONFIG.FREE_DELIVERY_THRESHOLD;

  if (subtotal >= threshold) {
    msgEl.innerHTML = `🎉 <strong>Hambalyo!</strong> Waxaad heshay <strong>Delivery Bilaash ah!</strong>`;
    barEl.style.width = '100%';
    barEl.style.background = 'linear-gradient(90deg, #10b981, #059669)';
  } else {
    const diff = (threshold - subtotal).toFixed(2);
    const percent = Math.min(100, Math.max(0, (subtotal / threshold) * 100));
    msgEl.innerHTML = `Ku dar <strong>${CONFIG.CURRENCY}${diff}</strong> oo dheeraad ah si aad u hesho <strong>Delivery Bilaash ah!</strong>`;
    barEl.style.width = `${percent}%`;
    barEl.style.background = 'linear-gradient(90deg, #f59e0b, #10b981)';
  }
}

/**
 * Keydinta iyo soo saarista gaariga ee LocalStorage
 */
function saveCartToStorage() {
  try {
    localStorage.setItem(CONFIG.CART_STORAGE_KEY, JSON.stringify(appState.cart));
  } catch (e) {
    console.error('Khalad ayaa dhacay xilliga keydinta gaariga:', e);
  }
}

function loadCartFromStorage() {
  try {
    const stored = localStorage.getItem(CONFIG.CART_STORAGE_KEY);
    if (stored) {
      appState.cart = JSON.parse(stored);
    }
  } catch (e) {
    console.error('Khalad ayaa dhacay xilliga soo saarista gaariga:', e);
    appState.cart = [];
  }
}

// ==============================================================================
// 9. CHECKOUT & DALABKA DELIVERY-GA (ORDER CREATION & VALIDATION)
// ==============================================================================

/**
 * Fur daaqadda Checkout-ka
 */
function openCheckoutModal() {
  const { totalItemsCount } = calculateCartTotals();

  if (totalItemsCount === 0) {
    showToast(`⚠️ Fadlan marka hore alaab ku dar gaarigaaga wax iibsiga!`, 'error');
    // Haddii uu gaarigu furan yahayna xidh si uu alaab u doorto
    closeCart();
    const productsSection = document.getElementById('products');
    if (productsSection) productsSection.scrollIntoView({ behavior: 'smooth' });
    return;
  }

  // Xidh gaariga haddii uu furan yahay
  closeCart();

  // Buuxi liiska dalabka ee dhinaca midig ee checkout modal
  populateCheckoutSummary();

  // Nadiifi khaladaadkii foomka hore
  clearCheckoutValidationErrors();

  const checkoutModal = document.getElementById('checkoutModal');
  if (checkoutModal) {
    checkoutModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeCheckoutModal() {
  const checkoutModal = document.getElementById('checkoutModal');
  if (checkoutModal) {
    checkoutModal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/**
 * Buuxi qeybta Order Summary ee Checkout modal
 */
function populateCheckoutSummary() {
  const { subtotal, deliveryFee, grandTotal } = calculateCartTotals();
  const itemsContainer = document.getElementById('checkoutItemsList');
  const subtotalEl = document.getElementById('checkoutSubtotal');
  const deliveryEl = document.getElementById('checkoutDelivery');
  const grandTotalEl = document.getElementById('checkoutGrandTotal');

  if (itemsContainer) {
    itemsContainer.innerHTML = appState.cart.map(cartItem => {
      const product = PRODUCTS.find(p => p.id === cartItem.id);
      if (!product) return '';
      const total = (product.price * cartItem.quantity).toFixed(2);
      return `
        <div class="checkout-item-line">
          <span class="item-name">${product.name} <span class="item-qty">x${cartItem.quantity}</span></span>
          <span class="item-price">${CONFIG.CURRENCY}${total}</span>
        </div>
      `;
    }).join('');
  }

  if (subtotalEl) subtotalEl.textContent = `${CONFIG.CURRENCY}${subtotal.toFixed(2)}`;
  if (deliveryEl) {
    deliveryEl.textContent = deliveryFee === 0 ? 'Bilaash ($0.00)' : `${CONFIG.CURRENCY}${deliveryFee.toFixed(2)}`;
  }
  if (grandTotalEl) grandTotalEl.textContent = `${CONFIG.CURRENCY}${grandTotal.toFixed(2)}`;
}

/**
 * Hubinta xogta foomka (Form Validation)
 */
function validateCheckoutForm() {
  let isValid = true;
  clearCheckoutValidationErrors();

  const nameInput = document.getElementById('custName');
  const phoneInput = document.getElementById('custPhone');
  const districtSelect = document.getElementById('custDistrict');
  const addressInput = document.getElementById('custAddress');

  // 1. Magaca
  if (!nameInput.value.trim()) {
    showInputError('custName', 'Fadlan geli magacaaga oo buuxa.');
    isValid = false;
  } else if (nameInput.value.trim().length < 3) {
    showInputError('custName', 'Magacu waa inuu ka koobnaadaa ugu yaraan 3 xaraf.');
    isValid = false;
  }

  // 2. Telefoonka Soomaaliya (e.g. 61xxxxxxx ama 62xxxxxxx)
  const phoneVal = phoneInput.value.trim().replace(/\D/g, ''); // Nadiifi wax aan nambar ahayn
  if (!phoneVal) {
    showInputError('custPhone', 'Fadlan geli lambarkaaga telefoonka.');
    isValid = false;
  } else if (phoneVal.length < 7 || phoneVal.length > 10) {
    showInputError('custPhone', 'Lambarka telefoonka waa inuu u dhaxeeyaa 7 ilaa 9 god.');
    isValid = false;
  }

  // 3. Degmada
  if (!districtSelect.value) {
    showInputError('custDistrict', 'Fadlan dooro degmada lagugu keeni doono.');
    isValid = false;
  }

  // 4. Cinwaanka tooska ah
  if (!addressInput.value.trim()) {
    showInputError('custAddress', 'Fadlan qor cinwaanka tooska ah ama waddada.');
    isValid = false;
  } else if (addressInput.value.trim().length < 5) {
    showInputError('custAddress', 'Fadlan bixi tilmaan cinwaan oo faahfaahsan.');
    isValid = false;
  }

  return isValid;
}

function showInputError(fieldId, message) {
  const inputEl = document.getElementById(fieldId);
  const errorEl = document.getElementById(`${fieldId}Error`);
  if (inputEl) inputEl.classList.add('is-invalid');
  if (errorEl) errorEl.textContent = message;
}

function clearCheckoutValidationErrors() {
  const fields = ['custName', 'custPhone', 'custDistrict', 'custAddress'];
  fields.forEach(fieldId => {
    const inputEl = document.getElementById(fieldId);
    const errorEl = document.getElementById(`${fieldId}Error`);
    if (inputEl) inputEl.classList.remove('is-invalid');
    if (errorEl) errorEl.textContent = '';
  });
}

/**
 * Dirista iyo xaqiijinta dalabka (Submit Order)
 */
function handleCheckoutSubmit(event) {
  event.preventDefault();

  if (!validateCheckoutForm()) {
    showToast(`⚠️ Fadlan sax khaladaadka foomka ku jira.`, 'error');
    return;
  }

  const { subtotal, deliveryFee, grandTotal } = calculateCartTotals();

  // Soo qaad xogta foomka
  const customerName = document.getElementById('custName').value.trim();
  const customerPhone = document.getElementById('custPhone').value.trim();
  const district = document.getElementById('custDistrict').value;
  const address = document.getElementById('custAddress').value.trim();
  const notes = document.getElementById('custNotes').value.trim();
  
  // Habka lacag-bixinta
  const paymentMethodEl = document.querySelector('input[name="paymentMethod"]:checked');
  const paymentMethod = paymentMethodEl ? paymentMethodEl.value : 'Kaash Marka Alaabta La Keeno';

  // Soo saar lambar aqoonsi gaar ah (Order ID)
  const orderId = generateOrderId();
  const orderDate = new Date();

  // Samee shayga dalabka (Order Object)
  const newOrder = {
    orderId: orderId,
    date: orderDate.toLocaleString('so-SO', { dateStyle: 'medium', timeStyle: 'short' }),
    timestamp: orderDate.getTime(),
    customer: {
      name: customerName,
      phone: `+252 ${customerPhone}`,
      district: district,
      address: address,
      notes: notes
    },
    paymentMethod: paymentMethod,
    items: appState.cart.map(c => {
      const p = PRODUCTS.find(prod => prod.id === c.id);
      return {
        id: c.id,
        name: p ? p.name : 'Alaab',
        unit: p ? p.unit : '',
        price: p ? p.price : 0,
        quantity: c.quantity,
        total: p ? p.price * c.quantity : 0
      };
    }),
    subtotal: subtotal,
    deliveryFee: deliveryFee,
    grandTotal: grandTotal,
    statusStep: 1, // 1: La sugayo xaqiijin, 2: La xaqiijiyey, 3: Diyaarin, 4: Delivery socda, 5: La gaarsiiyey
    statusText: 'La sugayo xaqiijin'
  };

  // Badhanka dirista geli qaab shaqeynaya (Loading simulation)
  const submitBtn = document.getElementById('btnConfirmOrder');
  const originalBtnText = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Fadlan sug, dalabka ayaa la dirayaa...`;

  setTimeout(() => {
    // 1. Keydi dalabka
    appState.orders.unshift(newOrder);
    saveOrdersToStorage();

    // 2. Faaruqi gaariga maadaama la dalbaday
    appState.cart = [];
    saveCartToStorage();
    updateCartUI();

    // 3. Dib u celi badhanka
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnText;

    // 4. Xidh Checkout modal
    closeCheckoutModal();

    // 5. Fur Success Modal oo muuji Order ID-ga
    showSuccessModal(newOrder);

    // Farriin guul ah
    showToast(`🎉 Dalabkaagu si guul leh ayuu u dhacay! Lambarku waa: ${orderId}`);
  }, 900);
}

/**
 * Samee Lambar Aqoonsi Gaar ah (Order ID Generator)
 * Qaabka: HYB-XXXXXX
 */
function generateOrderId() {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `HYB-${randomNum}`;
}

// ==============================================================================
// 10. SUCCESS MODAL (XAQUJIINTA DALABKA)
// ==============================================================================
function showSuccessModal(order) {
  const modal = document.getElementById('successModal');
  const orderIdEl = document.getElementById('successOrderId');
  const summaryEl = document.getElementById('successOrderSummary');

  if (orderIdEl) orderIdEl.textContent = order.orderId;

  if (summaryEl) {
    summaryEl.innerHTML = `
      <div class="summary-detail-row">
        <span>Macmiilka:</span>
        <strong>${order.customer.name}</strong>
      </div>
      <div class="summary-detail-row">
        <span>Telefoonka:</span>
        <strong>${order.customer.phone}</strong>
      </div>
      <div class="summary-detail-row">
        <span>Goobta Keenista:</span>
        <strong>${order.customer.district}, ${order.customer.address}</strong>
      </div>
      <div class="summary-detail-row">
        <span>Habka Lacag-bixinta:</span>
        <strong>${order.paymentMethod}</strong>
      </div>
      <div class="summary-detail-row" style="margin-top: 0.5rem; border-top: 1px dashed var(--border-light); padding-top: 0.5rem;">
        <span style="font-weight: 700;">Wadarta Lacagta:</span>
        <strong style="color: var(--primary-color); font-size: 1.1rem;">${CONFIG.CURRENCY}${order.grandTotal.toFixed(2)}</strong>
      </div>
    `;
  }

  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeSuccessModal() {
  const modal = document.getElementById('successModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/**
 * Koobiyeey Lambarka Dalabka
 */
function copyOrderId() {
  const orderId = document.getElementById('successOrderId').textContent;
  if (!orderId) return;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(orderId).then(() => {
      showToast(`📋 Lambarka ${orderId} waa la koobiyeeyay!`);
    }).catch(() => {
      fallbackCopy(orderId);
    });
  } else {
    fallbackCopy(orderId);
  }
}

function fallbackCopy(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand('copy');
    showToast(`📋 Lambarka ${text} waa la koobiyeeyay!`);
  } catch (err) {
    prompt("Koobiyeey lambarka dalabkaaga:", text);
  }
  document.body.removeChild(textArea);
}

/**
 * U gudub daaqadda dabagalka toos Success modal-ka
 */
function trackFromSuccessModal() {
  const orderId = document.getElementById('successOrderId').textContent;
  closeSuccessModal();
  openTrackModal();

  const trackInput = document.getElementById('trackOrderInput');
  if (trackInput && orderId) {
    trackInput.value = orderId;
    handleTrackOrder();
  }
}

// ==============================================================================
// 11. LA SOCO DALABKA (ORDER TRACKING SYSTEM - 5 HEERAR)
// ==============================================================================
const ORDER_STATUS_DETAILS = {
  1: {
    title: '1. La sugayo xaqiijin',
    desc: 'Dalabkaaga waa la diiwaangeliyay, waxaana hadda hubinaya kooxdayada adeegga macaamiisha.',
    icon: 'fa-solid fa-clock'
  },
  2: {
    title: '2. Dalabka waa la xaqiijiyey',
    desc: 'Dalabkaaga si rasmi ah ayaa loo xaqiijiyey, macluumaadkaaguna waa sax.',
    icon: 'fa-solid fa-clipboard-check'
  },
  3: {
    title: '3. Alaabta waa la diyaarinayaa',
    desc: 'Khudaarta, raashinka iyo dhammaan alaabtaada waxaa lagu gurayaa xirmooyin nadaafad leh oo qabow.',
    icon: 'fa-solid fa-boxes-packing'
  },
  4: {
    title: '4. Delivery-ga ayaa socda',
    desc: 'Wadihii mootada ayaa soo qaatay dalabkaaga, wuxuuna hadda ku soo socdaa goobtaada!',
    icon: 'fa-solid fa-motorcycle'
  },
  5: {
    title: '5. Alaabta waa la gaarsiiyey',
    desc: 'Hambalyo! Dalabkaagii si nabadgelyo ah ayaa kuugu soo gaaray albaabkaaga. Ku raaxayso dukaamaysigaaga!',
    icon: 'fa-solid fa-house-chimney-check'
  }
};

let currentTrackedOrder = null;

function openTrackModal() {
  const modal = document.getElementById('trackModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeTrackModal() {
  const modal = document.getElementById('trackModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function setTrackSampleId(id) {
  const trackInput = document.getElementById('trackOrderInput');
  if (trackInput) {
    trackInput.value = id;
    handleTrackOrder();
  }
}

/**
 * Raadi dalabka adigoo isticmaalaya Order ID
 */
function handleTrackOrder() {
  const trackInput = document.getElementById('trackOrderInput');
  const resultContainer = document.getElementById('trackResultContainer');
  const notFoundContainer = document.getElementById('trackNotFoundMessage');

  if (!trackInput) return;
  const idToFind = trackInput.value.trim().toUpperCase();

  if (!idToFind) {
    showToast(`Fadlan geli lambarka dalabkaaga (Order ID).`, 'error');
    return;
  }

  // Raadi dalabka kaydka
  const foundOrder = appState.orders.find(o => o.orderId.toUpperCase() === idToFind);

  if (foundOrder) {
    currentTrackedOrder = foundOrder;
    if (notFoundContainer) notFoundContainer.classList.add('hidden');
    if (resultContainer) resultContainer.classList.remove('hidden');

    renderTrackingStatus(foundOrder);
  } else {
    currentTrackedOrder = null;
    if (resultContainer) resultContainer.classList.add('hidden');
    if (notFoundContainer) notFoundContainer.classList.remove('hidden');
  }
}

/**
 * Soo bandhig xaaladda 5-ta tallaabo
 */
function renderTrackingStatus(order) {
  // 1. Meta xogta
  document.getElementById('trackDisplayId').textContent = order.orderId;
  document.getElementById('trackDisplayDate').textContent = order.date;
  document.getElementById('trackDisplayTotal').textContent = `${CONFIG.CURRENCY}${order.grandTotal.toFixed(2)}`;

  // 2. Timeline steps (1 ilaa 5)
  for (let i = 1; i <= 5; i++) {
    const stepEl = document.getElementById(`step${i}`);
    if (stepEl) {
      stepEl.classList.remove('active', 'completed');
      if (i < order.statusStep) {
        stepEl.classList.add('completed');
      } else if (i === order.statusStep) {
        stepEl.classList.add('active');
      }
    }
  }

  // 3. Status Banner
  const statusInfo = ORDER_STATUS_DETAILS[order.statusStep] || ORDER_STATUS_DETAILS[1];
  const titleEl = document.getElementById('currentStatusTitle');
  const descEl = document.getElementById('currentStatusDesc');
  const iconBoxEl = document.getElementById('statusBadgeIcon');

  if (titleEl) titleEl.textContent = statusInfo.title;
  if (descEl) descEl.textContent = statusInfo.desc;
  if (iconBoxEl) iconBoxEl.innerHTML = `<i class="${statusInfo.icon}"></i>`;
}

/**
 * Beddel heerka dalabka (Tusaale ahaan - Demo Simulator)
 */
function changeDemoStatus(stepNumber) {
  if (!currentTrackedOrder) return;

  currentTrackedOrder.statusStep = stepNumber;
  currentTrackedOrder.statusText = ORDER_STATUS_DETAILS[stepNumber].title;

  saveOrdersToStorage();
  renderTrackingStatus(currentTrackedOrder);

  showToast(`⚡ Xaaladda dalabka ${currentTrackedOrder.orderId} waxaa loo raray heerka ${stepNumber}.`);
}

/**
 * Keydinta dalabyada ee localStorage
 */
function saveOrdersToStorage() {
  try {
    localStorage.setItem(CONFIG.ORDERS_STORAGE_KEY, JSON.stringify(appState.orders));
  } catch (e) {
    console.error('Khalad ayaa dhacay xilliga keydinta dalabyada:', e);
  }
}

function loadOrdersFromStorage() {
  try {
    const stored = localStorage.getItem(CONFIG.ORDERS_STORAGE_KEY);
    if (stored) {
      appState.orders = JSON.parse(stored);
    }
  } catch (e) {
    console.error('Khalad ayaa dhacay xilliga soo saarista dalabyada:', e);
    appState.orders = [];
  }
}

/**
 * Ku shub dalab tusaale ah haddii aysan jirin wax dalab ah
 */
function seedDemoOrderIfEmpty() {
  if (appState.orders.length === 0) {
    const sampleOrder = {
      orderId: 'HYB-882104',
      date: 'Maanta, 2:30 Galabnimo',
      timestamp: Date.now() - 3600000,
      customer: {
        name: 'Faarax Axmed Guuleed',
        phone: '+252 61 555 4433',
        district: 'Hodan',
        address: 'Taleex, Waddada 1aad, Guriga #18',
        notes: 'Albaabka buluugga ah'
      },
      paymentMethod: 'Kaash Marka Alaabta La Keeno',
      items: [
        { id: 1, name: 'Bariis Baasmati Qalbi Daafi (5 Kg)', price: 7.50, quantity: 1, total: 7.50 },
        { id: 10, name: 'Yaanyo Cusub oo Dalka ah (1 Kg)', price: 1.20, quantity: 2, total: 2.40 },
        { id: 15, name: 'Moos Shabeelle oo Bisil (1 Xirmo)', price: 1.00, quantity: 2, total: 2.00 }
      ],
      subtotal: 11.90,
      deliveryFee: 2.00,
      grandTotal: 13.90,
      statusStep: 3, // Diyaarin
      statusText: 'Alaabta waa la diyaarinayaa'
    };

    appState.orders.push(sampleOrder);
    saveOrdersToStorage();
  }
}

// ==============================================================================
// 12. RAADINTA & DHAGAYSTAYAASHA (SEARCH & EVENT LISTENERS)
// ==============================================================================
function setupEventListeners() {
  // 1. Gaariga Fur/Xidh
  const btnOpenCart = document.getElementById('btnOpenCart');
  if (btnOpenCart) btnOpenCart.addEventListener('click', openCart);

  // 2. La Soco Dalabka Modal
  const btnOpenTrack = document.getElementById('btnOpenTrackModal');
  if (btnOpenTrack) btnOpenTrack.addEventListener('click', openTrackModal);

  // 3. Raadinta Header-ka
  const headerSearchInput = document.getElementById('headerSearchInput');
  const clearHeaderSearch = document.getElementById('clearHeaderSearch');

  if (headerSearchInput) {
    headerSearchInput.addEventListener('input', (e) => {
      appState.searchQuery = e.target.value;
      if (clearHeaderSearch) {
        clearHeaderSearch.classList.toggle('hidden', !e.target.value);
      }
      filterAndRenderProducts();
    });
  }

  if (clearHeaderSearch) {
    clearHeaderSearch.addEventListener('click', () => {
      if (headerSearchInput) headerSearchInput.value = '';
      appState.searchQuery = '';
      clearHeaderSearch.classList.add('hidden');
      filterAndRenderProducts();
    });
  }

  // 4. Raadinta Qeybta Alaabta (Products Section Search)
  const productSearchInput = document.getElementById('productSearchInput');
  const btnResetSearch = document.getElementById('btnResetSearch');

  if (productSearchInput) {
    productSearchInput.addEventListener('input', (e) => {
      appState.searchQuery = e.target.value;
      if (btnResetSearch) {
        btnResetSearch.classList.toggle('hidden', !e.target.value);
      }
      filterAndRenderProducts();
    });
  }

  if (btnResetSearch) {
    btnResetSearch.addEventListener('click', () => {
      if (productSearchInput) productSearchInput.value = '';
      appState.searchQuery = '';
      btnResetSearch.classList.add('hidden');
      filterAndRenderProducts();
    });
  }

  // 5. Raadinta Telefoonka (Mobile Search Input)
  const mobileSearchInput = document.getElementById('mobileSearchInput');
  if (mobileSearchInput) {
    mobileSearchInput.addEventListener('input', (e) => {
      appState.searchQuery = e.target.value;
      filterAndRenderProducts();
    });
  }

  // 6. Kala-saacidda (Sorting)
  const sortSelect = document.getElementById('productSortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      appState.sortBy = e.target.value;
      filterAndRenderProducts();
    });
  }

  // 7. Badhanka dib u bilaabista marka wax la waayo (Reset button)
  const btnResetFilters = document.getElementById('btnResetFilters');
  if (btnResetFilters) {
    btnResetFilters.addEventListener('click', () => {
      appState.selectedCategory = 'all';
      appState.searchQuery = '';
      if (productSearchInput) productSearchInput.value = '';
      if (headerSearchInput) headerSearchInput.value = '';
      renderCategoryPills();
      renderCategoriesGrid();
      filterAndRenderProducts();
    });
  }

  // 8. Mobile Menu Toggle
  const btnMobileToggle = document.getElementById('btnMobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (btnMobileToggle && navMenu) {
    btnMobileToggle.addEventListener('click', () => {
      btnMobileToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Marka link la gujiyo xidh menu-ga
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        btnMobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // 9. Payment Radio Card Styling
  const paymentCards = document.querySelectorAll('.payment-radio-card');
  paymentCards.forEach(card => {
    card.addEventListener('click', () => {
      paymentCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const radio = card.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
    });
  });

  // 10. Daaqadda Track input "Enter" key
  const trackOrderInput = document.getElementById('trackOrderInput');
  if (trackOrderInput) {
    trackOrderInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        handleTrackOrder();
      }
    });
  }

  // 11. Xiritaanka Modals marka meel bannaanka ah la gujiyo ama ESC la riixo
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCart();
      closeCheckoutModal();
      closeSuccessModal();
      closeTrackModal();
    }
  });

  // 12. Back To Top Button & Header Shadow on Scroll
  const btnBackToTop = document.getElementById('btnBackToTop');
  const mainHeader = document.getElementById('mainHeader');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Header shadow
    if (mainHeader) {
      if (scrollY > 30) {
        mainHeader.classList.add('scrolled');
      } else {
        mainHeader.classList.remove('scrolled');
      }
    }

    // Back to top button
    if (btnBackToTop) {
      if (scrollY > 400) {
        btnBackToTop.classList.remove('hidden');
      } else {
        btnBackToTop.classList.add('hidden');
      }
    }
  });

  if (btnBackToTop) {
    btnBackToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// ==============================================================================
// 13. CART DRAWER TOGGLES & HELPERS
// ==============================================================================
function openCart() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (drawer && overlay) {
    drawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeCart() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (drawer && overlay) {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function animateCartBadge() {
  const badge = document.getElementById('cartCountBadge');
  if (badge) {
    badge.classList.add('bump');
    setTimeout(() => {
      badge.classList.remove('bump');
    }, 300);
  }
}

// ==============================================================================
// 14. TOAST NOTIFICATIONS & CONTACT FORM
// ==============================================================================
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type === 'error' ? 'toast-error' : ''}`;
  
  const icon = type === 'error' 
    ? '<i class="fa-solid fa-triangle-exclamation"></i>' 
    : '<i class="fa-solid fa-circle-check"></i>';

  toast.innerHTML = `${icon} <span>${message}</span>`;
  container.appendChild(toast);

  // Si toos ah uga saar 4 ilbiriqsi kadib
  setTimeout(() => {
    if (toast.parentNode === container) {
      container.removeChild(toast);
    }
  }, 4000);
}

/**
 * Maamul foomka xiriirka (Contact Form)
 */
function handleContactSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('contactName').value;
  showToast(`✅ Mahadsanid ${name}! Fariintaada waan helnay, dhakhso ayaanna kuugu soo jawaabi doonnaa.`);
  document.getElementById('contactForm').reset();
}
