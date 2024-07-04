import React, { useState, useEffect } from 'react';
import './menu_style.css';

function Menu() {

    const [hasChoice, setHasChoice] = useState(() => {
        const choice = localStorage.getItem("choice");
        return choice !== null;
    });

    useEffect(() => {
        if (hasChoice) {
            setTimeout(() => {
                document.querySelector('.menu-container').classList.add('fade-out');
            }, 100);
        }
    }, [hasChoice]);

    function handleCoaching() {
        localStorage.setItem("choice", 1)
        setHasChoice(true);
    }

    function handleTracking() {
        localStorage.setItem("choice", 2)
        setHasChoice(true)
    }

    return (
        <div className={`menu-container ${ hasChoice ? "fade-out" : "fade-in"}`}>
            <div className="menu-content">
                <div className="left-side" onClick={handleTracking}>
                    <h1>Recherche de joueur</h1>
                </div>
                <div className="lightning-divider"></div>
                <div className="right-side" onClick={handleCoaching}>
                    <h1>Entrainement à League Of Legend</h1>
                </div>
            </div>
        </div>
    );
};

export default Menu;
