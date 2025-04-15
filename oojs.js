// oojs.js

class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return `${this.name} egy állat.`;
  }

  render() {
    const app = document.getElementById("app");

    const card = document.createElement("div");
    card.className = "animal-card";

    const icon = document.createElement("div");
    icon.className = "icon";
    icon.textContent = "🐾";

    const text = document.createElement("p");
    text.textContent = this.speak();

    card.appendChild(icon);
    card.appendChild(text);
    app.appendChild(card);
  }
}

class Bird extends Animal {
  constructor(name, canFly = true) {
    super(name);
    this.canFly = canFly;
  }

  speak() {
    return `${this.name} egy madár, ${this.canFly ? "tud repülni 🕊️" : "nem tud repülni 🐧"}.`;
  }

  render() {
    const app = document.getElementById("app");

    const card = document.createElement("div");
    card.className = "animal-card bird";

    const icon = document.createElement("div");
    icon.className = "icon";
    icon.textContent = this.canFly ? "🕊️" : "🐧";

    const text = document.createElement("p");
    text.textContent = this.speak();

    card.appendChild(icon);
    card.appendChild(text);
    app.appendChild(card);
  }
}

const birds = [
  new Bird("Papagáj"),
  new Bird("Pingvin", false),
  new Bird("Sas")
];

const btn = document.createElement("button");
btn.textContent = "Új állat megjelenítése";
btn.style.margin = "20px";

const container = document.createElement("div");
container.className = "zoo-container";

const app = document.getElementById("app");
app.appendChild(btn);
app.appendChild(container);

let current = 0;
btn.addEventListener("click", () => {
  if (current < birds.length) {
    birds[current].render();
    current++;
  } else {
    alert("Nincs több állat.");
  }
});