
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
  console.log("HI");
  let ipInput = input.value;
  pedirInfo(ipInput);
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
    alert("Parece que ocurrio un error, intenta con otra IP");
  }
};
const pintarInfo = (data) => {
  ip.textContent = data.ip;
  locations.textContent = `${data.location.city}, ${data.location.region} ${data.location.postalCode}`;
  timezone.textContent = data.location.timezone;
  isp.textContent = data.isp;
};

const actualizarMapa = () => {
  map.setView([lat,lng], 13);

};
var map = L.map("map").setView([51.505, -0.09],13)
L.tileLayer(titlesProvider, {
  maxZoom: 18,
}).addTo(map);
