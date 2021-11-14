// Formulario
const form = document.querySelector(".form");
const input = document.querySelector(".form__input");
const formBtn = document.querySelector(".form__btn")
// Informacion
const ipParagraph = document.getElementById("ip");
const locations = document.getElementById("location");
const timezone = document.getElementById("timezone");
const isp = document.getElementById("isp");
// Map
const titlesProvider = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
let lat;
let lng;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  inputIP = input.value;
  if (inputIP.trim() !== "" && inputIP !== undefined) {
    pedirInfo(inputIP);
  } else {
    alert("Please enter a valid IP address");
  }
});
const pedirInfo = async (ip) => {
  try {
    formBtn.classList.add("btn-load");
    inputIP.includes("com") == true
      ? (secretAPI = await fetch(
          `https://geo.ipify.org/api/v1?apiKey=at_oXuQi6cvttxp33vuNOMfhq3pHjbVa&domain=${ip}`
        ))
      : (secretAPI = await fetch(
          `https://geo.ipify.org/api/v1?apiKey=at_oXuQi6cvttxp33vuNOMfhq3pHjbVa&ipAddress=${ip}`
        ));
    data = await secretAPI.json();
    pintarInfo(data);
    actualizarMapa(data);
  } catch (error) {
    console.log(error);
    alert("Please enter a valid IP address");
  } finally {
    formBtn.classList.remove("btn-load");
  }
};
const pintarInfo = (data) => {
  console.log(data);
  ipParagraph.textContent = data.ip;
  locations.textContent = `${data.location.city}, ${data.location.region} ${data.location.postalCode}`;
  timezone.textContent = "UTC " + data.location.timezone;
  isp.textContent = data.isp;
};
const actualizarMapa = (data) => {
  lat = data.location.lat;
  lng = data.location.lng;
  map.setView([lat, lng], 13);
};
var map = L.map("map").setView([37.38605, -122.08385], 13);
L.tileLayer(titlesProvider, {
  maxZoom: 18,
}).addTo(map);
