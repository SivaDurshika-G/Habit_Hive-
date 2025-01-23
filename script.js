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

  // Notifications Section
const notifyBtn = document.getElementById("notify-btn");

notifyBtn.addEventListener("click", () => {
  // Check for Notification API support
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notifications.");
    return;
  }

  // Request permission if not already granted
  if (Notification.permission === "granted") {
    new Notification("🔔 Habit Hive Reminder", {
      body: "Don't forget to complete your habits today!",
      icon: "https://via.placeholder.com/100", // Placeholder icon, replace with your app icon
    });
  } else if (Notification.permission === "default" || Notification.permission === "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        new Notification("🔔 Habit Hive Reminder", {
          body: "You're all set! Keep tracking your habits 🎯",
          icon: "https://via.placeholder.com/100", // Placeholder icon
        });
      } else {
        alert("You denied notifications. Please enable them to get reminders.");
      }
    });
  }
});

  // Footer Animation
  const footerText = document.getElementById("footer-text");
  let footerMessages = ["Made with Love ❤️", "By Siva"];
  let currentIndex = 0;

  setInterval(() => {
    footerText.textContent = footerMessages[currentIndex];
    currentIndex = (currentIndex + 1) % footerMessages.length;
  }, 2000);
});