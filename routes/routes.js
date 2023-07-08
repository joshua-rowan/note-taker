const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/index.html'))
);

router.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/notes.html'))
);

router.get('api/notes', (req, res) => {
    //code to read the notes from JSON file
});

router.post('api/notes', (req, res) => {
    //code to receive and post new notes
});

module.exports = router;