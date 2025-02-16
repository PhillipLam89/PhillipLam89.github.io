let secondsPassedInDay = 0
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

function handleTaskStatus(index) {
    const task = allTasks[index]
    const current = document.querySelector(`#task-${index}-status`)
    const countdownStatus = document.querySelector(`#task-${index}-countdown`)
    if (secondsPassedInDay - task.alertTimer >= 3600) {
        current.innerHTML = ''
        current.innerHTML = `<p>PASSED</p><p> (more than 1 hr ago)</p>`
        current.style.color= 'red' 
        countdownStatus.previousElementSibling.style.textDecoration = 'line-through'
        countdownStatus.textContent = 'PASSED'
        return
    }
    
    let doNow = secondsPassedInDay >= task.alertTimer ? true : false

    current.textContent = doNow ? 'DO NOW' : 'SCHEDULED'
    current.style.color=  doNow ? 'green' : 'gold'
    current.style.fontweight = 'bolder'

    task.alertTimer--
}

function updateTime() {

        const date = new Date()
        let exactTime = date.toLocaleString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            
      });
      let [hrs,mins,secs] = exactTime.split(':')
      let isPM = secs.slice(secs.indexOf(' ')+1) == 'PM' ? true : false
            secs = secs.slice(0, secs.indexOf(' '))
          
          if (isPM) hrs = Number(hrs) + 12


      secondsPassedInDay = (hrs * 3600) + (mins * 60) + (secs * 1)
      currentTimeHTML.textContent = `${exactTime}`

    

     //update seconds passed for all tasks
      allTasks.forEach((t, i) => handleTaskStatus(i))
   
}
function updateAlertTimers() {
    allTasks.forEach(task => {
        task.startHour = task.isPM ? (~~task.startHour + 12) : task.startHour
        task.alertTimer = (task.startHour * 3600) + task.startMinutes * 60
        task.startHour = task.isPM ? (~~task.startHour - 12) : task.startHour
    })
}
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
                          
    currentDayNameHTML.textContent =`${dayName}`
    currentDateHTML.textContent = `${month}-${dayNumber}-${year}`
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

let lastTaskClickedOn = null


function UpdateRenderTasks() {
    let format = ``
    allTasks = allTasks.sort((a,b) => a.trueValue - b.trueValue)

    allTasks.forEach((task,i)=> {
     
        task.index = i
         format += `        
    <section id="tasksWrapper-${task.index}">
         <button class="deleteBtn" id="removeTask-${task.index}">X</button>
          <div>
           <span class="taskStatusHTML" id="task-${task.index}-status"></span>
            <h2>Time:</h2>
             <p id="startHour-${task.index}">${task.startHour}:<span id="startMinutes-${task.index}">${task.startMinutes}</span><span id="AMPM"> ${task.isPM ? 'PM' : 'AM'}</span>
            </p>
          </div>
          <div>
            <h2>Goal:</h2>
            <p id="goalTextHTML-${task.index}">${task.Goal}</p>
         
          </div>
          <div>
            <h5>Countdown</h5>
            <p class="countdownTimer" id="task-${task.index}-countdown">5:01</p>
          </div>
          <div class="editBtn" id="editBtnDiv-${task.index}">
            <button id="editBtn-${task.index}">Edit/Add</button>
          </div>

    </section>
    
`       
        updateAlertTimers()

        bigDaddyWrapper.innerHTML = ''
        bigDaddyWrapper.innerHTML = format
        addEditListeners()
    })
    if (allTasks.length === 1) {document.querySelector('.deleteBtn').disabled = true}
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
        console.lo
        task.trueValue = 0 + task.startMinutes
      
       return
    }
    if (task.startHour >= 12) {
        task.isPM = true
        task.trueValue = (task.startHour * 60) + ~~task.startMinutes
       
        task.startHour = task.startHour == 12 ? 12 : task.startHour - 12

    } else {
        task.isPM = false
        task.trueValue = (task.startHour * 60) + ~~task.startMinutes
  
    }
    

}

function addEditListeners() {
    const allDeleteBtns = this.document.querySelectorAll('.deleteBtn')

    allDeleteBtns.forEach(btn => btn.onclick = function(e) {
         const deleteID = e.target.id.slice(e.target.id.indexOf('-')+1)
      
         allTasks = allTasks.filter(task => task.index != deleteID)
         
         UpdateRenderTasks()
    })  
    
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
