import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { NotesState } from "./context/NotesState";
import Alert from "./components/Alert"
import { AuthState } from "./context/AuthState";
import { useState } from "react";

function App() {

  const [alert,setAlert] =useState(null);
 
  
  const showAlert=(state)=>{
       
    setAlert({
      msg:state.msg   
    })

    setTimeout(()=>{
     setAlert(null);
    },2000)
  }

  return (
    <div>
      <NotesState showAlert={showAlert}>
        <AuthState showAlert={showAlert}>
        <Navbar />
        <Alert alert={alert}/> 
        <div className="container">
          <Routes>
            <Route exact path="/about" Component={About} />
            <Route exact path="/" Component={Home} />
            
            <Route exact path="/login" Component={Login}/>
            <Route exact path="/signup" Component={Signup}/>
            
          </Routes>
        </div>
        </AuthState>
      </NotesState>
    </div>
  );
}

export default App;
