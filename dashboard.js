document.addEventListener('DOMContentLoaded', () => {
  const LOGGED_KEY = 'loggedUser';
  const EVENTS_KEY = 'eventsByUser';

  const welcomeText = document.getElementById('welcomeText');
  const eventTableBody = document.getElementById('eventTableBody');
  const totalEvents = document.getElementById('totalEvents');
  const upcomingEvents = document.getElementById('upcomingEvents');
  const logoutBtn = document.getElementById('logoutBtn');
  const themeToggle = document.getElementById('themeToggle');

  const loggedUser = localStorage.getItem(LOGGED_KEY);
  if(!loggedUser){
    alert('You are not logged in!');
    location.href = 'login.html';
    return;
  }

  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
  welcomeText.textContent = storedUser.name ? `Hi, ${storedUser.name}` : `Hi, ${loggedUser}`;

  function readAll() {
    return JSON.parse(localStorage.getItem(EVENTS_KEY) || '{}');
  }

  function readUserEvents() {
    const all = readAll();
    return Array.isArray(all[loggedUser]) ? all[loggedUser] : [];
  }

  function renderDashboard(){
    const events = readUserEvents();

    totalEvents.textContent = events.length;
    upcomingEvents.textContent = events.filter(e => new Date(e.date) >= new Date()).length;

    if(events.length === 0){
      eventTableBody.innerHTML = `<tr><td colspan="4" style="text-align:center;color:#777;">No events created yet</td></tr>`;
      return;
    }

    eventTableBody.innerHTML = '';
    events.forEach(ev=>{
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${ev.name}</td>
        <td>${ev.date}</td>
        <td>${ev.location || '-'}</td>
        <td>${ev.desc || '-'}</td>
      `;
      eventTableBody.appendChild(tr);
    });
  }

  logoutBtn?.addEventListener('click', ()=>{
    localStorage.removeItem(LOGGED_KEY);
    location.href = 'login.html';
  });

  themeToggle?.addEventListener('click', ()=>{
    document.body.classList.toggle('dark');
  });

  renderDashboard();
});
