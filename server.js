const express = require('express');
const app = express();
const portNumber = process.env.PORT || 3001;
const notesDatabase = require('./db/db.json');
const fs = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');

// To add static files 
app.use(express.static(path.join(__dirname, 'public')))


//To Parse request body
app.use(express.json());


app.get('/notes',(req,res) => {
    res.sendFile('notes.html',{root: path.join(__dirname, 'public')})
})




//To get all notes
app.get('/api/notes',(req,res) => {
    fs.readFile(path.join(__dirname,'./db/db.json'), 'utf8', (err,data) => {
        if(err) throw err;
        res.json(JSON.parse(data))
    })
})


//To add a note
app.post('/api/notes',(req,res) => {
   const userNote = {...req.body, id: uuid()}
   const newNotes = JSON.stringify([...notesDatabase, userNote ]);

    fs.writeFile(path.join(__dirname,'/db/db.json'),newNotes, err => {
       if(err) throw new Error('Could not update the file',err)
       res.redirect(req.get('notes'))
    } )
})

//To delete a note
app.delete('/api/notes/:id',(req,res) => {
    const {id} = req.params;
    
    // const newNotes = JSON.stringify(notesDatabase.filter(note => note.id !== id ))
    // fs.writeFile(path.join(__dirname,'./db/db.json'),newNotes, err => {
    //    if(err) throw new Error('Could not update the file',err)
    //    res.redirect('/notes')
    // })
    let newNotes
    let oldNnotes
    fs.readFile(path.join(__dirname,'./db/db.json'), 'utf8', (err,data) => {
        if(err) throw err;
        oldNnotes = JSON.parse(data)
        newNotes = JSON.stringify(oldNnotes.filter(note => note.id !== id ))
         
        fs.writeFile(path.join(__dirname,'./db/db.json'),newNotes, err => {
            if(err) throw new Error('Could not update the file',err)
            res.redirect('/notes')
         })
    })


})


app.get('*',(req,res)=> {
    res.sendFile('index.html',{root: path.join(__dirname, 'public')})
} )


//To start my server
app.listen(portNumber, ()=> {
    console.log(`Listening on port ${portNumber}`)
})


