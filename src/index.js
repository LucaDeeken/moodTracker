import "./styles.css";
//import { moodTracker, days, defaultProject } from "./objects";
import {getStats, getMonthlyStats} from "./statistics.js";
import { HashMap } from "./hashMap.js";
import { DOMtoday, getTodayHTML} from "./today.js";

const statsBtn = document.getElementById("statisticsText");
const todayBtn = document.getElementById("todayText");

export let newHash = new HashMap();
DOMtoday();

todayBtn.addEventListener("click", () => {
    getTodayHTML();
})

statsBtn.addEventListener("click", () => {
    getStats();
})


export function loadHashMapFromLocalStorage() {
    const saved = localStorage.getItem("hashMap");
    
if (saved) {
  newHash = HashMap.fromJSON(saved);
  console.log("🔁 HashMap aus localStorage geladen", newHash);
  return newHash;
} else {
  newHash = new HashMap();
  console.log("🆕 Neue HashMap erzeugt", newHash);
  return newHash;
}
}

  // Aufruf der Funktion und Speichern des Rückgabewerts


  const loadedHash = loadHashMapFromLocalStorage();
  console.log(loadedHash);
