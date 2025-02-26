var alarmPageHTML = 
`  
 <div id="alertPageParentWrapper">
   <div id="alertTimerBtnWrapper">
     <button id="setAlarmBtn">New Alarm</button>
   </div>
   <div id="allAlarmsWrapperDiv>
    
   </div>
 </div>
`

function addAlarmToggleListeners() {
  const allAlarmSections = document.querySelectorAll('.switch')
  allAlarmSections.forEach((alarm) => {
    alarm.onclick = function(e) {
      if (e.target.tagName !== 'SPAN') return;
      const id = e.target.id.slice(e.target.id.indexOf('-')+1)
      allAlarms[id].isActive = !allAlarms[id].isActive
      localStorage.setItem('alarms', JSON.stringify(allAlarms)) 
      
    }
})
}
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
  bigDaddyWrapper.innerHTML = renderAlarmsHTML()
  addAlarmToggleListeners()



  closeModal()
  localStorage.setItem('alarms', JSON.stringify(allAlarms)) 

}

function renderAlarmsHTML() {
  let format = ''
  bigDaddyWrapper.innerHTML = ''
  allAlarms.forEach((alarm,i) => {
   format+= `
     <section id=alarm-${i}-wrapper >
      <h1>alarm: ${alarm.startTimeAMPM} ${alarm.isPM}</h1>
      <div class="alarmsWrapper">
        <label class="switch" id="alarmLabel-${i}">
          <input type="checkbox" id="alarmInput-${i}" ${alarm.isActive ? 'checked' : ''}>
          <span class="slider round" id="alarmSpan-${i}"></span>
        </label>
        <button class="alarmDeleteBtn" id="deleteAlarm-${i}">X</button>
      </div>
     </section>
   
   `
  })

  return format
}
function addDeleteAlarmListeners() {
  const allAlarmDeleteBtns = document.querySelectorAll('.alarmDeleteBtn')
  allAlarmDeleteBtns.forEach((btn,i) => {
     btn.onclick = function() {
        const index = this.id.slice(this.id.indexOf('-')+1)
        allAlarms.splice(index,1)
        document.querySelector(`#alarm-${index}-wrapper`).remove()
        localStorage.setItem('alarms', JSON.stringify(allAlarms))
     }
  })
}
function updateAlarmsLIVE_HR_MIN() {
  
}
alarmTabHTML.onclick = function handleAlarmTabClick(e) {
  if (currentPageDisplayed !== 'alarm') {
    currentPageDisplayed = 'alarm'
    savedCurrentTasksHTML = bigDaddyWrapper.innerHTML
    
    bigDaddyWrapper.innerHTML = renderAlarmsHTML()
    alarmSectionWrapper.innerHTML = alarmPageHTML
    addDeleteAlarmListeners()
    addAlarmToggleListeners()
    updateAlarmsLIVE_HR_MIN()
  }
    setAlarmBtn.onclick = (e) => openModal(e.target.id)
    intervals = clearInterval(intervals)
    intervals = setInterval(displayHeaderExactTime,1000)
}

tasksTabHTML.onclick = function handleTaskTabClick(e) {
    alarmSectionWrapper.innerHTML = ''
    savedCurrentAlarmsHTML = bigDaddyWrapper.innerHTML
    currentPageDisplayed = 'tasks'
    renderTasksHTML()
    intervals = clearInterval(intervals)
    intervals = setInterval(updateTime, 1000)
}
