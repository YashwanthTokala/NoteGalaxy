import React, { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {
  const host= "http://localhost:5000"
  const notesInitial= []
  const [notes, setNotes] = useState(notesInitial)
  
  //Getting all notes

  const getNote=async ()=>{
    //API CALL
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
  
    const json = await response.json();
    console.log(json);
    setNotes(json)
  }

  //add notes

  const addNote=async (title, description,tag)=>{

    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
  
    const json = await response.json();
    console.log("Add response:", json);
    console.log("Adding new note")
    setNotes(notes.concat(json))
  }
  //delete notes
  const deleteNote=async(id)=>{

    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
  
    const json = await response.json();
    console.log(json);

    console.log("Deleting Note with id"+ id)
    const newNote=notes.filter((note)=>{return note._id!== id})
    setNotes(newNote)
  }
  //edit notes
  const editNote = async (id, title, description, tag) => {
  
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
  
    const json = await response.json();
    console.log("Edit response:", json);
   
    const newNotes= JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes)
  };
  return (
    <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNote}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;