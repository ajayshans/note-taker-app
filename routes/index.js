const express = require('express');

// Import modular routers
const notesRouter = require('./notes');

const app = express();

app.use('/notes', notesRouter);

module.exports = app;