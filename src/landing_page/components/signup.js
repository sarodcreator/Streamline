import React, { useState } from 'react';

const Register = () => {

    const [isSignUpOpen, setSignUpOpen] = useState(false);
    const [isForgotPasswordOpen, setForgotPasswordOpen] = useState(false);
    const [passwordError, setPasswordError] = useState('');

    const openModal = (type) => {
        if (type === 'signUp') {
            setSignUpOpen(true);
        } else if (type === 'forgotPassword') {
            setForgotPasswordOpen(true);
        }
    };

    const closeModal = (type) => {
        if (type === 'signUp') {
            setSignUpOpen(false);
        } else if (type === 'forgotPassword') {
            setForgotPasswordOpen(false);
        }
    };

    const handleSignUpSubmit = (event) => {
        event.preventDefault();
        const passwordInput = event.target.password.value;
        if (passwordInput.length < 8) {
            setPasswordError('Password must be at least 8 characters long.');
        } else {
            setPasswordError('');
            alert('Sign-Up Form submitted!');
            closeModal('signUp');
        }
    };

    const handleForgotPasswordSubmit = (event) => {
        event.preventDefault();
        alert('Password reset link sent to your email!');
        closeModal('forgotPassword');
    };

    return (
        <div style={styles.container}>
            <button className="open-btn" onClick={() => openModal('signUp')}>Sign Up</button>
            {isSignUpOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <button className="close-btn" onClick={() => closeModal('signUp')}>X</button>
                        <h2>Sign Up</h2>
                        <form onSubmit={handleSignUpSubmit}>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input type="text" id="username" name="username" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" name="password" required />
                                {passwordError && <span className="error-message">{passwordError}</span>}
                            </div>
                            <button type="submit" className="submit-btn" onClick={() => ({})}>Sign Up</button>
                            <span className="forgot-password" onClick={() => openModal('forgotPassword')}>Forgot Password?</span>
                        </form>
                    </div>
                </div>
            )}
            {isForgotPasswordOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <button className="close-btn" onClick={() => closeModal('forgotPassword')}>X</button>
                        <h2>Forgot Password</h2>
                        <form onSubmit={handleForgotPasswordSubmit}>
                            <div className="form-group">
                                <label htmlFor="resetEmail">Enter your email</label>
                                <input type="email" id="resetEmail" name="resetEmail" required />
                            </div>
                            <button type="submit" className="submit-btn">Reset Password</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        margin: 0,
        backgroundColor: '#f4f4f4',
    },
};

export default Register;
