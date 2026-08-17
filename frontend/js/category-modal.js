/**
 * Asset Sheba — Dynamic Category Widget Engine
 * Standardized Component Architecture (Following slick.customize.js pattern):
 *  - Discovers all $('.category-widget') elements on the page.
 *  - Scopes all sub-elements relatively using semantic classes (.cat-*), zero hardcoded IDs:
 *      * .cat-back-btn           - Step Back Navigation Button
 *      * .cat-title              - Active Level / Modal Title
 *      * .cat-badge              - Level Depth Indicator Badge
 *      * .cat-search-input       - Live Search Input
 *      * .cat-clear-search       - Clear Search Query Button
 *      * .cat-search-view        - Floating Dropdown Results Container
 *      * .cat-search-list        - Search Results List Wrapper
 *      * .cat-search-empty       - Empty State for Search
 *      * .cat-breadcrumb         - Horizontal Breadcrumbs Trail (with auto-scroll)
 *      * .cat-desktop-columns    - Desktop Multi-Column Carousel Container (data-slides-to-show)
 *      * .cat-list               - 1-Column Step Drilldown List Container
 *      * .cat-selected-label     - Active Category Text Output
 *      * .cat-confirm-btn        - Modal Confirm Selection Button
 *      * .cat-reset-btn          - Reset / Clear Category Selection Button
 *      * .cat-close-btn          - Modal Close Button
 *      * .cat-dialog             - Dialog Window Container
 *      * .cat-backdrop           - Background Overlay
 *  - Responsive Breakpoints parsed identically via resolveResponsiveVal()
 *  - Triggers 'category:change' on document & 'category:selected' on the widget element
 */

