// javascript für interaktive rezept-website
/*document.addEventListener('DOMContentLoaded', function() {
    // Zutatenliste ein-/ausblenden
    const toggleButton = document.getElementById('toggle-ingredients');
    const ingredientsList = document.getElementById('ingredients-list');*/





//    toggleButton.addEventListener('click', function() {

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".stars").forEach(stars => {
  const rating = Number(stars.dataset.rating || 0);
  const max = Number(stars.dataset.max || 5);
  stars.style.setProperty("--rating", rating);
  stars.style.setProperty("--max", max);
});
  
  // ===== BURGER MENÜ =====
  const burger = document.querySelector(".burger");
  const menu = document.querySelector(".menu");

  if (burger && menu) {
    burger.addEventListener("click", () => {
      menu.classList.toggle("open");
    });
  }

  // ===== TABELLE FUNKTION =====
  function updateTabelle() {
    const tbody = document.querySelector('#rezeptTabelle tbody');
    if (!tbody) return;
    
    const portionen = parseInt(document.getElementById('portionen').value) || 1;
    tbody.innerHTML = '';
    
    // Gespeicherte Checkboxen laden
    const gespeicherteZutaten = JSON.parse(localStorage.getItem('zutaten-status')) || {};
    
    meinRezept.zutaten.forEach((zutat, index) => {
      const tr = document.createElement('tr');
      const menge = zutat.menge * portionen;
      const istStueck = zutat.einheit.toLowerCase() === "stk";
      const formatierteMenge = istStueck ? Math.round(menge) : menge.toFixed(2);
      const isChecked = gespeicherteZutaten[index] || false;
      
      tr.innerHTML = `
        <td><input type="checkbox" class="zutat-checkbox" data-index="${index}" ${isChecked ? 'checked' : ''}></td>
        <td>${zutat.name}</td>
        <td>${formatierteMenge} ${zutat.einheit}</td>
      `;
      tbody.appendChild(tr);
    });
    
    // Event-Listener für Checkboxen
    document.querySelectorAll('.zutat-checkbox').forEach(checkbox => {
      checkbox.addEventListener('change', speicherZutatenStatus);
    });
  }

  // ===== ZUTATEN-STATUS SPEICHERN =====
  function speicherZutatenStatus() {
    const zutaten = {};
    document.querySelectorAll('.zutat-checkbox').forEach(checkbox => {
      zutaten[checkbox.dataset.index] = checkbox.checked;
    });
    localStorage.setItem('zutaten-status', JSON.stringify(zutaten));
  }

  // ===== TAB NAVIGATION =====
  const tabs = document.querySelectorAll(".tab");
  const contents = document.querySelectorAll(".content");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const tabName = tab.textContent.trim().toLowerCase();
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      contents.forEach(c => {
        c.classList.toggle("active", c.dataset.tab === tabName);
      });
      
      // Tabelle neu laden wenn Zutaten-Tab aktiv ist
      if (tabName === "zutaten") {
        setTimeout(updateTabelle, 0);
      }
    });
  });

  // ===== BUTTONS =====
  const inputPortionen = document.getElementById("portionen");
  const btnPlus = document.getElementById("plus");
  const btnMinus = document.getElementById("minus");
  const btnApply = document.getElementById("apply");
  const btnReset = document.getElementById("reset");

  if (btnPlus) btnPlus.addEventListener("click", () => {
    inputPortionen.value = Math.max(1, parseInt(inputPortionen.value) + 1);
    updateTabelle();
  });

  if (btnMinus) btnMinus.addEventListener("click", () => {
    inputPortionen.value = Math.max(1, parseInt(inputPortionen.value) - 1);
    updateTabelle();
  });

  if (inputPortionen) inputPortionen.addEventListener("input", updateTabelle);
  if (btnApply) btnApply.addEventListener("click", updateTabelle);
  
  if (btnReset) {
    btnReset.addEventListener("click", () => {
      inputPortionen.value = 1;
      localStorage.removeItem('zutaten-status'); // Speicher löschen
      updateTabelle();
    });
  }

  updateTabelle();
});

// ===== REZEPT OBJEKT =====
function Rezept(name, basisPortionen, zutaten) {
  this.name = name;
  this.basisPortionen = basisPortionen;
  this.zutaten = zutaten;
}

const meinRezept = new Rezept("Makers Mark Sour", 1, [
  { name: "Maker's Mark Bourbon", menge: 6, einheit: "cl" },
  { name: "Zitronensaft", menge: 3, einheit: "cl" },
  { name: "Zuckersirup", menge: 2, einheit: "cl" },
  { name: "Eiweiß", menge: 1, einheit: "cl" },
  { name: "Eiswürfel (Nach Bedarf)", menge: 4, einheit: "Stk" },
  { name: "Garnitur: Zitronenzeste", menge: 1, einheit: "Stk" }
]);



  
