// ----------------------------
// GLOBAL TRUST ENGINE
class TrustEngine {
  constructor() {
    this.data = {
      completedJobs: 0,
      positiveFeedback: 0,
      geoProofs: 0,
      geoViolations: 0,
      reports: 0,
      sessions: 0
    };
  }

  calculate() {
    let score =
      (this.data.completedJobs * 2) +
      (this.data.positiveFeedback * 3) +
      (this.data.geoProofs * 4) +
      (this.data.sessions * 2) -
      (this.data.reports * 10) -
      (this.data.geoViolations * 15);

    return Math.max(0, Math.min(100, score));
  }

  addJob(success = true) {
    if (success) {
      this.data.completedJobs++;
      this.data.positiveFeedback++;
    } else {
      this.data.reports++;
    }
  }

  addGeoProof(valid = true) {
    if (valid === true) this.data.geoProofs++;
    else this.data.geoViolations++;
  }

  addSession() {
    this.data.sessions++;
  }

  reportAbuse() {
    this.data.reports++;
  }
}

// Make trustEngine global
window.trustEngine = window.trustEngine || new TrustEngine();

// Optional helper to enforce rules
window.enforceRules = function(score) {
  if (score < 15) alert("Account suspended due to trust violations.");
};
