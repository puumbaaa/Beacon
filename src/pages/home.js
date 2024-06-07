import React from 'react';
import './home_style.css';
import { Title, Meta, Link} from 'react-head';
//Script, Style

function Home() {
    return (
        <>
            <Title>Beacon</Title>
            <Meta name="description" content="This is a website to improve your level on League of Legends" />
            <Meta http-equiv="pragma" content="no-cache" />
            <Meta charset="UTF-8"/>
            <Meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <Link rel="shortcut icon" href="../img/logo_beacon.png" />

            <div id="wallpaper"></div>

            <body>
            <div id="page1" className="page">
                <div className="main">
                    <div className="header">
                        <img
                            className="logo"
                            src="../img/logo_beacon.png"
                            alt="logo"
                        />
                        <div className="Name">
                            <h1>BEACON</h1>
                        </div>
                        <div className="menu">
                            <ul>
                                <li><a href="./guides.js">GUIDES</a></li>
                                <li><a href="/usersearch">Player Search</a></li>
                                <li><a href="./profil_in_game.js">PROFIL IN-GAME</a></li>
                                <li><a href="./pro_tips.js">PRO TIPS</a></li>
                                <li><a href="./e-sport.js">E-SPORT</a></li>
                            </ul>
                        </div>
                        <div className="profil"></div>
                        <img
                            className="login"
                            src="../img/login_img.png"
                            alt="login"
                        />
                    </div>
                </div>
            </div>
            </body>
        </>
    );
}

export default Home;