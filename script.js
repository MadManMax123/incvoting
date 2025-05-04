fetch('questions.json')
  .then(response => response.json())
  .then(data => {
    document.getElementById('vote-question').textContent = data.question;
    const dropdown = document.getElementById('vote-dropdown');
    data.options.forEach(option => {
      const opt = document.createElement('option');
      opt.value = option;
      opt.textContent = option;
      dropdown.appendChild(opt);
    });
  });

document.getElementById('pollForm').addEventListener('submit', e => {
  const form = e.target;
  const data = new FormData(form);
  const jsonData = Object.fromEntries(data.entries());

  // Replace with your Google Apps Script Web App URL
  const sheetURL = "https://script.google.com/macros/s/AKfycbxht87_XMorF9JWWSm-oUYu2I8MIcSfrEt3wIj1GYgAQAwzPSJBJtZmNVUxWvMBiOSN/exec";
  
  fetch(sheetURL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(jsonData),
  });

  // Let Netlify Forms also receive the form
});
