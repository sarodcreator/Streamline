import Login from '../Login/login';
import Modal from 'react-modal';
import './nav.css';
import logonetflix from '../../assets/Logonetflix.png';
import Lang from '../components/dropdowns';
import arrowright from '../../assets/arrow-right.png';
import { useModal } from '../components/Modal';
import Style from '../components/Modalstyle';

const Hero = () => {
    const { isModalOpen, Open, Close  } = useModal();
    return (
        <div className="hero">
            <div className="box">
                <div className="header">
                    <img src={logonetflix} alt="netflix logo" />
                    <div className="left">
                        < Lang />
                        <button className='loginbtn' onClick={Open}>Login</button> 
                    </div>
                </div>
                <div className="content">
                    <h1>Unlimited movies, Tv <br />shows, and more</h1>
                    <p>Watch for free, Ready to Watch?</p>
                    <form action="">
                    <input type="email" className='email' placeholder='Email Address'/>
                    <button className="registerbtn">Get Started <img src= { arrowright } alt="" /></button>
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