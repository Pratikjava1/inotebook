import React from 'react'
import { createContext } from 'react'
import {useNavigate} from "react-router-dom";
import Alert from '../components/Alert';
import { useState } from 'react';

const authcontext = createContext();

function AuthState(props) {

  const [isLoggedIn,setLoggedIn]=useState(false);

 let navigate = useNavigate();

    const hostname = "http://localhost:5000"; 
   
  


    const Checklogin=async(data)=>{
        console.log(data);
        const URL = `${hostname}/api/auth/login`;

        try {
            
            const res=await fetch(URL,{
                method:"POST",
                headers:{
                  "Content-Type": "application/json",           
                  },
                body:JSON.stringify(data)
            }
            )

            const json=await res.json();
          
            if(json.error && json.error.length>0)
               props.showAlert({msg:"invalid creds"});
              
            else{
                   if(json.token)
                    {
                      localStorage.setItem("token",json.token);
                      setLoggedIn(true);
                      navigate("/");
                      props.showAlert({msg:json.msg});
                    }else
                    {
                      props.showAlert({msg:"error .could not generate the token"});

                    }
                  
                  
                  }      
                  

        } catch (error) {
            console.log(error);
        }
    }
    
    const checkSignup =async(data)=>{
        const URL = `${hostname}/api/auth/createUser`;

        try {
            
            const res=await fetch(URL,{
                method:"POST",
                headers:{
                  "Content-Type": "application/json",                          
                },
                body:JSON.stringify(data)
            }
            )

            const json=await res.json();
            if(json.error && json.error.length>0)
           
            props.showAlert(json.error); 
          else{
                localStorage.setItem("token",json.token);
                setLoggedIn(true);
                navigate("/");
                props.showAlert(json.msg);
                
                
                } 

         console.log(json);

        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div>
     <authcontext.Provider value ={{checkSignup,Checklogin,isLoggedIn}}>
        {props.children}
     </authcontext.Provider>

    </div>
  )
}

export {AuthState,authcontext}
