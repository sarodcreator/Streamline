import Login from '../Login/login';
import Modal from 'react-modal';
import './nav.css';
import logonetflix from '../../assets/Logonetflix.png';
import Lang from '../components/dropdowns';
import arrowright from '../../assets/arrow-right.png';
import { useModal } from '../components/Modal';
import Style from '../components/Modalstyle';
import Register from '../components/signup';
import { useState } from 'react';

const Hero = () => {
    const [showRegister, setShowRegister] = useState(false);
    const HandleSignUp = () => {
        setShowRegister(true);
    }
    const { isModalOpen, Open, Close  } = useModal();
    return (
        <div className="hero">
            <div className="box">
                <div className="header">
                    <img src={logonetflix} alt="netflix logo" />
                    <div className="left">
                        <div className='lang_btn'>< Lang /></div>
                        <button className='loginbtn' onClick={Open}>Login</button> 
                    </div>
                </div>
                <div className="content">
                    <h1>Unlimited movies, Tv <br />shows, and more</h1>
                    <p>Watch for free, Ready to Watch?</p>
                    <form action="">
                    <input type="email" className='email' placeholder='Email Address'/>
                    <button className="registerbtn" onClick={ () => (HandleSignUp) }>Get Started <img src= { arrowright } alt="" /></button>
                    {showRegister && <Register />}
                    </form>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onRequestClose={Close} style={Style}>
                <button onClick={ Close } class='closebtnn'>Close</button>
                < Login />
            </Modal>
        </div>
    );
}

export default Hero;