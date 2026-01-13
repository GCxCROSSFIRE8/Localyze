// ----------------------------
// GLOBAL REQUEST STORE
window.requests = window.requests || [];

// ----------------------------
window.createRequest = function (data) {
  const request = {
    id: Date.now(),
    title: data.title,
    category: data.category,
    urgency: data.urgency,
    reward: data.reward,
    location: data.location,
    status: "open",
    seekerId: "seeker-001",
    validatorId: null
  };
  window.requests.push(request);
  return request;
};

window.acceptRequest = function (requestId, validatorId) {
  const req = window.requests.find(r => r.id === requestId);
  if (!req || req.status !== "open") return false;

  req.status = "accepted";
  req.validatorId = validatorId;
  return true;
};

window.completeRequest = function (requestId) {
  const req = window.requests.find(r => r.id === requestId);
  if (!req || req.status !== "accepted") return false;

  req.status = "completed";
  if (window.trustEngine) {
    trustEngine.addJob(true);
  }
  return true;
};
