let secondsPassedInDay = 0
let lastTaskClickedOn = null
let allTasks = [
    {startHour: '10', startMinutes: '36', Goal: 'ERROR, SAMPLE GOAL 1', Done:false, index:0,
                   isPM: true, trueValue: 22*60 + 36
    },
    {startHour: '3',startMinutes:'40', Goal: 'ERROR, SAMPLE GOAL 2', Done:false, index:1, isPM: true,
                    trueValue: 15*60 + 40
    },
    {startHour: '1',startMinutes:'08', Goal:  'ERROR, SAMPLE GOAL 3', Done:false, index:2, isPM: false,
                    trueValue: 1 + 8
    
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



