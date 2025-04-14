// html5.js

document.addEventListener("DOMContentLoaded", () => {
  // Web Storage
  document.getElementById("saveBtn").addEventListener("click", () => {
    const val = document.getElementById("storageInput").value;
    localStorage.setItem("html5demo", val);
  });

  document.getElementById("loadBtn").addEventListener("click", () => {
    document.getElementById("storedValue").textContent =
      localStorage.getItem("html5demo") || "Nincs mentett érték.";
  });

  // Web Worker (számítás: 0-tól 9 999 999-ig összeadás)
  document.getElementById("geoBtn").addEventListener("click", () => {
    if (window.Worker) {
      const worker = new Worker(URL.createObjectURL(new Blob([`
        self.onmessage = () => {
          let sum = 0;
          for (let i = 0; i < 1e7; i++) sum += i;
          self.postMessage("A számok összege 0-tól 9 999 999-ig: " + sum);
        };
      `], { type: 'application/javascript' })));

      worker.onmessage = e => {
        document.getElementById("workerResult").textContent = e.data;
      };

      worker.postMessage("start");
    } else {
      alert("A böngésződ nem támogatja a Web Workert.");
    }
  });

  // SSE
  const sseOutput = document.getElementById("sseOutput");
  if (!!window.EventSource && sseOutput) {
    try {
      const source = new EventSource("/events");
      source.onmessage = e => {
        sseOutput.textContent = `Üzenet: ${e.data}`;
      };
    } catch {
      sseOutput.textContent = "Nem sikerült csatlakozni SSE szerverhez.";
    }
  }

  // Geolocation
  const geoBtn = document.querySelector("#geo button");
  if (geoBtn) {
    geoBtn.addEventListener("click", () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
          document.getElementById("geoOutput").textContent =
            `Szélesség: ${pos.coords.latitude}, Hosszúság: ${pos.coords.longitude}`;
        }, err => {
          let msg = "Ismeretlen hiba";
          switch (err.code) {
            case err.PERMISSION_DENIED:
              msg = "A felhasználó megtagadta a helymeghatározást.";
              break;
            case err.POSITION_UNAVAILABLE:
              msg = "A helymeghatározás nem elérhető.";
              break;
            case err.TIMEOUT:
              msg = "A lekérés túllépte az időkorlátot.";
              break;
            case err.UNKNOWN_ERROR:
              msg = "Ismeretlen hiba történt.";
              break;
          }
          document.getElementById("geoOutput").textContent = `Hiba: ${msg}`;
        });
      } else {
        alert("A böngésződ nem támogatja a Geolocation API-t.");
      }
    });
  }

  // Drag & Drop
  const draggable = document.getElementById("draggable");
  const dropzone = document.getElementById("dropzone");

  draggable.addEventListener("dragstart", e => {
    e.dataTransfer.setData("text", "dragged");
  });

  dropzone.addEventListener("dragover", e => {
    e.preventDefault();
  });

  dropzone.addEventListener("drop", e => {
    e.preventDefault();
    dropzone.appendChild(draggable);
  });

  // Canvas rajzolás
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "blue";
  ctx.fillRect(10, 10, 150, 75);
});