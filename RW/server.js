const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 8080;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files (HTML, CSS, client-side JS)
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to handle form submission
app.post('/register', (req, res) => {
    console.log('Received registration data:', req.body);

    const { fullName, email, phone, dob, grade, address, notes } = req.body;

    // Read existing data from data.json
    const dataPath = path.join(__dirname, 'data.json');
    let users = [];
    try {
        if (fs.existsSync(dataPath)) {
            const data = fs.readFileSync(dataPath, 'utf-8');
            users = JSON.parse(data);
        }
    } catch (error) {
        console.error('Error reading data.json:', error);
    }

    // Add the new user
    const newUser = { fullName, email, phone, dob, grade, address, notes };
    users.push(newUser);

    // Write updated data back to data.json
    try {
        fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));
        res.status(200).json({ message: 'Registration successful!' });
    } catch (error) {
        console.error('Error writing to data.json:', error);
        res.status(500).json({ message: 'An error occurred while saving your data.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
