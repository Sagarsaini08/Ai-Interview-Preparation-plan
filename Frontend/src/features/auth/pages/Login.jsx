import {useNavigate,Link} from 'react-router'
import {useAuth} from '../hooks/useAuth'
import '../auth.form.scss';
import { useState } from 'react';
const Login = () => {

    const {loading,handleLogin}=useAuth()
    const navigate=useNavigate()
    const [email,setemail]=useState("")
    const [password,setPassword]=useState("")



   async function handleSubmit(e){
    e.preventDefault()

    try {
        await handleLogin({ email, password })
        navigate('/')
    } catch (error) {
        console.error('Login failed:', error)
    }
}
   
   if(loading){
    return (<main className="auth-page"><h1>Loading.....</h1></main>)
   }


    return (
        <main className="auth-page">
            <div className="form-container">
                <h1>Login</h1>

                <form onSubmit={handleSubmit}>


                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input onChange={(e)=>{setemail(e.target.value)}}
                        type="email" id="email" name="email" placeholder='Enter email address' />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input onChange={(e)=>{setPassword(e.target.value)}}
                        type="password" id="password" name="password" placeholder='Enter password' />
                    </div>

                    <button className='button primary-button'>Login</button>
                </form>
            </div>



             <p>Don't have an account? <Link to={"/register"}>Register</Link></p>
        </main>
    )
}

export default Login