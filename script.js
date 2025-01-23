// Enable notifications
let notificationsEnabled = false;
document.getElementById('enable-notifications').onclick = () => {
    if (Notification.permission === "granted") {
        notificationsEnabled = true;
        document.getElementById('notification-status').innerText = "Notifications are enabled";
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                notificationsEnabled = true;
                document.getElementById('notification-status').innerText = "Notifications are enabled";
            }
        });
    }
};

// Load habits from localStorage
let habits = JSON.parse(localStorage.getItem("habits")) || [];

// Add habit function
function addHabit() {
    const habitInput = document.getElementById('habit-input');
    const habitText = habitInput.value.trim();
    const category = document.getElementById('category').value;

    if (habitText !== "") {
        const habit = {
            text: habitText,
            category: category,
            streak: 0,
            progress: 0
        };
        
        habits.push(habit);
        localStorage.setItem("habits", JSON.stringify(habits));

        // Update habit list
        renderHabits();
        habitInput.value = "";
    } else {
        alert("Please enter a habit!");
    }
}

// Remove habit function
function removeHabit(index) {
    habits.splice(index, 1);
    localStorage.setItem("habits", JSON.stringify(habits));
    renderHabits();
}

// Track Completion (Mark habit as complete)
function trackCompletion(index) {
    if (habits[index].progress < 100) {
        habits[index].progress += 20; // Simulate progress increase
        habits[index].streak += 1; // Track streak
        localStorage.setItem("habits", JSON.stringify(habits));
        renderHabits();
    }
}

// Send real notification if habit is incomplete
function sendReminderNotification(habit) {
    if (Notification.permission === "granted" && notificationsEnabled) {
        new Notification("Habit Reminder", {
            body: `Don't forget to complete your habit: ${habit.text}`,
            icon: "https://via.placeholder.com/50"  // Use an icon for the notification
        });
    }
}

// Send notifications for incomplete habits (every minute)
setInterval(() => {
    if (notificationsEnabled) {
        habits.forEach(habit => {
            if (habit.progress < 100) {
                sendReminderNotification(habit);
            }
        });
    }
}, 60000); // Reminder every minute

// Render habits from localStorage
function renderHabits() {
    const habitList = document.getElementById('habit-ul');
    habitList.innerHTML = ""; // Clear current list

    habits.forEach((habit, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${habit.text} (${habit.category}) - Streak: ${habit.streak}</span>
            <div class="progress-bar"><div style="width: ${habit.progress}%"></div></div>
            <button onclick="trackCompletion(${index})">Complete</button>
            <button onclick="removeHabit(${index})">Remove</button>
        `;
        habitList.appendChild(li);
    });
}

// Initial render on page load
renderHabits();