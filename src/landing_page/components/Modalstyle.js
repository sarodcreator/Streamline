import { useState, useEffect } from "react";

const Modal = () => {
    const [isMobile,setIsMobile] = useState(window.innerWidth <= 600);
    useEffect((isMobile) => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 600);
        };
        window.addEventListener('resize', handleResize);
        return () =>
        window.removeEventListener('resize', handleResize);
    }, []);
    const style = Modalstyle(isMobile);
    return style;
}

const Modalstyle = (isMobile) => ({
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        height: 'auto',
        transform: 'translate(-50%, -50%)',
        padding: isMobile ? '16px' : '20px',
        borderRadius: '16px',
        width: isMobile ? '100%' : '400px',
        backgroundColor: isMobile ? '#121212' : '#121212',
        overlay: 'rgba(0, 0, 0, 0.75)',
    },
});
export default Modal;