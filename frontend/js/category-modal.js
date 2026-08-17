/**
 * Asset Sheba — Dynamic Responsive N-Level Category Picker Modal Engine
 * Features:
 *  - Dynamic Screen-Size Driven Columns (Slick Slider data-slides-to-show standard):
 *      - Reads data-slides-to-show (e.g. "BPD: 3, BP-992: 2") dynamically.
 *      - Computes active visible columns per breakpoint (e.g. 3 on desktop, 2 on medium screens, 1 on mobile).
 *      - Automatically sizes all columns to exact 1/N percentage (e.g. 33.333% when 3, 50% when 2).
 *      - Renders clean blank placeholder columns when < visibleCols are active.
 *      - Slick Slider Pagination Dots automatically adapt to (totalColumns - visibleCols + 1).
 *      - Smooth slide transitions on navigation and breadcrumb clicks.
 *  - Unified Clean Column Headers (simple "Categories" for Level 0, category name for sub-levels).
 *  - Mobile (< 768px): Fully recursive step-by-step drilldown with Back navigation & "All in [Folder]".
 *  - 100% architectural parity with Location Modal.
 */

(function () {
  'use strict';

  // Comprehensive Multi-Level Category Data (Supports 1, 2, 3, 4, 5+ levels)
  const CATEGORY_DATA = [
    {
      id: 'cat-fashion-men',
      name: "Men's Fashion",
      icon: 'fa-solid fa-shirt',
      badge: 'Popular',
      count: 420,
      children: [
        {
          id: 'cat-men-ethnic',
          name: 'Ethnic & Traditional',
          icon: 'fa-solid fa-vest',
          count: 180,
          children: [
            {
              id: 'cat-men-panjabi',
              name: 'Panjabi & Pajama',
              count: 120,
              children: [
                {
                  id: 'cat-panjabi-silk',
                  name: 'Silk & Premium Panjabi',
                  count: 45,
                  children: [
                    { id: 'cat-panjabi-silk-handwork', name: 'Hand Embroidered Silk', count: 25 },
                    { id: 'cat-panjabi-silk-plain', name: 'Solid Pure Silk', count: 20 }
                  ]
                },
                { id: 'cat-panjabi-cotton', name: 'Cotton & Casual Panjabi', count: 50 },
                { id: 'cat-panjabi-kabli', name: 'Kabli Sets', count: 25 }
              ]
            },
            { id: 'cat-men-fotua', name: 'Katua & Fotua', count: 35 },
            { id: 'cat-men-koti', name: 'Koti & Waistcoat', count: 25 }
          ]
        },
        {
          id: 'cat-men-western',
          name: 'Western Wear',
          icon: 'fa-solid fa-user-tie',
          count: 150,
          children: [
            {
              id: 'cat-men-shirts',
              name: 'Shirts',
              count: 85,
              children: [
                { id: 'cat-shirt-formal', name: 'Formal Office Shirts', count: 45 },
                { id: 'cat-shirt-casual', name: 'Casual Printed Shirts', count: 40 }
              ]
            },
            { id: 'cat-men-polo', name: 'Polo T-Shirts', count: 65 }
          ]
        },
        {
          id: 'cat-men-bottoms',
          name: 'Pants & Trousers',
          icon: 'fa-solid fa-person',
          count: 90,
          children: [
            { id: 'cat-men-jeans', name: 'Jeans & Denim', count: 50 },
            { id: 'cat-men-chino', name: 'Chinos & Gabardine', count: 25 },
            { id: 'cat-men-joggers', name: 'Joggers & Sweatpants', count: 15 }
          ]
        }
      ]
    },
    {
      id: 'cat-fashion-women',
      name: "Women's Fashion",
      icon: 'fa-solid fa-person-dress',
      badge: 'Hot',
      count: 580,
      children: [
        {
          id: 'cat-women-traditional',
          name: 'Traditional Wear',
          icon: 'fa-solid fa-spa',
          count: 320,
          children: [
            {
              id: 'cat-women-saree',
              name: 'Sarees',
              count: 180,
              children: [
                { id: 'cat-saree-jamdani', name: 'Dhakai Jamdani', count: 60 },
                { id: 'cat-saree-silk', name: 'Katan & Silk Sarees', count: 70 },
                { id: 'cat-saree-cotton', name: 'Cotton & Tant Sarees', count: 50 }
              ]
            },
            { id: 'cat-women-salwar', name: 'Salwar Kameez & Three Piece', count: 95 },
            { id: 'cat-women-kurti', name: 'Kurtis & Tunics', count: 45 }
          ]
        },
        {
          id: 'cat-women-modest',
          name: 'Abayas & Modest Wear',
          icon: 'fa-solid fa-eye',
          count: 140,
          children: [
            { id: 'cat-women-borka', name: 'Borka & Dubai Abayas', count: 85 },
            { id: 'cat-women-hijab', name: 'Hijabs & Dupattas', count: 55 }
          ]
        },
        {
          id: 'cat-women-jewels',
          name: 'Bags & Jewellery',
          icon: 'fa-solid fa-gem',
          count: 120,
          children: [
            { id: 'cat-women-handbag', name: 'Handbags & Purses', count: 70 },
            { id: 'cat-women-jewellery', name: 'Fashion Jewellery', count: 50 }
          ]
        }
      ]
    },
    {
      id: 'cat-real-estate',
      name: 'Real Estate & Property',
      icon: 'fa-solid fa-building',
      badge: 'Featured',
      count: 350,
      children: [
        {
          id: 'cat-property-apartments',
          name: 'Apartments & Flats',
          icon: 'fa-solid fa-city',
          count: 190,
          children: [
            {
              id: 'cat-flat-rent',
              name: 'Flat for Rent',
              count: 110,
              children: [
                { id: 'cat-rent-family', name: 'Family Apartments', count: 60 },
                { id: 'cat-rent-sublet', name: 'Bachelor Sublet & Rooms', count: 35 },
                { id: 'cat-rent-furnished', name: 'Fully Furnished Flats', count: 15 }
              ]
            },
            { id: 'cat-flat-sell', name: 'Flat for Sale', count: 65 },
            { id: 'cat-flat-studio', name: 'Studio Apartments', count: 15 }
          ]
        },
        {
          id: 'cat-property-commercial',
          name: 'Commercial Space',
          icon: 'fa-solid fa-shop',
          count: 90,
          children: [
            { id: 'cat-comm-office', name: 'Office Spaces', count: 45 },
            { id: 'cat-comm-shop', name: 'Shops & Showrooms', count: 30 },
            { id: 'cat-comm-warehouse', name: 'Warehouses & Godowns', count: 15 }
          ]
        },
        {
          id: 'cat-property-land',
          name: 'Land & Plots',
          icon: 'fa-solid fa-mountain-sun',
          count: 70,
          children: [
            { id: 'cat-land-residential', name: 'Residential Plots', count: 40 },
            { id: 'cat-land-commercial', name: 'Commercial Land', count: 20 },
            { id: 'cat-land-agro', name: 'Agricultural Land', count: 10 }
          ]
        }
      ]
    },
    {
      id: 'cat-electronics',
      name: 'Electronics & Gadgets',
      icon: 'fa-solid fa-laptop',
      count: 480,
      children: [
        {
          id: 'cat-elec-computers',
          name: 'Computers & Laptops',
          icon: 'fa-solid fa-display',
          count: 170,
          children: [
            {
              id: 'cat-comp-laptops',
              name: 'Laptops',
              count: 90,
              children: [
                {
                  id: 'cat-laptop-gaming',
                  name: 'Gaming Laptops',
                  count: 40,
                  children: [
                    { id: 'cat-gaming-asus', name: 'ASUS ROG / TUF', count: 20 },
                    { id: 'cat-gaming-acer', name: 'Acer Predator / Nitro', count: 12 },
                    { id: 'cat-gaming-lenovo', name: 'Lenovo Legion', count: 8 }
                  ]
                },
                { id: 'cat-laptop-macbook', name: 'Apple MacBooks', count: 30 },
                { id: 'cat-laptop-ultrabook', name: 'Ultrabooks & Slim Laptops', count: 20 }
              ]
            },
            { id: 'cat-comp-desktops', name: 'Desktop & Custom PCs', count: 50 },
            { id: 'cat-comp-peripherals', name: 'Monitors & Keyboards', count: 30 }
          ]
        },
        {
          id: 'cat-elec-mobile',
          name: 'Mobile Phones & Tabs',
          icon: 'fa-solid fa-mobile-screen-button',
          count: 210,
          children: [
            { id: 'cat-mobile-smartphones', name: 'Smartphones (iPhone, Samsung, Xiaomi)', count: 140 },
            { id: 'cat-mobile-tablets', name: 'Tablets & iPads', count: 40 },
            { id: 'cat-mobile-accessories', name: 'Mobile Accessories', count: 30 }
          ]
        },
        {
          id: 'cat-elec-appliances',
          name: 'Home Appliances',
          icon: 'fa-solid fa-tv',
          count: 100,
          children: [
            { id: 'cat-app-tv', name: 'Smart 4K TVs', count: 40 },
            { id: 'cat-app-fridge', name: 'Refrigerators & Freezers', count: 35 },
            { id: 'cat-app-ac', name: 'Air Conditioners (Inverter AC)', count: 25 }
          ]
        }
      ]
    },
    {
      id: 'cat-vehicles',
      name: 'Vehicles & Motors',
      icon: 'fa-solid fa-car',
      count: 260,
      children: [
        {
          id: 'cat-veh-cars',
          name: 'Cars & Automobiles',
          icon: 'fa-solid fa-car-side',
          count: 140,
          children: [
            { id: 'cat-car-sedan', name: 'Sedan Cars', count: 70 },
            { id: 'cat-car-suv', name: 'SUVs & Crossovers', count: 45 },
            { id: 'cat-car-hatchback', name: 'Hatchbacks & Micro', count: 25 }
          ]
        },
        {
          id: 'cat-veh-bikes',
          name: 'Motorcycles & Scooters',
          icon: 'fa-solid fa-motorcycle',
          count: 90,
          children: [
            { id: 'cat-bike-commuter', name: 'Commuter Bikes (100-150cc)', count: 55 },
            { id: 'cat-bike-sports', name: 'Sports & Naked Bikes', count: 25 },
            { id: 'cat-bike-scooter', name: 'Electric Scooters', count: 10 }
          ]
        },
        {
          id: 'cat-veh-parts',
          name: 'Auto Parts & Accessories',
          icon: 'fa-solid fa-gear',
          count: 30,
          children: [
            { id: 'cat-parts-engine', name: 'Engine & Body Parts', count: 15 },
            { id: 'cat-parts-accessories', name: 'Car Interior & Helmets', count: 15 }
          ]
        }
      ]
    },
    {
      id: 'cat-services',
      name: 'Services & Technicians',
      icon: 'fa-solid fa-screwdriver-wrench',
      count: 310,
      children: [
        {
          id: 'cat-srv-home-repair',
          name: 'Home Repair & Maintenance',
          icon: 'fa-solid fa-wrench',
          count: 130,
          children: [
            { id: 'cat-srv-electrician', name: 'Electrician & Wiring', count: 50 },
            { id: 'cat-srv-plumbing', name: 'Plumbing & Sanitary Fixes', count: 45 },
            { id: 'cat-srv-ac-repair', name: 'AC Servicing & Gas Refill', count: 35 }
          ]
        },
        {
          id: 'cat-srv-cleaning',
          name: 'Cleaning & Pest Control',
          icon: 'fa-solid fa-broom',
          count: 90,
          children: [
            { id: 'cat-srv-deep-clean', name: 'Home Deep Cleaning', count: 45 },
            { id: 'cat-srv-pest-control', name: 'Pest Control Services', count: 30 }
          ]
        },
        {
          id: 'cat-srv-shifting',
          name: 'Shifting & Logistics',
          icon: 'fa-solid fa-truck-moving',
          count: 90,
          children: [
            { id: 'cat-srv-home-shift', name: 'House Shifting & Packers', count: 50 },
            { id: 'cat-srv-office-shift', name: 'Commercial Office Shifting', count: 40 }
          ]
        }
      ]
    },
    {
      id: 'cat-education',
      name: 'Education & Coaching',
      icon: 'fa-solid fa-graduation-cap',
      count: 240,
      children: [
        {
          id: 'cat-edu-tuition',
          name: 'Tuition & Academic',
          icon: 'fa-solid fa-chalkboard-user',
          count: 110,
          children: [
            { id: 'cat-edu-home-tutor', name: 'Home Tutors (Class 1-12)', count: 60 },
            { id: 'cat-edu-admission', name: 'University Admission Coaching', count: 35 }
          ]
        },
        {
          id: 'cat-edu-skills',
          name: 'Professional Courses & IT',
          icon: 'fa-solid fa-code',
          count: 80,
          children: [
            { id: 'cat-edu-web-dev', name: 'Web & App Development', count: 35 },
            { id: 'cat-edu-graphics', name: 'Graphic Design & UI/UX', count: 25 },
            { id: 'cat-edu-digital-mktg', name: 'Digital Marketing & SEO', count: 20 }
          ]
        }
      ]
    },
    {
      id: 'cat-home-living',
      name: 'Home & Furniture',
      icon: 'fa-solid fa-couch',
      count: 190,
      children: [
        {
          id: 'cat-home-furniture',
          name: 'Furniture',
          icon: 'fa-solid fa-chair',
          count: 110,
          children: [
            { id: 'cat-furn-sofa', name: 'Sofas & Living Room Sets', count: 45 },
            { id: 'cat-furn-bed', name: 'Beds & Wardrobes', count: 40 },
            { id: 'cat-furn-dining', name: 'Dining Tables & Chairs', count: 25 }
          ]
        },
        {
          id: 'cat-home-decor',
          name: 'Home Decor & Lighting',
          icon: 'fa-solid fa-lightbulb',
          count: 80,
          children: [
            { id: 'cat-decor-lights', name: 'Chandeliers & Smart Lights', count: 35 },
            { id: 'cat-decor-curtains', name: 'Curtains & Luxury Rugs', count: 25 }
          ]
        }
      ]
    },
    {
      id: 'cat-jobs',
      name: 'Jobs & Employment',
      icon: 'fa-solid fa-briefcase',
      count: 170,
      children: [
        {
          id: 'cat-job-it',
          name: 'IT & Software Jobs',
          icon: 'fa-solid fa-laptop-code',
          count: 70,
          children: [
            { id: 'cat-job-software-eng', name: 'Software Engineer / Developer', count: 40 },
            { id: 'cat-job-sqa', name: 'SQA & DevOps Engineer', count: 30 }
          ]
        },
        {
          id: 'cat-job-marketing',
          name: 'Sales & Marketing Jobs',
          icon: 'fa-solid fa-bullhorn',
          count: 60,
          children: [
            { id: 'cat-job-field-sales', name: 'Field Sales Executive', count: 35 },
            { id: 'cat-job-tele-sales', name: 'Telemarketing & Client Support', count: 25 }
          ]
        }
      ]
    }
  ];

  // Dynamic Hierarchy State
  const state = {
    pathStack: [],            // Array of selected category node objects: [Node0, Node1, Node2, ... NodeN]
    activeSelection: null,    // Currently chosen category object { id, name, path }
    searchQuery: '',
    isOpen: false
  };

  // Helper: Find item by ID recursively
  function findCategoryById(id, list = CATEGORY_DATA, currentPath = []) {
    for (const item of list) {
      const path = [...currentPath, item];
      if (item.id === id) {
        return { item, path };
      }
      if (item.children && item.children.length) {
        const found = findCategoryById(id, item.children, path);
        if (found) return found;
      }
    }
    return null;
  }

  // Helper: Flatten all categories for fast search
  function getFlatCategoryList(list = CATEGORY_DATA, parentPath = []) {
    let result = [];
    for (const item of list) {
      const fullPath = [...parentPath, item.name];
      result.push({
        id: item.id,
        name: item.name,
        icon: item.icon,
        count: item.count || 0,
        pathString: fullPath.join(' > '),
        itemRef: item,
        hasChildren: !!(item.children && item.children.length)
      });
      if (item.children && item.children.length) {
        result = result.concat(getFlatCategoryList(item.children, fullPath));
      }
    }
    return result;
  }

  const ALL_CATEGORIES_FLAT = getFlatCategoryList();

  // Cached DOM elements
  let dom = {};

  function initDOM() {
    dom = {
      modal: document.getElementById('category-modal'),
      backdrop: document.getElementById('category-modal-backdrop'),
      dialog: document.getElementById('category-modal-dialog'),
      closeBtn: document.getElementById('close-category-modal'),
      backBtn: document.getElementById('cat-modal-back-btn'),
      title: document.getElementById('cat-modal-title'),
      searchInput: document.getElementById('cat-search-input'),
      clearSearchBtn: document.getElementById('cat-clear-search'),
      breadcrumbWrapper: document.getElementById('cat-breadcrumb-wrapper'),

      // Search view
      searchView: document.getElementById('cat-search-view'),
      searchList: document.getElementById('cat-search-list'),

      // Dynamic Desktop Miller Columns Container & Slick Dots Indicator
      desktopColumnsContainer: document.getElementById('cat-desktop-columns-container'),
      sliderDots: document.getElementById('cat-slider-dots'),

      // Mobile Drilldown View
      mobileView: document.getElementById('cat-mobile-drilldown-view'),
      mobileListContainer: document.getElementById('cat-mobile-list-container'),

      // Empty State
      emptyState: document.getElementById('cat-empty-state'),
      resetSearchBtn: document.getElementById('cat-reset-search-btn'),

      // Footer Actions
      footerSelectionText: document.getElementById('cat-footer-selection-text'),
      clearAllBtn: document.getElementById('cat-clear-all-btn'),
      confirmBtn: document.getElementById('cat-confirm-btn'),

      // Banner trigger
      bannerTriggerBtn: document.getElementById('banner-category-btn'),
      bannerCategoryLabel: document.getElementById('banner-category-label')
    };
  }

  // =========================================================================
  // Responsive Columns Resolution (Slick Slider Standard: data-slides-to-show)
  // =========================================================================
  function resolveResponsiveVal(dataAttrStr, defaultVal = 3) {
    if (!dataAttrStr) return defaultVal;
    const str = String(dataAttrStr).trim();
    if (!isNaN(Number(str))) return Math.max(1, Number(str));

    let bpdVal = defaultVal;
    const rules = [];

    if (str.includes(':')) {
      str.split(',').forEach(item => {
        const parts = item.trim().split(':');
        if (parts.length < 2) return;
        const bpKey = parts[0].trim().toUpperCase();
        const rawVal = parseInt(parts[1].trim(), 10);
        if (isNaN(rawVal)) return;

        if (bpKey === 'BPD') {
          bpdVal = rawVal;
        } else {
          const bpNum = parseInt(bpKey.replace('BP-', ''), 10);
          if (!isNaN(bpNum)) {
            rules.push({ bp: bpNum, val: rawVal });
          }
        }
      });

      // Sort ascending by breakpoint number (e.g. 576, 768, 992)
      rules.sort((a, b) => a.bp - b.bp);

      const currentW = window.innerWidth;
      for (let i = 0; i < rules.length; i++) {
        if (currentW <= rules[i].bp) {
          return rules[i].val;
        }
      }
    }
    return bpdVal;
  }

  function getVisibleColumnsCount() {
    const container = dom.desktopColumnsContainer || dom.modal;
    const attr = container?.getAttribute('data-slides-to-show') || 
                 container?.getAttribute('data-columns-to-show') || 
                 dom.modal?.getAttribute('data-slides-to-show') || 
                 'BPD: 3, BP-992: 2';

    return Math.max(1, resolveResponsiveVal(attr, 3));
  }

  // =========================================================================
  // Desktop Dynamic N-Level Miller Columns Carousel Renderer
  // =========================================================================
  function renderDesktopColumns() {
    if (!dom.desktopColumnsContainer) return;
    dom.desktopColumnsContainer.innerHTML = '';

    // Calculate columns data for all active depths
    const columnsData = [];

    // Always push Level 0 (Root categories)
    columnsData.push({
      depth: 0,
      title: 'Categories', // Unified clean title
      items: CATEGORY_DATA,
      selectedNode: state.pathStack[0] || (state.activeSelection ? CATEGORY_DATA.find(c => c.id === state.activeSelection.id) : null),
      parentNode: null
    });

    // Dynamically push subsequent levels based on active pathStack
    for (let depth = 0; depth < state.pathStack.length; depth++) {
      const parentNode = state.pathStack[depth];
      if (parentNode && parentNode.children && parentNode.children.length > 0) {
        const nextSelectedNode = state.pathStack[depth + 1] || 
          (state.activeSelection ? parentNode.children.find(c => c.id === state.activeSelection.id) : null);

        columnsData.push({
          depth: depth + 1,
          title: parentNode.name, // Clean category name
          items: parentNode.children,
          selectedNode: nextSelectedNode,
          parentNode: parentNode
        });
      }
    }

    // Dynamic resolution based on data-slides-to-show / screen width
    const visibleCols = getVisibleColumnsCount();
    const colWidthPct = (100 / visibleCols).toFixed(4) + '%';

    // Ensure at least visibleCols columns are rendered so viewport is 100% filled
    const totalColumnsToRender = Math.max(visibleCols, columnsData.length);

    for (let i = 0; i < totalColumnsToRender; i++) {
      const colData = columnsData[i];

      const colEl = document.createElement('div');
      colEl.className = 'flex flex-col h-full overflow-hidden shrink-0 bg-white dark:bg-slate-900/60 first:bg-slate-50/40 dark:first:bg-slate-900/40 snap-start';
      colEl.style.width = colWidthPct;
      colEl.style.minWidth = colWidthPct;
      colEl.style.maxWidth = colWidthPct;

      if (colData) {
        // --- Active Column Header (Unified Clean Design) ---
        const isRoot = colData.depth === 0;
        const totalItemsCount = colData.items.length;

        const headerEl = document.createElement('div');
        headerEl.className = 'h-10 px-4 bg-slate-100 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800 shrink-0 flex items-center justify-between gap-2 select-none';
        headerEl.innerHTML = `
          <span class="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider truncate">${colData.title}</span>
          <span class="text-[10px] text-slate-400 font-medium shrink-0">${totalItemsCount} items</span>
        `;
        colEl.appendChild(headerEl);

        // --- Column Body ---
        const listEl = document.createElement('div');
        listEl.className = 'flex-1 overflow-y-auto p-3 space-y-1.5 scrollbar-thin';

        // Add "All in [Parent]" option if not the root level
        if (!isRoot && colData.parentNode) {
          const isParentSelfActive = state.activeSelection && state.activeSelection.id === colData.parentNode.id && state.pathStack.length === colData.depth;

          const allInParentEl = document.createElement('div');
          allInParentEl.className = `flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all border text-xs font-bold select-none mb-1.5 gap-2 ${
            isParentSelfActive
              ? 'bg-theme-primary text-white border-theme-primary shadow-xs'
              : 'bg-slate-50 dark:bg-slate-800/40 border-dashed border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-theme-primary/5 hover:border-theme-primary/40 hover:text-theme-primary'
          }`;
          allInParentEl.innerHTML = `
            <div class="flex items-center gap-2 min-w-0 flex-1">
              <i class="fa-solid fa-tags text-[11px] shrink-0 ${isParentSelfActive ? 'text-white' : 'text-theme-primary'}"></i>
              <span class="truncate">All in ${colData.parentNode.name}</span>
            </div>
            <div class="shrink-0">
              ${isParentSelfActive ? '<i class="fa-solid fa-check text-[10px]"></i>' : '<span class="text-[10px] opacity-70 font-normal">Select</span>'}
            </div>
          `;

          allInParentEl.addEventListener('click', () => {
            state.pathStack = state.pathStack.slice(0, colData.depth);
            setActiveSelection(colData.parentNode, [...state.pathStack]);
            renderDesktopColumns();
            renderMobileDrilldown();
            updateSelectionUI();
          });

          listEl.appendChild(allInParentEl);
        }

        // Render each category item in this column
        colData.items.forEach(item => {
          const isSelected = colData.selectedNode && colData.selectedNode.id === item.id;
          const hasChildren = item.children && item.children.length > 0;

          const itemEl = document.createElement('div');
          itemEl.className = `group flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all duration-200 border text-xs select-none gap-2 ${
            isSelected
              ? 'bg-theme-primary/10 border-theme-primary/40 text-theme-primary font-bold shadow-xs'
              : 'bg-white dark:bg-slate-800/80 border-slate-200/80 dark:border-slate-700/60 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300'
          }`;

          itemEl.innerHTML = `
            <div class="flex items-center gap-2 min-w-0 flex-1">
              <div class="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                isSelected
                  ? 'bg-theme-primary text-white'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 group-hover:bg-theme-primary/10 group-hover:text-theme-primary'
              }">
                <i class="${item.icon || (hasChildren ? 'fa-solid fa-folder' : 'fa-solid fa-circle-dot')} text-[10px]"></i>
              </div>
              <span class="truncate font-semibold">${item.name}</span>
            </div>
            <div class="flex items-center gap-1.5 shrink-0 text-[10px]">
              ${
                item.badge
                  ? `<span class="px-1 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400">${item.badge}</span>`
                  : ''
              }
              <span class="text-slate-400 font-normal">(${item.count || 0})</span>
              ${
                hasChildren
                  ? `<i class="fa-solid fa-chevron-right text-[8px] transition-transform ${isSelected ? 'text-theme-primary translate-x-0.5' : 'text-slate-300 dark:text-slate-600 group-hover:text-slate-400'}"></i>`
                  : (isSelected ? '<i class="fa-solid fa-check text-[10px] text-theme-primary"></i>' : '')
              }
            </div>
          `;

          itemEl.addEventListener('click', () => {
            state.pathStack = state.pathStack.slice(0, colData.depth);
            if (hasChildren) {
              state.pathStack.push(item);
              setActiveSelection(item, [...state.pathStack]);
            } else {
              setActiveSelection(item, [...state.pathStack, item]);
            }

            renderDesktopColumns();
            renderMobileDrilldown();
            updateSelectionUI();
          });

          listEl.appendChild(itemEl);
        });

        colEl.appendChild(listEl);
      } else {
        // --- Clean Blank Placeholder Column ---
        const headerEl = document.createElement('div');
        headerEl.className = 'h-10 px-4 bg-slate-100 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800 shrink-0 flex items-center justify-between gap-2 select-none';
        headerEl.innerHTML = `
          <span class="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Subcategories</span>
          <span class="text-[10px] text-slate-400 opacity-0 pointer-events-none">0 items</span>
        `;
        colEl.appendChild(headerEl);

        const emptyBody = document.createElement('div');
        emptyBody.className = 'flex-1 flex flex-col items-center justify-center p-6 text-center text-slate-400';
        emptyBody.innerHTML = `
          <i class="fa-solid fa-folder-open text-2xl mb-2 opacity-30"></i>
          <p class="text-xs text-slate-400">Select a category to view sub-levels</p>
        `;
        colEl.appendChild(emptyBody);
      }

      dom.desktopColumnsContainer.appendChild(colEl);
    }

    // Carousel Slider viewport positioning (instant, clean, no unwanted sliding animation):
    if (dom.desktopColumnsContainer) {
      const colWidth = dom.desktopColumnsContainer.clientWidth / visibleCols;
      if (columnsData.length > visibleCols) {
        const targetScrollLeft = (columnsData.length - visibleCols) * colWidth;
        dom.desktopColumnsContainer.scrollLeft = targetScrollLeft;
      } else {
        dom.desktopColumnsContainer.scrollLeft = 0;
      }
    }

    updateSliderControls(columnsData.length, visibleCols);
  }

  // =========================================================================
  // Slick Slider Controls: Pagination Dots Indicator
  // =========================================================================
  function updateSliderControls(totalColumns, visibleCols = 3) {
    if (!dom.desktopColumnsContainer) return;

    const maxSlidePositions = Math.max(0, totalColumns - visibleCols);

    // Slick Slider Dots
    if (dom.sliderDots) {
      if (totalColumns > visibleCols) {
        dom.sliderDots.classList.remove('hidden');
        dom.sliderDots.innerHTML = '';

        const totalDots = maxSlidePositions + 1;

        for (let idx = 0; idx < totalDots; idx++) {
          const dot = document.createElement('button');
          dot.type = 'button';
          dot.setAttribute('aria-label', `Go to slide position ${idx + 1}`);
          dot.className = 'w-2 h-2 rounded-full bg-white/40 hover:bg-white/90 transition-all duration-300 cursor-pointer border-none p-0';
          dot.setAttribute('data-slide-index', idx);

          dot.addEventListener('click', (e) => {
            e.stopPropagation();
            const colWidth = dom.desktopColumnsContainer.clientWidth / visibleCols;
            dom.desktopColumnsContainer.scrollLeft = idx * colWidth;
          });

          dom.sliderDots.appendChild(dot);
        }
      } else {
        dom.sliderDots.classList.add('hidden');
      }
    }

    // Sync active dot on scroll
    const syncActiveControls = () => {
      if (!dom.desktopColumnsContainer || !dom.sliderDots || totalColumns <= visibleCols) return;

      const colWidth = dom.desktopColumnsContainer.clientWidth / visibleCols;
      const currentScroll = dom.desktopColumnsContainer.scrollLeft;
      const activeIndex = Math.round(currentScroll / colWidth);

      const dots = dom.sliderDots.querySelectorAll('[data-slide-index]');
      dots.forEach((dot, idx) => {
        if (idx === activeIndex) {
          dot.className = 'w-5 h-2 rounded-full bg-theme-primary shadow-xs transition-all duration-300 cursor-pointer border-none p-0';
        } else {
          dot.className = 'w-2 h-2 rounded-full bg-white/40 hover:bg-white/90 transition-all duration-300 cursor-pointer border-none p-0';
        }
      });
    };

    setTimeout(syncActiveControls, 100);
    dom.desktopColumnsContainer.onscroll = syncActiveControls;
  }

  // =========================================================================
  // Mobile 1-Column Step Drilldown View (Fully Recursive N-Levels)
  // =========================================================================
  function renderMobileDrilldown() {
    if (!dom.mobileListContainer) return;
    dom.mobileListContainer.innerHTML = '';

    const currentStack = state.pathStack;
    const isInsideFolder = currentStack.length > 0;
    const currentFolder = isInsideFolder ? currentStack[currentStack.length - 1] : null;

    // Update Back button visibility
    if (dom.backBtn) {
      if (isInsideFolder) {
        dom.backBtn.classList.remove('hidden');
      } else {
        dom.backBtn.classList.add('hidden');
      }
    }

    // Update dynamic modal title
    if (dom.title) {
      if (isInsideFolder) {
        dom.title.innerHTML = `Select Category in <span class="text-theme-primary">${currentFolder.name}</span>`;
      } else {
        dom.title.innerHTML = `Select <span class="text-theme-primary">Category</span>`;
      }
    }

    // 1. "All in [Current Folder]" option
    const allOptionEl = document.createElement('div');
    const isAllSelected = isInsideFolder
      ? state.activeSelection && state.activeSelection.id === currentFolder.id
      : !state.activeSelection || state.activeSelection.id === 'all';

    allOptionEl.className = `flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border text-xs font-bold select-none mb-2 gap-2 ${
      isAllSelected
        ? 'bg-theme-primary text-white border-theme-primary shadow-xs'
        : 'bg-slate-50 dark:bg-slate-800/40 border-dashed border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-theme-primary/5 hover:border-theme-primary/40 hover:text-theme-primary'
    }`;

    allOptionEl.innerHTML = `
      <div class="flex items-center gap-2.5 min-w-0 flex-1">
        <div class="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
          isAllSelected ? 'bg-white/20 text-white' : 'bg-theme-primary/10 text-theme-primary'
        }">
          <i class="fa-solid fa-tags text-[11px]"></i>
        </div>
        <span class="truncate">${isInsideFolder ? `All in ${currentFolder.name}` : 'All Categories'}</span>
      </div>
      <div class="shrink-0">
        ${isAllSelected ? '<i class="fa-solid fa-check text-[11px]"></i>' : '<span class="text-[10px] opacity-70 font-normal">Select</span>'}
      </div>
    `;

    allOptionEl.addEventListener('click', () => {
      if (isInsideFolder) {
        setActiveSelection(currentFolder, [...currentStack]);
      } else {
        resetSelectionState();
      }
      renderDesktopColumns();
      renderMobileDrilldown();
      updateSelectionUI();
    });

    dom.mobileListContainer.appendChild(allOptionEl);

    // 2. Current level items list
    const currentList = isInsideFolder ? (currentFolder.children || []) : CATEGORY_DATA;

    currentList.forEach(item => {
      const hasChildren = item.children && item.children.length > 0;
      const isSelected = state.activeSelection && state.activeSelection.id === item.id;

      const rowEl = document.createElement('div');
      rowEl.className = `flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border text-xs font-semibold select-none mb-1.5 gap-2 ${
        isSelected
          ? 'bg-theme-primary/10 border-theme-primary/40 text-theme-primary font-bold shadow-xs'
          : 'bg-white dark:bg-slate-800 border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750'
      }`;

      rowEl.innerHTML = `
        <div class="flex items-center gap-2.5 min-w-0 flex-1">
          <div class="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
            isSelected
              ? 'bg-theme-primary text-white'
              : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
          }">
            <i class="${item.icon || (hasChildren ? 'fa-solid fa-folder' : 'fa-solid fa-circle-dot')} text-[11px]"></i>
          </div>
          <span class="truncate">${item.name}</span>
        </div>
        <div class="flex items-center gap-2 shrink-0">
          <span class="text-[10px] text-slate-400 font-normal">${item.count || 0} listings</span>
          ${
            hasChildren
              ? '<i class="fa-solid fa-chevron-right text-[10px] text-slate-300 dark:text-slate-600"></i>'
              : (isSelected ? '<i class="fa-solid fa-check text-[11px] text-theme-primary"></i>' : '')
          }
        </div>
      `;

      rowEl.addEventListener('click', () => {
        if (hasChildren) {
          state.pathStack.push(item);
          setActiveSelection(item, [...state.pathStack]);
        } else {
          setActiveSelection(item, [...state.pathStack, item]);
        }
        renderMobileDrilldown();
        renderDesktopColumns();
        updateSelectionUI();
      });

      dom.mobileListContainer.appendChild(rowEl);
    });
  }

  // =========================================================================
  // State Setters
  // =========================================================================
  function setActiveSelection(item, pathArray = []) {
    state.activeSelection = {
      id: item.id,
      name: item.name,
      path: pathArray.map(p => p.name)
    };
  }

  function resetSelectionState() {
    state.pathStack = [];
    state.activeSelection = null;
  }

  // =========================================================================
  // Breadcrumb Trail & Selection Sync
  // =========================================================================
  function updateSelectionUI() {
    const fullPath = state.activeSelection && state.activeSelection.path && state.activeSelection.path.length
      ? state.activeSelection.path
      : [];

    // Plain-text Category Trail matching Location Modal exactly
    if (dom.breadcrumbWrapper) {
      if (fullPath.length === 0) {
        dom.breadcrumbWrapper.innerHTML = `<span class="text-slate-400">All Categories</span>`;
      } else {
        const breadcrumbHtml = fullPath.map((name, idx) => {
          const isCurrent = idx === fullPath.length - 1;
          if (isCurrent) {
            return `<span class="text-theme-primary font-bold shrink-0">${name}</span>`;
          } else {
            return `<button type="button" data-cat-jump="${idx}" class="text-slate-400 dark:text-slate-400 hover:text-theme-primary transition-colors cursor-pointer hover:underline underline-offset-2 shrink-0">${name}</button>`;
          }
        }).join('<span class="text-slate-300 dark:text-slate-600 mx-1 shrink-0">/</span>');

        dom.breadcrumbWrapper.innerHTML = breadcrumbHtml;

        // Auto-scroll breadcrumbs container so the last (active) item is always inside view!
        setTimeout(() => {
          if (dom.breadcrumbWrapper) {
            dom.breadcrumbWrapper.scrollTo({
              left: dom.breadcrumbWrapper.scrollWidth,
              behavior: 'smooth'
            });
          }
        }, 40);

        // Click on previous breadcrumb level to jump directly to it & slide view
        dom.breadcrumbWrapper.querySelectorAll('[data-cat-jump]').forEach(btn => {
          btn.addEventListener('click', () => {
            const jumpIdx = parseInt(btn.getAttribute('data-cat-jump'), 10);
            if (jumpIdx >= 0 && jumpIdx < state.pathStack.length) {
              state.pathStack = state.pathStack.slice(0, jumpIdx + 1);
              const targetNode = state.pathStack[jumpIdx];
              setActiveSelection(targetNode, [...state.pathStack]);
              renderDesktopColumns();
              renderMobileDrilldown();
              updateSelectionUI();

              // Slide carousel back to position
              if (dom.desktopColumnsContainer) {
                const visibleCols = getVisibleColumnsCount();
                const colWidth = dom.desktopColumnsContainer.clientWidth / visibleCols;
                const slidePos = Math.max(0, jumpIdx - visibleCols + 2);
                dom.desktopColumnsContainer.scrollLeft = slidePos * colWidth;
              }
            }
          });
        });
      }
    }

    // Footer Selection Text (Reverse: Leaf -> Root e.g. Panjabi & Pajama, Ethnic & Traditional, Men's Fashion)
    if (dom.footerSelectionText) {
      const reversePath = [...fullPath].reverse();
      dom.footerSelectionText.textContent = reversePath.length ? reversePath.join(', ') : 'All Categories';
    }

    // Confirm button state
    if (dom.confirmBtn) {
      dom.confirmBtn.disabled = false;
    }
  }

  // =========================================================================
  // =========================================================================
  // Search Engine & Floating Dropdown Overlay
  // =========================================================================
  function handleSearch(query) {
    query = (query || '').trim().toLowerCase();
    state.searchQuery = query;

    if (!query) {
      if (dom.clearSearchBtn) dom.clearSearchBtn.classList.add('hidden');
      if (dom.searchView) dom.searchView.classList.add('hidden');
      return;
    }

    if (dom.clearSearchBtn) dom.clearSearchBtn.classList.remove('hidden');

    const matches = ALL_CATEGORIES_FLAT.filter(cat =>
      cat.name.toLowerCase().includes(query) || cat.pathString.toLowerCase().includes(query)
    );

    if (matches.length === 0) {
      if (dom.searchView) dom.searchView.classList.remove('hidden');
      if (dom.searchList) dom.searchList.classList.add('hidden');
      if (dom.emptyState) dom.emptyState.classList.remove('hidden');
      return;
    }

    // Render search results inside floating dropdown
    if (dom.searchView && dom.searchList) {
      if (dom.emptyState) dom.emptyState.classList.add('hidden');
      dom.searchList.classList.remove('hidden');
      dom.searchList.innerHTML = '';
      dom.searchView.classList.remove('hidden');

      matches.slice(0, 30).forEach(match => {
        const itemEl = document.createElement('div');
        itemEl.className = 'p-2.5 bg-slate-50/70 dark:bg-slate-800/70 hover:bg-theme-primary/10 dark:hover:bg-theme-primary/15 rounded-xl border border-slate-200/80 dark:border-slate-700/60 hover:border-theme-primary/40 cursor-pointer flex items-center justify-between transition-all duration-150';

        const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(${escapedQuery})`, 'gi');
        const highlightedName = match.name.replace(regex, '<span class="text-theme-primary font-bold underline">$1</span>');
        const highlightedPath = match.pathString.replace(regex, '<span class="text-theme-primary font-semibold">$1</span>');

        itemEl.innerHTML = `
          <div class="flex items-center gap-2.5 min-w-0 flex-1 pr-2">
            <div class="w-7 h-7 rounded-lg bg-theme-primary/10 text-theme-primary flex items-center justify-center shrink-0">
              <i class="${match.icon || 'fa-solid fa-tag'} text-[11px]"></i>
            </div>
            <div class="min-w-0">
              <div class="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">${highlightedName}</div>
              <div class="text-[10px] text-slate-400 truncate mt-0.5">${highlightedPath}</div>
            </div>
          </div>
          <div class="flex items-center gap-1.5 shrink-0">
            <span class="text-[9px] px-2 py-0.5 rounded-md bg-theme-primary/10 text-theme-primary font-semibold">Select</span>
          </div>
        `;

        itemEl.addEventListener('click', (e) => {
          e.stopPropagation();
          hydrateFromSearchResult(match.id);
          dom.searchInput.value = '';
          handleSearch('');
        });

        dom.searchList.appendChild(itemEl);
      });
    }
  }

  function hydrateFromSearchResult(id) {
    const found = findCategoryById(id);
    if (!found) return;

    const hasChildren = found.item.children && found.item.children.length > 0;
    if (hasChildren) {
      state.pathStack = [...found.path];
    } else {
      state.pathStack = found.path.length > 1 ? found.path.slice(0, -1) : [];
    }
    setActiveSelection(found.item, [...found.path]);
    renderDesktopColumns();
    renderMobileDrilldown();
    updateSelectionUI();
  }

  // =========================================================================
  // Modal Open / Close Engine
  // =========================================================================
  function openModal() {
    initDOM();
    if (!dom.modal) return;

    if (state.pathStack.length === 0 && CATEGORY_DATA.length > 0) {
      state.pathStack = [CATEGORY_DATA[0]];
      setActiveSelection(CATEGORY_DATA[0], [CATEGORY_DATA[0]]);
    }

    renderDesktopColumns();
    renderMobileDrilldown();
    updateSelectionUI();

    state.isOpen = true;
    dom.modal.classList.remove('hidden', 'pointer-events-none');
    dom.modal.style.display = 'flex';

    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      dom.modal.classList.remove('opacity-0');
      dom.modal.classList.add('opacity-100');
      if (dom.dialog) {
        dom.dialog.classList.remove('scale-95', 'opacity-0');
        dom.dialog.classList.add('scale-100', 'opacity-100');
      }
      if (dom.searchInput) {
        dom.searchInput.focus();
      }
    }, 20);
  }

  function closeModal() {
    if (!dom.modal) return;
    state.isOpen = false;

    dom.modal.classList.remove('opacity-100');
    dom.modal.classList.add('opacity-0');
    if (dom.dialog) {
      dom.dialog.classList.remove('scale-100', 'opacity-100');
      dom.dialog.classList.add('scale-95', 'opacity-0');
    }

    setTimeout(() => {
      dom.modal.classList.add('hidden', 'pointer-events-none');
      dom.modal.style.display = 'none';
      document.body.style.overflow = '';
      if (dom.searchInput) {
        dom.searchInput.value = '';
        handleSearch('');
      }
    }, 250);
  }

  function confirmSelection() {
    let label = 'All Categories';

    if (state.activeSelection && state.activeSelection.name) {
      label = state.activeSelection.name;
    }

    if (dom.bannerCategoryLabel) {
      dom.bannerCategoryLabel.textContent = label;
    }

    window.dispatchEvent(
      new CustomEvent('categorySelected', {
        detail: {
          category: state.activeSelection,
          path: state.activeSelection ? state.activeSelection.path : []
        }
      })
    );

    closeModal();
  }

  function resetAll() {
    resetSelectionState();
    if (CATEGORY_DATA.length > 0) {
      state.pathStack = [CATEGORY_DATA[0]];
      setActiveSelection(CATEGORY_DATA[0], [CATEGORY_DATA[0]]);
    }
    renderDesktopColumns();
    renderMobileDrilldown();
    updateSelectionUI();
  }

  // =========================================================================
  // Event Bindings
  // =========================================================================
  function bindEvents() {
    initDOM();

    if (dom.bannerTriggerBtn) {
      dom.bannerTriggerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
      });
    }

    if (dom.closeBtn) {
      dom.closeBtn.addEventListener('click', closeModal);
    }

    if (dom.backdrop) {
      dom.backdrop.addEventListener('click', closeModal);
    }

    if (dom.backBtn) {
      dom.backBtn.addEventListener('click', () => {
        if (state.pathStack.length > 0) {
          state.pathStack.pop();
          if (state.pathStack.length > 0) {
            const currentParent = state.pathStack[state.pathStack.length - 1];
            setActiveSelection(currentParent, [...state.pathStack]);
          } else {
            resetSelectionState();
          }
          renderMobileDrilldown();
          renderDesktopColumns();
          updateSelectionUI();
        }
      });
    }

    if (dom.searchInput) {
      dom.searchInput.addEventListener('input', (e) => {
        handleSearch(e.target.value);
      });
    }

    if (dom.clearSearchBtn) {
      dom.clearSearchBtn.addEventListener('click', () => {
        dom.searchInput.value = '';
        handleSearch('');
        dom.searchInput.focus();
      });
    }

    if (dom.resetSearchBtn) {
      dom.resetSearchBtn.addEventListener('click', () => {
        dom.searchInput.value = '';
        handleSearch('');
      });
    }

    if (dom.clearAllBtn) {
      dom.clearAllBtn.addEventListener('click', resetAll);
    }

    if (dom.confirmBtn) {
      dom.confirmBtn.addEventListener('click', confirmSelection);
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && state.isOpen) {
        if (dom.searchView && !dom.searchView.classList.contains('hidden')) {
          dom.searchView.classList.add('hidden');
        } else {
          closeModal();
        }
      }
    });

    document.addEventListener('click', (e) => {
      if (dom.searchView && !dom.searchView.classList.contains('hidden')) {
        if (!dom.searchView.contains(e.target) && e.target !== dom.searchInput) {
          dom.searchView.classList.add('hidden');
        }
      }
    });

    let resizeTimer = null;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (state.isOpen) {
          renderDesktopColumns();
          renderMobileDrilldown();
        }
      }, 100);
    });
  }

  // Public API
  window.CategoryModal = {
    open: openModal,
    close: closeModal,
    reset: resetAll,
    getData: () => CATEGORY_DATA,
    getSelected: () => state.activeSelection,
    refresh: () => {
      renderDesktopColumns();
      renderMobileDrilldown();
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindEvents);
  } else {
    bindEvents();
  }
})();
