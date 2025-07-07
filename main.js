
// Trial subscription only to display frontend work - limit: 1000 calls
const apiKey = 'at_kpshRCToQVg3Suy5CZyK3e4yTDnSz';

async function getIPInfo(ip = '') {
    const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}${ip ? `&ipAddress=${ip}` : ''}`;
    const res = await fetch(url);
    const data = await res.json();
    updateInfoPanel(data);
    updateMap(data.location.lat, data.location.lng);
}

function updateInfoPanel(data) {
    document.querySelector('.ip-address .info-result').textContent = data.ip;
    document.querySelector('.location-info .info-result').textContent = `${data.location.city}, ${data.location.region}`;
    document.querySelector('.time-zone .info-result').textContent = `UTC ${data.location.timezone}`;
    document.querySelector('.isp-info .info-result').textContent = data.isp;
}

// Initialize the map
const map = L.map('map').setView([0, 0], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let marker;

function updateMap(lat, lng) {
    map.setView([lat, lng], 13);
    if (marker) {
        marker.setLatLng([lat, lng]);
    } else {
        marker = L.marker([lat, lng]).addTo(map);
    }
}


// Load user's IP info by default
getIPInfo();

function isValidIPorDomain(input) {
  const ipRegex = /^(25[0-5]|2[0-4][0-9]|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4][0-9]|1\d\d|[1-9]?\d)){3}$/;
  const domainRegex = /^(?!:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
  return ipRegex.test(input) || domainRegex.test(input);
}





// Form submission
document.querySelector('.search-form').addEventListener('submit', e => {
  e.preventDefault();
  const ip = document.getElementById('ip-input').value.trim();

  if (isValidIPorDomain(ip)) {
    getIPInfo(ip);
  } else {
    alert('Please enter a valid IP address or domain name.');
  }
});

