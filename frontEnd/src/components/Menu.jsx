import React, { useState, useEffect } from 'react';
import './menu_style.css';

const Menu = ({ onClose }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const handleChoice = () => {
        setVisible(false);
        setTimeout(onClose, 500);
    };

    return (
        <div className={`menu-container ${visible ? 'fade-in' : 'fade-out'}`}>
            <div className="menu-content">
                <div className="left-side" onClick={handleChoice}>
                    <h1>OP.GG</h1>
                </div>
                <div className="lightning-divider"></div>
                <div className="right-side" onClick={handleChoice}>
                    <h1>COACHING</h1>
                </div>
            </div>
        </div>
    );
};

export default Menu;
