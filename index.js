  let dateElement = document.getElementById('date');

   setInterval(() => {
    let now = new Date();
    let formattedDateTime = new Intl.DateTimeFormat('en-US',{

        weekday: 'short',
        month: 'short',
        year: 'numeric',
        day: 'numeric',
    }).format(now);
    
    dateElement.textContent = formattedDateTime;
   }, 1000)

   window.onload = function () {
    document.getElementById('mood-popup').classList.add('show');

   }

   function submitMood() {
    let mood = document.getElementById('mood-select').value;
    console.log('mood selected:', mood);
    document.getElementById('mood-popup').classList.remove('show');
   showQuote(mood);
}

function showQuote(mood) {
    let quoteText;
    switch (mood) {
        case 'happy': quoteText = "Keep shining and spreading your happiness!";
            
            break;
    
        case 'sad': quoteText = "It's okay to feel sad.Things will get better. Sending love";
            
            break;
    
        case 'angry': quoteText = "Take a deep breath and keep moving!";
            
            break;
    
        case 'confused': quoteText = "Clarity will come. Just give your head some time!";
            
            break;
    
        case 'silly': quoteText = "Embrace your silliness and enjoy the moment!";
            
            break;
    
        default: quoteText = "Have a great day!";
        
    }

    document.getElementById('quote-text').innerText = quoteText;

    document.getElementById('quote-popup').classList.add('show');

}

function closeQuote() {
    document.getElementById('quote-popup').classList.remove('show');
}

 /*function addTask() {
    const newTask = document.getElementById("new-task").value;
    const taskList = document.getElementById("task-list");
    const newTaskListItem = document.createElement("li");
    newTaskListItem.textContent = newTask;
    taskList.appendChild(newTaskListItem);
    document.getElementById("new-task").value = ""; 
}*/

function showMyProfile() {
    document.getElementById("my-profile").style.display = "block";
}


  function addTask() {
    var taskInput = document.getElementById('new-task');
    var taskText = taskInput.value.trim();
    if (taskText !== "") {
        var taskList = document.getElementById('task-list');
        var listItem = document.createElement('li');
        
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.onchange = function() {
            if (checkbox.checked){
                listItem.classList.add('completed');
            } else{
                listItem.classList.remove('completed;')
            }
        }
        
        var taskLabel = document.createElement('span');
        taskLabel.textContent = taskText;



        let completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.onclick = function () {
            completeTask(listItem);
        };

        let removeButton = document.createElement('button')
        removeButton.textContent = 'Remove';
        removeButton.onclick = function () {
            removeTask(listItem);

    };

    listItem.appendChild(checkbox);
    listItem.appendChild(taskLabel);
    listItem.appendChild(removeButton);
    listItem.appendChild(listItem);
    
    taskInput.value = "";
    updateTaskNumbers();

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
        taskLabel.taskContent = (i + 1) + " " +taskLabel.textContent.split('.')[1];
        
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

  function goHome() {
    showPage('home');
  }

   function openSettings() {
       document.getElementById('settings-page').classList.add("open");
       
   }

   function closeSettings() {
       document.getElementById('settings-page').classList.remove("open");

   }

   const settingsPage = document.getElementById('settings-page');
    settingsPage.addEventListener("touchstart", (e) =>{
        const startX = e.touches[0].pageX;
        const startY = e.touches[0].pageY;

        settingsPage.addEventListener("touchmove", (e) =>{
            const endX = e.touches[0].pageX;
        const endY = e.touches[0].pageY;

        if (endX - startX > 50 && Math.abs(endY - startY) < 50) {
            closeSettings();
        }
        });
    });

    function closeSettings() {
        settingsPage.classList.remove("open");
        location.hash = "";
    }

   const themeSelect = document.getElementById('theme-select');
   function changeTheme() {
      const selectedTheme = themeSelect.value;
      document.body.classList.remove("green", "yellow", "grey",
       "blue",
        "light", "dark","purple"
      );
      document.body.classList.add(selectedTheme);
    
  }

  const fontSelect = document.getElementById('font-select');
  function changeFont() {
    const selectedFont = fontSelect.value;
    document.body.classList.remove("Arial", "Courier", "Georgia",
       "Times New Roman",
        "Courier New"
      );
      document.body.classList.add(selectedFont);
  }












