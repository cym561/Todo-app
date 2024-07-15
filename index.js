window.onload = function () {
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
    var taskText = taskInput.value.trim();
    
    if (taskText !== "") {
        var taskList = document.getElementById('task-list');
        var listItem = document.createElement('li');

        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.onchange = function () {
            listItem.classList.toggle('completed', checkbox.checked);
        }

        var taskLabel = document.createElement('span');
        taskLabel.textContent = taskText;

        var removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = function () {
            removeTask(listItem);
        };

        listItem.appendChild(checkbox);
        listItem.appendChild(taskLabel);
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        taskInput.value = "";
        updateTaskNumbers();

        let p = document.querySelector("p");
        p.textContent = "Task added successfully!";
    } else {
        console.error("Task input is empty.");
    }
}

function removeTask(listItem) {
    listItem.parentNode.removeChild(listItem);
    updateTaskNumbers();
}

function updateTaskNumbers() {
    var taskList = document.getElementById('task-list');
    var tasks = taskList.getElementsByTagName('li');
    for (var i = 0; i < tasks.length; i++) {
        var taskLabel = tasks[i].getElementsByTagName('span')[0];
        taskLabel.textContent = (i + 1) + ". " + taskLabel.textContent.split('. ')[1];
    }
}

function showPage(page) {
    document.getElementById('todo-app').style.display = page === 'home' ? 'block' : 'none';
    document.getElementById('profile-page').style.display = page === 'profile' ? 'block' : 'none';
}

function goToProfile() {
    showPage('profile');
}

function goHome() {
    showPage('home');
}

const noteInput = document.getElementById('note-input');
const saveNoteBtn = document.getElementById('save-note-btn');
const noteList = document.getElementById('note-list');

const notes = localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : [];
notes.forEach((note) => {
    const noteElement = document.createElement('li');
    noteElement.textContent = note;
    noteList.appendChild(noteElement);
});

saveNoteBtn.addEventListener('click', () => {
    const note = noteInput.value;
    if (note.trim() !== '') {
        notes.push(note);
        localStorage.setItem('notes', JSON.stringify(notes));
        noteInput.value = '';
        const noteElement = document.createElement('li');
        noteElement.textContent = note;
        noteElement.addEventListener('click', showContextMenu);
        noteList.appendChild(noteElement);
    }
});

let longPressTimeout;

noteList.addEventListener('mousedown', (e) => {
    if (e.target.tagName === 'LI') {
        longPressTimeout = setTimeout(() => {
            showContextMenu(e);
        }, 2000);
    }
});

noteList.addEventListener('mouseup', () => {
    clearTimeout(longPressTimeout);
});

function showContextMenu(e) {
    const contextMenu = document.getElementById('note-context-menu');
    contextMenu.style.display = 'block';
    contextMenu.style.left = `${e.pageX}px`;
    contextMenu.style.top = `${e.pageY}px`;

    // Store the clicked note element for context menu actions
    contextMenu.currentNote = e.target;
}

function deleteNote() {
    const note = document.getElementById('note-context-menu').currentNote;
    const noteText = note.textContent;
    const index = notes.indexOf(noteText);
    if (index !== -1) {
        notes.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
        note.remove();
    }
    closeContextMenu();
}

function editNote() {
    const note = document.getElementById('note-context-menu').currentNote;
    note.contentEditable = true;
    note.focus();
    closeContextMenu();
}

function shareNote() {
    // Placeholder for sharing functionality
    alert('Note shared!');
    closeContextMenu();
}

function closeContextMenu() {
    const contextMenu = document.getElementById('note-context-menu');
    contextMenu.style.display = 'none';
}

function openSettings() {
    document.getElementById('settings-page').classList.add("open");
}

function closeSettings() {
    document.getElementById('settings-page').classList.remove("open");
}

const settingsPage = document.getElementById('settings-page');
settingsPage.addEventListener("touchstart", (e) => {
    const startX = e.touches[0].pageX;
    const startY = e.touches[0].pageY;

    settingsPage.addEventListener("touchmove", (e) => {
        const endX = e.touches[0].pageX;
        const endY = e.touches[0].pageY;
        const diffX = endX - startX;
        const diffY = endY - startY;

        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX > 50) {
                closeSettings();
            }
        }
    });
});

function changeTheme() {
    let theme = document.getElementById('theme-select').value;
    document.body.className = theme;
}

function changeFont() {
    let font = document.getElementById('font-select').value;
    document.body.style.fontFamily = font;
}

