import React, { useEffect, useState } from "react";
import { Row, Col } from 'react-bootstrap';
import { Container } from "react-bootstrap";

// Fetch champion info asynchronously
export async function getInfoChamp(version, language, champion) {
    const link = `https://ddragon.leagueoflegends.com/cdn/${version}/data/${language}/champion/${champion}.json`;
    console.log(link);
    const response = await fetch(link);
    if (!response.ok) {
        throw new Error(`Error fetching champion data: ${response.statusText}`);
    }
    const infoChamp = await response.json();
    console.log(infoChamp);
    return infoChamp;
}

export default function ChampGuid() {
    const [infoChamp, setInfoChamp] = useState({ data: {} });
    const version = "14.12.1";
    const language = "fr_FR";
    const currentPathname = window.location.pathname;
    const champion = currentPathname.split("/guide/")[1];
    console.log(champion);

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

    return (
        <div>
            {infoChamp.data && Object.values(infoChamp.data).map((champ, index) => (
                <div key={index}>
                    <img 
                        src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ.id}_0.jpg`} 
                        alt={`${champ.name} loading screen`} 
                    />
                    <Container>
                        <Row>
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
                    <p>{champ.lore}</p>
                </div>
            ))}
        </div>
    );
    
}