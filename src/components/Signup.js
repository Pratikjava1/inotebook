import React from 'react'
import {useForm} from "react-hook-form"
import { useContext } from 'react';
import { authcontext } from '../context/AuthState';

function Signup() {

  const {checkSignup} = useContext(authcontext);
  const {register,handleSubmit,formState: { errors },reset} =useForm({mode:"onBlur"}); 

  const submit =(data,e)=>{
    checkSignup(data);
    e.target.reset();
  }

  return (
    <>
       <form className="col-md-6" onSubmit={handleSubmit(submit)}>
        <div className="form-group mb-3">
          
          <label htmlFor="name">Name</label>
          <input
          
            type="text"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="emailHelp"
            placeholder="Enter your name"
            {...register("name",{required: "Required"})}
          />
         {errors.name && <p className="text-danger">{errors.name.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className="form-control"
            id="email"
            name="email"
            placeholder="Enter the email"
            {...register("email",{required: "Required"})}
          />
           {errors.email && <p className="text-danger">{errors.email.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Passwrd</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Enter the password"
            {...register("password",{required: true,minLength:5})}
          />
           {errors.password && errors.password.type==="required" &&(<p className="text-danger">please enter the password</p>)}
           {errors.password && errors.password.type==="minLength" &&(<p className="text-danger">password length must be greater than 5</p>)}
        </div>
         <button className="btn btn-primary my-4">
          Sign Up
        </button>
      </form>
 
    </>
  )
}

export default Signup
