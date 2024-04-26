const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const storage = require('./db/storage')

app.get('/api/notes', (req, res) => {
    storage.getNotes().then((notes) => {
        return res.status(200).json(notes);
    }).catch((err) => res.status(500).json(err))
})

app.post('/api/notes', (req, res) => {
    storage.addNote(req.body).then((note) => {
        return res.status(200).json(note);
    }).catch((err) => res.status(500).json(err));
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"))
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"))
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});