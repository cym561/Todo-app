// Display the current date and time
let dateElement = document.getElementById('date');
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

// Array of mood quotes
const moodQuotes = [
    "Remember that happiness is a way of travel, not a destination.",
    "The best way to predict the future is to create it.",
    "Every day may not be good, but there's something good in every day.",
    "The only limit to our realization of tomorrow will be our doubts of today.",
    "The greatest glory in living lies not in never falling, but in rising every time we fall."
    // Add more quotes as needed
];

// Function to show the mood popup if it hasn't been shown today
function checkAndShowMoodPopup() {
    const lastShownDate = localStorage.getItem('moodPopupShownDate');
    const today = new Date().toDateString();

    if (lastShownDate !== today) {
        const randomQuote = moodQuotes[Math.floor(Math.random() * moodQuotes.length)];
        document.getElementById('mood-quote').textContent = randomQuote;

        document.getElementById('mood-popup').style.display = 'block';
        localStorage.setItem('moodPopupShownDate', today);
    }
}

// Function to show a specific page
function showPage(page) {
    const pages = ['home', 'profile', 'settings']; // List of all possible pages
    pages.forEach(p => {
        document.getElementById(`${p}-page`).style.display = page === p ? 'block' : 'none';
    });
}

// Function to open settings page
function openSettings() {
    showPage('settings');
}

// Function to close settings page
function closeSettings() {
    showPage('home'); // Assuming closing settings returns to home page
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

// Add task to the task list and save to localStorage
function addTaskToList(taskText, taskTime) {
    const taskList = document.getElementById('task-list');
    const listItem = createTaskElement(taskText, taskTime);
    taskList.appendChild(listItem);

    updateTaskNumbers();
    setTaskNotification(taskText, taskTime);
    addToRecentTasks(taskText, taskTime, false);
    saveTasksToLocalStorage(); // Save tasks to localStorage after adding
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
    taskLabel.textContent = `${taskText}  ${taskTime}`;

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
        taskLabel.textContent = `${i + 1}. ${originalText}  ${taskTime}`;
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

    const taskLabel = document.createElement('span');
    taskLabel.textContent = `${taskText} at ${taskTime}`;

    listItem.appendChild(checkbox);
    listItem.appendChild(taskLabel);
    recentTasks.appendChild(listItem);

    listItem.addEventListener('click', () => {
        recentTasks.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.disabled = false;
        });
        document.getElementById('delete-selected-btn').style.display = 'block';
    });
}

// Delete selected tasks from the "Recent" section and localStorage
function deleteSelectedTasks() {
    const checkboxes = document.querySelectorAll('#recent-tasks input[type="checkbox"]:checked');
    checkboxes.forEach(checkbox => {
        const listItem = checkbox.parentElement;
        listItem.remove();
        removeFromLocalStorage(listItem.getAttribute('data-task-text'), listItem.getAttribute('data-task-time'));
    });
    document.getElementById('delete-selected-btn').style.display = 'none';
}

// Remove task from localStorage
function removeFromLocalStorage(taskText, taskTime) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.filter(task => !(task.taskText === taskText && task.taskTime === taskTime));
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
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

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage on page load
function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTaskToList(task.taskText, task.taskTime);
        addToRecentTasks(task.taskText, task.taskTime, task.completed);
    });
}
