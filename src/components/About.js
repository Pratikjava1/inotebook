import React from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { authcontext } from '../context/AuthState';
import { Navigate, useNavigate } from 'react-router-dom';

export default function About() {
   const navigate=useNavigate();
   const {isLoggedIn}=useContext(authcontext);

  useEffect(()=>{
console.log(isLoggedIn);
    if(!isLoggedIn)
      {  
      
       navigate("/login");
      }
  },[]);
  return (
    <div>
      <p>This is about</p>
    </div>
  )
}
