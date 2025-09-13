import "./styles.css";
//import { moodTracker, days, defaultProject } from "./objects";
import {getStats, getMonthlyStats} from "./statistics.js";
import { HashMap } from "./hashMap.js";
import { DOMtoday, getTodayHTML} from "./today.js";

const statsBtn = document.getElementById("statisticsText");
const todayBtn = document.getElementById("todayText");


DOMtoday();

todayBtn.addEventListener("click", () => {
    getTodayHTML();
})

statsBtn.addEventListener("click", () => {
    getStats();
})


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