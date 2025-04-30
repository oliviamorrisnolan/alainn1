const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const Papa = require('papaparse');
const cors = require('cors');

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON data in POST request bodies
app.use(bodyParser.json());

// Path to CSV file where delivery data is saved
const dataFilePath = path.join(__dirname, 'deliveries.csv');

// POST route for adding delivery data
app.post('/add-delivery', (req, res) => {
    console.log('POST request received at /add-delivery');
    const { category, ingredient, deliveryDate, batchCode, useByDate, quantity } = req.body;

    // Check if the required fields are missing
    if (!category || !ingredient || !deliveryDate || !batchCode || !useByDate || !quantity) {
        return res.status(400).send('Missing required fields');
    }

    // Prepare the data to append to the CSV
    const newData = [{ category, ingredient, deliveryDate, batchCode, useByDate, quantity }];
    const csv = Papa.unparse(newData);

    // Append the new data to the CSV file
    fs.appendFile(dataFilePath, csv + '\n', (err) => {
        if (err) {
            return res.status(500).send('Error saving delivery data.');
        }
        res.status(200).send({ status: 'success', message: 'Upload successful.' });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
