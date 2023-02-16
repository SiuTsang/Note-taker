const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('./public/assets/js/uuid.js');
const allNotes = require('./db/db.json');

const PORT = process.env.port || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
  res.json(allNotes);
});

app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = uuid();
  allNotes.push(newNote);
  fs.writeFile('./db/db.json', JSON.stringify(allNotes), (err) => {
    if (err) {
      console.log("Cannot write into database");
    }
  });
  res.send(allNotes);
});

app.get('/notes', (req, res) => 
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('*', (req, res) => 
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`Sever listening on port ${PORT}`)
);