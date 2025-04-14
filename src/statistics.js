import { loadedHash, HashMap } from "./hashMap.js";
import { loadHashMapFromLocalStorage } from "./index.js";
import arrowLeft from "./images/arrowLeft.png";
import arrowRight from "./images/arrowRight.png";

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
    allStats.push(dayObject); // Wert des Tagesobjekts hinzufügen
  }
  return allStats;
}

function getGridsOnField(data) {
  const lengthOfArr = data.length;
  const statisticFieldDOM = document.getElementById("statisticField");

  for (let i = 0; i < lengthOfArr; i++) {
    const newDiv = document.createElement("div");
    statisticFieldDOM.appendChild(newDiv);
    const ele = data.shift();
    let dayNum = ele.date;
    dayNum = Number(dayNum.split(".")[0]);
    newDiv.textContent = dayNum + 1 + "th";
    newDiv.classList.add("statsField");
    translateEmotionToColor(ele.mood, newDiv);;
  }
}

function translateEmotionToColor(mood, newDiv) {
  switch (mood) {
    case "terror":
      newDiv.classList.add("bg-farbe-1");
      break;
    case "depressed":
      newDiv.classList.add("bg-farbe-2");
      break;
    case "veryBad":
      newDiv.classList.add("bg-farbe-3");
      break;
    case "bad":
      newDiv.classList.add("bg-farbe-4");
      break;
    case "discontent":
      newDiv.classList.add("bg-farbe-5");
      break;
    case "okay":
      newDiv.classList.add("bg-farbe-6");
      break;
    case "fine":
      newDiv.classList.add("bg-farbe-7");
      break;
    case "good":
      newDiv.classList.add("bg-farbe-8");
      break;
    case "veryGood":
      newDiv.classList.add("bg-farbe-9");
      break;
    case "godlike":
      newDiv.classList.add("bg-farbe-10");
      break;
  }
}
