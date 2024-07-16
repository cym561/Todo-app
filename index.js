let dateElement = document.getElementById('date');

// Display the current date and time
setInterval(() => {
    let now = new Date();
    let formattedDateTime = new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        month: 'short',
        year: 'numeric',
        day: 'numeric',
    }).format(now);
    dateElement.textContent = formattedDateTime;
}, 1000);

// Function to show the mood popup if it hasn't been shown today
function checkAndShowMoodPopup() {
    const lastShownDate = localStorage.getItem('moodPopupShownDate');
    const today = new Date().toDateString();

    if (lastShownDate !== today) {
        document.getElementById('mood-popup').style.display = 'block';
        localStorage.setItem('moodPopupShownDate', today);
    }
}

 function showPage(page) {
    document.getElementById('todo-app').style.display = page === 'home' ?
    'block' : 'none';


    document.getElementById('profile-page').style.display = page === 'profile' ?
    'block' : 'none';
 }

function goToProfile() {
  showPage('profile');
}

 function goHome(){
    showPage('home');
 }

/* function showPage(page) {
    const homePage = document.getElementById('todo-app');
    const tasksPage = document.getElementById('profile-page');

    if (page === 'home') {
        homePage.style.display = 'block';
        tasksPage.style.display = 'none';
    } else if (page === 'tasks') {
        homePage.style.display = 'none';
        tasksPage.style.display = 'block';
        loadTasksFromLocalStorage(); // Load tasks when switching to tasks page
    }
}*/

function openSettings() {
    const settingsPage = document.getElementById('settings-page');
    settingsPage.classList.add("open"); // Ensure 'show' class is defined in CSS for visibility
}

function closeSettings() {
    const settingsPage = document.getElementById('settings-page');
    settingsPage.classList.remove("open");
}


// Function to change the theme
function changeTheme() {
    const selectedTheme = document.querySelector('#theme-select').value;
    document.body.className = selectedTheme;
}

// Function to change the font
function changeFont() {
    const selectedFont = document.querySelector('#font-select').value;
    document.body.style.fontFamily = selectedFont;
}

// Initialize tasks and notifications
window.onload = function () {
    checkAndShowMoodPopup();

    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }

    loadTasksFromLocalStorage();
};

// Add task to the task list
function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskTimeInput = document.getElementById('task-time');
    const taskText = taskInput.value.trim();
    const taskTime = taskTimeInput.value;

    if (taskText && taskTime) {
        addTaskToList(taskText, taskTime);
        taskInput.value = "";
        taskTimeInput.value = "";
        

    }
}




function addTaskToList(taskText, taskTime) {
    const taskList = document.getElementById('task-list');
    const listItem = createTaskElement(taskText, taskTime);
    taskList.appendChild(listItem);
    

    
    updateTaskNumbers();
    setTaskNotification(taskText, taskTime);
    addToRecentTasks(taskText, taskTime, false);
    saveTasksToLocalStorage();
}

// Create task list item
function createTaskElement(taskText, taskTime) {
    const listItem = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.onchange = function () {
        if (checkbox.checked) {
            listItem.classList.add('completed');
        } else {
            listItem.classList.remove('completed');
        }
        saveTasksToLocalStorage();
    };

    const taskLabel = document.createElement('span');
    const formattedTime = formatTimeWithAMPM(taskTime);
    taskLabel.textContent = `${taskText} at ${formattedTime}`;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.onclick = function () {
        removeTask(listItem);
    };

    listItem.setAttribute('data-task-text', taskText);
    listItem.setAttribute('data-task-time', taskTime);
    listItem.appendChild(checkbox);
    listItem.appendChild(taskLabel);
    listItem.appendChild(removeButton);
    return listItem;
}


// Remove task from list
function removeTask(listItem) {
    listItem.remove();
    updateTaskNumbers();
    saveTasksToLocalStorage();
}

// Update task numbers in list
function updateTaskNumbers() {
    const taskList = document.getElementById('task-list');
    const tasks = taskList.getElementsByTagName('li');
    for (let i = 0; i < tasks.length; i++) {
        const taskLabel = tasks[i].getElementsByTagName('span')[0];
        const originalText = tasks[i].getAttribute('data-task-text');
        const taskTime = tasks[i].getAttribute('data-task-time');
        taskLabel.textContent = `${i + 1}. ${originalText} at ${taskTime}`;
    }
}

// Set a notification for the task
function setTaskNotification(taskText, taskTime) {
    const now = new Date();
    const [hours, minutes] = taskTime.split(':').map(Number);
    const taskDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);

    const timeDifference = taskDate.getTime() - now.getTime() - 10 * 60 * 1000; // 10 minutes before the task time

    if (timeDifference > 0) {
        setTimeout(() => {
            if (Notification.permission === "granted") {
                new Notification(`Reminder: Your task "${taskText}" is in 10 minutes!`);
            } else {
                alert(`Reminder: Your task "${taskText}" is in 10 minutes!`);
            }
        }, timeDifference);
    }
}

// Add task to the "Recent" section
function addToRecentTasks(taskText, taskTime, completed) {
    const recentTasks = document.getElementById('recent-tasks');
    const listItem = document.createElement('li');
    listItem.setAttribute('data-task-text', taskText);
    listItem.setAttribute('data-task-time', taskTime);
    listItem.classList.add('recent-task-item');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;
    checkbox.disabled = true;

    const taskLabel = document.createElement('span');
    taskLabel.textContent = `${taskText} at ${taskTime}`;

    listItem.appendChild(checkbox);
    listItem.appendChild(taskLabel);
    recentTasks.appendChild(listItem);

    setTimeout(() => {
        listItem.remove();
        saveTasksToLocalStorage();
    }, 2 * 24 * 60 * 60 * 1000); // Auto-delete after two days

    listItem.addEventListener('click', () => {
        recentTasks.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.disabled = false;
        });
        document.getElementById('delete-selected-btn').style.display = 'block';
    });
}

// Delete selected tasks
function deleteSelectedTasks() {
    const checkboxes = document.querySelectorAll('#recent-tasks input[type="checkbox"]:checked');
    checkboxes.forEach(checkbox => {
        const listItem = checkbox.parentElement;
        listItem.remove();
    });
    saveTasksToLocalStorage();
    document.getElementById('delete-selected-btn').style.display = 'none';
}

// Save tasks to localStorage
function saveTasksToLocalStorage() {
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach(item => {
        const taskText = item.getAttribute('data-task-text');
        const taskTime = item.getAttribute('data-task-time');
        const completed = item.classList.contains('completed');
        tasks.push({ taskText, taskTime, completed });
    });

    document.querySelectorAll('#recent-tasks li').forEach(item => {
        const taskText = item.getAttribute('data-task-text');
        const taskTime = item.getAttribute('data-task-time');
        const completed = item.querySelector('input[type="checkbox"]').checked;
        tasks.push({ taskText, taskTime, completed });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTaskToList(task.taskText, task.taskTime);
        addToRecentTasks(task.taskText, task.taskTime, task.completed);
    });
}
