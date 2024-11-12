import React, { useState } from 'react'
import './login.css';

const Login = () => {
  const [Email, SetEmail] = useState("");
  const [Password, Setpassword] = useState ("");

  const handleClick = (e) => {
    e.preventDefault();
    let test = {Email, Password};
    console.log(test)
  }
  return (
    <div className='loginPage'>
        <h1>Log In</h1>
        <p>Your journey awaits, Login in to your account now</p>
        <form onSubmit={handleClick}>
            <label htmlFor="Email">Email:</label>
            <input value={Email} onChange={e=>SetEmail(e.target.value)} type="email" id='Login_email' placeholder='johndoe@mail.com' />

            <label htmlFor="Password">Password:</label>
            <input value={Password} onChange={e=>Setpassword(e.target.value)} type="password" id='Login_password' placeholder='Password' />

            <div className='checkBox'><input type="checkbox" /><p>By clicking you agree to our rules and conditions.</p></div>

            <button>Login</button>
            <p>Dont't have an account? <span>Sign Up</span></p>
        </form>
    </div>
  )
}

export default Login;