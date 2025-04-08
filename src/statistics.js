import { loadedHash, HashMap } from "./hashMap.js";
import {loadHashMapFromLocalStorage} from "./index.js";


export function getStats() {
  const mainArea = document.querySelector(".mainArea");
  const textContainer = document.getElementById("textContainerToday");
const form = document.getElementById("checkBoxes");
const sbmbtn = document.getElementById("btnContainer");
  const loadedHash = loadHashMapFromLocalStorage();
  console.log(loadedHash);
  textContainer.classList.add("fade-out");
  form.classList.add("fade-out");
  sbmbtn.classList.add("fade-out");

  setTimeout(function () {
    mainArea.id = "";
    mainArea.innerHTML = "";
    mainArea.id = "mainAreaStats";
    mainArea.innerHTML = ` <div id="textContainerStats"><p>How are you feeling today, Luca?</p></div><div id="statisticField"></div>`;
    if(loadedHash!=null) {
      const tableContent = getMonthlyStats(loadedHash);
      getGridsOnField(tableContent);
    }

  }, 500);
}


function getMonthlyStats(loadedHash) {
  let allStats = [];
  let todayDate = new Date();
  let year = todayDate.getFullYear();
  const month = todayDate.getMonth();
  year = String(year);
  const found = loadedHash.array.find(obj => Object.values(obj).includes(year));
  for (const dayObject of found.date[month]) {
    allStats.push(dayObject.mood); // Wert des Tagesobjekts hinzufügen
  }
    return allStats;
}

function getGridsOnField(data) {
    const lengthOfArr = data.length;
    const statisticFieldDOM = document.getElementById("statisticField");
    console.log(statisticFieldDOM);
    for (let i=0; i < lengthOfArr; i++ ) {
       const newDiv = document.createElement('div');
        statisticFieldDOM.appendChild(newDiv);
        const ele = data.shift();
        newDiv.textContent = ele;
        newDiv.classList.add("statsField");
    }
}