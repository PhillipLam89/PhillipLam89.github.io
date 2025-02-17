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

// close modal when the Esc key is pressed
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
          <p>Current Time: <span id="oldTaskTime"></span></p>
          <label for="timeInput">set new time</label>
           <input id="timeInput" type="time">
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
       <li>Tasks are scheduled for 1 hour</li>
       <li>Tasks set < 1 hr will be "In Progress" </li>
       <li>Cannot delete all tasks </li>
       <li>Tasks ~5 mins away will blink</li>
       <li>Task more than 1 hr away will be green</li>
       <li>Task less than 1 hr away will be red</li>
   </div>`

const openModal = function (isInfoDisplayed = false) {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  if (isInfoDisplayed) {
    modal.innerHTML = infoModalHTML
    const closeModalBtn = document.querySelector(".btn-close");
    closeModalBtn.addEventListener("click", closeModal);
  } else {
    modal.innerHTML = defaultModalHTML
    updateBtn.onclick  = updateBtnHandler
  }

};
infoBtn.onclick =  openModal
// open modal event

