import React from 'react';
import './login.css';


const login = () => {
  
  return (
    <div className='form'>
      <h2>Login</h2>
      <p>Login to your account</p>
      <form action="">
        <div className='dt'>
          <label for="Username">Username</label>
          <input type="text" name='Email' placeholder='Email' id='email' required />
        </div>

        <div className='dt'>
          <label htmlFor="Password">Password</label>
          <input type="password" name='password' placeholder='Password' id='password' required />
        </div>
        <button type='submit' onClick={() => ({})}>Log In</button>
        <p className='footnote'>By clicking you have agreed to our terms and<br /> conditions</p>
      </form>
    </div >
  )
}

export default login;