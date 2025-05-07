const PASSWORD = "INNOVATION";
let questionsData;

function validatePassword() {
  const entered = document.getElementById("password").value;
  if (entered === PASSWORD) {
    document.getElementById("auth").style.display = "none";
    document.getElementById("admin-panel").style.display = "block";
    loadData();
  } else {
    alert("Incorrect password");
  }
}

function loadData() {
  fetch('../questions.json')
    .then(res => res.json())
    .then(data => {
      questionsData = data;
      document.getElementById("question").value = data.question;
      document.getElementById("options").value = data.options.join(", ");
      updateFormState(data.active);
    });
}

function updateFormState(state) {
  document.getElementById("formState").textContent = "Current State: " + (state ? "Enabled" : "Disabled");
}

document.getElementById("questionForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const question = document.getElementById("question").value;
  const options = document.getElementById("options").value.split(",").map(o => o.trim());
  questionsData.question = question;
  questionsData.options = options;
  saveData();
});

document.getElementById("announcementForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const heading = document.getElementById("aHeading").value;
  const mainText = document.getElementById("aText").value;

  fetch('../announcements.json')
    .then(res => res.json())
    .then(data => {
      data.unshift({ heading, mainText });
      return uploadJSON('announcements.json', data);
    })
    .then(() => alert("Announcement posted!"));
});

function toggleActive() {
  questionsData.active = !questionsData.active;
  updateFormState(questionsData.active);
  saveData();
}

function saveData() {
  uploadJSON('questions.json', questionsData).then(() => alert("Changes saved."));
}

function uploadJSON(filename, data) {
  return fetch(`https://api.github.com/repos/MadManMax123/incvoting/contents/${filename}`, {
    method: "PUT",
    headers: {
      "Authorization": "token process.env.GITHUB_TOKEN",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: `Update ${filename}`,
      content: btoa(unescape(encodeURIComponent(JSON.stringify(data, null, 2)))),
      sha: "", // optional: include current SHA to avoid overwrite issues
      branch: "main"
    })
  });
}
