let earnings = 350;
let completedJobs = 5;
let pendingJobs = 1;

document.getElementById("earnings").innerText = earnings;
document.getElementById("completed").innerText = completedJobs;
document.getElementById("pending").innerText = pendingJobs;
document.getElementById("trustBadge").innerText =
  "Trust: " + trustEngine.calculate();

const jobs = [
  { title: "Verify hospital crowd", distance: "1.2 km" },
  { title: "Check road blockage", distance: "2.5 km" }
];

const gpsLogs = [
  "23.3441, 85.8281",
  "23.3452, 85.8290",
  "23.3460, 85.8304"
];

const jobList = document.getElementById("jobList");
jobs.forEach(j => {
  const li = document.createElement("li");
  li.innerText = `${j.title} (${j.distance})`;
  jobList.appendChild(li);
});

const gpsList = document.getElementById("gpsHistory");
gpsLogs.forEach(g => {
  const li = document.createElement("li");
  li.innerText = g;
  gpsList.appendChild(li);
});

function reportSeeker() {
  trustEngine.reportAbuse();
  alert("Report submitted. System will review.");
}
