import React, { useEffect, useState } from "react";
import '../pages_style/home_style.css';
import '../pages_style/champions.css'
import { Row, Col } from 'react-bootstrap';
import { Container } from "react-bootstrap";
import {Champion, Descriptor} from "../handlers/champion_data.jsx";

// Fetch champion info asynchronously
export async function getInfoChamp(version, language, champion) {
    const link = `https://ddragon.leagueoflegends.com/cdn/${version}/data/${language}/champion/${champion}.json`;
    console.log(link);
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
    

    const StrenghtWeakness = ["Sustain Élevé : Grâce à la Posture du massacreur, le passif de la ruée obscure et le fossoyeur des mondes, Aatrox peut se soigner considérablement, surtout lors des combats prolongés.",
                            "Dégâts en Zone : L'épée des Darkins, inflige des dégâts de zone, le rendant redoutable dans les combats en équipe.",
                            "Contrôle de Foule : Les Chaînes Infernales et les différentes phases de Frappe des Ténèbres offrent des outils de contrôle.",
                            "Polyvalence en Combat : Aatrox peut engager, désengager ou poursuivre les ennemis grâce au fossoyeur des mondes qui augmente sa mobilité et ses dégâts.",
                            "Vulnérabilité au Kiting : Aatrox est faible contre les champions ayant une grande mobilité ou pouvant l'empêcher d'approcher",
                            "Dépendance aux Compétences : Ses compétences doivent être bien utilisées pour maximiser son potentiel. Si ses skillshots, notamment l'épée des Darkins, sont esquivés, Aatrox devient beaucoup moins menaçant.",
                            "Faiblesse en Early Game : Avant d'obtenir ses premiers objets et son ultime, Aatrox peut être vulnérable, en particulier contre des champions à burst ou les champions très mobiles.",
                            "Faible en Cas de Retard : Si Aatrox prend du retard en début de partie, il peut avoir du mal à rester pertinent, car il nécessite des objets pour être efficace."]

    const sectionCount = 8;
    const sectionIds = Array.from({ length: StrenghtWeakness.length }, (_, i) => `Demo${i + 1}`);
    const [isVisible, setIsVisible] = useState(
        sectionIds.reduce((acc, id) => ({ ...acc, [id]: {visible : false, bgColor: '#3e2670'}}), {})
      );
    
      const toggleVisibility = (id) => {
        setIsVisible((prevState) => ({
          ...prevState,
          [id]: {
            visible: !prevState[id].visible,
            bgColor: !prevState[id].visible ? '#3e2670' : 'green' 
          }
        }));
      };
      const [infoGuid, setInfoGuid] = useState(null);
      const [error, setError] = useState(null);
    
      useEffect(() => {
        async function getChampion(name, columns) {
          try {
            const champ = new Champion(name);
            const result = await champ.FetchChampionInfos(columns);
            const infos = await result.json();
            setInfoGuid(infos[0]);
          } catch (err) {
            setError('Failed to fetch champion data');
          }
        }
    
        getChampion(champion.toLocaleLowerCase(), [Descriptor.PRESENTATION, Descriptor.DETAILS, Descriptor.ROLE, Descriptor.POSITION, Descriptor.FORCES, Descriptor.WEAKNESS, Descriptor.EARLY, Descriptor.MID, Descriptor.LATE, Descriptor.GOODMU, Descriptor.BADMU, Descriptor.TIPS]);
      }, [champion]);
    

    return (
        <div>

            {infoChamp.data && Object.values(infoChamp.data).map((champ, index) => (
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
                        <h2>Compétences D'Aatrox</h2>
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
            ))}
        </div>
    );
    
}