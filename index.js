var memoTimes = [238, 270, 188, 167, 181, 269, 228, 168, 324, 150, 190, 254, 220, 196, 180, 174];
var solveTimes = [137, 95, 0, 170, 0, 0, 0, 137, 150, 0, 0, 0, 123, 0, 153, 113 ];
var failTimes = [0, 0, 137, 0, 95, 159, 134, 0, 0, 100, 136, 135, 0, 174, 0, 0];
var labels = Array.from({ length: memoTimes.length }, (_, i) => i + 1);

var ctx = document.getElementById("myChart").getContext("2d");
var attempts = document.getElementById("attempts");
var avgMemo = document.getElementById("avgMemo");
var avgSuccess = document.getElementById("avgSuccess");
var avgFail = document.getElementById("avgFail");

const chartData = {
  labels: labels,
  datasets: [
    {
      label: "Memotime",
      backgroundColor: "#0353a4",
      data: memoTimes,
    },
    {
      label: "Success Solve",
      backgroundColor: "#32CD32",
      data: solveTimes,
    },
    {
      label: "Fail Solve",
      backgroundColor: "#DC143C",
      data: failTimes,
    },
  ],
};

const chartOptions = {
  scales: {
    yAxes: [{ stacked: true }],
    xAxes: [
      {
        stacked: true,
      },
    ],
  },
};

const chart = new Chart(ctx, {
  type: "bar",
  data: chartData,
  options: chartOptions,
});

// calculations for statistics
let avgMemoValue = memoTimes.reduce((a, b) => a + b, 0) / memoTimes.length;

let avgSuccessValue = solveTimes.filter((value) => value != 0);
let successCounter = avgSuccessValue.length;
avgSuccessValue =
  avgSuccessValue.reduce((a, b) => a + b, 0) / avgSuccessValue.length;

let avgFailValue = failTimes.filter((value) => value != 0);
let failCounter = avgFailValue.length;

avgFailValue = avgFailValue.reduce((a, b) => a + b, 0) / avgFailValue.length;

let successRate = Math.round((successCounter / memoTimes.length) * 100);

// render statistics
attempts.innerHTML =
  "Attempts " +
  memoTimes.length +
  " - " +
  " Solved: " +
  successCounter +
  " Failed: " +
  failCounter +
  " --> Successrate:" +
  successRate +
  "%";
avgMemo.innerHTML = "Average Memo Time: " + avgMemoValue;
avgSuccess.innerHTML = "Average Success Time: " + avgSuccessValue;
avgFail.innerHTML = "Average Fail Time: " + avgFailValue;
