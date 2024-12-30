let timer; 
let isBreak = false; 
let timeRemaining; 
let isPaused = false; 

function startTimer() {
    const studyMinutes = parseInt(document.getElementById('study-minutes').value) || 0;
    const studySeconds = parseInt(document.getElementById('study-seconds').value) || 0;
    const breakMinutes = parseInt(document.getElementById('break-minutes').value) || 0;
    const breakSeconds = parseInt(document.getElementById('break-seconds').value) || 0;

    const studyTime = (studyMinutes * 60) + studySeconds;
    const breakTime = (breakMinutes * 60) + breakSeconds;

    
    if (studyTime === 0 && breakTime === 0) {
        alert("Please set study or break time.");
        return; 
    }

    timeRemaining = isBreak ? breakTime : studyTime;

    clearInterval(timer);
    isPaused = false; 
    document.getElementById('pause-button').style.display = 'inline'; 
    document.getElementById('reset-button').style.display = 'inline'; 

    timer = setInterval(() => {
        if (!isPaused) { 
            const minutes = Math.floor(timeRemaining / 60);
            const seconds = timeRemaining % 60;
            document.getElementById('timer-display').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            if (timeRemaining === 0) {
                isBreak = !isBreak;
                clearInterval(timer);
                startTimer(); 
            }
            timeRemaining--;
        }
    }, 1000);
}

function pauseTimer() {
    isPaused = true; 
    document.getElementById('pause-button').style.display = 'none'; 
}

function resetTimer() {
    clearInterval(timer);
    timeRemaining = 0; 
    document.getElementById('timer-display').textContent = '00:00';
    document.getElementById('pause-button').style.display = 'none';
    document.getElementById('reset-button').style
}

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskList = document.getElementById('task-list');

    if (taskInput.value.trim() !== '') {
        const li = document.createElement('li');
        li.textContent = taskInput.value;

        const markDoneButton = document.createElement('button');
        markDoneButton.textContent = 'Done';
        markDoneButton.className = 'done-button';
        markDoneButton.onclick = () => {
            li.remove();
            saveTasks();
        };

        li.appendChild(markDoneButton);
        taskList.appendChild(li);
        taskInput.value = ''; 

        saveTasks(); 
    }
}

function saveTasks() {
    const taskList = document.getElementById('task-list');
    const tasks = [];
    taskList.querySelectorAll('li').forEach(li => {
        tasks.push(li.firstChild.textContent.trim());
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const taskList = document.getElementById('task-list');
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    taskList.innerHTML = ''; 
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task;

        const markDoneButton = document.createElement('button');
        markDoneButton.textContent = 'Done';
        markDoneButton.className = 'done-button';
        markDoneButton.onclick = () => {
            li.remove();
            saveTasks();
        };

        li.appendChild(markDoneButton);
        taskList.appendChild(li);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadTasks(); 

    
    const timerSection = document.getElementById('pomodoro');
    const timerLabel = document.createElement('div');
    timerLabel.id = 'timer-label';
    timerLabel.style.fontSize = '1.5rem';
    timerLabel.style.marginBottom = '10px';
    timerLabel.textContent = 'Pomodoro Timer';
    timerSection.insertBefore(timerLabel, timerSection.firstChild);
});

checkbox.addEventListener('change', () => {
    const taskTextElem = li.querySelector('.task-content span');
    taskTextElem.classList.toggle('done');
    saveTasks();
});

