let records = [];
let editIndex = null;

const form = document.getElementById("dataForm");
const tableBody = document.querySelector("#dataTable tbody");
const search = document.getElementById("search");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const age = parseInt(form.age.value);
  const city = form.city.value.trim();
  const hobby = form.hobby.value.trim();

  if (!name || !city || !hobby || isNaN(age)) return;

  const record = { name, age, city, hobby };

  if (editIndex !== null) {
    records[editIndex] = record;
    editIndex = null;
  } else {
    records.push(record);
  }

  form.reset();
  renderTable();
});

search.addEventListener("input", renderTable);

function renderTable() {
  const filter = search.value.trim().toLowerCase();
  tableBody.innerHTML = "";
  records
    .filter(r => r.name.toLowerCase().includes(filter))
    .forEach((r, i) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${r.name}</td>
        <td>${r.age}</td>
        <td>${r.city}</td>
        <td>${r.hobby}</td>
        <td>
          <button onclick="editRecord(${i})">Szerkeszt</button>
          <button onclick="deleteRecord(${i})">Töröl</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
}

function editRecord(index) {
  const r = records[index];
  form.name.value = r.name;
  form.age.value = r.age;
  form.city.value = r.city;
  form.hobby.value = r.hobby;
  editIndex = index;
}

function deleteRecord(index) {
  if (confirm("Biztosan törölni szeretnéd?")) {
    records.splice(index, 1);
    renderTable();
  }
}

// Rendezés
document.querySelectorAll("th[data-sort]").forEach(th => {
  th.addEventListener("click", () => {
    const field = th.dataset.sort;

    records.sort((a, b) => {
      const aVal = a[field];
      const bVal = b[field];

      // Számok kezelése
      const isNumber = !isNaN(aVal) && !isNaN(bVal);
      if (isNumber) {
        return Number(aVal) - Number(bVal);
      }

      // Szövegek rendezése
      return String(aVal).localeCompare(String(bVal), 'hu', { sensitivity: 'base' });
    });

    renderTable();
  });
});