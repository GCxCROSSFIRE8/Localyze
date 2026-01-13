// testFirebase.js
import { createUser, getUser, createRequest, getRequest } from './firebase.js';

async function testFirestore() {
  try {
    console.log("🔥 Starting Firebase Emulator Test...");

    // 1️⃣ Create a new user (seeker)
    const userId = await createUser({
      fullName: "John Doe",
      role: "seeker",
      city: "Ranchi",
      verified: true,
      trustScore: 50,
      preferredZones: ["Ranchi"],
      availableHours: ["9:00-18:00"]
    });
    console.log("✅ User created with ID:", userId);

    // 2️⃣ Fetch the user
    const userData = await getUser(userId);
    console.log("📝 User data fetched:", userData);

    // 3️⃣ Create a new request
    const requestId = await createRequest({
      seekerId: userId,
      category: "Hospital",
      location: "Ranchi Main Street",
      urgency: "High",
      description: "Check if the emergency room is operational",
      status: "pending",
      assignedValidator: null
    });
    console.log("✅ Request created with ID:", requestId);

    // 4️⃣ Fetch the request
    const requestData = await getRequest(requestId);
    console.log("📝 Request data fetched:", requestData);

  } catch (err) {
    console.error("❌ Error testing Firebase:", err);
  }
}

// Run the test
testFirestore();
