const PASSWORD = 'INNOVATION';
const form = document.getElementById('admin-form');
const questionInput = document.getElementById('question');
const optionsInput = document.getElementById('options');
const formState = document.getElementById('formState');

function validatePassword() {
  const input = document.getElementById('password').value;
  if (input === PASSWORD) {
    document.getElementById('auth').style.display = 'none';
    document.getElementById('admin-panel').style.display = 'block';
    loadData();
  } else {
    alert('Incorrect password!');
  }
}

async function loadData() {
  const res = await fetch('/questions.json');
  const data = await res.json();

  questionInput.value = data.question;
  optionsInput.value = data.options.join(', ');
  formState.innerText = `Current State: ${data.active ? 'active' : 'inactive'}`;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const question = questionInput.value.trim();
  const options = optionsInput.value.split(',').map(opt => opt.trim()).filter(Boolean);

  const res = await fetch('/.netlify/functions/updateQuestions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question, options })
  });

  const result = await res.json();
  alert(result.message || 'Question updated!');
});

async function toggleActive() {
  const current = formState.innerText.includes('active');
  const res = await fetch('/.netlify/functions/updateActiveState', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ active: !current })
  });

  const result = await res.json();
  if (res.ok) {
    formState.innerText = `Current State: ${!current ? 'active' : 'inactive'}`;
  } else {
    alert('Failed to update form state.');
  }
}
