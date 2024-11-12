//import Login from '../Login/login';
//import Modal from 'react-modal';
import './nav.css';
import logonetflix from '../../assets/Logonetflix.png';
import Lang from '../components/dropdowns';
import arrowright from '../../assets/arrow-right.png';
//import { useModal } from '../components/Modal';
//import Style from '../components/Modalstyle';
import Register from '../components/signup';
import { useState } from 'react';
import Login from './login';

const Hero = () => {
    const [LogInForm, SetLoginForm] = useState(false);
    const [signupForm, setSignupForm] = useState(false);

    const handleSignup = () => {
        setSignupForm(true);
    };
    const handleSignUpOnClose = () => {
        setSignupForm(false);
    };
    
    return (
        <div className="hero">
            { LogInForm ? (
            <Login />
            ) : (
                <div className="box">
                    <div className="header">
                        <img src={logonetflix} alt="netflix logo" />
                        <div className="left">
                            <div className='lang_btn'>< Lang /></div>
                            <button className='loginbtn' onClick={() => SetLoginForm(true)}>Login</button> 
                        </div>
                    </div>
                    <div className="content">
                        <h1>Unlimited movies, Tv <br />shows, and more</h1>
                        <p>Watch for free, Ready to Watch?</p>
                        <form action="">
                        <input type="email" className='email' placeholder='Email Address'/>
                        <button className="registerbtn" onClick={ handleSignup }>Get Started <img src= { arrowright } alt="" /></button>
                        {signupForm && <Register onClose={handleSignUpOnClose}/>}
                        </form>
                    </div>
                </div>
            )}
            </div>
    );
}

export default Hero;