

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




// Function to show the mood popup if it hasn't been shown today
function checkAndShowMoodPopup() {
    const lastShownDate = localStorage.getItem('moodPopupShownDate');
    const today = new Date().toDateString();

    if (lastShownDate !== today) {
        document.getElementById('mood-popup').classList.add('show');
        localStorage.setItem('moodPopupShownDate', today);
    }
}

window.onload = function () {
    checkAndShowMoodPopup();

    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }

    loadTasksFromLocalStorage();
};

function submitMood() {
    let mood = document.getElementById('mood-select').value;
    console.log('mood selected:', mood);
    document.getElementById('mood-popup').classList.remove('show');
    showQuote(mood);
}

function showQuote(mood) {
    let quoteText;
    switch (mood) {
        case 'happy':
            quoteText = "Keep shining and spreading your happiness!";
            break;
        case 'sad':
            quoteText = "It's okay to feel sad. Things will get better. Sending love.";
            break;
        case 'angry':
            quoteText = "Take a deep breath and keep moving!";
            break;
        case 'confused':
            quoteText = "Clarity will come. Just give your head some time!";
            break;
        case 'silly':
            quoteText = "Embrace your silliness and enjoy the moment!";
            break;
        default:
            quoteText = "Have a great day!";
    }

    document.getElementById('quote-text').innerText = quoteText;
    document.getElementById('quote-popup').classList.add('show');
}

function closeQuote() {
    document.getElementById('quote-popup').classList.remove('show');
}

function addTask() {
    var taskInput = document.getElementById('new-task');
    var taskTimeInput = document.getElementById('task-time');
    var taskText = taskInput.value.trim();
    var taskTime = taskTimeInput.value;

    if (taskText !== "" && taskTime !== "") {
        var taskList = document.getElementById('task-list');
        var listItem = document.createElement('li');

        var p = document.querySelector("p");
        if (p) {
            p.innerHTML = "Task added successfully!";
        } else {
            p = document.createElement('p');
            p.innerHTML = "Task added successfully!";
            document.body.appendChild(p);
        }

        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.onchange = function () {
            if (checkbox.checked) {
                listItem.classList.add('completed');
            } else {
                listItem.classList.remove('completed');
            }
        };

        var taskLabel = document.createElement('span');
        taskLabel.textContent = taskText + " at " + taskTime;

        var removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = function () {
            removeTask(listItem);
        };

        listItem.setAttribute('data-task-text', taskText); // Store the original task text
        listItem.setAttribute('data-task-time', taskTime); // Store the task time
        listItem.appendChild(checkbox);
        listItem.appendChild(taskLabel);
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        taskInput.value = "";
        taskTimeInput.value = "";
        updateTaskNumbers();

        // Set up notification
        setTaskNotification(taskText, taskTime);

        // Add to recent tasks
        addToRecentTasks(taskText, taskTime, false);

        // Save to localStorage
        saveTasksToLocalStorage();
    }
}

function removeTask(listItem) {
    listItem.parentNode.removeChild(listItem);
    updateTaskNumbers();
    saveTasksToLocalStorage();
}

function updateTaskNumbers() {
    var taskList = document.getElementById('task-list');
    var tasks = taskList.getElementsByTagName('li');
    for (var i = 0; i < tasks.length; i++) {
        var taskLabel = tasks[i].getElementsByTagName('span')[0];
        var originalText = tasks[i].getAttribute('data-task-text'); // Get the original task text
        var taskTime = tasks[i].getAttribute('data-task-time'); // Get the task time
        taskLabel.textContent = (i + 1) + ". " + originalText + " at " + taskTime; // Update with original task text and time
    }
}

function setTaskNotification(taskText, taskTime) {
    var now = new Date();
    var [hours, minutes] = taskTime.split(':').map(Number);
    var taskDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);

    // Calculate the time difference in milliseconds
    var timeDifference = taskDate.getTime() - now.getTime() - 10 * 60 * 1000; // 10 minutes before the task time

    if (timeDifference > 0) {
        setTimeout(() => {
            alert(`Reminder: Your task "${taskText}" is in 10 minutes!`);
        }, timeDifference);
    }
}

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
    taskLabel.textContent = taskText + " at " + taskTime;

    listItem.appendChild(checkbox);
    listItem.appendChild(taskLabel);
    recentTasks.appendChild(listItem);

    // Set auto-delete after two days
    setTimeout(() => {
        listItem.remove();
        saveTasksToLocalStorage();
    }, 2 * 24 * 60 * 60 * 1000);

    // Add click event to enable checkboxes for deletion
    listItem.addEventListener('click', () => {
        const checkboxes = recentTasks.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.disabled = false;
            document.getElementById('delete-selected-btn').style.display = 'block';
        });
    });
}

function deleteSelectedTasks() {
    const checkboxes = document.querySelectorAll('#recent-tasks input[type="checkbox"]:checked');
    checkboxes.forEach(checkbox => {
        const listItem = checkbox.parentElement;
        listItem.remove();
    });
    saveTasksToLocalStorage();
    document.getElementById('delete-selected-btn').style.display = 'none';
}

function saveTasksToLocalStorage() {
    const tasks = [];
    const taskItems = document.querySelectorAll('#task-list li');
    taskItems.forEach(item => {
        const taskText = item.getAttribute('data-task-text');
        const taskTime = item.getAttribute('data-task-time');
        const completed = item.classList.contains('completed');
        tasks.push({ taskText, taskTime, completed });
    });

    const recentTaskItems = document.querySelectorAll('#recent-tasks li');
    recentTaskItems.forEach(item => {
        const taskText = item.getAttribute('data-task-text');
        const taskTime = item.getAttribute('data-task-time');
        const completed = item.querySelector('input[type="checkbox"]').checked;
        tasks.push({ taskText, taskTime, completed });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addToRecentTasks(task.taskText, task.taskTime, task.completed);

        const taskList = document.getElementById('task-list');
        const listItem = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.onchange = function () {
            if (checkbox.checked) {
                listItem.classList.add('completed');
            } else {
                listItem.classList.remove('completed');
            }
            saveTasksToLocalStorage();
        };

        const taskLabel = document.createElement('span');
        taskLabel.textContent = task.taskText + " at " + task.taskTime;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = function () {
            removeTask(listItem);
        };

        listItem.setAttribute('data-task-text', task.taskText);
        listItem.setAttribute('data-task-time', task.taskTime);
        listItem.appendChild(checkbox);
        listItem.appendChild(taskLabel);
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);
    });
    updateTaskNumbers();
}
