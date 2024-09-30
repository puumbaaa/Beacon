import React, { useEffect, useState } from "react";
import '../pages_style/home_style.css';
import '../pages_style/champions.css'
import {Row, Col, Navbar} from 'react-bootstrap';
import { Container } from "react-bootstrap";
import {Champion, Descriptor} from "../handlers/champion_data.jsx";


// Fetch champion info asynchronously
export async function getInfoChamp(version, language, champion) {
    const link = `https://ddragon.leagueoflegends.com/cdn/${version}/data/${language}/champion/${champion}.json`;
    const response = await fetch(link);
    if (!response.ok) {
        throw new Error(`Error fetching champion data: ${response.statusText}`);
    }
    const infoChamp = await response.json();
    return infoChamp;
}

export default function ChampGuid() {
    const [infoChamp, setInfoChamp] = useState({ data: {} });
    const [guidChamp, setGuidChamp] = useState({ data: {} });
    const version = "14.12.1";
    const language = "fr_FR";
    const currentPathname = window.location.pathname;
    const champion = currentPathname.split("/guide/")[1];

    async function getChampion(name, columns) {
        try {
            const champ = await new Champion(name);
            const result = await champ.FetchChampionInfos(columns);

            if (result.ok) {
                const infos = await result.json();
                return infos[0];
            } else {
                throw new Error(`Failed to fetch: ${result.status}`);
            }
        } catch (err) {
            throw new Error(`Error fetching champion: ${err.message}`);
        }
    }

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const result = await getInfoChamp(version, language, champion);
                setInfoChamp(result);
            } catch (error) {
                console.error("Erreur avec notre API :", error.message);
            }
        };

        fetchInfo();
    }, [version, language, champion]);


    const [infoGuid, setInfoGuid] = useState({});
    const [error, setError] = useState();

    async function loadChampion() {
        let result = await getChampion(champion.toLocaleLowerCase(), [Descriptor.PRESENTATION, Descriptor.DETAILS, Descriptor.ROLE, Descriptor.POSITION, Descriptor.FORCES, Descriptor.WEAKNESS, Descriptor.EARLY, Descriptor.MID, Descriptor.LATE, Descriptor.GOODMU, Descriptor.BADMU, Descriptor.TIPS])
        setInfoGuid(result)
    }

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                let result = await getChampion(champion.toLocaleLowerCase(), [Descriptor.PRESENTATION, Descriptor.DETAILS, Descriptor.ROLE, Descriptor.POSITION, Descriptor.FORCES, Descriptor.WEAKNESS, Descriptor.EARLY, Descriptor.MID, Descriptor.LATE, Descriptor.GOODMU, Descriptor.BADMU, Descriptor.TIPS])
                setInfoGuid(result)
            } catch (error) {
                console.error("Erreur avec notre API :", error.message);
            }
        };

        fetchInfo();
    }, [champion]);

    return (
        <div>

            { infoGuid !== null && infoGuid.presentation !== null && infoChamp.data ?
                Object.values(infoChamp.data).map((champ, index) => (
                <div key={index}>
                    <Container className="Container">
                        <Row>
                            <Col xs ={3}>
                            <img 
                                src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ.id}_0.jpg`} 
                                alt={`${champ.name} loading screen`} 
                            />
                            </Col>
                            <Col xs = {9} >
                            <h1>{champ.name}</h1>
                            <p className="textn1">{infoGuid.presentation}</p>
                            <h2>Rôle et Position</h2>
                            <h4>Rôle principaux : <b>{infoGuid.role}</b></h4>
                            <h4>Position Principale : <b>{infoGuid.position}</b></h4>
                            <p className="textn1">{infoGuid.details}</p>
                            
                            </Col>
                        </Row>
                    </Container>
                    <Container className="Container">
                        <Row>
                        <h2>Compétences de {champ.name}</h2>
                            {champ.spells.map((spell, spellIndex) => (
                                <Col key={spellIndex} md={3}>
                                    <img
                                    
                                    src={`https://ddragon.leagueoflegends.com/cdn/14.12.1/img/spell/${spell.id}.png`}
                                    alt={`${champ.name} ${spell.name}`}
                                    />
                                    <p><b>{spell.name}</b></p>
                                    <p>{spell.description}</p>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                    <Container className="Container">
                        <Row>
                            <h2>Forces et Faiblesses</h2>
                            <Col xs = {6}>
                                <h3>Forces</h3>
                                <p>{infoGuid.forces}</p>
                            </Col>
                            <Col xs = {6}>
                                <h3>Faiblesses</h3>
                                <p>{infoGuid.weakness}</p>
                                
                            </Col>
                        </Row>
                    </Container>
                    <Container className="Container">
                        <Row>
                            <h2>Comment jouer en Early, Mid et Late Game</h2>
                            <h3>Early game</h3>
                            <Col xs = {9}>
                                <p>{infoGuid.early}</p>
                            </Col>
                            <Col xs = {3}>
                                <img/>
                            </Col>
                            <h3>Mid game</h3>
                            <Col xs = {3}>
                                <img/>
                            </Col>
                            <Col xs = {9}>
                                <p>{infoGuid.mid}</p>
                            </Col>
                            <h3>Late game</h3>
                            <Col xs = {9}>
                                <p>{infoGuid.late}</p>
                            </Col>
                            <Col xs = {3}>
                                <img/>
                            </Col>
                        </Row>
                    </Container>
                    <Container className="Container">
                        <h2> Match-up facile</h2>
                        <p>{infoGuid.goodMU}</p>
                    </Container>
                    <Container className="Container">
                        <h2> Match-up difficile</h2>
                        <p>{infoGuid.badMU}</p>
                    </Container>
                    <Container className="Container">
                        <h2>Tips et Tricks</h2>
                        <p>{infoGuid.tips}</p>
                    </Container>
                </div>
            )) : "" }
        </div>
    );
    
}