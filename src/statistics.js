import { HashMap } from "./hashMap.js";
import { newHash, loadHashMapFromLocalStorage } from "./index.js";
import arrowLeft from "./images/arrowLeft.png";
import arrowRight from "./images/arrowRight.png";

export function getStats(comingFromToday) {
  const mainArea = document.querySelector(".mainArea");
  const doneImage = document.querySelector(".doneImage");
  const textContainer = document.getElementById("textContainerToday");
  const form = document.getElementById("checkBoxes");
  const sbmbtn = document.getElementById("btnContainer");
  textContainer.classList.add("fade-out");
  form.classList.add("fade-out");
  sbmbtn.classList.add("fade-out");
  doneImage.classList.add("disappear");

  setTimeout(function () {
    mainArea.id = "";
    mainArea.innerHTML = "";
    mainArea.id = "mainAreaStats";
    mainArea.innerHTML = ` <div id="textContainerStats"> <img src="${arrowLeft}" alt="" aria-label="Show previews month" id="arrowLeft">
<p id="monthName"></p><img src="${arrowRight}" alt="" aria-label="Show next month" id="arrowRight"></div><div id="statisticsBorder"><div id="statisticField"></div></div>`;
    if (newHash != null) {
      const tableContent = loadToday(newHash);
      getGridsOnField(tableContent, comingFromToday);
      console.log(newHash);
    }
    const arrowLeftELe = document.getElementById("arrowLeft");
    const arrowRightELe = document.getElementById("arrowRight");

    const monthName = document.getElementById("monthName");
    const monthText = getMonthName(month);
    monthName.textContent = monthText;
    arrowLeftELe.addEventListener("click", () => {
      moveMonthBack(month, year, newHash);
    });
    arrowRightELe.addEventListener("click", () => {
      moveMonthNext(month, year, newHash);
    });
  }, 500);
  return newHash;
}

function getMonthlyStats(year, month, newHash) {
  let allStats = [];

  const monthMinusOne = month - 1;
  const found = newHash.array.find((obj) => Object.values(obj).includes(year));
  for (const dayObject of found.date[monthMinusOne]) {
    allStats.push(dayObject); // Wert des Tagesobjekts hinzufügen
  }
  return allStats;
}

let month = 0;
let year = 0;

function loadToday(newHash) {
  let todayDate = new Date();
  year = todayDate.getFullYear();
  month = todayDate.getMonth() + 1;
  console.log(month);
  year = String(year);
  const allStats = getMonthlyStats(year, month, newHash);
  return allStats;
}

function moveMonthBack(monthVar, yearVar, newHash, comingFromToday) {
  const comingFromTodayField = false;
  month = month - 1;
  if (month < 0) {
    year = year - 1;
    month = 12;
  }
  const monthText = getMonthName(month);
  const allStats = getMonthlyStats(yearVar, month, newHash);
  getGridsOnField(allStats, comingFromTodayField);
  const monthName = document.getElementById("monthName");

  monthName.textContent = monthText;
  return allStats;
}

function moveMonthNext(monthVar, yearVar, newHash) {
  const comingFromTodayArea = false;
  month = month + 1;
  if (month > 12) {
    year = year + 1;
    month = 1;
  }
  const monthText = getMonthName(month);

  const allStats = getMonthlyStats(yearVar, month, newHash);
  getGridsOnField(allStats, comingFromTodayArea);
  const monthName = document.getElementById("monthName");
  monthName.textContent = monthText;
  console.log(month);
  return allStats;
}

function getMonthName(monthNumber, locale = "de-DE") {
  return new Intl.DateTimeFormat(locale, { month: "long" }).format(
    new Date(2000, monthNumber - 1, 1),
  );
}

function getGridsOnField(data, comingFromToday) {
  const lengthOfArr = data.length;
  const statisticFieldDOM = document.getElementById("statisticField");
  statisticFieldDOM.innerHTML = "";

  for (let i = 0; i < lengthOfArr; i++) {
    const ele = data.shift();
    if (ele.mood != null) {
      const newDiv = document.createElement("div");
      statisticFieldDOM.appendChild(newDiv);
      let dayNum = ele.date;
      dayNum = Number(dayNum.split(".")[0]);
      newDiv.textContent = dayNum + "th";
      if (comingFromToday) {
        newDiv.classList.add("statsField");
      } else {
        newDiv.classList.add("statsFieldFromMonth");
      }

      const colorOfMood = translateEmotionToColor(ele.mood);
      newDiv.classList.add(colorOfMood);
      const color = getComputedStyle(newDiv).getPropertyValue("--farbe");
      newDiv.style.backgroundColor = color;
      newDiv.classList.add(".appear");
    }
  }
}

export function translateEmotionToColor(mood) {
  switch (mood) {
    case "terror":
      return "bg-farbe-1";
    case "depressed":
      return "bg-farbe-2";
    case "veryBad":
      return "bg-farbe-3";
    case "bad":
      return "bg-farbe-4";
    case "discontent":
      return "bg-farbe-5";
    case "okay":
      return "bg-farbe-6";
    case "fine":
      return "bg-farbe-7";
    case "good":
      return "bg-farbe-8";
    case "veryGood":
      return "bg-farbe-9";
    case "godlike":
      return "bg-farbe-10";
  }
}
