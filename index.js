require('dotenv').config(); // Load environment variables
const express = require('express');
const { google } = require('googleapis');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Authenticate with Google Sheets API using .env variables
const auth = new google.auth.GoogleAuth({
    credentials: {
        client_email: process.env.CLIENT_EMAIL,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        project_id: process.env.PROJECT_ID,
        private_key: process.env.SHEETS_API.replace(/\\n/g, '\n'), // Fix newline issue
        private_key_id:process.env.PRIVATE_KEY_ID,
        auth_uri: process.env.AUTH_URI,
        token_uri: process.env.TOKEN_URI,
        type: 'service_account',
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

// Google Sheet details
const spreadsheetId = process.env.SHEET_ID;
const range = 'Sheet1!A:B';

// Handle form submission
app.post('/submit', async (req, res) => {
    const { email, message } = req.body;
    if (!message || !email) return res.status(400).send("Name and Email are required");

    try {
        sheets.spreadsheets.values.append({
            spreadsheetId,
            range,
            valueInputOption: 'RAW',
            resource: { values: [[email, message]] },
        });
        res.send('Data successfully added to Google Sheets!');
    } catch (error) {
        console.error('Error writing to Google Sheets:', error);
        res.status(500).send('Failed to write data.');
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
