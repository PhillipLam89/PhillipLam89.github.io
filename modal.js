const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector(".btn-open");
const closeModalBtn = document.querySelector(".btn-close");

// close modal function
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// close the modal when the close button and overlay is clicked
closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);


document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// open modal function
const defaultModalHTML =  
 ` <div class="flex"> 
          <button class="btn-close">⨉</button>
        </div>

        <div id="taskParentWrapper">
           <label for="timeInputStart">From</label>
           <input id="timeInputStart" type="time">
           <br>
           <label for="timeInputEnd">To</label>     
           <input id="timeInputEnd" type="time">
           <br>
           <label id="currentGoal">Goal:</label>
           <input id="currentGoalInput">
           <br>
           <br>
           <label for="newPostOption">Add as new post</label> 
           <input type="checkbox" id="newPostOption">
           <button id="updateBtn" class="btn">Update!</button>
   </div>`

const infoModalHTML =  
` <div class="flex"> 
        <button class="btn-close">⨉</button>
  </div>

  <div id="taskParentWrapper">
       <li>Tasks cant be set more than 24 hrs apart</li>
       <li>Cannot delete all tasks </li>
       <li>Tasks in progress has remaining timers</li>
       <li>Tasks ~5 mins away will blink <span style="color: red;">red</span> </li>
       <li>Task more than 1 hr away will have <span style="color: green;">green countdown</span></li>
       <li>Task less than 1 hr away will have  <span style="color: red;">red countdown</span></li>
   </div>`


const setAlarmModal = 
 ` <div class="flex"> 
        <button class="btn-close">⨉</button>
   </div>
   <br>
   <div id="taskParentWrapper">
      <label for="newAlarmTimer">New Alarm</label>
      <input id="newAlarmTimer" type="time">
      <br>
      <br>
      <button id="updateBtnAlarms" class="btn">Update!</button>
   </div>`


let allAlarms = [];

console.log(localStorage.getItem('alarms'))

allAlarms = JSON.parse(localStorage.getItem('alarms')) || allAlarms
function handleAlarmUpdateBtn(e) {
  let id = e.target.id
  if (!newAlarmTimer.value) {
    alert('invalid time')
    return
  }
  let alertTimeForTmr = false
  let timeInSeconds = inputValueToSeconds(newAlarmTimer.value)
  let isPM = newAlarmTimer.value.slice(0,2) > 11 ? 'PM' : 'AM'

  if (secondsPassedInDay > timeInSeconds) {
    alertTimeForTmr = true
    timeInSeconds = (86400 - (secondsPassedInDay - timeInSeconds))
  } else {timeInSeconds = (timeInSeconds - secondsPassedInDay )}
  
  
  let startTimeAPM = newAlarmTimer.value
  let startingHour = startTimeAPM.slice(0,2)
  let startingMins = startTimeAPM.slice(3)
      startingHour = startingHour == 0 ? '12' : startingHour
      startingHour = startingHour > 12 ? String(startingHour - 12) : startingHour
      startingHour+=':'
  const timeObj = {countdownTimeSecs: timeInSeconds,
                   countdownTimeHrs: timeInSeconds / 3600,
                  startTimeAMPM: startingHour + startingMins, 
                  isForTmr: alertTimeForTmr, isPM:isPM , isActive: true,
                  index: allAlarms.length
                  };
        
  allAlarms.push(timeObj) 
  bigDaddyWrapper.insertAdjacentHTML('afterbegin', renderAlarmsHTML())
 


  closeModal()
  localStorage.setItem('alarms', JSON.stringify(allAlarms)) 

}
function renderAlarmsHTML() {
  let format = ''
  bigDaddyWrapper.innerHTML = ''
  allAlarms.forEach((alarm,i) => {
   format+= `
     <section id=alarm-${i}-wrapper>
      <h1>alarm: ${alarm.startTimeAMPM} ${alarm.isPM}</h1>
      <input type="checkbox" id="alarm-${i}-toggle"></h3>
     </section>
   
   `
  })

  return format
} 
const openModal = function (EventPassedIn = false) {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  
  if (EventPassedIn == 'setAlarmBtn')  {
    modal.innerHTML = setAlarmModal
    const closeModalBtn = document.querySelector(".btn-close");
    closeModalBtn.addEventListener("click", closeModal);
    updateBtnAlarms.onclick = handleAlarmUpdateBtn
    return
  }

  modal.innerHTML = EventPassedIn ? infoModalHTML : defaultModalHTML
  if(window.updateBtn) updateBtn.onclick  = updateBtnHandler;

  const closeModalBtn = document.querySelector(".btn-close");
  closeModalBtn.addEventListener("click", closeModal);
};
infoBtn.onclick =  openModal //onclick will auto pass in Event, makin EventPassedIn true
// open modal event
