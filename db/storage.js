const util = require('util');
const fs = require('fs');
const { v4: uuid } = require('uuid');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Storage {
    read() {
        return readFileAsync('db/db.json', 'utf8')
    }
    write(note) {
        return writeFileAsync('db/db.json', JSON.stringify(note, null, 4))
    }
    getNotes() {
        return this.read().then((notes) => {
            let parsedNotes;
            try {
                parsedNotes = [].concat(JSON.parse(notes))
            } catch(err) {
                parsedNotes = [];
            }
            return parsedNotes;
        })
    }
    addNote(note) {
        const title = note.title;
        const text = note.text 

        if(!title || !text) {
            throw new Error('Please add a title and text');
        }

        const newNote = { title, text, id: uuid()};

        return this.getNotes().then((notes) => [...notes, newNote])
        .then((updatedNotes) => this.write(updatedNotes))
        .then(() => newNote)

    }
    
}

module.exports = new Storage();