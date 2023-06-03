import React, { useEffect, useRef } from "react";
import { notescontext } from "../context/NotesState";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Note from "./Note";

function Notes() {
  const { notes, fetchAllNotes,editNote } = useContext(notescontext);



  const {register,handleSubmit,setValue} =useForm({mode:"onBlur"});  
  const ref = useRef(null);
  const refclose=useRef(null);

  let editID=0;
  useEffect(() => {
    fetchAllNotes();
  }, []);

  const triggerModel = (note) => {
    

    setValue("title",note.title);
    setValue("description",note.description);
    setValue("tag",note.tag);
    ref.current.click();
    editID=note._id;
  };

  const submit=(data)=>{
      editNote(data,editID);
      refclose.current.click();
  }


  return (
    <>
      <button
        type="button" 
        
        ref={ref}
        className="btn btn-primary d-none"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update your Note
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
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
                    
                    
                    {...register("title")}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    placeholder="Enter the description"
                
                    {...register("description")}
                  />
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
                <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                ref={refclose}
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Save changes
              </button>
            </div>
              </form>
            </div>
            
          </div>
        </div>
      </div>
      <div className="row">
        <h2>your Notes</h2>
        {notes.length>0?notes.map((note) => (
          <Note key={note._id} note={note} triggerModel={triggerModel} />
        )):<p>No notes to display</p>}
      </div>
    </>
  );
}

export default Notes;
