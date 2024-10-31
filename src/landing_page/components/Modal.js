import Modal from 'react-modal';
import {useState} from 'react';

Modal.setAppElement('#root');

export const useModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const Open = () => {
        setIsModalOpen(true)
    };

    const Close = () => {
        setIsModalOpen(false)
    };

    return {
        isModalOpen,
        Open,
        Close,
    }
};