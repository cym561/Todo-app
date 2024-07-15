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

function showPage(page) {
    document.getElementById('todo-app').style.display = page === 'home' ? 'block' : 'none';
    document.getElementById('settings-page').style.display = page === 'settings' ? 'block' : 'none';
}

function goToSettings() {
    showPage('settings');
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

