let bracketA = ["A", "B", "C", "D"],
  bracketB = ["E", "F", "G", "H"],
  matchesA = generateSchedule(bracketA),
  matchesB = generateSchedule(bracketB),
  scoresA = {},
  scoresB = {};
function generateSchedule(e) {
  let t = [];
  for (let o = 0; o < e.length; o++)
    for (let a = o + 1; a < e.length; a++) t.push({ team1: e[o], team2: e[a] });
  return t;
}
function createMatchInputs(e, t) {
  let o = document.getElementById(t);
  let currentTime = new Date();
  currentTime.setHours(10, 30, 0); // Set the start time to 10:00
  e.forEach((e, a) => {
    let n = o.insertRow();
    let timeCell = n.insertCell();
    timeCell.textContent = currentTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: !1,
    });
    currentTime.setMinutes(currentTime.getMinutes() + 30); // Increment the time by 1 hour
    let teamCell = n.insertCell();
    teamCell.textContent = e.team1 + " vs " + e.team2;
    let scoreCell = n.insertCell();
    let r = document.createElement("input");
    (r.type = "number"),
      (r.className = "score-input"),
      (r.id = t + "_team1_" + a);
    let l = document.createElement("input");
    (l.type = "number"),
      (l.className = "score-input"),
      (l.id = t + "_team2_" + a),
      scoreCell.appendChild(r),
      scoreCell.appendChild(document.createTextNode(" - ")),
      scoreCell.appendChild(l);
  });
}
function updateScores(e) {
  let t = "A" === e ? matchesA : matchesB,
    o = "A" === e ? scoresA : scoresB,
    a = {};
  t.forEach((t, n) => {
    let r = parseInt(
        document.getElementById("scoreForm" + e + "_team1_" + n).value
      ),
      l = parseInt(
        document.getElementById("scoreForm" + e + "_team2_" + n).value
      );
    isNaN(r) ||
      isNaN(l) ||
      ((o[t.team1 + " vs " + t.team2] = r + " - " + l),
      updateScoreTable(a, t.team1, t.team2, r, l),
      (document.getElementById(
        "scoreForm" + e + "_team1_" + n
      ).disabled = true),
      (document.getElementById(
        "scoreForm" + e + "_team2_" + n
      ).disabled = true));
  }),
    displayScoreboard(sortScoreTable(a, o, t), a, "scoreboard" + e);
}
function updateScoreTable(e, t, o, a, n) {
  (e[t] = e[t] || { points: 0, goalsScored: 0, goalsConceded: 0 }),
    (e[o] = e[o] || { points: 0, goalsScored: 0, goalsConceded: 0 }),
    (e[t].goalsScored += a),
    (e[o].goalsScored += n),
    (e[t].goalsConceded += n),
    (e[o].goalsConceded += a),
    a > n
      ? (e[t].points += 3)
      : a < n
      ? (e[o].points += 3)
      : ((e[t].points += 1), (e[o].points += 1));
}
function sortScoreTable(e, t, o) {
  let a = Object.keys(e);
  return (
    a.sort((o, a) => {
      if (e[o].points !== e[a].points) return e[a].points - e[o].points;
      if (
        e[o].goalsScored - e[o].goalsConceded !=
        e[a].goalsScored - e[a].goalsConceded
      )
        return (
          e[a].goalsScored -
          e[a].goalsConceded -
          (e[o].goalsScored - e[o].goalsConceded)
        );
      {
        let n = t[o + " vs " + a] || t[a + " vs " + o];
        if (n) {
          let [r, l] = n.split(" - ").map(Number);
          return l - r;
        }
        return 0;
      }
    }),
    a
  );
}
function displayScoreboard(e, t, o) {
  let a = document.getElementById(o);
  a.innerHTML = "";
  let n = a.createTHead().insertRow();
  [
    "Team",
    "Points",
    "Goals Scored",
    "Goals Conceded",
    "Goal Difference",
  ].forEach((e) => {
    let t = document.createElement("th");
    (t.textContent = e), n.appendChild(t);
  });
  let r = document.createElement("tbody");
  a.appendChild(r),
    e.forEach((e) => {
      let o = r.insertRow(),
        a = o.insertCell();
      (a.textContent = e),
        ((a = o.insertCell()).textContent = t[e].points),
        ((a = o.insertCell()).textContent = t[e].goalsScored),
        ((a = o.insertCell()).textContent = t[e].goalsConceded),
        ((a = o.insertCell()).textContent =
          t[e].goalsScored - t[e].goalsConceded);
    });
}
createMatchInputs(matchesA, "scoreFormA"),
  createMatchInputs(matchesB, "scoreFormB");
