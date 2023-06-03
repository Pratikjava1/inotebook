import React, { createContext, useState } from 'react'


import Alert from '../components/Alert';

const notescontext=createContext();


function NotesState(props) {
   console.log(props);
     const hostname="http://localhost:5000";  

    const[notes,setNotes] =useState([]);
    
   
    const fetchAllNotes=async()=>{
      console.log(localStorage.getItem("token"));
      try {
      let URL=`${hostname}/api/notes/fetchallnotes`;
     
        const response = await fetch(URL,{
          method:"GET",
          headers:{
            "Content-Type": "application/json",           
            "auth-token":localStorage.getItem("token")
          }
         })
         const json =await response.json();
        if(json.error)
        props.showAlert({msg: json.error});
        else
        setNotes(json.notes);

      } catch (error) {
        console.log(error);
       
      }
    
    }
    
     const addNote=async(note)=>{
       console.log(note);
      try {
        let URL=`${hostname}/api/notes/addnotes`;
        
           const response = await fetch(URL,{
             method:"POST",
             headers:{
               "Content-Type": "application/json",           
               "auth-token":localStorage.getItem("token")
             },
             body:JSON.stringify(note)
            })
        
            const json =await response.json();
            props.showAlert({msg:json.msg});
          
            fetchAllNotes();

      } catch (error) {
        console.log(error);

      }
    //   setNotes(notes.concat(note));
     }

  
     const deleteNote=async(id)=>{
      try {
        let URL=`${hostname}/api/notes/deletenotes/${id}`;
       
          const response = await fetch(URL,{
            method:"DELETE",
            headers:{          
              "auth-token":localStorage.getItem("token")
            }
           })
           const json =await response.json();
          console.log(json);
          fetchAllNotes();
  
        } catch (error) {
          console.log(error);
        } 
         
     } 

    const editNote=async(note,id)=>{
      try {
        let URL=`${hostname}/api/notes/updatenotes/${id}`;
        
           const response = await fetch(URL,{
             method:"PUT",
             headers:{
               "Content-Type": "application/json",           
               "auth-token":localStorage.getItem("token")
             },
             body:JSON.stringify(note)
            })
        
            const json =await response.json();
            props.showAlert({msg:"successfully updated"});
          
            fetchAllNotes();

      } catch (error) {
        console.log(error);

      }
    }

    return (
    <div>
      <notescontext.Provider value={{notes,addNote,deleteNote,fetchAllNotes,editNote}} >
         {props.children}
      </notescontext.Provider>
    </div>
  )
}

export {NotesState,notescontext};