// script.js

// Profile Section
document.getElementById("save-profile").addEventListener("click", function () {
  const name = document.getElementById("profile-name").value;
  if (name) {
    document.getElementById("welcome-message").innerText = `Welcome, ${name}! Stay on track!`;
    localStorage.setItem("profileName", name);
  }
});

// Load profile on page load
window.addEventListener("load", function () {
  const storedName = localStorage.getItem("profileName");
  if (storedName) {
    document.getElementById("welcome-message").innerText = `Welcome back, ${storedName}! Let's stay productive.`;
  }

  // Display current date and time
  const dateTimeElem = document.getElementById("current-date-time");
  setInterval(() => {
    const now = new Date();
    dateTimeElem.innerText = `Today is ${now.toLocaleDateString()} and the time is ${now.toLocaleTimeString()}`;
  }, 1000);
});

// Habit Section
document.getElementById("add-habit").addEventListener("click", function () {
  const habit = document.getElementById("habit-input").value;
  if (habit) {
    addHabit(habit);
    document.getElementById("habit-input").value = "";
  }
});

function addHabit(habit) {
  const habitList = document.getElementById("habit-list");

  const habitItem = document.createElement("li");
  const habitText = document.createElement("span");
  habitText.innerText = habit;

  const streak = document.createElement("span");
  streak.innerText = "Streak: 0";
  streak.style.marginLeft = "10px";

  const markComplete = document.createElement("button");
  markComplete.innerText = "✔️";
  markComplete.addEventListener("click", function () {
    const currentStreak = parseInt(streak.innerText.split(": ")[1]);
    streak.innerText = `Streak: ${currentStreak + 1}`;
    displayQuote(habit, streak);
  });

  const removeHabit = document.createElement("button");
  removeHabit.innerText = "🗑️";
  removeHabit.addEventListener("click", function () {
    habitList.removeChild(habitItem);
  });

  habitItem.appendChild(habitText);
  habitItem.appendChild(streak);
  habitItem.appendChild(markComplete);
  habitItem.appendChild(removeHabit);
  habitList.appendChild(habitItem);
}

function displayQuote(habit, streakElem) {
  const quotes = [
    "Keep going, you're doing great!",
    "Habits make the master!",
    "Stay consistent, success is near!",
    "Every step counts!",
    `You're nailing your habit: ${habit}!`,
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  const streakMessage = document.createElement("p");
  streakMessage.innerText = `Motivation: ${randomQuote}`;
  streakElem.parentNode.appendChild(streakMessage);

  setTimeout(() => {
    streakMessage.remove();
  }, 5000);
}