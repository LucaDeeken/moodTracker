
import { newHash} from "./index.js";


export function DOMtoday() {

    document.getElementById("checkBoxes").addEventListener("submit", function (event) {
        event.preventDefault(); // Verhindert das Neuladen der Seite
        const checkBoxes = document.getElementsByClassName("inputCheckBox");
        const checkBoxArray = Array.from(checkBoxes);
        const selectedBox = checkBoxArray.find(checkBox => checkBox.checked === true);

        newHash.set(selectedBox.value);
        console.log(newHash);
    
      });
    
      //only one checkbox should be checked
      document.querySelectorAll(".inputCheckBox").forEach(checkbox => {
        checkbox.addEventListener("change", function () {
            if (this.checked) {
                document.querySelectorAll(".inputCheckBox").forEach(cb => {
                    if (cb !== this) cb.checked = false;
                });
            }
        });
    });
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
        mainArea.id ="";
        mainArea.innerHTML = `     <div id="textContainerToday">
        <p>How are you feeling today, Luca?</p>
      </div>
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
      </form>
      <div id="btnContainer">
        <button type="submit" form="checkBoxes" id="submitBtn">Submit</button>
      </div>`;
      mainArea.id = "mainAreaToday";
      DOMtoday();
      mainAreaStats.style.transform = "";
      }, 600);
    
}

