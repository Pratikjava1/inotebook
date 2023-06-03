import React from "react";
import { useContext,useState} from "react";
import { notescontext } from "../context/NotesState";
import {useForm,Controller} from "react-hook-form"


function AddNote() {
 
    const {addNote} =useContext(notescontext);
    const {register,handleSubmit,formState: { errors },reset} =useForm({mode:"onBlur"});  
    
const submit=(data,e)=>{
    
    addNote(data);
    e.target.reset();
    
    
}



  return (
    <>
      <h2>Add Note</h2>
      
      <form className="col-md-6" onSubmit={handleSubmit(submit)}>
        <div className="form-group mb-3">
          
          <label htmlFor="title">Title</label>
          <input
          
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            placeholder="Enter title"
            {...register("title",{required: "Required"})}
          />
         {errors.title && <p className="text-danger">{errors.title.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            placeholder="Enter the description"
            {...register("description",{required: "Required"})}
          />
           {errors.description && <p className="text-danger">{errors.description.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="description">Tag</label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            placeholder="Enter the tag"
            {...register("tag")}
          />
        </div>
        <button className="btn btn-primary my-4">
          Add Note
        </button>
      </form>
    </>
  );
}

export default  React.memo (AddNote);
