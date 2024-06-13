import React, { useState} from 'react';
import {Container,Row,Col} from 'react-bootstrap';
import { Link } from "react-router-dom";
import '../pages_style/guide.css'

export async function getListChamp(version, language) {
    const response = await fetch("https://ddragon.leagueoflegends.com/cdn/" + version + "/data/" + language + "/champion.json")
    const listChamp = response.json()
    return listChamp
}

export default function ListChampGuid() {
    const [content, setContent] = useState(null);

    function handleSubmit() {

        listChamp().then(result => {
            setContent(result);
            console.log(content);
        })

    }

    async function listChamp() {
        let listChamps = await getListChamp("14.12.1", "fr_FR")
        console.log(typeof(listChamps.data))
        return displayChamp(listChamps);
    }

    function displayChamp(champs) {
        if (!champs || typeof champs.data !== 'object') {
            console.error("champs.data is not an object or is undefined");
            return null; 
        }
        
        return (
            <Container >
                <Row>
                    {Object.values(champs.data).map((champ, index) => (
                        <Col key={index} md={4}>
                            <div className='hover'>
                            <h2>{champ.name}</h2>
                            <figure>
                            
                            <Link to={`${champ.id}`}><img src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ.id}_0.jpg`} alt={`${champ.name} loading screen`}/></Link>   
                            </figure>
                            <p>{champ.title}</p>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        );
    }
    
    
    
    
    

    return (
        <div>
            <button onClick={handleSubmit}> get data</button>
            {content ? content : "loading data..."}
        </div>
    );
}