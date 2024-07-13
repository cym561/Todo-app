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

  function addTask() {
    let taskInput = document.getElementById('new-task');
    let taskText = taskInput.value.trim();
    if (taskText !== "") {
        let taskList = document.getElementById('task-list');
        let listItem = document.createElement('li');
        listItem.innerHTML = taskText + '<button onclick="removeTask(this)">Remove </button>'
        
        taskList.appendChild(listItem);
        taskInput.value = "";


    }
  }

  function removeTask(button) {
    var listItem = button.parentNode;

    listItem.parentNode.removeChild(listItem);
  }

  function completeTask(button) {
    var listItem = button.parentNode;
    var taskText = listItem.firstChild.textContent;
    alert('Task completed: ' + taskText);
  }










