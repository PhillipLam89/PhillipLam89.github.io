let secondsPassedInDay = 0
let lastTaskClickedOn = null
let allTasks = [
    {startHour: '10', startMinutes: '36', Goal: 'Default Goal', Done:false, index:0,
                   isPM: true, trueValue: 22*60 + 36
    }
]

allTasks = JSON.parse(localStorage.getItem('data'))
         || allTasks
window.onload = function runOnBoot() { //loads current date
            updateToNewDay()
            UpdateRenderTasks()
            updateBtn.onclick  = updateBtnHandler
            this.setInterval(updateTime, 999)

            //see helperFuncs.js for other functions
}



