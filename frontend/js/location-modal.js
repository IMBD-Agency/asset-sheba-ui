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

  // Helper: Flatten entire location hierarchy for lightning-fast floating search
  function getAllLocationsFlat(data) {
    const flat = [];
    (data.countries || []).forEach(country => {
      flat.push({
        id: country.id,
        name: country.name,
        type: 'country',
        typeLabel: 'Country',
        icon: 'fa-solid fa-globe',
        pathString: country.name,
        countryObj: country,
        divisionObj: null,
        districtObj: null,
        areaObj: null
      });

      (country.divisions || []).forEach(division => {
        flat.push({
          id: division.id,
          name: division.name,
          type: 'division',
          typeLabel: 'Division',
          icon: 'fa-solid fa-map',
          pathString: `${country.name} > ${division.name}`,
          countryObj: country,
          divisionObj: division,
          districtObj: null,
          areaObj: null
        });

        (division.districts || []).forEach(district => {
          flat.push({
            id: district.id,
            name: district.name,
            type: 'district',
            typeLabel: 'City / District',
            icon: 'fa-solid fa-city',
            pathString: `${country.name} > ${division.name} > ${district.name}`,
            countryObj: country,
            divisionObj: division,
            districtObj: district,
            areaObj: null
          });

          (district.areas || []).forEach(area => {
            if (area.isAll || area.name.startsWith('All ')) return;
            flat.push({
              id: area.id,
              name: area.name,
              type: 'area',
              typeLabel: 'Area',
              icon: 'fa-solid fa-location-dot',
              pathString: `${country.name} > ${division.name} > ${district.name} > ${area.name}`,
              countryObj: country,
              divisionObj: division,
              districtObj: district,
              areaObj: area
            });
          });
        });
      });
    });
    return flat;
  }

  const ALL_LOCATIONS_FLAT = getAllLocationsFlat(LOCATION_DATA);

  class LocationModalManager {
    constructor() {
      this.modal = document.getElementById('location-modal');
      this.dialog = document.getElementById('location-modal-dialog');
      this.backdrop = document.getElementById('location-modal-backdrop');
      this.closeBtn = document.getElementById('close-location-modal');
      this.backBtn = document.getElementById('loc-modal-back-btn');
      this.titleEl = document.getElementById('loc-modal-title');
      this.breadcrumbWrapper = document.getElementById('loc-breadcrumb-wrapper');
      this.searchInput = document.getElementById('loc-search-input');
      this.clearSearchBtn = document.getElementById('loc-clear-search');
      this.cardsGrid = document.getElementById('loc-cards-grid');
      this.allOptionContainer = document.getElementById('loc-all-option-container');
      this.subitemsHeader = document.getElementById('loc-subitems-header');
      this.emptyState = document.getElementById('loc-empty-state');
      this.searchView = document.getElementById('loc-search-view');
      this.searchList = document.getElementById('loc-search-list');
      this.searchEmptyState = document.getElementById('loc-search-empty-state');
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
      // Trigger click delegation (handles dynamic and static buttons)
      if (typeof $ !== 'undefined') {
        $(document).on('click', '#banner-location-btn, .location-modal-trigger, [data-open-location-modal]', (e) => {
          e.preventDefault();
          this.open();
        });
      }

      document.addEventListener('click', (e) => {
        const trigger = e.target.closest('#banner-location-btn, .location-modal-trigger, [data-open-location-modal]');
        if (trigger) {
          e.preventDefault();
          this.open();
        }
      });

      if (this.closeBtn) this.closeBtn.addEventListener('click', () => this.close());
      if (this.backdrop) this.backdrop.addEventListener('click', () => this.close());

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.modal && !this.modal.classList.contains('hidden')) {
          if (this.searchView && !this.searchView.classList.contains('hidden')) {
            this.searchView.classList.add('hidden');
          } else {
            this.close();
          }
        }
      });

      document.addEventListener('click', (e) => {
        if (this.searchView && !this.searchView.classList.contains('hidden')) {
          if (!this.searchView.contains(e.target) && e.target !== this.searchInput) {
            this.searchView.classList.add('hidden');
          }
        }
      });

      if (this.backBtn) {
        this.backBtn.addEventListener('click', () => this.goBack());
      }

      if (this.searchInput) {
        this.searchInput.addEventListener('input', (e) => {
          const query = e.target.value.trim().toLowerCase();
          this.handleSearch(query);
        });
      }

      if (this.clearSearchBtn) {
        this.clearSearchBtn.addEventListener('click', () => {
          this.searchInput.value = '';
          this.clearSearchBtn.classList.add('hidden');
          this.handleSearch('');
          this.searchInput.focus();
        });
      }

      if (this.resetSearchBtn) {
        this.resetSearchBtn.addEventListener('click', () => {
          this.searchInput.value = '';
          if (this.clearSearchBtn) this.clearSearchBtn.classList.add('hidden');
          this.handleSearch('');
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
      if (this.searchView) this.searchView.classList.add('hidden');
      this.modal.classList.remove('opacity-100', 'pointer-events-auto');
      this.modal.classList.add('opacity-0', 'pointer-events-none');
      this.dialog.classList.add('scale-95', 'opacity-0');
      setTimeout(() => {
        this.modal.classList.add('hidden');
      }, 300);
      document.body.style.overflow = '';
    }

    goBack() {
      if (this.currentLevel > 1) {
        this.jumpToLevel(this.currentLevel - 1);
      } else if (this.currentLevel === 1) {
        if (LOCATION_DATA.countries.length > 1) {
          this.jumpToLevel(0);
        }
      }
    }

    jumpToLevel(level) {
      if (level < this.currentLevel) {
        this.currentLevel = level;
        if (level === 0) {
          this.state.country = null;
          this.state.division = null;
          this.state.district = null;
          this.state.area = null;
        } else if (level === 1) {
          this.state.division = null;
          this.state.district = null;
          this.state.area = null;
        } else if (level === 2) {
          this.state.district = null;
          this.state.area = null;
        } else if (level === 3) {
          this.state.area = null;
        }

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

      if (this.state.area && !this.state.area.isAll) {
        label = this.state.district
          ? `${this.state.area.name}, ${this.state.district.name}`
          : this.state.area.name;
      } else if (this.state.district && !this.state.district.isAll) {
        label = this.state.district.name;
      } else if (this.state.division && !this.state.division.isAll) {
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
      if (this.currentLevel > 0) {
        this.backBtn.classList.remove('hidden');
      } else {
        this.backBtn.classList.add('hidden');
      }

      let titleHtml = '';
      if (this.currentLevel === 0) {
        titleHtml = `Select <span class="text-theme-primary">Country</span>`;
        this.searchInput.placeholder = 'Search country...';
      } else if (this.currentLevel === 1) {
        const countryName = this.state.country?.name || 'Bangladesh';
        titleHtml = `Select Division in <span class="text-theme-primary">${countryName}</span>`;
        this.searchInput.placeholder = `Search division in ${countryName}...`;
      } else if (this.currentLevel === 2) {
        const divisionName = this.state.division?.name || 'Division';
        titleHtml = `Select City in <span class="text-theme-primary">${divisionName}</span>`;
        this.searchInput.placeholder = `Search city in ${divisionName}...`;
      } else if (this.currentLevel === 3) {
        const cityName = this.state.district?.name || 'City';
        titleHtml = `Select Area in <span class="text-theme-primary">${cityName}</span>`;
        this.searchInput.placeholder = `Search area in ${cityName}...`;
      }
      this.titleEl.innerHTML = titleHtml;

      // Plain-text Location Trail after Search Box (e.g. Bangladesh / Dhaka / Manikganj / Shivalaya)
      const crumbs = [];
      if (this.state.country) {
        const isCurrent = this.currentLevel === 1;
        crumbs.push({
          name: this.state.country.name,
          level: 1, // Clicking Country jumps to Level 1 (viewing Divisions of that Country)
          isClickable: this.currentLevel > 1,
          isCurrent: isCurrent
        });
      }
      if (this.state.division && !this.state.division.isAll && this.currentLevel >= 2) {
        const isCurrent = this.currentLevel === 2;
        crumbs.push({
          name: this.state.division.name,
          level: 2, // Clicking Division jumps to Level 2 (viewing Cities of that Division)
          isClickable: this.currentLevel > 2,
          isCurrent: isCurrent
        });
      }
      if (this.state.district && !this.state.district.isAll && this.currentLevel >= 3) {
        const isCurrent = this.currentLevel === 3 && (!this.state.area || this.state.area.isAll);
        crumbs.push({
          name: this.state.district.name,
          level: 3, // Clicking City jumps to Level 3 (viewing Areas of that City)
          isClickable: false,
          isCurrent: isCurrent
        });
      }
      if (this.state.area && !this.state.area.isAll) {
        crumbs.push({
          name: this.state.area.name,
          level: 3,
          isClickable: false,
          isCurrent: true
        });
      }

      let breadcrumbHtml = '';
      if (crumbs.length === 0) {
        breadcrumbHtml = `<span class="text-slate-400">All Locations</span>`;
      } else {
        breadcrumbHtml = crumbs.map((crumb, idx) => {
          const isLast = idx === crumbs.length - 1;
          if (crumb.isCurrent || isLast) {
            return `<span class="text-theme-primary font-bold shrink-0">${crumb.name}</span>`;
          } else if (crumb.isClickable) {
            return `<button type="button" data-jump-level="${crumb.level}" class="text-slate-400 dark:text-slate-400 hover:text-theme-primary transition-colors cursor-pointer hover:underline underline-offset-2 shrink-0">${crumb.name}</button>`;
          } else {
            return `<span class="shrink-0">${crumb.name}</span>`;
          }
        }).join('<span class="text-slate-300 dark:text-slate-600 mx-1 shrink-0">/</span>');
      }
      this.breadcrumbWrapper.innerHTML = breadcrumbHtml;

      // Auto-scroll breadcrumbs container so the last (active) item is always inside view!
      setTimeout(() => {
        if (this.breadcrumbWrapper) {
          this.breadcrumbWrapper.scrollTo({
            left: this.breadcrumbWrapper.scrollWidth,
            behavior: 'smooth'
          });
        }
      }, 40);

      this.breadcrumbWrapper.querySelectorAll('[data-jump-level]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const targetLevel = parseInt(btn.getAttribute('data-jump-level'), 10);
          if (targetLevel < this.currentLevel) {
            this.jumpToLevel(targetLevel);
          }
        });
      });

      const fullPathNames = [
        (this.state.area && !this.state.area.isAll) ? this.state.area.name : null,
        (this.state.district && !this.state.district.isAll) ? this.state.district.name : null,
        (this.state.division && !this.state.division.isAll) ? this.state.division.name : null,
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
        // Under District/City -> viewing Areas/Sub-cities: Prepend "All [City]" (e.g., "All Manikganj")
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

    createCardHtml(item, isSelected, isAllOption) {
      return `
        <button type="button" data-id="${item.id}" data-name="${item.name}" data-is-all="${isAllOption ? 'true' : 'false'}"
          class="loc-card w-full flex items-center justify-between px-3.5 py-2.5 sm:py-3 rounded-xl border transition-all duration-150 text-left group cursor-pointer ${isSelected
          ? 'bg-theme-primary/10 dark:bg-theme-primary/20 border-theme-primary shadow-xs ring-1 ring-theme-primary/30'
          : 'bg-white dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-700/70 hover:border-theme-primary/50 dark:hover:border-theme-primary/50 hover:bg-theme-primary/[0.03] dark:hover:bg-theme-primary/[0.08]'
        }">
          <span class="text-xs sm:text-[13px] ${isSelected
          ? 'font-bold text-theme-primary'
          : 'font-medium text-slate-700 dark:text-slate-200 group-hover:text-theme-primary dark:group-hover:text-theme-primary'
        } transition-colors truncate">
            ${item.name}
          </span>

          <i class="${isSelected
          ? 'fa-solid fa-check text-xs text-theme-primary'
          : 'fa-solid fa-chevron-right text-[10px] text-slate-300 dark:text-slate-600 group-hover:text-theme-primary group-hover:translate-x-0.5'
        } transition-all shrink-0 ml-2"></i>
        </button>
      `;
    }

    renderCards(items) {
      if (!items || items.length === 0) {
        if (this.cardsGrid) this.cardsGrid.innerHTML = '';
        if (this.allOptionContainer) this.allOptionContainer.classList.add('hidden');
        if (this.emptyState) this.emptyState.classList.remove('hidden');
        return;
      }

      if (this.emptyState) this.emptyState.classList.add('hidden');

      // Separate "All [Parent]" option from sub-level items
      const allItem = items.find(item => item.isAll || item.name.startsWith('All '));
      const subItems = items.filter(item => !(item.isAll || item.name.startsWith('All ')));

      // 1. All Option in separate top row (exact same card style & size)
      if (allItem && this.allOptionContainer) {
        let isAllSelected = false;
        if (this.currentLevel === 3) {
          isAllSelected = !this.state.area || this.state.area.isAll;
        } else if (this.currentLevel === 2) {
          isAllSelected = !this.state.district || this.state.district.isAll;
        } else if (this.currentLevel === 1) {
          isAllSelected = !this.state.division || this.state.division.isAll;
        }

        this.allOptionContainer.classList.remove('hidden');
        const allCardGrid = this.allOptionContainer.querySelector('.grid') || this.allOptionContainer;
        allCardGrid.innerHTML = this.createCardHtml(allItem, isAllSelected, true);
      } else if (this.allOptionContainer) {
        this.allOptionContainer.classList.add('hidden');
        const allCardGrid = this.allOptionContainer.querySelector('.grid') || this.allOptionContainer;
        allCardGrid.innerHTML = '';
      }

      // 2. Sub-items Grid (exact same card style)
      let html = '';
      subItems.forEach(item => {
        let isSelected = false;

        if (this.currentLevel === 3) {
          isSelected = Boolean(this.state.area && !this.state.area.isAll && this.state.area.id === item.id);
        } else if (this.currentLevel === 2) {
          isSelected = Boolean(this.state.district && !this.state.district.isAll && this.state.district.id === item.id);
        } else if (this.currentLevel === 1) {
          isSelected = Boolean(this.state.division && !this.state.division.isAll && this.state.division.id === item.id);
        } else if (this.currentLevel === 0) {
          isSelected = Boolean(this.state.country && this.state.country.id === item.id);
        }

        html += this.createCardHtml(item, isSelected, false);
      });

      this.cardsGrid.innerHTML = html;

      // Bind Card Clicks for all cards (both top row and grid)
      const allCards = [
        ...(this.allOptionContainer ? this.allOptionContainer.querySelectorAll('.loc-card') : []),
        ...this.cardsGrid.querySelectorAll('.loc-card')
      ];

      allCards.forEach(card => {
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

      // Handle "All [Region]" selection
      if (isAll) {
        if (this.currentLevel === 1) {
          // Clicked "All Bangladesh" -> Selects entire Country
          this.state.division = { id, name, isAll: true };
          this.state.district = null;
          this.state.area = null;
          this.updateHeaderAndBreadcrumbs();
          this.renderCards(this.currentItems);
        } else if (this.currentLevel === 2) {
          // Clicked "All Dhaka" (Division level) -> Selects entire Division
          this.state.district = { id, name, isAll: true };
          this.state.area = null;
          this.updateHeaderAndBreadcrumbs();
          this.renderCards(this.currentItems);
        } else if (this.currentLevel === 3) {
          // Clicked "All Manikganj" (City level) -> Selects entire City (clears specific sub-city)
          this.state.area = { id, name, isAll: true };
          this.updateHeaderAndBreadcrumbs();
          this.renderCards(this.currentItems);
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
        // Selected Specific Area / Sub-City (e.g. Shivalaya)
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

    handleSearch(query) {
      query = (query || '').trim().toLowerCase();

      if (!query) {
        if (this.clearSearchBtn) this.clearSearchBtn.classList.add('hidden');
        if (this.searchView) this.searchView.classList.add('hidden');
        return;
      }

      if (this.clearSearchBtn) this.clearSearchBtn.classList.remove('hidden');

      const matches = ALL_LOCATIONS_FLAT.filter(loc =>
        loc.name.toLowerCase().includes(query) || loc.pathString.toLowerCase().includes(query)
      );

      if (matches.length === 0) {
        if (this.searchView) this.searchView.classList.remove('hidden');
        if (this.searchList) this.searchList.classList.add('hidden');
        if (this.searchEmptyState) this.searchEmptyState.classList.remove('hidden');
        return;
      }

      if (this.searchView && this.searchList) {
        if (this.searchEmptyState) this.searchEmptyState.classList.add('hidden');
        this.searchList.classList.remove('hidden');
        this.searchList.innerHTML = '';
        this.searchView.classList.remove('hidden');

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
                <i class="${match.icon} text-[11px]"></i>
              </div>
              <div class="min-w-0">
                <div class="flex items-center gap-1.5">
                  <span class="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">${highlightedName}</span>
                  <span class="text-[9px] px-1.5 py-0.5 rounded bg-slate-200/60 dark:bg-slate-700 text-slate-500 dark:text-slate-400 font-medium">${match.typeLabel}</span>
                </div>
                <div class="text-[10px] text-slate-400 truncate mt-0.5">${highlightedPath}</div>
              </div>
            </div>
            <div class="flex items-center gap-1.5 shrink-0">
              <span class="text-[9px] px-2 py-0.5 rounded-md bg-theme-primary/10 text-theme-primary font-semibold">Select</span>
            </div>
          `;

          itemEl.addEventListener('click', (e) => {
            e.stopPropagation();
            this.hydrateFromSearchResult(match);
            this.searchInput.value = '';
            this.handleSearch('');
          });

          this.searchList.appendChild(itemEl);
        });
      }
    }

    hydrateFromSearchResult(match) {
      if (this.searchView) this.searchView.classList.add('hidden');

      if (match.type === 'area') {
        this.state.country = match.countryObj;
        this.state.division = match.divisionObj;
        this.state.district = match.districtObj;
        this.state.area = match.areaObj;
        this.currentLevel = 3;
      } else if (match.type === 'district') {
        this.state.country = match.countryObj;
        this.state.division = match.divisionObj;
        this.state.district = match.districtObj;
        this.state.area = null;
        this.currentLevel = 3;
      } else if (match.type === 'division') {
        this.state.country = match.countryObj;
        this.state.division = match.divisionObj;
        this.state.district = null;
        this.state.area = null;
        this.currentLevel = 2;
      } else if (match.type === 'country') {
        this.state.country = match.countryObj;
        this.state.division = null;
        this.state.district = null;
        this.state.area = null;
        this.currentLevel = 1;
      }

      this.render();
    }
  }

  let instance = null;
  function initLocationModal() {
    if (!instance) {
      instance = new LocationModalManager();
      window.locationModalManager = instance;
      window.LocationModal = {
        open: () => instance.open(),
        close: () => instance.close(),
        reset: () => instance.resetSelection(),
        getData: () => LOCATION_DATA,
        getState: () => instance.state
      };
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLocationModal);
  } else {
    initLocationModal();
  }
})();
