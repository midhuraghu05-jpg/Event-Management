const LOGGED_KEY = 'loggedUser';
const EVENTS_KEY = 'eventsByUser';

let loggedUser = localStorage.getItem(LOGGED_KEY);
if(!loggedUser){
    alert("You are not logged in!");
    location.href = "login.html";
}

let allEvents = JSON.parse(localStorage.getItem(EVENTS_KEY)) || {};
let events = Array.isArray(allEvents[loggedUser]) ? allEvents[loggedUser] : [];

function loadEvents() {
    const container = document.getElementById("eventsContainer");
    container.innerHTML = "";

    if (events.length === 0) {
        container.innerHTML = `
            <div class="no-events">
                <h2>No events created yet</h2>
                <p>Click "Create" in the navigation to add your first event!</p>
            </div>
        `;
        return;
    }

    events.forEach((e, i) => {
        const card = document.createElement("div");
        card.className = "event-card";

        card.innerHTML = `
            <h2>${e.name}</h2>
            <p class="event-date">📅 ${e.date} ${e.start ? "| ⏰ " + e.start + (e.end ? " - " + e.end : "") : ""}</p>
            ${e.location ? `<p class="event-location">📍 ${e.location}</p>` : ""}
            <p class="event-desc">${e.desc}</p>

            <div class="event-actions">
                <button class="event-edit" onclick="editEvent(${i})">Edit</button>
                <button class="event-delete" onclick="delEvent(${i})">Delete</button>
            </div>
        `;

        container.appendChild(card);
    });
}

function delEvent(i) {
    if (confirm("Are you sure you want to delete this event?")) {
        events.splice(i, 1);
        allEvents[loggedUser] = events;
        localStorage.setItem(EVENTS_KEY, JSON.stringify(allEvents));
        loadEvents();
    }
}

function editEvent(i) {
    const newName = prompt("Enter new event name:", events[i].name);
    if (newName === null) return;

    const newDate = prompt("Enter new event date:", events[i].date);
    if (newDate === null) return;

    const newStart = prompt("Enter new start time:", events[i].start);
    if (newStart === null) return;

    const newEnd = prompt("Enter new end time:", events[i].end);
    if (newEnd === null) return;

    const newLocation = prompt("Enter new location:", events[i].location);
    if (newLocation === null) return;

    const newDesc = prompt("Enter new event description:", events[i].desc);
    if (newDesc === null) return;

    events[i] = { name: newName, date: newDate, start: newStart, end: newEnd, location: newLocation, desc: newDesc };
    allEvents[loggedUser] = events;
    localStorage.setItem(EVENTS_KEY, JSON.stringify(allEvents));
    loadEvents();
}

loadEvents();
