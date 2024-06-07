let teams = ["A", "B", "C", "D", "E"];
let time = new Date(); // Start time

// Generate the schedule
let schedule = [
  [[teams[0], teams[1]], [teams[2], teams[3]], teams[4]],
  [[teams[0], teams[2]], [teams[1], teams[4]], teams[3]],
  [[teams[0], teams[3]], [teams[2], teams[4]], teams[1]],
  [[teams[0], teams[4]], [teams[1], teams[3]], teams[2]],
  [[teams[2], teams[1]], [teams[3], teams[4]], teams[0]],
];

// Prepare the schedule for printing
let matchSchedule = schedule.map((round, index) => {
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let matchTime =
    (hours < 10 ? "0" : "") + hours + ":" + (minutes < 10 ? "0" : "") + minutes;

  // Increase time by half an hour
  time.setMinutes(time.getMinutes() + 30);

  return {
    Time: matchTime,
    "Match 1": `${round[0][0]} vs ${round[0][1]}`,
    "Match 2": `${round[1][0]} vs ${round[1][1]}`,
    Relax: round[2],
  };
});

// Print the schedule
console.table(matchSchedule);
