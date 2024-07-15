/*window.onload = function () {
    document.getElementById('mood-popup').classList.add('show');

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
};
*/
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

// JavaScript for Settings Page
function openSettings() {
    document.getElementById('settings-page').style.display = 'flex';
}

function closeSettings() {
    document.getElementById('settings-page').style.display = 'none';
}

function changeTheme(theme) {
    document.body.className = theme;
}

function changeFont(font) {
    document.body.style.fontFamily = font;
}

// JavaScript for Home Page (New Task Popup)
function showAddTaskPopup() {
    // Show popup for adding a new task
    let popup = document.createElement('div');
    popup.classList.add('popup');
    popup.innerHTML = `
        <h2>Add New Task</h2>
        <input type="text" id="new-task-input" placeholder="Enter new task...">
        <button onclick="addTask()">Add Task</button>
        <button onclick="closeAddTaskPopup()">Close</button>
    `;
    document.body.appendChild(popup);
}

function closeAddTaskPopup() {
    // Close the add task popup
    let popup = document.querySelector('.popup');
    if (popup) {
        popup.remove();
    }
}

function addTask() {
    // Add functionality to add a task
    let taskInput = document.getElementById('new-task-input').value.trim();
    if (taskInput !== '') {
        // Perform task addition logic here
        console.log('Adding task:', taskInput);
        closeAddTaskPopup();
    }
}

// Date display
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
