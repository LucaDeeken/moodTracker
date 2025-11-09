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
  if (textContainer != undefined) {
    textContainer.classList.add("fade-out");
    form.classList.add("fade-out");
    sbmbtn.classList.add("fade-out");
    doneImage.classList.add("disappear");
  } else {
    const monthName = document.querySelector("#monthName");
    monthName.classList.add("fade-out");
  }

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
    console.log(ele);
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

      newDiv.addEventListener("click", () => {
        showGridDetails(ele, comingFromToday);
        comingFromToday = true;
      });
    }
  }
}

function showGridDetails(ele, comingFromToday) {
  const statsField = document.querySelector("#statisticsBorder");
  statsField.classList.add("disappear");
  setTimeout(() => {
    const arrowLeft = document.querySelector("#arrowLeft");
    const arrowRight = document.querySelector("#arrowRight");
    arrowLeft.style.opacity = "0";
    arrowRight.style.opacity = "0";
    statsField.innerHTML = "";
    statsField.id = "statisticsBorderGridNotes";
    statsField.classList.remove("disappear");
    statsField.style.display = "block";
    statsField.style.width = "100%";
    statsField.innerHTML = `   
          <form id="checkBoxesGridArea" >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="sad"
              viewBox="0 0 24 24"
              height="35px"
            >
              <path
                d="M8 11V9a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0zm7 1a1 1 0 0 0 1-1V9a1 1 0 0 0-2 0v2a1 1 0 0 0 1 1zm-3 2a6.036 6.036 0 0 0-4.775 2.368 1 1 0 1 0 1.55 1.264 4 4 0 0 1 6.45 0 1 1 0 0 0 1.55-1.264A6.036 6.036 0 0 0 12 14zm11-2A11 11 0 1 1 12 1a11.013 11.013 0 0 1 11 11zm-2 0a9 9 0 1 0-9 9 9.01 9.01 0 0 0 9-9z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="happy"
              viewBox="0 0 24 24"
              height="35px"
            >
              <path
                d="M12 1a11 11 0 1 0 11 11A11.013 11.013 0 0 0 12 1zm0 20a9 9 0 1 1 9-9 9.011 9.011 0 0 1-9 9zm6-8a6 6 0 0 1-12 0 1 1 0 0 1 2 0 4 4 0 0 0 8 0 1 1 0 0 1 2 0zM8 10V9a1 1 0 0 1 2 0v1a1 1 0 0 1-2 0zm6 0V9a1 1 0 0 1 2 0v1a1 1 0 0 1-2 0z"
              />
            </svg>
            <div id="one">
              <label>
                <input
                  type="checkbox"
                  name="option1"
                  value="terror"
                  class="inputCheckBox"
                />
              </label>
            </div>
            <div id="two">
              <label>
                <input
                  type="checkbox"
                  name="option1"
                  value="depressed"
                  class="inputCheckBox"
                />
              </label>
            </div>
            <div id="three">
              <label>
                <input
                  type="checkbox"
                  name="option1"
                  value="veryBad"
                  class="inputCheckBox"
                />
              </label>
            </div>
            <div id="four">
              <label>
                <input
                  type="checkbox"
                  name="option1"
                  value="bad"
                  class="inputCheckBox"
                />
              </label>
            </div>
            <div id="five">
              <label>
                <input
                  type="checkbox"
                  name="option1"
                  value="discontent"
                  class="inputCheckBox"
                />
              </label>
            </div>
            <div id="six">
              <label>
                <input
                  type="checkbox"
                  name="option1"
                  value="okay"
                  class="inputCheckBox"
                />
              </label>
            </div>
            <div id="seven">
              <label>
                <input
                  type="checkbox"
                  name="option1"
                  value="fine"
                  class="inputCheckBox"
                />
              </label>
            </div>
            <div id="eight">
              <label>
                <input
                  type="checkbox"
                  name="option1"
                  value="good"
                  class="inputCheckBox"
                />
              </label>
            </div>
            <div id="nine">
              <label>
                <input
                  type="checkbox"
                  name="option1"
                  value="veryGood"
                  class="inputCheckBox"
                />
              </label>
            </div>
            <div id="ten">
              <label>
                <input
                  type="checkbox"
                  name="option1"
                  value="godlike"
                  class="inputCheckBox"
                />
                </div>
              </label>
          </form>
  <section>
  <div class="notesInputDivGrid">
    <label for="notesInputGrid" class="notesLabel">Notes:</label>
    <textarea id="notesInputGrid" placeholder="What would you like to remember?" form="checkBoxes"></textarea>
  </div>
  <div class="notesCheckboxDivGrid">
    <label for="notesCheckboxGrid" class="notesCheckboxLabel">Task Done?</label>
    <div class="notesCheckboxInputDivGrid">
     <input id="inputCheckboxGrid" placeholder="Enter what this checkbox represents..." form="checkBoxes" >
     <input type="checkbox" id="notesCheckboxGrid" name="activity" value="sport" form="checkBoxes">
     </div>
  </div>
  </section>
  <div class="notesButtonDivGrid">
  <button class="notesCancelBtnGrid">Cancel</button>
  <button class="notesSubmitBtnGrid">Edit</button>
  </div>`;
    const headerDate = document.querySelector("#monthName");
    headerDate.textContent = ele.date;
    const input = document.querySelector(`.inputCheckBox[value="${ele.mood}"]`);
    input.checked = true;

    const noteTextfieldValue = document.querySelector("#notesInputGrid");
    const inputCheckboxValue = document.querySelector("#inputCheckboxGrid");
    const checkboxValue = document.querySelector("#notesCheckboxGrid");
    noteTextfieldValue.value = ele.notes;
    inputCheckboxValue.value = ele.checkBoxTitle;
    checkboxValue.checked = ele.checkbox;

    //only one checkbox should be checked
    document.querySelectorAll(".inputCheckBox").forEach((checkbox) => {
      checkbox.addEventListener("change", function () {
        if (this.checked) {
          document.querySelectorAll(".inputCheckBox").forEach((cb) => {
            if (cb !== this) cb.checked = false;
          });
        }
      });
    });
    const editBtn = document.querySelector(".notesSubmitBtnGrid");
    editBtn.addEventListener("click", () => {
      //find the value of the checked Mood
      const checkBoxes = document.getElementsByClassName("inputCheckBox");
      const checkBoxArray = Array.from(checkBoxes);
      const selectedBox = checkBoxArray.find(
        (checkBox) => checkBox.checked === true,
      );

      newHash.set(
        selectedBox.value,
        noteTextfieldValue.value,
        inputCheckboxValue.value,
        checkboxValue.checked,
        ele.date,
      );
      const mainArea = document.querySelector("#mainAreaStats");
      mainArea.style.transition = "none";
      const gridMainArea = document.querySelector("#statisticsBorderGridNotes");
      gridMainArea.classList.add("disappear");
      setTimeout(() => {
        mainArea.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      }, 600);
      getStats(comingFromToday);
    });

    const cancelBtn = document.querySelector(".notesCancelBtnGrid");
    cancelBtn.addEventListener("click", () => {
      const mainArea = document.querySelector("#mainAreaStats");
      mainArea.style.transition = "none";
      const gridMainArea = document.querySelector("#statisticsBorderGridNotes");
      gridMainArea.classList.add("disappear");
      setTimeout(() => {
        mainArea.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      }, 600);
      getStats(comingFromToday);
    });
  }, 600);
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
