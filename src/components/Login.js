import React from 'react'
import {useForm,Controller} from "react-hook-form"
import { useContext } from 'react';
import { authcontext } from '../context/AuthState';

function Login() {
  
  const {Checklogin}=useContext(authcontext);
  const {register,handleSubmit,formState: { errors },reset} =useForm({mode:"onBlur"}); 
  
  const submit= (data,e)=>{
  //   console.log(data);
     Checklogin(data);
     e.target.reset();
  }


  return (
    <>
     <form className="col-md-6" onSubmit={handleSubmit(submit)}>
        <div className="form-group mb-3">
          
          <label htmlFor="title">Email</label>
          <input
          
            type="text"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            {...register("email",{required: "Required"})}
          />
         {errors.email && <p className="text-danger">{errors.email.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="description">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Enter the password"
            {...register("password",{required: "Required"})}
          />
           {errors.password && <p className="text-danger">{errors.password.message}</p>}
        </div>
         <button className="btn btn-primary my-4">
          Login
        </button>
      </form>

    </>
  )
}

export default Login
