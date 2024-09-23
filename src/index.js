import "./styles.css";

let myTodo = [];
let anotherProject = [];
let myId = "0";
let editValue = 0;
let editId = 0;
const todoOne = new Todo("Grocery Shop", "Go to the store for groceries", "2025-12-09", "High", "");
const todoTwo = new Todo("Beat this videogame", "Bought a new game 2 weeks ago that I want to finish", "2024-11-12", "Low", "");
const todoThree = new Todo("Find a new job", "I need more money so I want to find a new job", "2025-04-17", "High", "");
const todoFour = new Todo("Fantasy football draft", "Need to prepare for my fantasy football draft next year", "2025-09-06", "Low", "");
const todoFive = new Todo("Repair wall", "Fix the wall I accidentally put a hole in", "2025-03-06", "High", "");
myTodo.push(todoOne, todoTwo, todoThree, todoFour);
anotherProject.push(todoFive);



function Todo(title, description, date, priority, notes) {
    this.title = title;
    this.description = description;
    this.date = date;
    this.priority = priority;
    this.notes = notes;
}

let myProjects = [];
const projectOne = new Project("My Todo", myTodo);
const projectTwo = new Project("Another Project", anotherProject);
myProjects.push(projectOne, projectTwo);
let currentProject = myProjects[0];

loadTodosFromLocalStorage()
loadProjectsFromLocalStorage()
displayTodo(currentProject);


function Project(name, items) {
    this.name = name;
    this.items = items;
}
seleectProject(myProjects, myId);

function displayTodo(list) {
    eraseTodo();
    for (let i=0; i < list.length; i++) {
        let task = document.querySelector(".task");
        const newTodo = document.createElement("newTodo");
        newTodo.classList.add("eachContainer");
        newTodo.innerText = `
        Title: ${list[i].title}
        Description: ${list[i].description} 
        Date: ${list[i].date} 
        Priority: ${list[i].priority}
        Notes: ${list[i].notes}`;
        newTodo.style.cssText = "border: solid; border-radius: 15px; line-height: 30px; padding: 20px; font-size: 20px; margin-right: 20px";
        /*make button to edit task*/ 
        let editTask = document.createElement("editTask");
        editTask.dataset.id = i;
        editTask.innerText = "Edit";
        editTask.style.cssText = "background-color: black; color:white; text-align:center; padding:13px 15px 12px 15px; width:60px; height:20px; border-radius: 15px; position: relative; top: 80px; left: 77%";
        editTask.addEventListener("click", function () {
            edit(myProjects, editTask.dataset.id);
        });
        /*make button to delete task*/ 
        let removeTask = document.createElement("removeTask");
        removeTask.dataset.id = i;
        removeTask.innerText = "Remove";
        removeTask.style.cssText = "background-color: black; color:white; text-align:center; padding:13px; width:60px; height:20px; border-radius: 15px; position: relative; top: 80px; left: 78%";
        removeTask.addEventListener("click", function () {
            clearTask(myProjects, removeTask.dataset.id);
        });
        task.appendChild(editTask);
        task.appendChild(removeTask);
        task.appendChild(newTodo);

    }
}

const form = document.querySelector('.form-container');                    
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Access and log the values
    const title = form.elements.title.value;
    const description = form.elements.description.value;
    const date = form.elements.date.value;
    const priority = form.elements.priority.value;
    const notes = form.elements.notes.value;
    const todo = new Todo(title, description, date, priority, notes);
    /*If statement to add a new project if it's not being edited*/
    if (editValue == 0) {
        myProjects[myId].items.push(todo); 
        displayTodo(myProjects[myId].items);
    } else {
        myProjects[myId].items[editId] = todo;
    }
    saveProjectToLocalStorage();
    displayTodo(myProjects[myId].items);
    togglePopup();
});

