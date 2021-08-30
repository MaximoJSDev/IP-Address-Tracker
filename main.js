// Formulario
const form = document.querySelector(".form");
const input = document.querySelector(".form__input");
// Informacion
const ip = document.getElementById("ip");
const locations = document.getElementById("location");
const timezone = document.getElementById("timezone");
const isp = document.getElementById("isp");
// Map
var lat;
var lng;
const titlesProvider = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let ipInput = input.value;
  if (ipInput !== "" && ipInput !== undefined) {
    //console.log("HI");
    pedirInfo(ipInput);
  }
  else {
    alert("Please enter a valid IP address");
  }
});
const pedirInfo = async (ipInput) => {
  try {
    const secretAPI = await fetch(
      `https://geo.ipify.org/api/v1?apiKey=at_oXuQi6cvttxp33vuNOMfhq3pHjbVa&ipAddress=${ipInput}`
    );
    data = await secretAPI.json();
    pintarInfo(data);

    lat = data.location.lat;
    lng = data.location.lng;
    actualizarMapa();
  } catch (error) {
    console.log(error);
    alert("Please enter a valid IP address");
  }
};
const pintarInfo = (data) => {
  ip.textContent = data.ip;
  locations.textContent = `${data.location.city}, ${data.location.region} ${data.location.postalCode}`;
  timezone.textContent = "UTC " + data.location.timezone;
  isp.textContent = data.isp;
  //console.log(data);
};

const actualizarMapa = () => {
  map.setView([lat, lng], 13);
};
var map = L.map("map").setView([37.38605, -122.08385], 13);
L.tileLayer(titlesProvider, {
  maxZoom: 18,
}).addTo(map);