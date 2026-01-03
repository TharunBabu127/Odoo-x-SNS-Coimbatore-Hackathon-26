let data;

fetch("data.json")
  .then(response => response.json())
  .then(json => data = json);

function showCountry() {
  const country = document.getElementById("country").value;
  const info = data[country];

  document.getElementById("output").innerHTML =
    `<b>Capital:</b> ${info.capital}<br>
     <b>Currency:</b> ${info.currency}<br>
     <b>Best Time:</b> ${info.bestTime}<br>
     <b>Famous Places:</b> ${info.places.join(", ")}`;
}
