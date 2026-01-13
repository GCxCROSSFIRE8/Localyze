// ----------------------------
// TEMP TRUST ENGINE (safe fallback)
window.trustEngine = window.trustEngine || {
  score: 0,
  addGeoProof(valid) {
    if (valid) this.score += 1;
    else this.score -= 2;
  },
  addJob(success) {
    if (success) this.score += 5;
  },
  calculate() {
    return Math.max(this.score, 0);
  },
  reportAbuse() {
    this.score -= 10;
  }
};

// ----------------------------
let requestMarkers = [];

// 🔴 IMPORTANT: replace with your real Mapbox token
mapboxgl.accessToken = "YOUR_MAPBOX_TOKEN_HERE";

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/dark-v11",
  center: [85.8281, 23.3441],
  zoom: 13
});

// --- SIMULATED VALIDATOR ---
const validator = {
  lng: 85.8281,
  lat: 23.3441
};

let marker;

// Draw validator
function drawValidator() {
  if (marker) marker.remove();
  marker = new mapboxgl.Marker({ color: "#00ff85" })
    .setLngLat([validator.lng, validator.lat])
    .addTo(map);
}

// Simulate movement
setInterval(() => {
  validator.lng += (Math.random() - 0.5) * 0.001;
  validator.lat += (Math.random() - 0.5) * 0.001;
  drawValidator();
}, 3000);

map.on("load", () => {
  drawValidator();
});

// Simulate geo validation
const insideFence = Math.random() > 0.1;
trustEngine.addGeoProof(insideFence);

// Update trust UI
setInterval(() => {
  const el = document.getElementById("trustScore");
  if (el) el.innerText = trustEngine.calculate();
}, 2000);

// ----------------------------
// REQUEST FLOW
function handleCreateRequest() {
  const title = document.getElementById("reqTitle").value;
  if (!title) return alert("Enter request title");

  const request = createRequest({
    title,
    category: "General",
    urgency: "4h",
    reward: 150,
    location: [validator.lng + 0.002, validator.lat + 0.002]
  });

  drawRequest(request);
}

function drawRequest(request) {
  const el = document.createElement("div");
  el.style.background = "#00d1ff";
  el.style.width = "14px";
  el.style.height = "14px";
  el.style.borderRadius = "50%";

  const marker = new mapboxgl.Marker(el)
    .setLngLat(request.location)
    .setPopup(
      new mapboxgl.Popup().setHTML(`
        <b>${request.title}</b><br>
        ₹${request.reward}<br>
        <button onclick="accept(${request.id})">Accept</button>
      `)
    )
    .addTo(map);

  requestMarkers.push(marker);
}

function accept(id) {
  const success = acceptRequest(id, "validator-001");
  if (success) alert("Job accepted");
}

// Auto-complete demo
setTimeout(() => {
  if (window.requests && requests.length > 0) {
    completeRequest(requests[0].id);
    alert("Job completed & verified");
  }
}, 10000);
