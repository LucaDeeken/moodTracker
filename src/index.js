import "./styles.css";
//import { moodTracker, days, defaultProject } from "./objects";
import {getStats, getMonthlyStats} from "./statistics.js";
import { HashMap } from "./hashMap.js";
import { DOMtoday, getTodayHTML} from "./today.js";

const statsBtn = document.getElementById("statisticsText");
const todayBtn = document.getElementById("todayText");

export const newHash = new HashMap();
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
      const loadedHash = HashMap.fromJSON(saved); // Lade HashMap
      return loadedHash;
    } else {
      return null; // Keine Daten im LocalStorage gefunden
    }
  }
  
  // Aufruf der Funktion und Speichern des Rückgabewerts


  const loadedHash = loadHashMapFromLocalStorage();
  console.log(loadedHash);
