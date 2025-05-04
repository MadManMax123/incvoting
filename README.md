
## How It Works

1. **Dynamic Question Loading**:
   - The `script.js` file fetches the voting question and options from `questions.json` and populates the dropdown menu dynamically.

2. **Form Submission**:
   - The form data is sent to a Google Apps Script Web App URL using a `POST` request.
   - The form also integrates with Netlify Forms for backup submission.

3. **Styling and Animations**:
   - The `style.css` file includes styles for the form and animations for the container and buttons.

## Setup Instructions

1. Clone the repository or download the files.
2. Open the `index.html` file in a browser to view the voting system.
3. Update the `questions.json` file to modify the voting question and options.
4. Replace the `sheetURL` in `script.js` with your Google Apps Script Web App URL to enable form submission.

## Dependencies

- **Google Apps Script Web App**: Used for processing form submissions.
- **Netlify Forms**: Optional backup for form submissions.

## Customization

- **Change Voting Question**:
  - Edit the `question` and `options` in the `questions.json` file.

- **Update Styles**:
  - Modify the `style.css` file to change the appearance of the form.

- **Animations**:
  - Add or modify animations in the `style.css` file using the `@keyframes` rule.

## Example JSON (`questions.json`)

```json
{
    "question": "Who do you think should be the next Club Leader?",
    "options": [
        "Alexandra Rivera",
        "Dev Mehra",
        "Jordan Singh",
        "No Preference"
    ]
}