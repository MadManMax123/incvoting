
# Innovation Club Voting Portal – Admin Guide

This is the official voting portal for the Innovation Club, hosted on [https://incvoting.netlify.app](https://incvoting.netlify.app).

---

## 📋 Basic Details

- **Website**: https://incvoting.netlify.app  
- **Hosted on**: Netlify  
- **Form Processing**: Netlify Forms + Google Sheets (via Apps Script)  
- **Form Behavior**: Controlled via a `questions.json` file  
- **Theme**: Deep Blue with Neon Cyan accents  
- **Pages**:
  - `index.html`: Main voting form
  - `closed.html`: Shown when voting is turned off
  - `thank-you.html`: Confirmation after vote submission

---

## 🧠 Using `questions.json`

The `questions.json` file controls the question shown in the poll, the voting options, and whether the form is open or closed.

```json
{
  "active": true,
  "question": "Who should be the next Innovation Club President?",
  "options": ["Alice", "Bob", "Charlie", "Dana"]
}
```

### Fields:
- **active**:  
  - `true`: Enables voting; loads the form  
  - `false`: Redirects visitors to `closed.html` with a closure message

- **question**:  
  The full question displayed above the dropdown list in the form.

- **options**:  
  An array of string values shown in the dropdown (`<select>`) list for voting.

### 🔄 To update:
1. Open `questions.json`.
2. Change `active` to `false` to close voting.
3. Modify `question` or `options` as needed.
4. Save and redeploy via Netlify (drag-drop or Git push depending on setup).

---

## 📤 Handling Google Sheets Responses

Form responses are submitted via Google Apps Script to a connected Google Sheet.

### Sheet Format:
Ensure the first row of your sheet has these exact column headers:
```
Name | Class and Section | Admission Number | Vote | Remarks
```

### View Responses:
- Go to your linked Google Sheet.
- Each new vote will appear as a new row appended automatically.

### Changing the Sheet:
If you need to switch the sheet:
1. Open Google Sheets.
2. Go to **Extensions > Apps Script**.
3. Update the `doPost()` function with the new sheet/tab name:
   ```javascript
   var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
   ```
4. Re-deploy the script as a web app and update the endpoint URL in `script.js`.

---

## 🧪 Admin Testing

- Open `questions.json` and ensure `"active": true`.
- Submit a form via the website.
- Check both the **thank-you page** and the connected **Google Sheet** to confirm the entry.
- Toggle `active` to `false` and verify that `closed.html` appears on the home page.

---

## 🛠 Troubleshooting

- **Form not appearing?** → Check if `"active"` is set to `false`.
- **Data not recording?** → Ensure Google Apps Script is deployed correctly and the correct script URL is set in `script.js`.
- **Thank-you page not showing?** → Check form action or submission redirect in JS.

---

## 🧾 Final Notes

- All pages use a unified theme from `style.css`.
- Form input and question options dynamically load from `questions.json`.
- Keep a backup of the Google Sheet before major events or resets.

---

Happy Voting!  
— Innovation Club Dev Team
