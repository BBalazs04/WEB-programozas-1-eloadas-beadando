// ajax.js

const code = "ABC123xyz789";
const apiUrl = "http://gamf.nhely.hu/ajax2/";

// READ
const loadBtn = document.getElementById("loadBtn");
const dataList = document.getElementById("dataList");
const heightStats = document.getElementById("heightStats");

loadBtn.addEventListener("click", () => {
  fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `op=read&code=${code}`
  })
    .then(res => res.json())
    .then(data => {
      dataList.innerHTML = "";
      const heights = [];
      data.list.forEach(row => {
        const div = document.createElement("div");
        div.textContent = `${row.id}: ${row.name}, ${row.height} cm, ${row.weight} kg`;
        dataList.appendChild(div);
        heights.push(Number(row.height));
      });

      if (heights.length > 0) {
        const sum = heights.reduce((a, b) => a + b, 0);
        const avg = (sum / heights.length).toFixed(2);
        const max = Math.max(...heights);
        heightStats.innerHTML = `Magasság összesen: ${sum} cm<br>Átlag: ${avg} cm<br>Legnagyobb: ${max} cm`;
      }
    });
});

// CREATE
const createForm = document.getElementById("createForm");
const createMsg = document.getElementById("createMsg");

createForm.addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("cname").value.trim();
  const height = document.getElementById("cheight").value.trim();
  const weight = document.getElementById("cweight").value.trim();

  if ([name, height, weight].some(v => v === "" || v.length > 30)) {
    createMsg.textContent = "Hibás adatok!";
    return;
  }

  fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `op=create&name=${name}&height=${height}&weight=${weight}&code=${code}`
  })
    .then(res => res.text())
    .then(resp => createMsg.textContent = `Válasz: ${resp}`);
});

// GET BY ID + UPDATE
const getByIdBtn = document.getElementById("getById");
const updateForm = document.getElementById("updateForm");
const updateMsg = document.getElementById("updateMsg");

getByIdBtn.addEventListener("click", () => {
  const id = document.getElementById("uid").value.trim();
  if (!id) return;

  fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `op=read&code=${code}`
  })
    .then(res => res.json())
    .then(data => {
      const entry = data.list.find(item => item.id == id);
      if (entry) {
        updateMsg.textContent = null;
        document.getElementById("uname").value = entry.name;
        document.getElementById("uheight").value = entry.height;
        document.getElementById("uweight").value = entry.weight;
      } else {
        updateMsg.textContent = "Nincs ilyen ID.";
      }
    });
});

updateForm.addEventListener("submit", e => {
  e.preventDefault();
  const id = document.getElementById("uid").value.trim();
  const name = document.getElementById("uname").value.trim();
  const height = document.getElementById("uheight").value.trim();
  const weight = document.getElementById("uweight").value.trim();

  if ([name, height, weight].some(v => v === "" || v.length > 30)) {
    updateMsg.textContent = "Hibás adatok!";
    return;
  }

  fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `op=update&id=${id}&name=${name}&height=${height}&weight=${weight}&code=${code}`
  })
    .then(res => res.text())
    .then(resp => updateMsg.textContent = `Válasz: ${resp}`);
});

// DELETE
const deleteBtn = document.getElementById("deleteBtn");
const deleteMsg = document.getElementById("deleteMsg");

deleteBtn.addEventListener("click", () => {
  const id = document.getElementById("did").value.trim();
  if (!id) return;

  fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `op=delete&id=${id}&code=${code}`
  })
    .then(res => res.text())
    .then(resp => deleteMsg.textContent = `Válasz: ${resp}`);
});