function displayProjects(myProjects, projectId) {
    eraseProjects();
    for (let j=0; j < myProjects.length; j++) {
        let project = document.querySelector(".project");
        const newProject = document.createElement("newProject");
        newProject.dataset.id = j;
        newProject.innerText = `${myProjects[j].name}`;
        /*Make button to remove project*/
        let removeProject = document.createElement("removeProject");
        removeProject.dataset.id = j;
        removeProject.innerText = "Remove";
        removeProject.style.cssText = "background-color: black; color:white; text-align:center; font-size:.7rem; font-weight:bold; padding:15px; width:2.2rem; height:1rem; border-radius: 15px; position: relative; top: 1rem";
        removeProject.addEventListener("click", function () {
            clearProject(myProjects, removeProject.dataset.id);
        });
        newProject.addEventListener("click", function () {
            seleectProject(myProjects, newProject.dataset.id);
        })
        /*Highlight the selected project*/
        if (j == projectId) {
            project.appendChild(newProject);
            project.appendChild(removeProject);
            newProject.style.cssText = "background-color: yellow; color:black; text-align:center; margin:.5rem 2rem; padding:1rem 2rem 2rem 2rem; width:3.5rem; height:1rem; border-radius: 15px; position: relative; font-size: 1rem;";
        } else {
            newProject.style.cssText = "background-color: black; color:white; margin:.5rem 2rem; text-align:center; justify-text: center; padding:1rem 2rem 2rem 2rem; width:3.5rem; height:1rem; border-radius: 15px; position: relative; font-size: 15px";
            project.appendChild(newProject);
            project.appendChild(removeProject);
        }
        
    }
}

function eraseProjects() {
    document.querySelectorAll('newProject').forEach(e => e.remove());
    document.querySelectorAll('removeProject').forEach(e => e.remove());
}


function eraseTodo() {
    document.querySelectorAll('newTodo').forEach(e => e.remove());
    document.querySelectorAll('editTask').forEach(e => e.remove());
    document.querySelectorAll('removeTask').forEach(e => e.remove());
}

function clearTask(myProjects, a) {
    let clearTask = myProjects[myId].items.splice(a,1);
    saveTodoToLocalStorage();
    displayTodo(myProjects[myId].items);
 }

 function clearProject(myProjects, a) {
    let myAnswer = confirm("Are you sure you want to remove this project?");
    if (myAnswer === true) {
        let clearProject = myProjects.splice(a,1);
        saveProjectToLocalStorage();
        if (myProjects.length > 0) {
            seleectProject(myProjects,0); 
        } else {
            displayTodo(myProjects);
            displayProjects(myProjects);
        }
    }
 }

function edit(myProjects, projectId) {
    var field = document.getElementById(title, description, date, priority, notes);
    title.value = myProjects[myId].items[projectId].title;
    description.value = myProjects[myId].items[projectId].description;
    date.value = myProjects[myId].items[projectId].date;
    priority.value = myProjects[myId].items[projectId].priority;
    notes.value = myProjects[myId].items[projectId].notes;
    editId = projectId;
    editValue = 1;
    togglePopup();
}

let addTask = document.querySelector(".btnOpenPopup");
addTask.addEventListener("click", function () {
    if (myProjects.length > 0) {
        title.value = "";
        description.value = "";
        date.value = "";
        priority.value = "Low";
        notes.value = "";
        editValue = 0;
        togglePopup(); 
    } else {
        alert("Make a project before adding tasks!");
    }
});

let closePopup = document.querySelector(".btnClosePopup");
closePopup.addEventListener("click", function () {
    togglePopup();
});

function togglePopup() {
    const overlay = document.getElementById('popupOverlay');
    overlay.classList.toggle('show');
}

function seleectProject(myProjects, projectId) {
    myId = projectId;
    displayTodo(myProjects[projectId].items);
    displayProjects(myProjects, projectId);
}

let addProject = document.querySelector(".newProject");
addProject.addEventListener("click", function () {
    toggleProject();
});



const projectForm = document.querySelector('.projectContainer');                    
projectForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Access and log the values
    const thisProject = projectForm.elements.addProject.value;
    let projectItems = [];
    const projectThree = new Project(thisProject, projectItems);
    myProjects.push(projectThree);
    myId = myProjects.length-1;
    saveProjectToLocalStorage();
    seleectProject(myProjects, myId);
    toggleProject();
});

function toggleProject() {
    const overlay = document.getElementById('projectOverlay');
    overlay.classList.toggle('show');
}

let closeProject = document.querySelector(".projectClose");
closeProject.addEventListener("click", function () {
    toggleProject();
});

/*Store to local storage*/
function saveTodoToLocalStorage() {
    localStorage.setItem("myTodo", JSON.stringify(myTodo));
}
function loadTodosFromLocalStorage() {
    const storedTasks = JSON.parse(localStorage.getItem("myTodo"));
    if (storedTasks) {
        myTodo.length = 0;
        myTodo.push(...storedTasks);
    }
}

function saveProjectToLocalStorage() {
    localStorage.setItem("myProjects", JSON.stringify(myProjects));
}

function loadProjectsFromLocalStorage() {
    const storedProject = JSON.parse(localStorage.getItem("myProjects"));
    if (storedProject) {
        myProjects.length = 0;
        myProjects.push(...storedProject);
    }
}