let secondsPassedInDay = 0
window.onload = function runOnBoot() { //loads current date

    const date = new Date()
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const dayNumber = String(date.getDate()).padStart(2, '0');
    
    let dayName = new Date()
        dayName = String(dayName)
        dayName = dayName.slice(0, dayName.indexOf(' '))
        
        const dayIndex = Object.keys(daysOfWeekSuffixes)
                        .find(day => day.includes(dayName))
 
        dayName += daysOfWeekSuffixes[dayIndex]

    
    
    function updateTime() {
        const date = new Date()
        let exactTime = date.toLocaleString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
      });
      let [hrs,mins,secs] = exactTime.split(':')
            secs = secs.slice(0, secs.indexOf(' '))

      secondsPassedInDay = (hrs * 60**2) + (mins * 60) + (secs * 1)
      currentTimeHTML.textContent = `${exactTime}`
    }

                             
        currentDayNameHTML.textContent =`${dayName}`
        currentDateHTML.textContent = `${month}-${dayNumber}-${year}`
        updateTime()

    UpdateRenderTasks()
    updateBtn.onclick  = updateBtnHandler
    this.setInterval(updateTime, 999)
}

const daysOfWeekSuffixes = {
    MonFriSun: 'day',
    Wed: 'nesday',
    Tue: 'sday',
    Thu: 'rsday',
    Sat: 'urday'
}

let allTasks = [
    {startHour: '3', startMinutes: '04', Goal: 'ERROR, SAMPLE GOAL 1', Done:false, index:0,
                   isPM: false, trueValue: 3*60 + 4
    },
    {startHour: '11',startMinutes:'30', Goal: 'ERROR, SAMPLE GOAL 2', Done:false, index:1, isPM: true,
                    trueValue: 23*60 + 30
    },
    {startHour: '3',startMinutes:'10', Goal:  'ERROR, SAMPLE GOAL 3', Done:false, index:2, isPM: true,
                    trueValue: 15*60 + 10
    
    }    
]
let lastTaskClickedOn = null


function UpdateRenderTasks() {

    allTasks = allTasks.sort((a,b) => a.trueValue - b.trueValue)
    allTasks.forEach((task,i) => task.index = i)
    let format = ``

    allTasks.forEach(task => {
         format += `        
    <section id="tasksWrapper-${task.index}">
          <div>
            <h2>Time:</h2>
             <p id="startHour-${task.index}">${task.startHour}:<span id="startMinutes-${task.index}">${task.startMinutes}</span><span id="AMPM"> ${task.isPM ? 'PM' : 'AM'}</span>
            </p>
          </div>
          <div>
            <h2>Goal:</h2>
            <p id="goalTextHTML-${task.index}">${task.Goal}</p>
         
          </div>
          <div>
            <h2>Done?</h2>
          </div>
          <div class="editBtn" id="editBtnDiv-${task.index}">
            <button id="editBtn-${task.index}">Edit/Add</button>
          </div>

    </section>
    <br>
`       
        bigDaddyWrapper.innerHTML = ''
        bigDaddyWrapper.innerHTML = format
        addEditListeners()
    })
}





function updateBtnHandler() {
    if (!currentGoalInput.value || !timeInput.value) {
        alert('fill out form')
        return
    }
    let id = lastTaskClickedOn
    let startHour = timeInput.value.slice(0, timeInput.value.indexOf(':'))

    const startMinutes = timeInput.value.slice(timeInput.value.indexOf(':')+1)
   
    const newObj = {}
    newObj.startHour = startHour
    newObj.startMinutes = startMinutes
    newObj.Goal = currentGoalInput.value
    
    id = !newPostOption.checked ? id : allTasks.length

    allTasks[id] = newObj
   
    handleAMPM(id)
    

    closeModal()
    UpdateRenderTasks()
} 

function handleAMPM(id) {
    const task = allTasks[id]
    if (task.startHour == 0) {
        task.startHour = 12
        task.isPM = false
        task.trueValue = 0 + task.startMinutes
       return
    }
    if (task.startHour >= 12) {
        task.isPM = true
        task.trueValue = (task.startHour * 60) + ~~task.startMinutes
        task.startHour = task.startHour == 12 ? 12 : task.startHour - 12
    } else {
        task.trueValue = (task.startHour * 60) + ~~task.startMinutes
    }

}

function addEditListeners() {
    const allEditBtns = this.document.querySelectorAll('.editBtn')
    allEditBtns.forEach(btn => btn.onclick = function(e) {
        
        let id = e.target.id
            id = id.slice(id.indexOf('-')+1,)
            lastTaskClickedOn = id
            openModal()
        
        const entryHour = document.querySelector(`#startHour-${id}`).textContent
        oldTaskTime.textContent = entryHour
        currentGoalInput.value = allTasks[id].Goal

    }) 
 
}
