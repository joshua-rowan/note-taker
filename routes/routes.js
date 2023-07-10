const express = require('express');
const path = require('path');
const { readFromFile, readAndAppend } = require('../helpers/notesUtils');

const router = express.Router();

//serves index.html as the home page
router.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/index.html'))
);

// serves user the notes pages
router.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/notes.html'))
);

// reads notes
router.get('/api/notes', (req, res) => {
    //code to read the notes from JSON file
    readFromFile('../db/db.json').then((data) =>
    res.json(JSON.parse(data)));
});

//receives and posts new notes
router.post('/api/notes', (req, res) => {
    //code to receive and post new notes
    const {title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
        };

        readAndAppend(newNote, './db/db.json');
        res.json(`Tip added successfully`);
    }
});

module.exports = router;