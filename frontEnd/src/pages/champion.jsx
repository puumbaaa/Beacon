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
            bgColor: !prevState[id].visible ? '#3e2670' : 'green' // Toggle color between red and green
          }
        }));
      };

      function getChampion(name, columns) {

          const champ = new Champion(name);
          champ.FetchChampionInfos(columns)
              .then(result => result.json())
              .then(infos => { console.log(infos[0].presentation) })

      }

      getChampion(champion, [Descriptor.PRESENTATION, Descriptor.DETAILS])

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
                            <h2>Rôle et Position</h2>
                            <h4>Rôle principaux : <b>Combattant / Tank</b></h4>
                            <h4>Position Principale : <b>Top Lane</b></h4>
                            </Col>
                            <Col xs = {9} >
                            <h1>{champ.name}</h1>
                            <p className="textn1">Connu sous le titre du <b>"Destructeur des Mondes"</b>, est un champion de League of Legends classé comme un combattant et un tank mais peut aussi être catégorisé comme un assassin. Appartenant à la race des Darkin, Aatrox est un guerrier redoutable doté de capacités régénératrices exceptionnelles, faisant de lui une force implacable sur le champ de bataille. Son style de jeu se concentre sur ses dégâts massifs tout en restant durable grâce à ses capacités de régénération.</p>
                            <p className="textn1"><b>Aatrox</b> excelle dans la voie du haut où il peut tirer parti de sa capacité à dominer les combats en un contre un. Il est également capable de se déplacer rapidement sur la carte pour participer à des combats d'équipe, grâce à sa mobilité et à ses compétences polyvalentes. Aatrox peut être joué de différentes manières, en fonction des besoins de l'équipe et des préférences du joueur : </p>
                            <p className="textn1"><b>Aatrox</b> est principalement joué comme un Bruiser ou combattant, il se base sur ces énormes dégâts qui le rendent difficile à ignorer et sa régénération colossale lui permettant de survivre un temps considérable lors d'affrontements prolongés, il est autant capable de mettre en déroute les tanks que les carry. En tant que frontliner, Aatrox possède une très bonne capacité à engager les affrontements via ses contrôles et son allonge souvent surprenante pour un corps à corps, il peut également sans aucun problème encaisser les assauts grâce à sa régénération. Aatrox peut également être joué comme un assassin via l'achat d'objets spécifique il pourra sans aucun mal sacrifier sa capacité à tank pour supprimer les carry adverses en une fraction de secondes via son burst.</p>
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
                                    <p>{spell.name}</p>
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
                                <ul>
                                    {sectionIds.slice(0, 4).map((id,index) => (
                                        <div key={id} className={`${isVisible[id].visible ? 'ListShow' : 'List'}`}>
                                            <li
                                            onClick={() => toggleVisibility(id)}
                                            style={{ cursor: 'pointer' }}
                                            >
                                            {StrenghtWeakness[index]}
                                            </li>
                                            <div
                                                id={id}
                                                className={`transition-container ${isVisible[id].visible ? 'show' : 'hide'}`}
                                            >
                                            <iframe
                                                    width="560"
                                                    height="315"
                                                    src="https://www.youtube.com/embed/36XeNmTKvXY?si=Y4Cr5ELZMyC7L19R"
                                                    title="YouTube video player"
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                    referrerPolicy="strict-origin-when-cross-origin"
                                                    allowFullScreen
                                            />
                                            </div>
                                        </div>
                                    ))}
                                </ul>
                                
                            </Col>
                            <Col xs = {6}>
                                <h3>Faiblesses</h3>
                                <ul>
                                    {sectionIds.slice(4, 8).map((id,index) => (
                                        <div key={id} className={`${isVisible[id].visible ? 'ListShow' : 'List'}`}>
                                            <li
                                            onClick={() => toggleVisibility(id)}
                                            style={{ cursor: 'pointer' }}
                                            >
                                            {StrenghtWeakness[index + 4]}
                                            </li>
                                            <div
                                                id={id}
                                                className={`transition-container ${isVisible[id].visible ? 'show' : 'hide'}`}
                                            >
                                            <iframe
                                                    width="560"
                                                    height="315"
                                                    src="https://www.youtube.com/embed/36XeNmTKvXY?si=Y4Cr5ELZMyC7L19R"
                                                    title="YouTube video player"
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                    referrerPolicy="strict-origin-when-cross-origin"
                                                    allowFullScreen
                                            />
                                            </div>
                                        </div>
                                    ))}
                                </ul>
                                
                            </Col>
                        </Row>
                    </Container>
                    <Container className="Container">
                        <Row>
                            <h2>Comment jouer en Early, Mid et Late Game</h2>
                            <h3>Early game</h3>
                            <Col xs = {9}>
                                <p>Aatrox doit jouer prudemment en début de partie. Son principal objectif est de farmer en toute sécurité pour obtenir ses premiers objets. Il doit utiliser l'épée des Darkins pour harceler les ennemis tout en récupérant les sbires. Il est également important de maîtriser le timing et le positionnement de La Chaînea Infernalea pour forcer des échanges avantageux ou pour se repositionner. Attention cependant aux ganks ennemis, car Aatrox est relativement vulnérable sans ses compétences de mobilité.</p>
                            </Col>
                            <Col xs = {3}>
                                <img/>
                            </Col>
                            <h3>Mid game</h3>
                            <Col xs = {3}>
                                <img/>
                            </Col>
                            <Col xs = {9}>
                                <p>À ce stade, Aatrox devrait avoir complété ses premiers objets majeurs et commencé à avoir un impact dans les combats. Il devient un puissant duelliste et peut dominer sa voie ou décaler pour aider son équipe. Aatrox doit chercher à engager des combats prolongés, où il peut maximiser son sustain et son potentiel de dégâts. Son ultime, Fossoyeur des mondes, lui permet d’être une menace constante sur la carte, particulièrement lors des combats d'équipe car chaque élimination allonge la durée de cette compétence.</p>
                            </Col>
                            <h3>Late game</h3>
                            <Col xs = {9}>
                                <p>En fin de partie, Aatrox devient un pilier des combats d'équipe. Son rôle est de cibler les carrys ennemis ou d'absorber les dégâts pour son équipe. Il doit toujours chercher à frapper plusieurs ennemis avec l'épée des Darkins et à maintenir son sustain grâce à Posture du massacreur et le Fossoyeur des mondes. Le contrôle de la vision est essentiel pour Aatrox, car il peut facilement se faire kiter ou attraper s'il est mal positionné. L’objectif est de rester en première ligne tout en ayant un impact décisif grâce à son burst et à sa capacité de régénération.</p>
                            </Col>
                            <Col xs = {3}>
                                <img/>
                            </Col>
                        </Row>
                    </Container>
                    <p>{champ.lore}</p>
                </div>
            ))}
        </div>
    );
    
}