import { newHash } from "./index.js";
import { translateEmotionToColor } from "./statistics.js";

import notesImg from "./images/notes.png";

import terror from "./images/terror.png";
import depressedImg from "./images/depressed.png";
import veryBad from "./images/veryBad.png";
import bad from "./images/bad.png";
import discontent from "./images/discontent.png";
import okay from "./images/okay.png";
import fine from "./images/fine.png";
import good from "./images/good.png";
import veryGoodImg from "./images/veryGood.png";
import godlike from "./images/godlike.png";

const moodImages = [
  terror,
  depressedImg,
  veryBad,
  bad,
  discontent,
  okay,
  fine,
  good,
  veryGoodImg,
  godlike,
];

function preloadImages(imgArray) {
  imgArray.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

preloadImages(moodImages);

let alreadyClickedSubmit = false;
let doneIcon = "";
let mood ="";
export function DOMtoday() {
  document
    .getElementById("checkBoxes")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      alreadyClickedSubmit = true;
      const checkBoxes = document.getElementsByClassName("inputCheckBox");
      const checkBoxArray = Array.from(checkBoxes);
      const selectedBox = checkBoxArray.find(
        (checkBox) => checkBox.checked === true,
      );
      newHash.set(selectedBox.value);
      pulseCheckbox(selectedBox.value);
      mood = textByMood(selectedBox.value);

      const submitButton = document.getElementById("submitBtn");
      const checkBox = document.getElementById("checkBoxes");
      const textToday = document.getElementById("textToday");

      setTimeout(() => {
        textToday.classList.add("fade-out");
        setTimeout(() => {
          textToday.textContent = mood;
          textToday.classList.remove("fade-out");
          textToday.classList.add("fade-in");
          setTimeout(() => textToday.classList.remove("fade-in"), 400);
        }, 300);

        submitButton.textContent = "Edit";
        doneIcon = document.querySelector(".doneImage");
        const sourceOfImg = pictureByMood(selectedBox.value);
        doneIcon.src = sourceOfImg;
        checkBox.style.display = "none";
        doneIcon.style.display = "block";
        doneIcon.style.opacity = 1;

        submitButton.addEventListener("click", () => {
          alreadyClickedSubmit = false;
          loadTodayHTMLNew();
          DOMtoday();
      });




      }, 2000);
      console.log(newHash);
    });

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
  const notesButton = document.querySelector(".notesImg");
notesButton.addEventListener("click", () => {
  openNotesModule();
}, { once: true });
}

function pulseCheckbox(mood) {
  const checkBox = document.getElementById("checkBoxes");
  const pulseColor = translateEmotionToColor(mood);
  checkBox.classList.add(pulseColor);
  const color = getComputedStyle(checkBox).getPropertyValue("--farbe");
  checkBox.style.setProperty("--pulse-color", color);
  checkBox.classList.remove("active");
  checkBox.classList.add("active");
}

function textByMood(mood) {
  switch (mood) {
    case "terror":
      return "Dark times. Hang in there! ❤️";
    case "depressed":
      return "Gentle hug for you. No need to be strong today.";
    case "veryBad":
      return "Today sucked. But it could’ve been worse.";
    case "bad":
      return "Just another pointless-feeling day.";
    case "discontent":
      return "Another day of slightly underwhelming adulting.";
    case "okay":
      return "A day that’s… okay, I guess.";
    case "fine":
      return "A simple day, and honestly, not too bad!";
    case "good":
      return "Feels good to know, you had a great day!";
    case "veryGood":
      return "Today sounds wonderful — I’m glad!";
    case "godlike":
      return "God-tier day unlocked — achievement complete!";
  }
}

function pictureByMood(mood) {
  switch (mood) {
    case "terror":
      return terror;
    case "depressed":
      return depressedImg;
    case "veryBad":
      return veryBad;
    case "bad":
      return bad;
    case "discontent":
      return discontent;
    case "okay":
      return okay;
    case "fine":
      return fine;
    case "good":
      return good;
    case "veryGood":
      return veryGoodImg;
    case "godlike":
      return godlike;
  }
}

export function getTodayHTML() {
  const textContainerStats = document.querySelector("#textContainerStats");
  const statisticField = document.querySelector("#statisticField");
  textContainerStats.classList.add("fade-out");
  statisticField.classList.add("fade-out");
  const mainAreaStats = document.querySelector("#mainAreaStats");
  mainAreaStats.style.transform = "scale(1)";

  setTimeout(() => {
    const mainArea = document.querySelector(".mainArea");
    mainArea.innerHTML = "";
    mainArea.id = "";
    if (!alreadyClickedSubmit) {
      loadTodayHTMLNew();
    } else {
      loadTodayHTMLDone();
      const submitBtn = document.getElementById("submitBtn");
      submitBtn.addEventListener("click", () => {
        loadTodayHTMLNew();
        DOMtoday();
      });
    }

    mainArea.id = "mainAreaToday";
    DOMtoday();
    mainAreaStats.style.transform = "";
  }, 600);
}

