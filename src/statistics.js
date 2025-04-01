const mainArea = document.getElementById("mainAreaToday");
const textContainer = document.getElementById("textContainerToday");


export function getStats() {
    mainArea.id="";
    //textContainer.removeAttribute("textContainerToday");
    mainArea.innerHTML="";
    mainArea.id="mainAreaStats";
}