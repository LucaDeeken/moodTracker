import { newHash } from "./index.js";

const mainArea = document.getElementById("mainAreaToday");
const textContainer = document.getElementById("textContainerToday");
const form = document.getElementById("checkBoxes");
const sbmbtn = document.getElementById("btnContainer");

export function getStats() {
  textContainer.classList.add("fade-out");
  form.classList.add("fade-out");
  sbmbtn.classList.add("fade-out");

  setTimeout(function () {
    mainArea.id = "";
    mainArea.innerHTML = "";
    mainArea.id = "mainAreaStats";
    mainArea.innerHTML = ` <div id="textContainerStats"><p>How are you feeling today, Luca?</p></div><div id="statisticField"></div>`;
    const tableContent = getMonthlyStats(newHash);
    getGridsOnField(tableContent);
  }, 300);
}


export function getMonthlyStats(year) {

    let allStats = [];
    console.log(year.year.date);
    for(let month in year.year.date) {
        for (let dayObject of year.year.date[month]) {
            allStats.push(dayObject.mood); // Wert des Tagesobjekts hinzufügen
          }
    }
    console.log(allStats);
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