(function () {
  'use strict';

  // Comprehensive Multi-Level Category Data
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
    }
  ];

  // Helper: Flatten categories for search indexing
  function flattenCategories(data, currentPath = []) {
    let result = [];
    data.forEach(item => {
      const path = [...currentPath, item];
      result.push({
        id: item.id,
        name: item.name,
        icon: item.icon || 'fa-solid fa-tag',
        path: path,
        pathString: path.map(p => p.name).join(' / '),
        item: item,
        hasChildren: !!(item.children && item.children.length > 0)
      });
      if (item.children && item.children.length > 0) {
        result = result.concat(flattenCategories(item.children, path));
      }
    });
    return result;
  }

  const ALL_CATEGORIES_FLAT = flattenCategories(CATEGORY_DATA);

  // Helper: Extract descendant leaf names
  function getAllCategoryDescendantNames(node) {
    let names = [node.name];
    if (node.children && node.children.length > 0) {
      node.children.forEach(child => {
        names = names.concat(getAllCategoryDescendantNames(child));
      });
    }
    return names;
  }

  // Find category node & path by ID
  function findCategoryById(id, data = CATEGORY_DATA, currentPath = []) {
    for (const item of data) {
      const path = [...currentPath, item];
      if (item.id === id) return { item, path };
      if (item.children && item.children.length > 0) {
        const found = findCategoryById(id, item.children, path);
        if (found) return found;
      }
    }
    return null;
  }

  // Dynamic responsive attribute resolution (e.g. "BPD: 3, BP-992: 2")
  function resolveResponsiveVal(attrStr, defaultVal = 3) {
    let str = (attrStr || '').trim();
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

  // Active instances registry
  const instances = [];

  // =========================================================================
  // CategoryWidget Component Class
  // =========================================================================
  class CategoryWidget {
    constructor($el) {
      this.$el = $el;
      this.isModal = this.$el.hasClass('category-modal') || this.$el.is('[data-category-widget="modal"]') || this.$el.attr('id') === 'category-modal';
      
      // Dynamic config from attributes
      this.slidesToShowAttr = this.$el.attr('data-slides-to-show') || 
                              this.$el.find('.cat-desktop-columns, #cat-desktop-columns-container').attr('data-slides-to-show') || 
                              'BPD: 3, BP-992: 2';

      // Scoped element discovery using component classes (with ID fallbacks for legacy markup)
      this.$backBtn = this.$el.find('.cat-back-btn, #sidebar-cat-back-btn, #cat-modal-back-btn');
      this.$title = this.$el.find('.cat-title, #sidebar-cat-title, #cat-modal-title');
      this.$badge = this.$el.find('.cat-badge, #sidebar-cat-badge');
      this.$searchInput = this.$el.find('.cat-search-input, #sidebar-cat-search, #cat-search-input');
      this.$clearSearchBtn = this.$el.find('.cat-clear-search, #sidebar-cat-clear-search, #cat-clear-search');
      this.$searchView = this.$el.find('.cat-search-view, #sidebar-cat-search-view, #cat-search-view');
      this.$searchList = this.$el.find('.cat-search-list, #sidebar-cat-search-list, #cat-search-list');
      this.$emptyState = this.$el.find('.cat-search-empty, #sidebar-cat-empty-state, #cat-empty-state');
      this.$breadcrumb = this.$el.find('.cat-breadcrumb, #sidebar-cat-breadcrumb, #cat-breadcrumb-wrapper');
      this.$listContainer = this.$el.find('.cat-list, #sidebar-cat-list-container, #cat-mobile-list-container');
      this.$desktopColumns = this.$el.find('.cat-desktop-columns, #cat-desktop-columns-container');
      this.$selectedLabel = this.$el.find('.cat-selected-label, #cat-footer-selection-text');
      this.$confirmBtn = this.$el.find('.cat-confirm-btn, #cat-confirm-btn');
      this.$resetBtn = this.$el.find('.cat-reset-btn, #cat-clear-all-btn');
      this.$closeBtn = this.$el.find('.cat-close-btn, #close-category-modal, #cat-modal-close-btn');
      this.$dialog = this.$el.find('.cat-dialog, #category-modal-dialog');
      this.$backdrop = this.$el.find('.cat-backdrop, #category-modal-backdrop');

      this.pathStack = [];
      this.activeSelection = null;
      this.isOpen = false;

      this.bindEvents();
      this.render();

      instances.push(this);
    }

    bindEvents() {
      // 1. Back button
      if (this.$backBtn.length) {
        this.$backBtn.on('click', () => {
          if (this.pathStack.length > 0) {
            this.pathStack.pop();
            if (this.pathStack.length > 0) {
              const parent = this.pathStack[this.pathStack.length - 1];
              this.setSelection(parent, [...this.pathStack]);
            } else {
              this.setSelection(null, []);
            }
            this.render();
            this.emitChange();
          }
        });
      }

      // 2. Search input & clear
      if (this.$searchInput.length) {
        this.$searchInput.on('input', (e) => {
          this.handleSearch(e.target.value);
        });
      }

      if (this.$clearSearchBtn.length) {
        this.$clearSearchBtn.on('click', () => {
          this.$searchInput.val('');
          this.handleSearch('');
          this.$searchInput.focus();
        });
      }

      // 3. Modal Confirm / Reset / Close
      if (this.$confirmBtn.length) {
        this.$confirmBtn.on('click', () => {
          this.emitChange();
          this.closeModal();
        });
      }

      if (this.$resetBtn.length) {
        this.$resetBtn.on('click', () => {
          this.reset();
        });
      }

      if (this.$closeBtn.length) {
        this.$closeBtn.on('click', () => this.closeModal());
      }
      if (this.$backdrop.length) {
        this.$backdrop.on('click', () => this.closeModal());
      }

      // Close search view when clicking outside
      $(document).on('click', (e) => {
        if (this.$searchView.length && !this.$searchView.hasClass('hidden')) {
          if (!this.$searchView[0].contains(e.target) && e.target !== this.$searchInput[0]) {
            this.$searchView.addClass('hidden');
          }
        }
      });

      // Window resize listener for responsive columns
      let resizeTimer = null;
      $(window).on('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          if (this.isModal && this.isOpen) {
            this.render();
          }
        }, 100);
      });
    }

    setSelection(item, pathArray = []) {
      if (!item) {
        this.activeSelection = null;
        return;
      }
      this.activeSelection = {
        id: item.id,
        name: item.name,
        path: pathArray.map(p => p.name),
        descendants: getAllCategoryDescendantNames(item),
        item: item
      };
    }

    emitChange() {
      const data = this.activeSelection ? {
        id: this.activeSelection.id,
        name: this.activeSelection.name,
        path: this.activeSelection.path,
        descendants: this.activeSelection.descendants
      } : {
        id: 'all',
        name: 'All Categories',
        path: [],
        descendants: []
      };

      const label = data.name || 'All Categories';
      $('#banner-category-label, .selected-category-label').text(label);

      // Trigger standard events
      $(document).trigger('category:change', [data]);
      this.$el.trigger('category:selected', [data]);
      window.dispatchEvent(new CustomEvent('categoryChange', { detail: data }));
      window.dispatchEvent(new CustomEvent('categorySelected', { detail: { category: this.activeSelection, path: data.path } }));
    }

    handleSearch(query) {
      query = (query || '').trim().toLowerCase();

      if (!query) {
        if (this.$clearSearchBtn.length) this.$clearSearchBtn.addClass('hidden');
        if (this.$searchView.length) this.$searchView.addClass('hidden');
        return;
      }

      if (this.$clearSearchBtn.length) this.$clearSearchBtn.removeClass('hidden');

      const matches = ALL_CATEGORIES_FLAT.filter(cat =>
        cat.name.toLowerCase().includes(query) || cat.pathString.toLowerCase().includes(query)
      );

      if (!this.$searchView.length || !this.$searchList.length) return;

      if (matches.length === 0) {
        this.$searchView.removeClass('hidden');
        this.$searchList.addClass('hidden');
        if (this.$emptyState.length) this.$emptyState.removeClass('hidden');
        return;
      }

      if (this.$emptyState.length) this.$emptyState.addClass('hidden');
      this.$searchList.removeClass('hidden').empty();
      this.$searchView.removeClass('hidden');

      matches.slice(0, 15).forEach(match => {
        const itemEl = document.createElement('div');
        itemEl.className = 'p-2 bg-slate-50/70 dark:bg-slate-800/70 hover:bg-theme-primary/10 dark:hover:bg-theme-primary/15 rounded-xl border border-slate-200/80 dark:border-slate-700/60 hover:border-theme-primary/40 cursor-pointer flex items-center justify-between transition-all duration-150';

        const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(${escapedQuery})`, 'gi');
        const highlightedName = match.name.replace(regex, '<span class="text-theme-primary font-bold underline">$1</span>');
        const highlightedPath = match.pathString.replace(regex, '<span class="text-theme-primary font-semibold">$1</span>');

        itemEl.innerHTML = `
          <div class="flex items-center gap-2 min-w-0 flex-1 pr-1.5">
            <div class="w-6 h-6 rounded-lg bg-theme-primary/10 text-theme-primary flex items-center justify-center shrink-0">
              <i class="${match.icon || 'fa-solid fa-tag'} text-[10px]"></i>
            </div>
            <div class="min-w-0">
              <div class="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">${highlightedName}</div>
              <div class="text-[9px] text-slate-400 truncate mt-0.5">${highlightedPath}</div>
            </div>
          </div>
          <span class="text-[9px] px-1.5 py-0.5 rounded-md bg-theme-primary/10 text-theme-primary font-semibold shrink-0">Select</span>
        `;

        itemEl.addEventListener('click', (e) => {
          e.stopPropagation();
          this.hydrateFromSearchResult(match.id);
          if (this.$searchInput.length) this.$searchInput.val('');
          this.handleSearch('');
        });

        this.$searchList[0].appendChild(itemEl);
      });
    }

    hydrateFromSearchResult(id) {
      const found = findCategoryById(id);
      if (!found) return;

      const hasChildren = found.item.children && found.item.children.length > 0;
      if (hasChildren) {
        this.pathStack = [...found.path];
      } else {
        this.pathStack = found.path.length > 1 ? found.path.slice(0, -1) : [];
      }

      this.setSelection(found.item, found.path);
      this.render();
      this.emitChange();
    }

    render() {
      const isDesktopModal = this.isModal && window.innerWidth >= 768 && this.$desktopColumns.length;

      if (isDesktopModal) {
        this.renderDesktopColumns();
      } else {
        this.renderStepDrilldown();
      }

      this.renderBreadcrumbs();
      this.updateHeaderAndFooter();
    }

    renderBreadcrumbs() {
      if (!this.$breadcrumb.length) return;

      const isInsideFolder = this.pathStack.length > 0;

      if (!isInsideFolder) {
        this.$breadcrumb.html(`<span class="text-slate-400">All Categories</span>`);
      } else {
        const crumbs = [
          `<button type="button" data-cat-jump="-1" class="text-slate-400 hover:text-theme-primary cursor-pointer hover:underline underline-offset-2 shrink-0">Categories</button>`
        ];

        this.pathStack.forEach((folder, idx) => {
          const isLast = idx === this.pathStack.length - 1;
          if (isLast) {
            crumbs.push(`<span class="text-theme-primary font-bold shrink-0">${folder.name}</span>`);
          } else {
            crumbs.push(`<button type="button" data-cat-jump="${idx}" class="text-slate-400 hover:text-theme-primary cursor-pointer hover:underline underline-offset-2 shrink-0">${folder.name}</button>`);
          }
        });

        this.$breadcrumb.html(crumbs.join('<span class="text-slate-300 dark:text-slate-600 mx-1 shrink-0">/</span>'));

        // Breadcrumb level jump clicks
        this.$breadcrumb.find('[data-cat-jump]').on('click', (e) => {
          const jumpIdx = parseInt($(e.currentTarget).attr('data-cat-jump'), 10);
          if (jumpIdx === -1) {
            this.pathStack = [];
            this.setSelection(null, []);
          } else if (jumpIdx >= 0 && jumpIdx < this.pathStack.length) {
            this.pathStack = this.pathStack.slice(0, jumpIdx + 1);
            const targetFolder = this.pathStack[jumpIdx];
            this.setSelection(targetFolder, [...this.pathStack]);
          }
          this.render();
          this.emitChange();
        });

        // Auto-scroll breadcrumbs smoothly to active rightmost level
        setTimeout(() => {
          if (this.$breadcrumb[0]) {
            this.$breadcrumb[0].scrollTo({
              left: this.$breadcrumb[0].scrollWidth,
              behavior: 'smooth'
            });
          }
        }, 40);
      }
    }

    updateHeaderAndFooter() {
      const isInsideFolder = this.pathStack.length > 0;
      const currentFolder = isInsideFolder ? this.pathStack[this.pathStack.length - 1] : null;

      if (this.$backBtn.length) {
        if (isInsideFolder) this.$backBtn.removeClass('hidden');
        else this.$backBtn.addClass('hidden');
      }

      if (this.$title.length) {
        if (this.isModal) {
          this.$title.text(isInsideFolder ? currentFolder.name : 'Select Category');
        } else {
          this.$title.text(isInsideFolder ? currentFolder.name : 'Categories');
        }
      }

      if (this.$badge.length) {
        this.$badge.text(isInsideFolder ? `Level ${this.pathStack.length + 1}` : 'Root');
      }

      if (this.$selectedLabel.length) {
        this.$selectedLabel.text(this.activeSelection ? this.activeSelection.name : 'All Categories');
      }
    }

    renderStepDrilldown() {
      if (!this.$listContainer.length) return;
      this.$listContainer.empty();

      const isInsideFolder = this.pathStack.length > 0;
      const currentFolder = isInsideFolder ? this.pathStack[this.pathStack.length - 1] : null;

      // "All in [Folder]" / "All Categories" option
      const isAllSelected = isInsideFolder
        ? (this.activeSelection && this.activeSelection.id === currentFolder.id)
        : (!this.activeSelection || this.activeSelection.id === 'all');

      const allOptionEl = document.createElement('div');
      allOptionEl.className = `flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all border text-xs font-bold select-none mb-2 gap-2 ${
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
          this.setSelection(currentFolder, [...this.pathStack]);
        } else {
          this.setSelection(null, []);
        }
        this.render();
        this.emitChange();
      });

      this.$listContainer[0].appendChild(allOptionEl);

      // Current level items
      const currentList = isInsideFolder ? (currentFolder.children || []) : CATEGORY_DATA;

      currentList.forEach(item => {
        const hasChildren = item.children && item.children.length > 0;
        const isSelected = this.activeSelection && this.activeSelection.id === item.id;

        const rowEl = document.createElement('div');
        rowEl.className = `flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all border text-xs font-semibold select-none mb-1 gap-2 ${
          isSelected
            ? 'bg-theme-primary/10 border-theme-primary/40 text-theme-primary font-bold shadow-xs'
            : 'bg-white dark:bg-[#070e22] lg:dark:bg-[#0f172a] border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
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
            this.pathStack.push(item);
            this.setSelection(item, [...this.pathStack]);
          } else {
            this.setSelection(item, [...this.pathStack, item]);
          }
          this.render();
          this.emitChange();
        });

        this.$listContainer[0].appendChild(rowEl);
      });
    }

    renderDesktopColumns() {
      if (!this.$desktopColumns.length) return;
      this.$desktopColumns.empty();

      const columnsData = [];

      // Push Root Level
      columnsData.push({
        depth: 0,
        title: 'Categories',
        items: CATEGORY_DATA,
        selectedNode: this.pathStack[0] || (this.activeSelection ? CATEGORY_DATA.find(c => c.id === this.activeSelection.id) : null),
        parentNode: null
      });

      // Push child levels
      for (let depth = 0; depth < this.pathStack.length; depth++) {
        const parentNode = this.pathStack[depth];
        if (parentNode && parentNode.children && parentNode.children.length > 0) {
          const nextSelectedNode = this.pathStack[depth + 1] ||
            (this.activeSelection ? parentNode.children.find(c => c.id === this.activeSelection.id) : null);

          columnsData.push({
            depth: depth + 1,
            title: parentNode.name,
            items: parentNode.children,
            selectedNode: nextSelectedNode,
            parentNode: parentNode
          });
        }
      }

      const visibleCols = Math.max(1, resolveResponsiveVal(this.slidesToShowAttr, 3));
      const colWidthPct = (100 / visibleCols).toFixed(4) + '%';
      const totalColumnsToRender = Math.max(visibleCols, columnsData.length);

      for (let i = 0; i < totalColumnsToRender; i++) {
        const colData = columnsData[i];

        const colEl = document.createElement('div');
        colEl.className = 'flex flex-col h-full overflow-hidden shrink-0 bg-white dark:bg-slate-900/60 first:bg-slate-50/40 dark:first:bg-slate-900/40 snap-start';
        colEl.style.width = colWidthPct;
        colEl.style.minWidth = colWidthPct;
        colEl.style.maxWidth = colWidthPct;

        if (colData) {
          const isRoot = colData.depth === 0;

          // Header
          const headerEl = document.createElement('div');
          headerEl.className = 'h-10 px-4 bg-slate-100 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800 shrink-0 flex items-center justify-between gap-2 select-none';
          headerEl.innerHTML = `
            <span class="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider truncate">${colData.title}</span>
            <span class="text-[10px] text-slate-400 font-medium shrink-0">${colData.items.length} items</span>
          `;
          colEl.appendChild(headerEl);

          // List
          const listEl = document.createElement('div');
          listEl.className = 'flex-1 overflow-y-auto p-3 space-y-1.5 scrollbar-thin';

          if (!isRoot && colData.parentNode) {
            const isParentActive = this.activeSelection && this.activeSelection.id === colData.parentNode.id && this.pathStack.length === colData.depth;

            const allInParentEl = document.createElement('div');
            allInParentEl.className = `flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all border text-xs font-bold select-none mb-1.5 gap-2 ${
              isParentActive
                ? 'bg-theme-primary text-white border-theme-primary shadow-xs'
                : 'bg-slate-50 dark:bg-slate-800/40 border-dashed border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-theme-primary/5 hover:border-theme-primary/40 hover:text-theme-primary'
            }`;
            allInParentEl.innerHTML = `
              <div class="flex items-center gap-2 min-w-0 flex-1">
                <i class="fa-solid fa-tags text-[11px] shrink-0 ${isParentActive ? 'text-white' : 'text-theme-primary'}"></i>
                <span class="truncate">All in ${colData.parentNode.name}</span>
              </div>
              <div class="shrink-0">
                ${isParentActive ? '<i class="fa-solid fa-check text-[10px]"></i>' : '<span class="text-[10px] opacity-70 font-normal">Select</span>'}
              </div>
            `;

            allInParentEl.addEventListener('click', () => {
              this.pathStack = this.pathStack.slice(0, colData.depth);
              this.setSelection(colData.parentNode, [...this.pathStack]);
              this.render();
              this.emitChange();
            });

            listEl.appendChild(allInParentEl);
          }

          colData.items.forEach(item => {
            const hasChildren = item.children && item.children.length > 0;
            const isHighlighted = colData.selectedNode && colData.selectedNode.id === item.id;
            const isFinalSelected = this.activeSelection && this.activeSelection.id === item.id;

            const itemEl = document.createElement('div');
            itemEl.className = `group flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all border text-xs font-semibold select-none gap-2 ${
              isHighlighted || isFinalSelected
                ? 'bg-theme-primary/10 border-theme-primary/40 text-theme-primary font-bold shadow-xs'
                : 'bg-white dark:bg-slate-800/80 border-slate-200/70 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-750'
            }`;

            itemEl.innerHTML = `
              <div class="flex items-center gap-2 min-w-0 flex-1">
                <div class="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                  isHighlighted || isFinalSelected ? 'bg-theme-primary text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                }">
                  <i class="${item.icon || (hasChildren ? 'fa-solid fa-folder' : 'fa-solid fa-circle-dot')} text-[10px]"></i>
                </div>
                <span class="truncate">${item.name}</span>
              </div>
              <div class="flex items-center gap-1.5 shrink-0">
                <span class="text-[9px] text-slate-400 font-normal">${item.count || 0}</span>
                ${hasChildren ? '<i class="fa-solid fa-chevron-right text-[9px] text-slate-300 dark:text-slate-600"></i>' : (isFinalSelected ? '<i class="fa-solid fa-check text-[10px] text-theme-primary"></i>' : '')}
              </div>
            `;

            itemEl.addEventListener('click', () => {
              if (hasChildren) {
                this.pathStack = this.pathStack.slice(0, colData.depth);
                this.pathStack.push(item);
                this.setSelection(item, [...this.pathStack]);
              } else {
                this.pathStack = this.pathStack.slice(0, colData.depth);
                this.setSelection(item, [...this.pathStack, item]);
              }
              this.render();
              this.emitChange();
            });

            listEl.appendChild(itemEl);
          });

          colEl.appendChild(listEl);
        } else {
          // Placeholder column
          colEl.innerHTML = `
            <div class="h-10 px-4 bg-slate-50 dark:bg-slate-950/40 border-b border-slate-200/60 dark:border-slate-800/60 shrink-0 flex items-center">
              <span class="text-[11px] font-semibold text-slate-300 dark:text-slate-600 uppercase tracking-wider">Subcategory</span>
            </div>
            <div class="flex-1 flex flex-col items-center justify-center p-6 text-center text-slate-300 dark:text-slate-600 gap-2 select-none">
              <i class="fa-solid fa-layer-group text-2xl opacity-40"></i>
              <p class="text-xs">Select parent item</p>
            </div>
          `;
        }

        this.$desktopColumns[0].appendChild(colEl);
      }

      // Auto-slide to active column
      if (columnsData.length > visibleCols) {
        setTimeout(() => {
          if (this.$desktopColumns[0]) {
            this.$desktopColumns[0].scrollTo({
              left: this.$desktopColumns[0].scrollWidth,
              behavior: 'smooth'
            });
          }
        }, 50);
      }
    }

    reset() {
      this.pathStack = [];
      this.activeSelection = null;
      if (this.$searchInput.length) this.$searchInput.val('');
      this.handleSearch('');
      this.render();
      this.emitChange();
    }

    openModal() {
      this.isOpen = true;
      this.$el.removeClass('hidden pointer-events-none');
      if (this.$dialog.length) this.$dialog.removeClass('scale-95 opacity-0');
      this.$el.addClass('opacity-100 pointer-events-auto');
      document.body.style.overflow = 'hidden';

      if (this.$searchInput.length) {
        this.$searchInput.val('');
        if (this.$clearSearchBtn.length) this.$clearSearchBtn.addClass('hidden');
      }
      this.render();
    }

    closeModal() {
      this.isOpen = false;
      if (this.$searchView.length) this.$searchView.addClass('hidden');
      this.$el.removeClass('opacity-100 pointer-events-auto');
      this.$el.addClass('opacity-0 pointer-events-none');
      if (this.$dialog.length) this.$dialog.addClass('scale-95 opacity-0');
      setTimeout(() => {
        this.$el.addClass('hidden');
      }, 300);
      document.body.style.overflow = '';
    }
  }

  // =========================================================================
  // Global API & Auto-Initialization (Slick Slider pattern)
  // =========================================================================
  window.CategoryWidget = {
    CATEGORY_DATA,
    ALL_CATEGORIES_FLAT,
    instances,
    init: function () {
      $('.category-widget, [data-category-widget]').each(function () {
        if (!this.__catWidget) {
          this.__catWidget = new CategoryWidget($(this));
        }
      });
    },
    reset: function (target) {
      if (!target) {
        instances.forEach(inst => inst.reset());
        return;
      }
      const el = $(target)[0];
      if (el && el.__catWidget) {
        el.__catWidget.reset();
      }
    },
    getInstance: function (target) {
      const el = $(target)[0];
      return el ? el.__catWidget : null;
    }
  };

  // Backward compatibility wrapper for CategoryModal API
  window.CategoryModal = {
    open: () => {
      const modalInst = instances.find(inst => inst.isModal);
      if (modalInst) modalInst.openModal();
    },
    close: () => {
      const modalInst = instances.find(inst => inst.isModal);
      if (modalInst) modalInst.closeModal();
    },
    reset: () => {
      const modalInst = instances.find(inst => inst.isModal);
      if (modalInst) modalInst.reset();
    },
    getData: () => CATEGORY_DATA,
    getSelected: () => {
      const modalInst = instances.find(inst => inst.isModal);
      return modalInst ? modalInst.activeSelection : null;
    },
    refresh: () => {
      const modalInst = instances.find(inst => inst.isModal);
      if (modalInst) modalInst.render();
    }
  };

  // Auto-initialize on ready
  $(document).ready(function () {
    window.CategoryWidget.init();

    // Trigger button listeners
    $(document).on('click', '#banner-category-btn, [data-open-category-modal], [data-category-modal-trigger]', function (e) {
      e.preventDefault();
      window.CategoryModal.open();
    });
  });

})();
