import React from 'react'
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router';
const Register = () => {
 const navigate=useNavigate()
 const [username,setUsername]=useState("")
 const [email,setEmail]=useState("")
 const [password,setpassword]=useState("")

     const {loading,handleRegister}=useAuth()

     async function handleSubmit(e){
        e.preventDefault(); 
        const success = await handleRegister({
        username,
        email,
        password
    });

    if (success) {
        navigate("/");
    }
     }
    if(loading){
        return (<main className="auth-page"><h1>Loading........</h1></main>)
    }

  return (
      <main className="auth-page">
            <div className="form-container">
                <h1>Register</h1>

                <form onSubmit={handleSubmit}>
                        <div className="input-group">
                        <label htmlFor="Username">Username</label>
                        <input onChange={(e)=>{setUsername(e.target.value)}}
                        type="text" id="username" name="username" placeholder='Enter username' />
                    </div>

                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input onChange={(e)=>{setEmail(e.target.value)}}
                         type="email" id="email" name="email" placeholder='Enter email address' />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input onChange={(e)=>{setpassword(e.target.value)}}
                        type="password" id="password" name="password" placeholder='Enter password' />
                    </div>

                    <button className='button primary-button'>Register</button>
                </form>

                <p>Already have an account? <Link to={"/login"}>Login</Link></p>
            </div>
        </main>
  )
}

export default Register