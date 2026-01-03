let allCountries = [];
let exchangeRates = {};

async function initApp() {
    try {
        // 1. Fetch data for all 195 countries
        const res = await fetch('https://restcountries.com/v3.1/all');
        allCountries = await res.json();
        
        // Sort alphabetically
        allCountries.sort((a, b) => a.name.common.localeCompare(b.name.common));

        // 2. Fetch Exchange Rates
        const rateRes = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const rateData = await rateRes.json();
        exchangeRates = rateData.rates;

        populateCountryList();
        initGlobe();
        populateCurrencyDropdowns();
    } catch (e) {
        console.error("Initialization failed", e);
    }
}

function populateCountryList() {
    const list = document.getElementById('side-nav');
    const globeList = document.getElementById('countryList');
    
    allCountries.forEach(country => {
        // Sidebar List
        const btn = document.createElement('button');
        btn.className = 'nav-item';
        btn.innerHTML = `<span>${country.flag}</span> ${country.name.common}`;
        btn.onclick = () => loadCountryPage(country.name.common);
        list.appendChild(btn);

        // Globe Tags
        const li = document.createElement('li');
        li.innerHTML = `<a href="#" onclick="loadCountryPage('${country.name.common}')">${country.name.common}</a>`;
        globeList.appendChild(li);
    });
}

function initGlobe() {
    try {
        TagCanvas.Start('globeCanvas', 'countryList', {
            textColour: '#1e3c72',
            outlineColour: 'transparent',
            reverse: true,
            depth: 0.8,
            maxSpeed: 0.05,
            textFont: 'Outfit, sans-serif',
            weight: true
        });
    } catch(e) {
        document.getElementById('globe-viewport').style.display = 'none';
    }
}

function loadCountryPage(name) {
    const country = allCountries.find(c => c.name.common === name);
    if(!country) return;

    // Switch Views
    document.getElementById('welcome-screen').classList.add('hidden');
    document.getElementById('country-page').classList.remove('hidden');

    // Basic Info
    document.getElementById('display-name').textContent = country.name.common;
    document.getElementById('display-flag').textContent = country.flag;
    document.getElementById('info-capital').textContent = country.capital ? country.capital[0] : 'N/A';
    
    // Banner Image (Using Unsplash API for high quality)
    document.getElementById('banner-img').style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${name},landmark')`;

    // Mock Travel Guide Data (Since real-time APIs for food/culture are restricted, we generate them based on region)
    document.getElementById('info-food').textContent = getFoodByRegion(country.region);
    document.getElementById('info-culture').textContent = `Influenced by ${country.subregion} traditions. Strong emphasis on local community.`;
    document.getElementById('info-rules').textContent = `Check local visa requirements for ${country.continents[0]}. Standard international travel laws apply.`;

    // Currency Setup
    const currencyCode = Object.keys(country.currencies)[0];
    document.getElementById('toCurrency').value = currencyCode;
    performConversion();
}

// Utility: Dynamic Currency logic
function populateCurrencyDropdowns() {
    const from = document.getElementById('fromCurrency');
    const to = document.getElementById('toCurrency');
    
    Object.keys(exchangeRates).forEach(code => {
        const opt = `<option value="${code}">${code}</option>`;
        from.innerHTML += opt;
        to.innerHTML += opt;
    });

    from.value = "USD";
}

function performConversion() {
    const from = document.getElementById('fromCurrency').value;
    const to = document.getElementById('toCurrency').value;
    const amount = document.getElementById('fromAmount').value;

    const rate = exchangeRates[to] / exchangeRates[from];
    document.getElementById('toAmount').value = (amount * rate).toFixed(2);
    document.getElementById('live-rate').textContent = `1 ${from} = ${rate.toFixed(4)} ${to}`;
}

function getFoodByRegion(region) {
    const foods = {
        "Asia": "Rice dishes, Spiced Curries, Noodle Soups",
        "Europe": "Artisan Breads, Cheeses, Pastas",
        "Americas": "Corn-based tortillas, Grilled meats, Tropical fruits",
        "Africa": "Couscous, Tagines, Stewed grains",
        "Oceania": "Seafood, Root vegetables, Grilled Fish"
    };
    return foods[region] || "Local traditional cuisine";
}

initApp();
