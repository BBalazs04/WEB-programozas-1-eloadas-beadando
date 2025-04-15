// chart.js

let chart;

window.addEventListener("DOMContentLoaded", () => {
  const table = document.getElementById("dataTable");
  const rows = table.querySelectorAll("tbody tr");

  rows.forEach(row => {
    row.addEventListener("click", () => {
      rows.forEach(r => r.classList.remove("selected-row"));
      row.classList.add("selected-row");

      const values = Array.from(row.cells).map(cell => Number(cell.textContent));
      renderChart(values);
    });
  });
});

function renderChart(data) {
  const ctx = document.getElementById("myChart").getContext("2d");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: data.map((_, i) => `Érték ${i + 1}`),
      datasets: [{
        label: "Kiválasztott sor adatai",
        data: data,
        borderColor: "blue",
        borderWidth: 2,
        fill: false,
        tension: 0.2
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}