function loadTodayHTMLDone() {
        const mainArea = document.querySelector(".mainArea");
        mainArea.innerHTML = "";
        mainArea.id = "";
        mainArea.innerHTML = `     <div id="textContainerToday">
          <p id="textToday" class="">${mood}</p>
        </div>
        <img src=${doneIcon.src} alt="Done-Icon" class="doneImage" style="display: block; opacity: 1;">
        <form id="checkBoxes" class="bg-farbe-9 active" style="--pulse-color: #32CD32; display: none;">
          <svg xmlns="http://www.w3.org/2000/svg" id="sad" viewBox="0 0 24 24" height="35px">
            <path d="M8 11V9a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0zm7 1a1 1 0 0 0 1-1V9a1 1 0 0 0-2 0v2a1 1 0 0 0 1 1zm-3 2a6.036 6.036 0 0 0-4.775 2.368 1 1 0 1 0 1.55 1.264 4 4 0 0 1 6.45 0 1 1 0 0 0 1.55-1.264A6.036 6.036 0 0 0 12 14zm11-2A11 11 0 1 1 12 1a11.013 11.013 0 0 1 11 11zm-2 0a9 9 0 1 0-9 9 9.01 9.01 0 0 0 9-9z"></path>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" id="happy" viewBox="0 0 24 24" height="35px">
            <path d="M12 1a11 11 0 1 0 11 11A11.013 11.013 0 0 0 12 1zm0 20a9 9 0 1 1 9-9 9.011 9.011 0 0 1-9 9zm6-8a6 6 0 0 1-12 0 1 1 0 0 1 2 0 4 4 0 0 0 8 0 1 1 0 0 1 2 0zM8 10V9a1 1 0 0 1 2 0v1a1 1 0 0 1-2 0zm6 0V9a1 1 0 0 1 2 0v1a1 1 0 0 1-2 0z"></path>
          </svg>
          <div id="one">
            <label>
              <input type="checkbox" name="option1" value="terror" class="inputCheckBox">
            </label>
          </div>
          <div id="two">
            <label>
              <input type="checkbox" name="option1" value="depressed" class="inputCheckBox">
            </label>
          </div>
          <div id="three">
            <label>
              <input type="checkbox" name="option1" value="veryBad" class="inputCheckBox">
            </label>
          </div>
          <div id="four">
            <label>
              <input type="checkbox" name="option1" value="bad" class="inputCheckBox">
            </label>
          </div>
          <div id="five">
            <label>
              <input type="checkbox" name="option1" value="discontent" class="inputCheckBox">
            </label>
          </div>
          <div id="six">
            <label>
              <input type="checkbox" name="option1" value="okay" class="inputCheckBox">
            </label>
          </div>
          <div id="seven">
            <label>
              <input type="checkbox" name="option1" value="fine" class="inputCheckBox">
            </label>
          </div>
          <div id="eight">
            <label>
              <input type="checkbox" name="option1" value="good" class="inputCheckBox">
            </label>
          </div>
          <div id="nine">
            <label>
              <input type="checkbox" name="option1" value="veryGood" class="inputCheckBox">
            </label>
          </div>
          <div id="ten">
            <label>
              <input type="checkbox" name="option1" value="godlike" class="inputCheckBox">
            </label>
          </div>
                    <div class="notesDiv">
             <img src="${notesImg}" alt="Notes" aria-label="add notes" class="notesImg" />
          </div>
        </form>
        <div id="btnContainer">
          <button type="submit" form="checkBoxes" id="submitBtn">Edit</button>
        </div>`;
}

function loadTodayHTMLNew() {
  const mainArea = document.querySelector(".mainArea");
        mainArea.innerHTML = `     <div id="textContainerToday">
        <p id="textToday">How are you feeling today, Luca?</p>
      </div>
      <img src="./images/done.png" alt="Done-Icon" class="doneImage">
      <form id="checkBoxes">
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
          </label>
        </div>
                  <div class="notesDiv">
             <img src="${notesImg}" alt="Notes" aria-label="add notes" class="notesImg" />
          </div>
      </form>
      <div id="btnContainer">
        <button type="submit" form="checkBoxes" id="submitBtn">Submit</button>
      </div>`;
}


