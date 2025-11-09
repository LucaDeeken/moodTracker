import "./styles.css";
//import { moodTracker, days, defaultProject } from "./objects";
import { getStats, getMonthlyStats } from "./statistics.js";
import { HashMap } from "./hashMap.js";
import { DOMtoday, getTodayHTML } from "./today.js";

export const statsBtn = document.getElementById("statisticsText");
const todayBtn = document.getElementById("todayText");

DOMtoday();

todayBtn.addEventListener("click", () => {
  const statisticFieldDOM = document.getElementById("statisticField");
  const statisticsBorder = document.getElementById("statisticsBorderGridNotes");
  if (statisticsBorder != undefined) {
    getTodayHTML();
  }

  if (statisticFieldDOM == null) {
    return;
  } else {
    getTodayHTML();
  }
});

statsBtn.addEventListener("click", () => {
  const statisticFieldDOM = document.getElementById("statisticField");
  const comingFromToday = true;
  console.log(comingFromToday);
  if (statisticFieldDOM == null) {
    getStats(comingFromToday);
  } else {
    return;
  }
});

export function loadHashMapFromLocalStorage() {
  const saved = localStorage.getItem("hashMap");
  let newHash;
  if (saved) {
    newHash = HashMap.fromJSON(saved);
    console.log("🔁 HashMap aus localStorage geladen", newHash);
    return newHash;
  } else {
    newHash = new HashMap("2025");
    console.log("🆕 Neue HashMap erzeugt", newHash);
    return newHash;
  }
}

// Aufruf der Funktion und Speichern des Rückgabewerts

export const newHash = loadHashMapFromLocalStorage();

const todayString = new Date().toLocaleDateString();
const valueOfNotesAlreadyThere = newHash.getDay(todayString);

if (valueOfNotesAlreadyThere != undefined) {
  const moodValue = valueOfNotesAlreadyThere.mood;
  const input = document.querySelector(`.inputCheckBox[value="${moodValue}"]`);
  if (input != null) {
    input.checked = true;
  }
}
