let alarmPageHTML = 
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


alarmTabHTML.onclick = function(e) {
  if (currentPageDisplayed !== 'alarm') {
    currentPageDisplayed = 'alarm'
    savedCurrentTasksHTML = bigDaddyWrapper.innerHTML
    
    bigDaddyWrapper.innerHTML = renderAlarmsHTML()
    alarmSectionWrapper.innerHTML = alarmPageHTML
    addAlarmToggleListeners()
  }
    setAlarmBtn.onclick = (e) => openModal(e.target.id)
    intervals = clearInterval(intervals)
    intervals = setInterval(displayHeaderExactTime,1000)
}

tasksTabHTML.onclick = function(e) {
    alarmSectionWrapper.innerHTML = ''
    savedCurrentAlarmsHTML = bigDaddyWrapper.innerHTML
    currentPageDisplayed = 'tasks'
    renderTasksHTML()
    intervals = clearInterval(intervals)
    intervals = setInterval(updateTime, 1000)
}
