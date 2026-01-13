import { auth, db } from "./firebase.js";
import { signInWithPhoneNumber } from
"https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { doc, setDoc } from
"https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

export async function createUser(uid, role, data) {
  await setDoc(doc(db, "users", uid), {
    role,
    trustScore: 0,
    verified: false,
    status: "active",
    location: data.location,
    createdAt: Date.now()
  });

  if (role === "validator") {
    await setDoc(doc(db, "validators", uid), {
      earnings: 0,
      completedJobs: 0,
      rating: 0,
      activeZone: data.location
    });
  }
}
