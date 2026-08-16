/**
 * Asset Sheba — 4-Step Location Selector Modal Engine
 * Handles Country -> Division -> District/City -> Sub-City/Area
 * Dynamic "All [Location]" option and "Confirm Location" button available at any stage
 */
(function () {
  const LOCATION_DATA = {
    countries: [
      {
        id: 'bd',
        name: 'Bangladesh',
        isPopular: true,
        divisions: [
          {
            id: 'bd-dhaka',
            name: 'Dhaka',
            districts: [
              {
                id: 'bd-dhaka-city',
                name: 'Dhaka',
                areas: [
                  { id: 'bashundhara', name: 'Bashundhara' },
                  { id: 'hazratibagh', name: 'Hazratibagh' },
                  { id: 'mirpur', name: 'Mirpur' },
                  { id: 'bosila', name: 'Bosila' },
                  { id: 'jalshiri', name: 'Jalshiri Abason' },
                  { id: 'uttara', name: 'Uttara' },
                  { id: 'cantonment', name: 'Cantonment' },
                  { id: 'jamuna-fp', name: 'Jamuna Future Park' },
                  { id: 'motijheel', name: 'Motijheel' },
                  { id: 'chawkbazar', name: 'Chawkbazar' },
                  { id: 'jatrabari', name: 'Jatrabari' },
                  { id: 'dhanmondi', name: 'Dhanmondi' },
                  { id: 'mohammadpur', name: 'Mohammadpur' },
                  { id: 'khilkhet', name: 'Khilkhet' },
                  { id: 'banani', name: 'Banani' },
                  { id: 'badda', name: 'Badda' },
                  { id: 'moghbazar', name: 'Moghbazar' },
                  { id: '60-feet', name: '60 Feet Road' },
                  { id: 'aftab-nagar', name: 'Aftab Nagar' },
                  { id: 'gulshan', name: 'Gulshan' },
                  { id: 'tejgaon', name: 'Tejgaon' },
                  { id: 'rampura', name: 'Rampura' },
                  { id: 'paltan', name: 'Paltan' },
                  { id: 'shahbag', name: 'Shahbag' },
                  { id: 'lalbagh', name: 'Lalbagh' },
                  { id: 'kamrangirchar', name: 'Kamrangirchar' },
                  { id: 'sabujbagh', name: 'Sabujbagh' },
                  { id: 'wari', name: 'Wari' },
                  { id: 'kafrul', name: 'Kafrul' },
                  { id: 'matuail', name: 'Matuail' },
                  { id: 'demra', name: 'Demra' },
                  { id: 'dakshinkhan', name: 'Dakshinkhan' },
                  { id: 'khilgaon', name: 'Khilgaon' },
                  { id: 'others', name: 'Others' }
                ]
              },
              {
                id: 'bd-gazipur',
                name: 'Gazipur',
                areas: [
                  { id: 'gazipur-sadar', name: 'Gazipur Sadar' },
                  { id: 'chourasta', name: 'Gazipur Chourasta' },
                  { id: 'tongie', name: 'Tongi' },
                  { id: 'board-bazar', name: 'Board Bazar' },
                  { id: 'kaliakair', name: 'Kaliakair' },
                  { id: 'sreepur', name: 'Sreepur' },
                  { id: 'kapasia', name: 'Kapasia' },
                  { id: 'kaliganj', name: 'Kaliganj' }
                ]
              },
              {
                id: 'bd-narayanganj',
                name: 'Narayanganj',
                areas: [
                  { id: 'narayanganj-sadar', name: 'Narayanganj Sadar' },
                  { id: 'chashara', name: 'Chashara' },
                  { id: 'fatullah', name: 'Fatullah' },
                  { id: 'siddhirganj', name: 'Siddhirganj' },
                  { id: 'rupganj', name: 'Rupganj' },
                  { id: 'sonargaon', name: 'Sonargaon' },
                  { id: 'araihazar', name: 'Araihazar' }
                ]
              },
              {
                id: 'bd-tangail',
                name: 'Tangail',
                areas: [
                  { id: 'tangail-sadar', name: 'Tangail Sadar' },
                  { id: 'mirzapur', name: 'Mirzapur' },
                  { id: 'madhupur', name: 'Madhupur' },
                  { id: 'ghatail', name: 'Ghatail' },
                  { id: 'sakhipur', name: 'Sakhipur' },
                  { id: 'kalihati', name: 'Kalihati' }
                ]
              },
              {
                id: 'bd-faridpur',
                name: 'Faridpur',
                areas: [
                  { id: 'faridpur-sadar', name: 'Faridpur Sadar' },
                  { id: 'boalmari', name: 'Boalmari' },
                  { id: 'bhanga', name: 'Bhanga' },
                  { id: 'madhukhali', name: 'Madhukhali' }
                ]
              },
              {
                id: 'bd-manikganj',
                name: 'Manikganj',
                areas: [
                  { id: 'manikganj-sadar', name: 'Manikganj Sadar' },
                  { id: 'singair', name: 'Singair' },
                  { id: 'saturia', name: 'Saturia' },
                  { id: 'shivalaya', name: 'Shivalaya' }
                ]
              },
              {
                id: 'bd-munshiganj',
                name: 'Munshiganj',
                areas: [
                  { id: 'munshiganj-sadar', name: 'Munshiganj Sadar' },
                  { id: 'sreenagar', name: 'Sreenagar' },
                  { id: 'sirajdikhan', name: 'Sirajdikhan' },
                  { id: 'louhajang', name: 'Louhajang' }
                ]
              },
              {
                id: 'bd-narsingdi',
                name: 'Narsingdi',
                areas: [
                  { id: 'narsingdi-sadar', name: 'Narsingdi Sadar' },
                  { id: 'palash', name: 'Palash' },
                  { id: 'shibpur', name: 'Shibpur' },
                  { id: 'raipura', name: 'Raipura' }
                ]
              }
            ]
          },
          {
            id: 'bd-chittagong',
            name: 'Chittagong',
            districts: [
              {
                id: 'bd-ctg-city',
                name: 'Chittagong City',
                areas: [
                  { id: 'agrabad', name: 'Agrabad' },
                  { id: 'nasirabad', name: 'Nasirabad' },
                  { id: 'gEC', name: 'GEC Circle' },
                  { id: 'khulshi', name: 'Khulshi' },
                  { id: 'halishahar', name: 'Halishahar' },
                  { id: 'panchlaish', name: 'Panchlaish' },
                  { id: 'chandgaon', name: 'Chandgaon' },
                  { id: 'chawkbazar-ctg', name: 'Chawkbazar' },
                  { id: 'patenga', name: 'Patenga' },
                  { id: 'kotwali-ctg', name: 'Kotwali' }
                ]
              },
              {
                id: 'bd-coxs-bazar',
                name: "Cox's Bazar",
                areas: [
                  { id: 'coxs-sadar', name: 'Sadar' },
                  { id: 'kolatoli', name: 'Kolatoli' },
                  { id: 'laboni', name: 'Laboni Point' },
                  { id: 'inani', name: 'Inani Beach' },
                  { id: 'teknaf', name: 'Teknaf' },
                  { id: 'ramu', name: 'Ramu' }
                ]
              },
              {
                id: 'bd-comilla',
                name: 'Cumilla',
                areas: [
                  { id: 'comilla-sadar', name: 'Cumilla Sadar' },
                  { id: 'kandirpar', name: 'Kandirpar' },
                  { id: 'kotbari', name: 'Kotbari' },
                  { id: 'daudkandi', name: 'Daudkandi' },
                  { id: 'chandina', name: 'Chandina' }
                ]
              },
              {
                id: 'bd-feni',
                name: 'Feni',
                areas: [
                  { id: 'feni-sadar', name: 'Feni Sadar' },
                  { id: 'daganbhuiyan', name: 'Daganbhuiyan' },
                  { id: 'parshuram', name: 'Parshuram' }
                ]
              },
              {
                id: 'bd-brahmanbaria',
                name: 'Brahmanbaria',
                areas: [
                  { id: 'brahmanbaria-sadar', name: 'Brahmanbaria Sadar' },
                  { id: 'ashuganj', name: 'Ashuganj' },
                  { id: 'kasba', name: 'Kasba' }
                ]
              }
            ]
          },
          {
            id: 'bd-sylhet',
            name: 'Sylhet',
            districts: [
              {
                id: 'bd-sylhet-city',
                name: 'Sylhet City',
                areas: [
                  { id: 'zindabazar', name: 'Zindabazar' },
                  { id: 'amberkhana', name: 'Amberkhana' },
                  { id: 'uposhahar', name: 'Shahjalal Uposhahar' },
                  { id: 'subidbazar', name: 'Subidbazar' },
                  { id: 'shibgonj', name: 'Shibgonj' },
                  { id: 'tilagarh', name: 'Tilagarh' }
                ]
              },
              {
                id: 'bd-moulvibazar',
                name: 'Moulvibazar',
                areas: [
                  { id: 'moulvibazar-sadar', name: 'Moulvibazar Sadar' },
                  { id: 'sreemangal', name: 'Sreemangal' },
                  { id: 'kulaura', name: 'Kulaura' }
                ]
              },
              {
                id: 'bd-habiganj',
                name: 'Habiganj',
                areas: [
                  { id: 'habiganj-sadar', name: 'Habiganj Sadar' },
                  { id: 'madhabpur', name: 'Madhabpur' },
                  { id: 'nabiganj', name: 'Nabiganj' }
                ]
              },
              {
                id: 'bd-sunamganj',
                name: 'Sunamganj',
                areas: [
                  { id: 'sunamganj-sadar', name: 'Sunamganj Sadar' },
                  { id: 'tahirpur', name: 'Tahirpur' },
                  { id: 'chhatak', name: 'Chhatak' }
                ]
              }
            ]
          },
          {
            id: 'bd-rajshahi',
            name: 'Rajshahi',
            districts: [
              {
                id: 'bd-rajshahi-city',
                name: 'Rajshahi City',
                areas: [
                  { id: 'shaheb-bazar', name: 'Shaheb Bazar' },
                  { id: 'motihar', name: 'Motihar' },
                  { id: 'kazla', name: 'Kazla' },
                  { id: 'rajpara', name: 'Rajpara' },
                  { id: 'boalia', name: 'Boalia' }
                ]
              },
              {
                id: 'bd-bogra',
                name: 'Bogura',
                areas: [
                  { id: 'bogra-sadar', name: 'Bogura Sadar' },
                  { id: 'sherpur', name: 'Sherpur' },
                  { id: 'shibganj-bogra', name: 'Shibganj' }
                ]
              },
              {
                id: 'bd-pabna',
                name: 'Pabna',
                areas: [
                  { id: 'pabna-sadar', name: 'Pabna Sadar' },
                  { id: 'ishwardi', name: 'Ishwardi' }
                ]
              }
            ]
          },
          {
            id: 'bd-khulna',
            name: 'Khulna',
            districts: [
              {
                id: 'bd-khulna-city',
                name: 'Khulna City',
                areas: [
                  { id: 'khalishpur', name: 'Khalishpur' },
                  { id: 'sonadanga', name: 'Sonadanga' },
                  { id: 'boyra', name: 'Boyra' },
                  { id: 'daulatpur', name: 'Daulatpur' },
                  { id: 'khan-jahan-ali', name: 'Khan Jahan Ali' }
                ]
              },
              {
                id: 'bd-jessore',
                name: 'Jashore',
                areas: [
                  { id: 'jessore-sadar', name: 'Jashore Sadar' },
                  { id: 'benapole', name: 'Benapole' }
                ]
              },
              {
                id: 'bd-kushtia',
                name: 'Kushtia',
                areas: [
                  { id: 'kushtia-sadar', name: 'Kushtia Sadar' },
                  { id: 'kumarkhali', name: 'Kumarkhali' }
                ]
              }
            ]
          },
          {
            id: 'bd-barisal',
            name: 'Barisal',
            districts: [
              {
                id: 'bd-barisal-city',
                name: 'Barishal City',
                areas: [
                  { id: 'sadar-road', name: 'Sadar Road' },
                  { id: 'natun-bazar', name: 'Natun Bazar' },
                  { id: 'rupatali', name: 'Rupatali' },
                  { id: 'kaunia', name: 'Kaunia' }
                ]
              }
            ]
          },
          {
            id: 'bd-rangpur',
            name: 'Rangpur',
            districts: [
              {
                id: 'bd-rangpur-city',
                name: 'Rangpur City',
                areas: [
                  { id: 'dhap', name: 'Dhap' },
                  { id: 'jahaj-company', name: 'Jahaj Company More' },
                  { id: 'lalbagh-rangpur', name: 'Lalbagh' },
                  { id: 'park-more', name: 'Park More' }
                ]
              }
            ]
          },
          {
            id: 'bd-mymensingh',
            name: 'Mymensingh',
            districts: [
              {
                id: 'bd-mymensingh-city',
                name: 'Mymensingh City',
                areas: [
                  { id: 'ganginarpar', name: 'Ganginarpar' },
                  { id: 'charpara', name: 'Charpara' },
                  { id: 'kewatkhali', name: 'Kewatkhali' },
                  { id: 'notun-bazar-mrg', name: 'Notun Bazar' }
                ]
              }
            ]
          }
        ]
      },
      { id: 'in', name: 'India', divisions: [] },
      { id: 'us', name: 'United States', divisions: [] },
      { id: 'ae', name: 'United Arab Emirates', divisions: [] },
      { id: 'sa', name: 'Saudi Arabia', divisions: [] },
      { id: 'my', name: 'Malaysia', divisions: [] },
      { id: 'uk', name: 'United Kingdom', divisions: [] },
      { id: 'ca', name: 'Canada', divisions: [] }
    ]
  };

  class LocationModalManager {
    constructor() {
      this.modal = document.getElementById('location-modal');
      this.dialog = document.getElementById('location-modal-dialog');
      this.backdrop = document.getElementById('location-modal-backdrop');
      this.closeBtn = document.getElementById('close-location-modal');
      this.backBtn = document.getElementById('loc-modal-back-btn');
      this.titleEl = document.getElementById('loc-modal-title');
      this.stepCounter = document.getElementById('loc-step-counter');
      this.levelBadge = document.getElementById('loc-level-badge');
      this.breadcrumbWrapper = document.getElementById('loc-breadcrumb-wrapper');
      this.searchInput = document.getElementById('loc-search-input');
      this.clearSearchBtn = document.getElementById('loc-clear-search');
      this.cardsGrid = document.getElementById('loc-cards-grid');
      this.emptyState = document.getElementById('loc-empty-state');
      this.resetSearchBtn = document.getElementById('loc-reset-search-btn');
      this.footerSelection = document.getElementById('loc-footer-selection-text');
      this.clearAllBtn = document.getElementById('loc-clear-all-btn');
      this.confirmBtn = document.getElementById('loc-confirm-btn');

      if (!this.modal) return;

      this.levelNames = ['Country', 'Division', 'District / City', 'Area / Sub-city'];

      this.state = {
        country: null,
        division: null,
        district: null,
        area: null
      };

      this.currentLevel = 0;
      this.currentItems = [];

      this.init();
    }

    init() {
      const defaultCountry = LOCATION_DATA.countries.find(c => c.id === 'bd');
      if (defaultCountry) {
        this.state.country = defaultCountry;
        this.currentLevel = 1;
      }

      this.bindEvents();
    }

    bindEvents() {
      $(document).on('click', '#banner-location-btn, .location-modal-trigger, [data-open-location-modal]', (e) => {
        e.preventDefault();
        this.open();
      });

      if (this.closeBtn) this.closeBtn.addEventListener('click', () => this.close());
      if (this.backdrop) this.backdrop.addEventListener('click', () => this.close());

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.modal && !this.modal.classList.contains('hidden')) {
          this.close();
        }
      });

      if (this.backBtn) {
        this.backBtn.addEventListener('click', () => this.goBack());
      }

      if (this.searchInput) {
        this.searchInput.addEventListener('input', (e) => {
          const query = e.target.value.trim().toLowerCase();
          this.filterItems(query);
        });
      }

      if (this.clearSearchBtn) {
        this.clearSearchBtn.addEventListener('click', () => {
          this.searchInput.value = '';
          this.clearSearchBtn.classList.add('hidden');
          this.filterItems('');
          this.searchInput.focus();
        });
      }

      if (this.resetSearchBtn) {
        this.resetSearchBtn.addEventListener('click', () => {
          this.searchInput.value = '';
          this.clearSearchBtn.classList.add('hidden');
          this.filterItems('');
        });
      }

      if (this.clearAllBtn) {
        this.clearAllBtn.addEventListener('click', () => {
          this.resetSelection();
        });
      }

      if (this.confirmBtn) {
        this.confirmBtn.addEventListener('click', () => {
          this.confirmCurrentSelection();
        });
      }
    }

    open() {
      if (!this.modal) return;
      this.modal.classList.remove('hidden', 'pointer-events-none');
      this.dialog.classList.remove('scale-95', 'opacity-0');
      this.modal.classList.add('opacity-100', 'pointer-events-auto');
      document.body.style.overflow = 'hidden';

      this.searchInput.value = '';
      if (this.clearSearchBtn) this.clearSearchBtn.classList.add('hidden');

      this.render();
    }

    close() {
      if (!this.modal) return;
      this.modal.classList.remove('opacity-100', 'pointer-events-auto');
      this.modal.classList.add('opacity-0', 'pointer-events-none');
      this.dialog.classList.add('scale-95', 'opacity-0');
      setTimeout(() => {
        this.modal.classList.add('hidden');
      }, 300);
      document.body.style.overflow = '';
    }

    goBack() {
      if (this.currentLevel > 0) {
        this.currentLevel--;
        if (this.currentLevel === 2) this.state.area = null;
        if (this.currentLevel === 1) { this.state.district = null; this.state.area = null; }
        if (this.currentLevel === 0) { this.state.division = null; this.state.district = null; this.state.area = null; }

        this.searchInput.value = '';
        if (this.clearSearchBtn) this.clearSearchBtn.classList.add('hidden');
        this.render();
      }
    }

    jumpToLevel(level) {
      if (level < this.currentLevel) {
        this.currentLevel = level;
        if (level === 0) { this.state.division = null; this.state.district = null; this.state.area = null; }
        if (level === 1) { this.state.district = null; this.state.area = null; }
        if (level === 2) { this.state.area = null; }

        this.searchInput.value = '';
        if (this.clearSearchBtn) this.clearSearchBtn.classList.add('hidden');
        this.render();
      }
    }

    resetSelection() {
      this.state = {
        country: LOCATION_DATA.countries.find(c => c.id === 'bd') || LOCATION_DATA.countries[0],
        division: null,
        district: null,
        area: null
      };
      this.currentLevel = 1;
      this.searchInput.value = '';
      if (this.clearSearchBtn) this.clearSearchBtn.classList.add('hidden');
      this.render();
      this.updateTriggerLabel('All Locations');
    }

    confirmCurrentSelection() {
      let label = 'All Locations';

      if (this.state.area) {
        label = this.state.district 
          ? `${this.state.area.name}, ${this.state.district.name}` 
          : this.state.area.name;
      } else if (this.state.district) {
        label = this.state.district.name;
      } else if (this.state.division) {
        label = this.state.division.name;
      } else if (this.state.country) {
        label = this.state.country.name;
      }

      this.finishSelection(label);
    }

    render() {
      this.updateHeaderAndBreadcrumbs();
      this.loadCurrentItems();
      this.renderCards(this.currentItems);
    }

    updateHeaderAndBreadcrumbs() {
      this.stepCounter.textContent = `Step ${this.currentLevel + 1} of 4`;
      this.levelBadge.textContent = this.levelNames[this.currentLevel];

      if (this.currentLevel > 0) {
        this.backBtn.classList.remove('hidden');
      } else {
        this.backBtn.classList.add('hidden');
      }

      let titleHtml = '';
      if (this.currentLevel === 0) {
        titleHtml = `Select a <span class="text-theme-primary">Country</span>`;
        this.searchInput.placeholder = 'Search country...';
      } else if (this.currentLevel === 1) {
        const countryName = this.state.country?.name || 'Bangladesh';
        titleHtml = `Select a Division in <span class="text-theme-primary">${countryName}</span>`;
        this.searchInput.placeholder = `Search division in ${countryName}...`;
      } else if (this.currentLevel === 2) {
        const divisionName = this.state.division?.name || 'Division';
        titleHtml = `Select a City/District in <span class="text-theme-primary">${divisionName}</span>`;
        this.searchInput.placeholder = `Search city in ${divisionName}...`;
      } else if (this.currentLevel === 3) {
        const cityName = this.state.district?.name || 'Dhaka';
        titleHtml = `Select a location in <span class="text-theme-primary">${cityName}</span>`;
        this.searchInput.placeholder = `Search area in ${cityName}...`;
      }
      this.titleEl.innerHTML = titleHtml;

      const crumbs = [];
      crumbs.push({ name: this.state.country?.name || 'Country', level: 0, active: this.currentLevel === 0 });

      if (this.state.division) {
        crumbs.push({ name: this.state.division.name, level: 1, active: this.currentLevel === 1 && !this.state.district });
      }
      if (this.state.district) {
        crumbs.push({ name: this.state.district.name, level: 2, active: this.currentLevel === 2 && !this.state.area });
      }
      if (this.state.area) {
        crumbs.push({ name: this.state.area.name, level: 3, active: true });
      }

      let breadcrumbHtml = `<div class="flex items-center gap-1.5 flex-wrap">`;
      crumbs.forEach((crumb, idx) => {
        const isClickable = crumb.level < this.currentLevel;
        const isLast = idx === crumbs.length - 1;

        breadcrumbHtml += `
          <button type="button" data-jump-level="${crumb.level}" 
            class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all border ${
              crumb.active 
                ? 'bg-theme-primary/10 text-theme-primary border-theme-primary/20' 
                : isClickable 
                  ? 'bg-slate-100 hover:bg-theme-primary/5 text-slate-700 hover:text-theme-primary border-slate-200 cursor-pointer' 
                  : 'bg-slate-50 text-slate-400 border-transparent cursor-default'
            }">
            <span>${crumb.name}</span>
          </button>
        `;

        if (!isLast) {
          breadcrumbHtml += `<i class="fa-solid fa-chevron-right text-[9px] text-slate-300"></i>`;
        }
      });
      breadcrumbHtml += `</div>`;
      this.breadcrumbWrapper.innerHTML = breadcrumbHtml;

      this.breadcrumbWrapper.querySelectorAll('[data-jump-level]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const targetLevel = parseInt(btn.getAttribute('data-jump-level'), 10);
          if (targetLevel < this.currentLevel) {
            this.jumpToLevel(targetLevel);
          }
        });
      });

      const fullPathNames = [
        this.state.area?.name,
        this.state.district?.name,
        this.state.division?.name,
        this.state.country?.name
      ].filter(Boolean);

      this.footerSelection.textContent = fullPathNames.length ? fullPathNames.join(', ') : 'All Locations';
    }

    /**
     * Load current items for the active step.
     * Always prepends "All [Parent]" option at Level 1, Level 2, and Level 3.
     */
    loadCurrentItems() {
      if (this.currentLevel === 0) {
        this.currentItems = [...LOCATION_DATA.countries];
      } else if (this.currentLevel === 1) {
        // Under Country -> viewing Divisions: Prepend "All [Country]" (e.g., "All Bangladesh")
        const countryName = this.state.country?.name || 'Bangladesh';
        const allCountryItem = {
          id: `all-country-${this.state.country?.id || 'country'}`,
          name: `All ${countryName}`,
          isAll: true,
          levelType: 'country'
        };
        const rawDivisions = this.state.country?.divisions || [];
        this.currentItems = [allCountryItem, ...rawDivisions];

      } else if (this.currentLevel === 2) {
        // Under Division -> viewing Districts/Cities: Prepend "All [Division]" (e.g., "All Dhaka")
        const divisionName = this.state.division?.name || 'Division';
        const allDivisionItem = {
          id: `all-division-${this.state.division?.id || 'division'}`,
          name: `All ${divisionName}`,
          isAll: true,
          levelType: 'division'
        };
        const rawDistricts = this.state.division?.districts || [];
        this.currentItems = [allDivisionItem, ...rawDistricts];

      } else if (this.currentLevel === 3) {
        // Under District/City -> viewing Areas/Sub-cities: Prepend "All [City]" (e.g., "All Dhaka")
        const cityName = this.state.district?.name || 'City';
        const allCityItem = {
          id: `all-city-${this.state.district?.id || 'city'}`,
          name: `All ${cityName}`,
          isAll: true,
          levelType: 'district'
        };
        const rawAreas = (this.state.district?.areas || []).filter(a => !a.isAll && !a.name.startsWith('All '));
        this.currentItems = [allCityItem, ...rawAreas];
      }
    }

    renderCards(items) {
      if (!items || items.length === 0) {
        this.cardsGrid.innerHTML = '';
        this.emptyState.classList.remove('hidden');
        return;
      }

      this.emptyState.classList.add('hidden');

      let html = '';
      items.forEach(item => {
        const isAllOption = item.isAll || item.name.startsWith('All ');
        const isSelected = this.state.area && this.state.area.id === item.id;
        
        html += `
          <button type="button" data-id="${item.id}" data-name="${item.name}" data-is-all="${isAllOption ? 'true' : 'false'}"
            class="loc-card w-full flex items-center justify-between p-3 sm:p-3.5 rounded-2xl border transition-all duration-200 group text-left cursor-pointer ${
              isSelected
                ? 'bg-theme-primary/10 border-theme-primary shadow-sm ring-1 ring-theme-primary'
                : isAllOption 
                  ? 'bg-theme-primary/[0.04] border-theme-primary/35 hover:border-theme-primary hover:bg-theme-primary/10 shadow-xs' 
                  : 'bg-white hover:bg-theme-primary/5 border-slate-200/80 hover:border-theme-primary/40 shadow-xs hover:shadow-card-hover'
            }">
            <div class="flex items-center gap-3 min-w-0">
              <!-- Pin Icon Badge (Matching Screenshot) -->
              <div class="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shrink-0 ${
                isSelected || isAllOption
                  ? 'bg-theme-primary text-white shadow-xs'
                  : 'bg-theme-primary/10 text-theme-primary group-hover:bg-theme-primary group-hover:text-white'
              }">
                <i class="${isSelected ? 'fa-solid fa-check' : 'fa-solid fa-location-dot'} text-xs"></i>
              </div>
              
              <!-- Location Name -->
              <div class="flex flex-col min-w-0">
                <span class="text-xs sm:text-[13px] font-bold ${
                  isSelected || isAllOption ? 'text-theme-primary font-black' : 'text-slate-800 group-hover:text-theme-primary'
                } transition-colors truncate">
                  ${item.name}
                </span>
                ${isAllOption ? '<span class="text-[9px] text-theme-primary/70 font-semibold uppercase tracking-wider">Select entire region</span>' : ''}
              </div>
            </div>

            <!-- Chevron or Check Icon -->
            <i class="fa-solid ${isSelected ? 'fa-check text-theme-primary font-bold' : 'fa-chevron-right text-slate-300 group-hover:text-theme-primary group-hover:translate-x-0.5'} transition-all text-xs shrink-0 ml-2"></i>
          </button>
        `;
      });

      this.cardsGrid.innerHTML = html;

      // Bind Card Clicks
      this.cardsGrid.querySelectorAll('.loc-card').forEach(card => {
        card.addEventListener('click', (e) => {
          const id = card.getAttribute('data-id');
          const name = card.getAttribute('data-name');
          const isAll = card.getAttribute('data-is-all') === 'true';
          this.handleItemSelection(id, name, isAll);
        });
      });
    }

    handleItemSelection(id, name, isAll) {
      const selectedObj = this.currentItems.find(item => item.id === id) || { id, name, isAll };

      // Handle "All [Region]" option at any step
      if (isAll) {
        if (this.currentLevel === 1) {
          // Clicked "All Bangladesh" -> Selects entire Country
          this.state.division = null;
          this.state.district = null;
          this.state.area = null;
          this.finishSelection(this.state.country?.name || name.replace('All ', ''));
        } else if (this.currentLevel === 2) {
          // Clicked "All Dhaka" (Division level) -> Selects entire Division
          this.state.district = null;
          this.state.area = null;
          this.finishSelection(this.state.division?.name || name.replace('All ', ''));
        } else if (this.currentLevel === 3) {
          // Clicked "All Dhaka" (City level) -> Selects entire City/District
          this.state.area = null;
          this.finishSelection(this.state.district?.name || name.replace('All ', ''));
        }
        return;
      }

      // Normal step drill-down
      if (this.currentLevel === 0) {
        // Selected Country
        this.state.country = selectedObj;
        this.state.division = null;
        this.state.district = null;
        this.state.area = null;

        if (selectedObj.divisions && selectedObj.divisions.length > 0) {
          this.currentLevel = 1;
          this.searchInput.value = '';
          if (this.clearSearchBtn) this.clearSearchBtn.classList.add('hidden');
          this.render();
        } else {
          this.finishSelection(selectedObj.name);
        }

      } else if (this.currentLevel === 1) {
        // Selected Division
        this.state.division = selectedObj;
        this.state.district = null;
        this.state.area = null;

        if (selectedObj.districts && selectedObj.districts.length > 0) {
          this.currentLevel = 2;
          this.searchInput.value = '';
          if (this.clearSearchBtn) this.clearSearchBtn.classList.add('hidden');
          this.render();
        } else {
          this.finishSelection(selectedObj.name);
        }

      } else if (this.currentLevel === 2) {
        // Selected District / City
        this.state.district = selectedObj;
        this.state.area = null;

        if (selectedObj.areas && selectedObj.areas.length > 0) {
          this.currentLevel = 3;
          this.searchInput.value = '';
          if (this.clearSearchBtn) this.clearSearchBtn.classList.add('hidden');
          this.render();
        } else {
          this.finishSelection(selectedObj.name);
        }

      } else if (this.currentLevel === 3) {
        // Selected Area / Sub-City:
        // Set area in state, update header & footer, highlight the card, and allow instant confirmation
        this.state.area = selectedObj;
        this.updateHeaderAndBreadcrumbs();
        this.renderCards(this.currentItems);
      }
    }

    finishSelection(displayLabel) {
      this.updateTriggerLabel(displayLabel);

      const detail = {
        country: this.state.country,
        division: this.state.division,
        district: this.state.district,
        area: this.state.area,
        displayLabel: displayLabel
      };

      window.dispatchEvent(new CustomEvent('asset-sheba:location-selected', { detail }));

      this.close();
    }

    updateTriggerLabel(label) {
      const labelEl = document.getElementById('banner-location-label');
      if (labelEl) {
        labelEl.textContent = label;
      }
      $('.selected-location-label').text(label);
    }

    filterItems(query) {
      if (!query) {
        if (this.clearSearchBtn) this.clearSearchBtn.classList.add('hidden');
        this.renderCards(this.currentItems);
        return;
      }

      if (this.clearSearchBtn) this.clearSearchBtn.classList.remove('hidden');

      const filtered = this.currentItems.filter(item => 
        item.name.toLowerCase().includes(query)
      );

      this.renderCards(filtered);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    window.locationModalManager = new LocationModalManager();
  });
})();
