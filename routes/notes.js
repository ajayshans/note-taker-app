const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
    console.info(`${req.method} request received to retrieve notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for submitting a new note
notes.post('/', (req, res) => {
    console.info(`${req.method} request received to add note`);
    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;
    
    // If all the required properties are present
    if (title && text) {
        // Variable for the object we will save
        const newNote = {
            text,
            title,
            note_id: uuidv4()
        };

        readAndAppend(newNote, './db/db.json')

        const response = {
            status: 'success',
            body: newNote
        };
        res.json(response);
    } else {
        res.json('Error in posting note')
    }
})

module.exports = notes;