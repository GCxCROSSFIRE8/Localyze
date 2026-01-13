// firebase.js
// Localyze Firebase JS for Emulator & Firestore operations
// ✅ Works with Firebase v10+ and Local Emulator

// ----------------------------
// 1️⃣ Imports
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  query,
  where,
  getDocs,
  connectFirestoreEmulator
} from "firebase/firestore";

// ----------------------------
// 2️⃣ Firebase Config (Local Emulator)
const firebaseConfig = {
  apiKey: "fake-key",
  authDomain: "localhost",
  projectId: "localyze",
  storageBucket: "localhost",
  messagingSenderId: "fake",
  appId: "1:1:1:web:1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth & Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);

// ----------------------------
// 3️⃣ Connect to Emulators
connectFirestoreEmulator(db, "localhost", 8085);
// Uncomment below if you also want Auth emulator
// import { connectAuthEmulator } from "firebase/auth";
// connectAuthEmulator(auth, "http://localhost:9099");

// ----------------------------
// 4️⃣ Collections
const usersCol = collection(db, "users");
const requestsCol = collection(db, "requests");
const validatorsCol = collection(db, "validators");
const reportsCol = collection(db, "reports");

// ----------------------------
// 5️⃣ Firestore Operations

// Create a new user (seeker or validator)
export async function createUser(user) {
  // user = { fullName, phone, city, role, verified, trustScore, preferredZones, availableHours }
  const docRef = await addDoc(usersCol, user);
  return docRef.id;
}

// Get user by ID
export async function getUser(userId) {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
}

// Create a new request
export async function createRequest(request) {
  // request = { seekerId, category, location, urgency, description, status: 'pending', assignedValidator: null }
  const docRef = await addDoc(requestsCol, request);
  return docRef.id;
}

// Get a request by ID
export async function getRequest(requestId) {
  const docRef = doc(db, "requests", requestId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
}

// Get all validators in a specific zone
export async function getValidatorsByZone(zone) {
  const q = query(validatorsCol, where("preferredZones", "array-contains", zone));
  const querySnapshot = await getDocs(q);
  const validators = [];
  querySnapshot.forEach(doc => validators.push({ id: doc.id, ...doc.data() }));
  return validators;
}

// Get all requests of a seeker
export async function getRequestsBySeeker(seekerId) {
  const q = query(requestsCol, where("seekerId", "==", seekerId));
  const querySnapshot = await getDocs(q);
  const requests = [];
  querySnapshot.forEach(doc => requests.push({ id: doc.id, ...doc.data() }));
  return requests;
}


