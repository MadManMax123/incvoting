// /netlify/functions/updateQuestions.js
const fetch = require('node-fetch');
const crypto = require('crypto');

exports.handler = async (event, context) => {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;  // Set this in Netlify environment variables
  
  const repoOwner = 'MadManMax123';  // Your GitHub username
  const repoName = 'incvoting';  // Your repository name
  const filePath = 'questions.json';  // File to update
  const sha = 'cde5d36b25377e67c11b7cd5a6a13372b5e5961d';  // The current file's SHA (this will change every time the file changes)
  
  const fileContent = {
    "active": true,
    "question": "Updated question here",
    "options": [
      "Option 1",
      "Option 2",
      "Option 3",
      "Option 4"
    ]
  };

  // Convert content to base64
  const base64Content = Buffer.from(JSON.stringify(fileContent)).toString('base64');

  // Prepare GitHub API URL to update file
  const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;
  
  const data = {
    message: 'Update questions.json',  // Commit message
    content: base64Content,  // Base64 encoded content
    sha: sha,  // The current file's SHA
  };

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (response.status === 200) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'questions.json updated successfully', result }),
    };
  } else {
    return {
      statusCode: response.status,
      body: JSON.stringify({ message: 'Failed to update questions.json', error: result }),
    };
  }
};
