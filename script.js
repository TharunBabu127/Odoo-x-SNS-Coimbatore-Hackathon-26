let travelData = {};

// 1. Fetch data when the page loads
document.addEventListener("DOMContentLoaded", async () => {
  const selectElement = document.getElementById("country");
  const buttonElement = document.getElementById("searchBtn");
  const errorMsg = document.getElementById("error-msg");

  try {
    const response = await fetch("data.json");
    if (!response.ok) throw new Error("Could not load travel data.");
    
    travelData = await response.json();

    // 2. Clear "Loading..." and add default option
    selectElement.innerHTML = '<option value="" disabled selected>Select a destination</option>';

    // 3. Dynamically populate dropdown from JSON keys
    Object.keys(travelData).forEach(country => {
      const option = document.createElement("option");
      option.value = country;
      option.textContent = country;
      selectElement.appendChild(option);
    });

    // Enable the button now that data is ready
    buttonElement.disabled = false;

  } catch (error) {
    console.error(error);
    selectElement.innerHTML = '<option disabled>Error loading data</option>';
    errorMsg.textContent = "Error: Please make sure data.json is valid and accessible.";
  }
});

function showCountry() {
  const selectedCountry = document.getElementById("country").value;
  const resultCard = document.getElementById("result-card");
  
  // Validation: User didn't pick anything
  if (!selectedCountry) {
    alert("Please select a country first!");
    return;
  }

  const info = travelData[selectedCountry];

  // Populate the UI safely
  document.getElementById("flag").textContent = info.flag;
  document.getElementById("country-name").textContent = selectedCountry;
  document.getElementById("description").textContent = info.description;
  document.getElementById("capital").textContent = info.capital;
  document.getElementById("currency").textContent = info.currency;
  document.getElementById("best-time").textContent = info.bestTime;
  document.getElementById("places").textContent = info.places.join(", ");

  // Show the card with animation
  resultCard.classList.remove("hidden");
}
