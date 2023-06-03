import React, { useEffect } from 'react'
import Navbar from './Navbar'
import Notes from './Notes'
import AddNote from './AddNote'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { authcontext } from '../context/AuthState'


function Home() {

  const {isLoggedIn}=useContext(authcontext);
  const navigate=useNavigate();

 useEffect(()=>{

   if(!isLoggedIn)
     {  
         console.log(isLoggedIn);
      navigate("/login");
     }
 },[]);

return (
    <>
    
    <div className="container my-4">
    {isLoggedIn&& <AddNote/>  }
    {isLoggedIn&& <Notes/>  }
    </div>
  
    </>
  )
}

export default Home
