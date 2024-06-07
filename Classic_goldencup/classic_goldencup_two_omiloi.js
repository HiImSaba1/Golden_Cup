let bracketA = ["A", "B", "C", "D"],
  bracketB = ["E", "F", "G", "H"],
  matchesA = generateSchedule(bracketA),
  matchesB = generateSchedule(bracketB),
  scoresA = {},
  scoresB = {};
function generateSchedule(e) {
  let t = [];
  for (let o = 0; o < e.length; o++)
    for (let n = o + 1; n < e.length; n++) t.push({ team1: e[o], team2: e[n] });
  return t;
}
function createMatchInputs(e, t) {
  let o = document.getElementById(t);
  e.forEach((e, n) => {
    let a = document.createElement("label");
    a.textContent = e.team1 + " vs " + e.team2 + ": ";
    let r = document.createElement("input");
    (r.type = "number"),
      (r.className = "score-input"),
      (r.id = t + "_team1_" + n);
    let l = document.createElement("input");
    (l.type = "number"),
      (l.className = "score-input"),
      (l.id = t + "_team2_" + n),
      o.appendChild(a),
      o.appendChild(r),
      o.appendChild(document.createTextNode(" - ")),
      o.appendChild(l),
      o.appendChild(document.createElement("br"));
  });
}
function updateScores(e) {
  let t = "A" === e ? matchesA : matchesB,
    o = "A" === e ? scoresA : scoresB,
    n = {};
  t.forEach((t, a) => {
    let r = parseInt(
        document.getElementById("scoreForm" + e + "_team1_" + a).value
      ),
      l = parseInt(
        document.getElementById("scoreForm" + e + "_team2_" + a).value
      );
    isNaN(r) ||
      isNaN(l) ||
      ((o[t.team1 + " vs " + t.team2] = r + " - " + l),
      updateScoreTable(n, t.team1, t.team2, r, l));
  });
  displayScoreboard(sortScoreTable(n, o, t), n, "scoreboard" + e);
}
function updateScoreTable(e, t, o, n, a) {
  (e[t] = e[t] || { points: 0, goalsScored: 0, goalsConceded: 0 }),
    (e[o] = e[o] || { points: 0, goalsScored: 0, goalsConceded: 0 }),
    (e[t].goalsScored += n),
    (e[o].goalsScored += a),
    (e[t].goalsConceded += a),
    (e[o].goalsConceded += n),
    n > a
      ? (e[t].points += 3)
      : n < a
      ? (e[o].points += 3)
      : ((e[t].points += 1), (e[o].points += 1));
}
function sortScoreTable(e, t, o) {
  let n = Object.keys(e);
  return (
    n.sort((o, n) => {
      if (e[o].points !== e[n].points) return e[n].points - e[o].points;
      if (
        e[o].goalsScored - e[o].goalsConceded !=
        e[n].goalsScored - e[n].goalsConceded
      )
        return (
          e[n].goalsScored -
          e[n].goalsConceded -
          (e[o].goalsScored - e[o].goalsConceded)
        );
      {
        let a = t[o + " vs " + n] || t[n + " vs " + o];
        if (a) {
          let [r, l] = a.split(" - ").map(Number);
          return l - r;
        }
        return 0;
      }
    }),
    n
  );
}
function displayScoreboard(e, t, o) {
  let n = document.getElementById(o);
  n.innerHTML = "";
  let a = n.createTHead().insertRow();
  [
    "Team",
    "Points",
    "Goals Scored",
    "Goals Conceded",
    "Goal Difference",
  ].forEach((e) => {
    let t = document.createElement("th");
    (t.textContent = e), a.appendChild(t);
  });
  let r = document.createElement("tbody");
  n.appendChild(r),
    e.forEach((e) => {
      let o = r.insertRow(),
        n = o.insertCell();
      (n.textContent = e),
        ((n = o.insertCell()).textContent = t[e].points),
        ((n = o.insertCell()).textContent = t[e].goalsScored),
        ((n = o.insertCell()).textContent = t[e].goalsConceded),
        ((n = o.insertCell()).textContent =
          t[e].goalsScored - t[e].goalsConceded);
    });
}
createMatchInputs(matchesA, "scoreFormA"),
  createMatchInputs(matchesB, "scoreFormB");
