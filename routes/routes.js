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
    readFromFile(path.join(__dirname, '../db/db.json'))
    .then((data) => res.json(JSON.parse(data)))
    .catch((err) => res.status(500).json({ error: err}));
});

//receives and posts new notes
router.post('/api/notes', (req, res) => {
    //code to receive and post new notes
    const {title, text } = req.body;

    if (!title || !text) {
        return res.status(400).json({ error: 'Missing title or text in request body' });
    }

    const newNote = {
        title,
        text,
    };

    readAndAppend(newNote, path.join(__dirname, '../db/db.json'))
    .then(() => res.json(newNote))
    .catch((err) => res.status(500).json({ error: err}));
});

router.get('*', (req, res) =>
res.sendFile(path.join(__dirname, '../public/index.html'))
);

module.exports = router;