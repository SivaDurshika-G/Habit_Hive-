// script.js

const addBtn = document.getElementById("add-btn");
const habitInput = document.getElementById("habit-input");
const habitsList = document.getElementById("habits-list");

// Profile Logic
const saveProfileBtn = document.getElementById("save-profile-btn");
const profileNameInput = document.getElementById("profile-name");
const welcomeMsg = document.getElementById("welcome-msg");

// Store profile data
let profileName = localStorage.getItem("profileName");

// If profileName is found in localStorage, display it
if (profileName) {
  welcomeMsg.innerText = `Welcome, ${profileName}! Let's stay on track with your habits.`;
} else {
  welcomeMsg.innerText = "Please enter your name!";
}

// Save Profile
saveProfileBtn.addEventListener("click", () => {
  const name = profileNameInput.value.trim();
  if (name) {
    profileName = name;
    localStorage.setItem("profileName", profileName);
    welcomeMsg.innerText = `Welcome, ${profileName}! Let's stay on track with your habits.`;
  } else {
    alert("Please enter a valid name.");
  }
});

// Sample motivational quotes
const quotes = [
  "Believe in yourself and all that you are. 💪",
  "Success is the sum of small efforts repeated daily. 🌟",
  "Your habits define your future. 🕒",
  "Every day is a new opportunity to improve. 🌱",
  "Stay consistent, stay strong! 🚀",
];

// Store habits and their streaks
let habits = [];

// Add a new habit
addBtn.addEventListener("click", () => {
  const habitText = habitInput.value.trim();
  if (habitText === "") return alert("Please enter a habit!");

  const newHabit = {
    text: habitText,
    streak: 0,
  };

  habits.push(newHabit);
  habitInput.value = "";
  renderHabits();
});

// Render the list of habits
function renderHabits() {
  habitsList.innerHTML = "";
  habits.forEach((habit, index) => {
    const habitItem = document.createElement("div");
    habitItem.classList.add("habit-item");

    const habitText = document.createElement("p");
    habitText.innerText = `${habit.text} (🔥 Streak: ${habit.streak} days)`;

    const quote = document.createElement("span");
    quote.innerText = getRandomQuote();

    const streakBtn = document.createElement("button");
    streakBtn.innerText = "✔️ Mark Done";
    streakBtn.addEventListener("click", () => {
      habits[index].streak += 1;
      renderHabits();
    });

    habitItem.appendChild(habitText);
    habitItem.appendChild(quote);
    habitItem.appendChild(streakBtn);
    habitsList.appendChild(habitItem);
  });
}

// Get a random motivational quote
function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

// Notifications Section
const notifyBtn = document.getElementById("notify-btn");

notifyBtn.addEventListener("click", () => {
  if (!("Notification" in window)) {
    alert("Notifications are not supported by your browser.");
    return;
  }

  if (Notification.permission === "granted") {
    new Notification("🔔 Habit Hive Reminder", {
      body: "Stay on track with your habits today! 🚀",
    });
  } else if (Notification.permission === "default") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        new Notification("🔔 Habit Hive Reminder", {
          body: "You're all set to receive reminders! 💪",
        });
      } else {
        alert("Notifications are blocked. Enable them to get reminders.");
      }
    });
  }
});