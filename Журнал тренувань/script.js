document.getElementById("workout-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const exercise = document.getElementById("exercise").value;
    const duration = document.getElementById("duration").value;
    const calories = document.getElementById("calories").value;

    const time = new Date().toLocaleString(); // Автоматично отримуємо поточний час

    addWorkout(exercise, duration, calories, time);
    document.getElementById("workout-form").reset();
});

document.getElementById("save-about").addEventListener("click", function () {
    const aboutText = document.getElementById("about-text").value;
    localStorage.setItem("aboutMe", aboutText); // Зберігаємо текст в локальному сховищі
});

// Функція для додавання тренування
function addWorkout(exercise, duration, calories, time, completed = false) {
    const workoutList = document.getElementById("workout-list");
    const li = document.createElement("li");

    li.innerHTML = `${exercise} - ${duration} хв - ${calories} кал - ${time}`;

    // Додаємо кнопку для відмітки виконаного
    const completeButton = document.createElement("button");
    completeButton.textContent = completed ? "Виконано" : "Виконати";
    completeButton.className = completed ? "complete" : "";

    if (completed) {
        li.style.textDecoration = "line-through"; // Якщо виконано, закреслюємо текст
        completeButton.disabled = true; // Вимикаємо кнопку
    }

    completeButton.addEventListener("click", function () {
        li.style.textDecoration = "line-through"; // Перетворюємо текст на закреслений
        completeButton.disabled = true; // Вимикаємо кнопку
        completeButton.textContent = "Виконано"; // Змінюємо текст кнопки
        saveToLocalStorage(); // Зберігаємо зміни
    });

    // Додаємо кнопку для видалення
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Видалити";
    deleteButton.className = "delete";
    deleteButton.addEventListener("click", function () {
        workoutList.removeChild(li); // Видаляємо завдання зі списку
        saveToLocalStorage(); // Оновлюємо локальне сховище
    });

    li.appendChild(completeButton);
    li.appendChild(deleteButton); // Додаємо кнопку видалення до елемента списку
    workoutList.appendChild(li);
    saveToLocalStorage();
}

// Функція для збереження тренувань у локальному сховищі
function saveToLocalStorage() {
    const workouts = [];
    const workoutList = document.getElementById("workout-list").children;

    for (let i = 0; i < workoutList.length; i++) {
        const workoutText = workoutList[i].childNodes[0].textContent;
        const completed = workoutList[i].childNodes[1].textContent === "Виконано"; // Додаємо перевірку на виконане
        workouts.push({ text: workoutText, completed: completed }); // Додаємо стан виконання
    }

    localStorage.setItem("workouts", JSON.stringify(workouts)); // Зберігаємо тренування
}

// Завантажуємо тренування з локального сховища
function loadFromLocalStorage() {
    const workouts = JSON.parse(localStorage.getItem("workouts"));

    if (workouts) {
        workouts.forEach(workout => {
            const [exercise, duration, calories, time] = workout.text.split(" - ");
            addWorkout(exercise, duration, calories, time, workout.completed); // Передаємо статус виконання
        });
    }
}

// Завантажуємо інформацію про себе з локального сховища
function loadAboutMe() {
    const aboutText = localStorage.getItem("aboutMe");
    if (aboutText) {
        document.getElementById("about-text").value = aboutText; // Заповнюємо текстове поле
    }
}

document.addEventListener("DOMContentLoaded", function() {
    loadFromLocalStorage();
    loadAboutMe(); // Завантажуємо інформацію "Про себе"
});








