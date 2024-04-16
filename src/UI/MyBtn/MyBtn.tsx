import  { FC } from 'react';
import './MyBtn.css'

interface MyButtonProps {
    onClick: () => void;
    children?: React.ReactNode
    className?: string,
    
  }

const MyBtn: FC<MyButtonProps> = ({onClick, children, className}) => {
    return (
        <button className={className ? className + ' my-btn' : ' my-btn'} onClick={onClick}>
            {children}
        </button>
    );
};

export default MyBtn;