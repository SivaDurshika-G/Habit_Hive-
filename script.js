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

  document.addEventListener("DOMContentLoaded", () => {
  const notifyBtn = document.getElementById("notify-btn");

  notifyBtn.addEventListener("click", () => {
    // Check if Notification API is supported
    if (!("Notification" in window)) {
      alert("Your browser does not support notifications.");
      return;
    }

    // Check Notification Permission
    if (Notification.permission === "granted") {
      // Show notification directly
      showNotification();
    } else if (Notification.permission === "default") {
      // Request permission from user
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          showNotification();
        } else {
          alert("Notifications are disabled. Please enable them to use this feature.");
        }
      });
    } else {
      alert("Notifications are blocked. Please allow them in your browser settings.");
    }
  });

  function showNotification() {
    new Notification("🔔 Habit Hive Reminder", {
      body: "Remember to track your habits today! 💪",
      icon: "https://via.placeholder.com/100", // Replace with your custom icon URL
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