function openNotesModule () {

  const checkBoxForm = document.querySelector("#checkBoxes");
  const btnContainer = document.querySelector("#btnContainer");
  const textHeader = document.querySelector("#textToday");

  const textHeaderContent = textHeader.textContent;
  checkBoxForm.classList.add("disappear");
  btnContainer.classList.add("disappear");
  
  //Text Header Switch and Animation
  setTimeout(() => {
    textHeader.classList.add("fade-out");
    setTimeout(() => {
      textHeader.textContent = "What's on your mind?";
      textHeader.classList.remove("fade-out");
      textHeader.classList.add("fade-in");
      setTimeout(() => textHeader.classList.remove("fade-in"), 700);
    }, 700);
    })




  //Animation
  setTimeout(() => {
    checkBoxForm.style.display = "none";
    btnContainer.style.display = "none";
    checkBoxForm.classList.add("zeroOpacity");
    btnContainer.classList.add("zeroOpacity");
    checkBoxForm.classList.remove("disappear");
    btnContainer.classList.remove("disappear");
  }, 700); 
  

  
  //NoteInput Fields
  const notesForm = document.createElement("div");
  notesForm.classList.add("zeroOpacity");
  notesForm.classList.add("notesFormTransitionComing");
  setTimeout(() => {

  textHeader.classList.remove("fade-in");
  checkBoxForm.insertAdjacentElement("afterend", notesForm);
  notesForm.classList.add("notesForm");
  notesForm.innerHTML = `
  <section>
  <div class="notesInputDiv">
    <label for="notesInput" class="notesLabel">Notes:</label>
    <textarea id="notesInput" placeholder="What would you like to remember?" form="checkBoxes"></textarea>
  </div>
  <div class="notesCheckboxDiv">
    <label for="notesCheckbox" class="notesCheckboxLabel">Done?</label>
    <div class="notesCheckboxInputDiv">
     <input id="inputCheckbox" placeholder="Enter what this checkbox represents..." >
     <input type="checkbox" id="notesCheckbox" name="activity" value="sport">
     </div>
  </div>
  </section>
  <div class="notesButtonDiv">
  <button class="notesCancelBtn">Cancel</button>
  <button class="notesSubmitBtn">Submit</button>
  </div>
  `;

  const notesSubmitBtn = document.querySelector(".notesSubmitBtn");
  notesSubmitBtn.addEventListener("click", () => {
    closeNotesModul(textHeaderContent);
  })

  const notesCancelBtn = document.querySelector(".notesCancelBtn");
  notesCancelBtn.addEventListener("click", () => {
    closeNotesModul(textHeaderContent);
  })

  }, 600);


  setTimeout(() => {
    notesForm.classList.remove("zeroOpacity");
    
    notesForm.classList.add("appear");
    notesForm.classList.remove("notesFormTransitionComing");

    setTimeout(() => {
      notesForm.classList.remove("appear");
    }, 200);
  }, 700);
}

function closeNotesModul (textHeaderContent) {

  const notesForm = document.querySelector(".notesForm");
  const textHeader = document.querySelector("#textToday");

  //Text Header Switch and Animation
  setTimeout(() => {
    textHeader.classList.add("fade-out");
    setTimeout(() => {
      textHeader.textContent = textHeaderContent;
      textHeader.classList.remove("fade-out");
      textHeader.classList.add("fade-in");
      setTimeout(() => textHeader.classList.remove("fade-in"), 700);
    }, 700);
    })





  notesForm.classList.add("disappear");
  //Animation
  setTimeout(() => {

    notesForm.classList.add("zeroOpacity"); 
    notesForm.style.display = "none";
  }, 300); 
  
  const checkBoxes = document.querySelector("#checkBoxes");
  const buttonContainer = document.querySelector("#btnContainer");
  checkBoxes.style.display = "grid";
  buttonContainer.style.display = "grid";
  //NoteInput Fields
  // const checkBoxForm = document.querySelector("#checkBoxes");
  // checkBoxForm.style.opacity = 0;



  setTimeout(() => {

  checkBoxes.classList.add("appear");
  buttonContainer.classList.add("appear");
  checkBoxes.classList.remove("zeroOpacity");
  buttonContainer.classList.remove("zeroOpacity");
  

  setTimeout(() => {
    checkBoxes.classList.remove("appear");
    buttonContainer.classList.remove("appear");
    
    //enable notesButton again
    const notesButton = document.querySelector(".notesImg");
    notesButton.addEventListener("click", () => {
      openNotesModule();
    }, { once: true });

  }, 1000);
  }, 700);

}