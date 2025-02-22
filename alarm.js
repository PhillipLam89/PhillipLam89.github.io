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

// function handleNewAlarms(e) {
//     openModal(e.target.id)

// }

alarmTabHTML.onclick = function(e) {
    savedCurrentTasksHTML = bigDaddyWrapper.innerHTML
    
    bigDaddyWrapper.innerHTML = renderAlarmsHTML()
    alarmSectionWrapper.innerHTML = alarmPageHTML
    currentPageDisplayed = 'alarm'

    setAlarmBtn.onclick = (e) => openModal(e.target.id)

    
    intervals = clearInterval(intervals)
    intervals = setInterval(displayHeaderExactTime,999)

}

tasksTabHTML.onclick = function(e) {
    alarmSectionWrapper.innerHTML = ''
    savedCurrentAlarmsHTML = bigDaddyWrapper.innerHTML
    currentPageDisplayed = 'tasks'
    renderTasksHTML()
    intervals = clearInterval(intervals)
    intervals = setInterval(updateTime, 999)
}
