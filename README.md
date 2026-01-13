# Localyze

**Localyze** is a real-time local intelligence platform that allows users to request verified local information and validators to confirm data on the ground. Built with **Firebase**, **Mapbox**, and **Vanilla JS**.

---

## Features

- Splash screen with intro carousel
- Role selection: Seeker or Validator
- Firebase Firestore integration (using local emulator)
- Live Map showing validator location and geo-verified requests
- Validator Dashboard with earnings, active jobs, and GPS logs
- Trust system for reputation management

---

## Tech Stack

- HTML, CSS, JavaScript (Vanilla)
- Firebase (Emulators for Auth & Firestore)
- Mapbox GL JS for maps
- Node.js for backend scripts (if any future API)

---

## Getting Started (Local Setup)

1. Clone the repository:

```bash
git clone https://github.com/username/Localyze.git
cd Localyze

```

npm install
firebase emulators:start

# Live Server: right-click index.html → Open with Live Server

# OR Node static server:

http-server . -p 3000
http://localhost:5500/index.html

Localyze/
│
├─ dataconnect/ # Backend scripts
├─ index.html # Frontend entry point
├─ dashboard.html # Validator dashboard
├─ style.css
├─ dashboard.css
├─ script.js
├─ map.js
├─ request.js
├─ auth.js
├─ firebase.js
├─ dashboard.js
├─ trust.js
└─ README.md

Notes

Replace PASTE_YOUR_MAPBOX_TOKEN_HERE in map.js with your Mapbox API token.

Ensure Firebase emulators are running before testing frontend.

Designed for local development; deploy Firebase or backend for production use.

License

MIT License

---

### ✅ Step 6 – Commit and Push README

```bash
git add README.md
git commit -m "Add README"
git push
```
