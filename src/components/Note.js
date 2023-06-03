import React from 'react'
import "../App.css"
import { useContext } from 'react';
import { notescontext } from '../context/NotesState';


function Note(props) {
  const {deleteNote} =useContext(notescontext);
   
  const { note,triggerModel } =props;
    
    return (
    <>
        <div className="card col-md-3 mx-2 my-2">
    <div className="card-body">
    <h5 className="card-title">{note.title}</h5>
    <p className="card-text">{note.description}</p>
    <p className="card-text">{note.tag}</p>
    <i onClick={()=>deleteNote(note._id)} className="fa-solid fa-trash"/>
    <i onClick={()=>triggerModel(note)} className="fa-solid fa-pen"/>
  </div>
</div>
         
    </>
  )
}

export default Note
