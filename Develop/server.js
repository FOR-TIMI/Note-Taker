const express = require('express');
const app = express();
const portNumber = 3000;
const notesDatabase = require('./db/db.json');
const fs = require('fs');
const path = require('path')

// To add static files 
app.use(express.static(path.join(__dirname, 'public')))

//To Parse request body
app.use(express.json());


app.get('/notes',(req,res) => {
    res.sendFile('notes.html',{root: path.join(__dirname, 'public')})
})

//To get all notes
app.get('/api/notes',(req,res) => {
    res.json(notesDatabase)
})

//To get a specific note
app.get('/api/notes/:id',(req,res) => {

})

//To add a note
app.post('/api/notes',(req,res) => {
    //   console.log(req.body);
    //   console.log([...notesDatabase, req.body])
   const newNotes = JSON.stringify([...notesDatabase, req.body])
    fs.writeFile(path.join(__dirname,'./db/db.json'),newNotes, err => {
       if(err) throw new Error('Could not update the file',err)
    } )
})

//To delete a note
app.delete('/api/notes/:id',(req,res) => {
    
})




app.listen(portNumber, ()=> {
    console.log(`Listening on port ${portNumber}`)
})