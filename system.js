const mainInputTask = document.getElementById("maininputtask");
const listContainer = document.getElementById("listcontainer");
const taskTitle = document.getElementById("tasktitle");
const taskNotes = document.getElementById("tasknotes");


function addtask() {
    if (mainInputTask.value.trim() === '') {
        alert("Write Something!");
        return;
    } 

    let li = document.createElement("li");
    li.innerHTML = mainInputTask.value;
    li.setAttribute("data-task", mainInputTask.value);
    
    let deleteBtn = document.createElement("span");
    deleteBtn.innerHTML = "\u00d7"; 
    li.appendChild(deleteBtn);

    let openNotes = document.createElement("button");
    openNotes.textContent = "notes";
    li.appendChild(openNotes);

    listContainer.appendChild(li);
    mainInputTask.value = ""; 
    saveData();
}


listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "BUTTON") {
        let selectedTask = e.target.parentElement.getAttribute("data-task");
        taskTitle.textContent = selectedTask;
        taskNotes.value = localStorage.getItem(selectedTask) || "";
        document.getElementById("taskdetail").style.display = "block";
        document.getElementById("beforetask").style.display = "none";
        let taskDetail = document.getElementById("taskdetail");
        taskDetail.style.display = "block";
        setTimeout(() => taskDetail.classList.add("show"), 10);
    } else if (e.target.tagName === "SPAN") { 
        let taskToDelete = e.target.parentElement.getAttribute("data-task");
        e.target.parentElement.remove();
        localStorage.removeItem(taskToDelete);
        document.getElementById("taskdetail").style.display = "none";
        document.getElementById("beforetask").style.display = "block";
        
        if (taskTitle.textContent === taskToDelete) {
            taskTitle.textContent = "Click a task to edit notes!";
            taskNotes.value = "";
        }
        saveData();
    }
}, false);


function saveData() {
    localStorage.setItem("tasks", listContainer.innerHTML);
    if (taskTitle.textContent && taskTitle.textContent !== "Click a task to edit notes!") {
        localStorage.setItem(taskTitle.textContent, taskNotes.value);
    }
}


function showlist() {
    listContainer.innerHTML = localStorage.getItem("tasks") || "";

    
    document.querySelectorAll("#listcontainer li").forEach(li => {
        let taskName = li.getAttribute("data-task");
        if (!taskName) return; 

        let deleteBtn = document.createElement("span");
        deleteBtn.innerHTML = "\u00d7";
        li.appendChild(deleteBtn);

        let openNotes = document.createElement("button");
        openNotes.textContent = "notes";
        li.appendChild(openNotes);
    });
}

taskNotes.addEventListener("input", function() {
    if (taskTitle.textContent && taskTitle.textContent !== "Click a task to edit notes!") {
        localStorage.setItem(taskTitle.textContent, taskNotes.value);
    }
});

showlist();
