let travelData = {};
let exchangeRates = {};

// 1. Fetch Data & Currency Rates on Load
document.addEventListener("DOMContentLoaded", async () => {
  const selectElement = document.getElementById("country");
  const buttonElement = document.getElementById("searchBtn");

  try {
    // Parallel Fetch: Load Country Data AND Currency Rates at the same time
    const [dataResponse, currencyResponse] = await Promise.all([
      fetch("data.json"),
      fetch("https://api.exchangerate-api.com/v4/latest/USD") // Free, no-key API
    ]);

    travelData = await dataResponse.json();
    const rateData = await currencyResponse.json();
    exchangeRates = rateData.rates;

    // Populate Dropdown
    selectElement.innerHTML = '<option value="" disabled selected>Select a destination</option>';
    Object.keys(travelData).forEach(country => {
      const option = document.createElement("option");
      option.value = country;
      option.textContent = country;
      selectElement.appendChild(option);
    });

    buttonElement.disabled = false;

  } catch (error) {
    console.error("Error loading data:", error);
    document.getElementById("error-msg").textContent = "⚠️ Error loading data. Please check your internet connection.";
  }
});

let currentCurrencyCode = ""; // Store current country's currency code

function showCountry() {
  const selectedCountry = document.getElementById("country").value;
  if (!selectedCountry) return;

  const info = travelData[selectedCountry];
  const card = document.getElementById("result-card");
  
  // 1. Update Header & Image
  document.getElementById("country-name").textContent = selectedCountry;
  document.getElementById("flag").textContent = info.flag;
  document.getElementById("description").textContent = info.description;
  document.getElementById("card-image").style.backgroundImage = `url('${info.image}')`;

  // 2. Update Overview Tab
  document.getElementById("capital").textContent = info.capital;
  document.getElementById("best-time").textContent = info.bestTime;
  document.getElementById("places").textContent = info.places.join(", ");

  // 3. Update Guide Tab
  document.getElementById("culture").textContent = info.culture;
  document.getElementById("food").textContent = info.food;
  document.getElementById("rules").textContent = info.rules;

  // 4. Update Currency Tab
  currentCurrencyCode = info.currencyCode;
  document.getElementById("local-currency-name").textContent = info.currency;
  document.getElementById("target-currency-code").textContent = info.currencyCode;
  
  // Update Rate Display
  const rate = exchangeRates[currentCurrencyCode];
  document.getElementById("exchange-rate").textContent = rate ? `${rate} ${info.currencyCode}` : "Unavailable";
  document.getElementById("amount-input").value = ""; // Clear previous input
  document.getElementById("conversion-result").textContent = "0.00";

  // Show Card & Reset Tab to Overview
  card.classList.remove("hidden");
  openTab('overview');
}

// Tab Switching Logic
function openTab(tabName) {
  // Hide all tab contents
  const contents = document.querySelectorAll(".tab-content");
  contents.forEach(content => content.classList.remove("active-tab"));

  // Deactivate all tab buttons
  const buttons = document.querySelectorAll(".tab-link");
  buttons.forEach(btn => btn.classList.remove("active"));

  // Activate specific tab
  document.getElementById(tabName).classList.add("active-tab");
  
  // Find the button that was clicked (approximate logic for simplicity)
  const clickedBtn = Array.from(buttons).find(btn => btn.getAttribute('onclick').includes(tabName));
  if(clickedBtn) clickedBtn.classList.add("active");
}

// Currency Conversion Logic
function convertCurrency() {
  const amount = parseFloat(document.getElementById("amount-input").value);
  const rate = exchangeRates[currentCurrencyCode];

  if (!isNaN(amount) && rate) {
    const result = (amount * rate).toFixed(2);
    document.getElementById("conversion-result").textContent = result;
  } else {
    document.getElementById("conversion-result").textContent = "0.00";
  }
}
