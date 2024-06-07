let teams = [
    "ΑΣΤ. ΑΓ. ΝΙΚΟΛΑΟΥ Α",
    "ΦΟΙΝΙΚΑΣ ΝΙΚΗΤΗΣ",
    "ΑΣΤ. ΑΓ. ΝΙΚΟΛΑΟΥ B",
    "ΑΕΤΟΣ ΒΑΡΒΑΡΑΣ",
    "ΗΦΑΙΣΤΟΣ ΘΕΡΜΗΣ",
  ],
  matches = generateSchedule(teams),
  scores = initializeScores(teams);
function generateSchedule(e) {
  return [
    [[e[0], e[1]], [e[2], e[3]], e[4]],
    [[e[0], e[2]], [e[1], e[4]], e[3]],
    [[e[0], e[3]], [e[2], e[4]], e[1]],
    [[e[0], e[4]], [e[1], e[3]], e[2]],
    [[e[2], e[1]], [e[3], e[4]], e[0]],
  ];
}
function initializeScores(e) {
  let t = {};
  return (
    e.forEach((e) => {
      t[e] = { points: 0, goalsScored: 0, goalsConceded: 0 };
    }),
    t
  );
}
function createMatchScheduleTable() {
  let e = document
      .getElementById("match-schedule")
      .getElementsByTagName("tbody")[0],
    t = new Date();
  t.setHours(10, 0, 0),
    matches.forEach((s, n) => {
      let o = e.insertRow(),
        r = o.insertCell(),
        c = o.insertCell(),
        l = o.insertCell(),
        i = o.insertCell(),
        a = o.insertCell(),
        d = o.insertCell();
      (r.textContent = t.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: !1,
      })),
        (c.textContent = s[0].join(" vs ")),
        (l.innerHTML = `<div class="score-input-container"><input type="number" id="score-input-${n}-1-team1" class="score-input" placeholder="T1 Score"><input type="number" id="score-input-${n}-1-team2" class="score-input" placeholder="T2 Score"></div>`),
        (i.textContent = s[1].join(" vs ")),
        (a.innerHTML = `<div class="score-input-container"><input type="number" id="score-input-${n}-2-team1" class="score-input" placeholder="T1 Score"><input type="number" id="score-input-${n}-2-team2" class="score-input" placeholder="T2 Score"></div>`),
        (d.textContent = s[2]),
        t.setMinutes(t.getMinutes() + 30);
    });
}
function updateScores() {
  matches.forEach((e, t) => {
    let s = document.getElementById(`score-input-${t}-1-team1`),
      n = document.getElementById(`score-input-${t}-1-team2`),
      o = document.getElementById(`score-input-${t}-2-team1`),
      r = document.getElementById(`score-input-${t}-2-team2`),
      c = parseInt(s.value),
      l = parseInt(n.value),
      i = parseInt(o.value),
      a = parseInt(r.value);
    isNaN(c) ||
      isNaN(l) ||
      s.disabled ||
      (updateScoreTable(e[0][0], e[0][1], c, l),
      (s.disabled = !0),
      (n.disabled = !0)),
      isNaN(i) ||
        isNaN(a) ||
        o.disabled ||
        (updateScoreTable(e[1][0], e[1][1], i, a),
        (o.disabled = !0),
        (r.disabled = !0));
  }),
    displayScoreboard();
}
function updateScoreTable(e, t, s, n) {
  (scores[e].goalsScored += s),
    (scores[t].goalsScored += n),
    (scores[e].goalsConceded += n),
    (scores[t].goalsConceded += s),
    s > n
      ? (scores[e].points += 3)
      : s < n
      ? (scores[t].points += 3)
      : ((scores[e].points += 1), (scores[t].points += 1));
}
function displayScoreboard() {
  let e = document
    .getElementById("scoreboard")
    .getElementsByTagName("tbody")[0];
  e.innerHTML = "";

  // Convert scores object to array
  let scoresArray = Object.keys(scores).map((team) => ({
    team: team,
    ...scores[team],
    goalDifference: scores[team].goalsScored - scores[team].goalsConceded,
  }));

  // Sort the array based on points and goal difference
  scoresArray.sort((a, b) => {
    if (a.points === b.points) {
      return b.goalDifference - a.goalDifference;
    }
    return b.points - a.points;
  });

  // Display the sorted results
  scoresArray.forEach((score) => {
    let s = e.insertRow(),
      n = s.insertCell(),
      o = s.insertCell(),
      r = s.insertCell(),
      c = s.insertCell(),
      l = s.insertCell();
    n.textContent = score.team;
    o.textContent = score.points;
    r.textContent = score.goalsScored;
    c.textContent = score.goalsConceded;
    l.textContent = score.goalDifference;
  });
}
createMatchScheduleTable();
