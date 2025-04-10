import { loadedHash, HashMap } from "./hashMap.js";
import { loadHashMapFromLocalStorage } from "./index.js";
import arrowLeft from './images/arrowLeft.png';
import arrowRight from './images/arrowRight.png';

export function getStats() {
  const mainArea = document.querySelector(".mainArea");
  const textContainer = document.getElementById("textContainerToday");
  const form = document.getElementById("checkBoxes");
  const sbmbtn = document.getElementById("btnContainer");
  const loadedHash = loadHashMapFromLocalStorage();
  textContainer.classList.add("fade-out");
  form.classList.add("fade-out");
  sbmbtn.classList.add("fade-out");

  setTimeout(function () {
    mainArea.id = "";
    mainArea.innerHTML = "";
    mainArea.id = "mainAreaStats";
    mainArea.innerHTML = ` <div id="textContainerStats"> <img src="${arrowLeft}" alt="" aria-label="Show previews month" id="arrowLeft">
<p>April</p><img src="${arrowRight}" alt="" aria-label="Show next month" id="arrowRight"></div><div id="statisticsBorder"><div id="statisticField"></div></div>`;
    if (loadedHash != null) {
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
  const found = loadedHash.array.find((obj) =>
    Object.values(obj).includes(year),
  );
  for (const dayObject of found.date[month]) {
    allStats.push(dayObject.mood); // Wert des Tagesobjekts hinzufügen
  }
  return allStats;
}

function getGridsOnField(data) {
  const lengthOfArr = data.length;
  const statisticFieldDOM = document.getElementById("statisticField");
  console.log(statisticFieldDOM);
  for (let i = 0; i < 31; i++) {
    const newDiv = document.createElement("div");
    statisticFieldDOM.appendChild(newDiv);
    const ele = data.shift();
    newDiv.textContent = (i+1) + "th";
    newDiv.classList.add("statsField");
  }
}
