const express = require('express');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Load credentials and spreadsheet ID from a JSON file
const credentials = require('./credentials.json');
const SPREADSHEET_ID = '1Aqv4NyeNXOE0RaKz0VehJBDEOUsAFZt4crnSxNjHCAw';

app.use(express.json());

// Handle form submission
app.post('/api/submit-form', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Authenticate and load the spreadsheet
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
    await doc.useServiceAccountAuth(credentials);
    await doc.loadInfo();

    // Select the first sheet
    const sheet = doc.sheetsByIndex[0];

    // Append the form data to the spreadsheet
    await sheet.addRow({
      Name: name,
      Email: email,
      Message: message,
    });

    res.status(200).json({ message: 'Form submitted successfully!' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while submitting the form.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
