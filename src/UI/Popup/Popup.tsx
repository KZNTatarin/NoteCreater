import React, { FC } from 'react';
import './Popup.css'

interface PopupProps {
    active: boolean,
    setActive: React.Dispatch<React.SetStateAction<boolean>>,
    children?: React.ReactNode
}

const Popup: FC<PopupProps> = ({active, setActive, children}) => {
    if (active) {        
        document.body.style.overflow = 'hidden'
    } else {
        document.body.style.overflow = 'auto'
    }

    return (
        <div onClick={() => setActive(false)} className={active ? 'modal active' : 'modal'}>
            <div className="modal__content" onClick={e => e.stopPropagation()}>
            {children}
            </div>
        </div>
    );
};

export default Popup;