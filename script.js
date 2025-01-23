document.addEventListener("DOMContentLoaded", () => {
  // Profile Section
  const profileForm = document.getElementById("profile-form");
  const greeting = document.getElementById("greeting");
  profileForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    greeting.textContent = `Hello, ${username}! Welcome to Habit Hive 🐝`;
    profileForm.reset();
  });

  // Habit Section
  const habitForm = document.getElementById("habit-form");
  const habitList = document.getElementById("habit-list");
  habitForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const habit = document.getElementById("habit-input").value;
    const li = document.createElement("li");
    li.textContent = habit;
    habitList.appendChild(li);
    habitForm.reset();
  });

  // Rewards Section
  const rewardsList = document.getElementById("rewards-list");
  const achievements = ["First Habit Added 🏆", "5 Streaks Achieved 🎖️", "10 Habits Completed 🎉"];
  achievements.forEach((reward) => {
    const li = document.createElement("li");
    li.textContent = reward;
    rewardsList.appendChild(li);
  });

  // Notifications Section
  const notifyBtn = document.getElementById("notify-btn");
  notifyBtn.addEventListener("click", () => {
    new Notification("🔔 Habit Hive Reminder", {
      body: "Don't forget to complete your habits today!",
    });
  });

  // Analysis Section
  const ctx = document.getElementById("habit-chart").getContext("2d");
  const habitChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Habit 1", "Habit 2", "Habit 3"],
      datasets: [
        {
          label: "Completion (%)",
          data: [50, 75, 90],
          backgroundColor: ["#0077b6", "#00b4d8", "#90e0ef"],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });

  // Check Notification Permission
  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  }
});
// Footer Text Animation
const footerText = document.getElementById("footer-text");
let footerMessages = ["Made with Love ❤️", "By Siva"];
let currentIndex = 0;

setInterval(() => {
  footerText.textContent = footerMessages[currentIndex];
  currentIndex = (currentIndex + 1) % footerMessages.length;
}, 2000);