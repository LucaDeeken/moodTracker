import "./styles.css";
//import { moodTracker, days, defaultProject } from "./objects";
import {getStats, getMonthlyStats} from "./statistics.js";
import { HashMap } from "./hashMap.js";

const statsBtn = document.getElementById("statistics");
export const newHash = new HashMap();
statsBtn.addEventListener("click", () => {
    getStats();
})

document.getElementById("checkBoxes").addEventListener("submit", function (event) {
    event.preventDefault(); // Verhindert das Neuladen der Seite
    const checkBoxes = document.getElementsByClassName("inputCheckBox");
    const checkBoxArray = Array.from(checkBoxes);
    const selectedBox = checkBoxArray.find(checkBox => checkBox.checked === true);
    console.log(selectedBox.value);

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


