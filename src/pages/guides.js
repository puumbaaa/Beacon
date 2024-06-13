import React, { useState} from 'react';

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
    
        const elements = Object.values(champs.data).map((champ, index) => (
            <div key={index}>
                <h2>{champ.name}</h2>
                <img src={`https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${champ.id}_0.jpg`} alt={`${champ.name} loading screen`}/>
                <p>{champ.title}</p>
                <p>{champ.blurb}</p>
            </div>
        ));
    
        return (
            <div>
                <div>{elements}</div>
            </div>
        );
    }
    
    
    
    
    

    return (
        <div>
            <button onClick={handleSubmit}> get data</button>
            {content ? content : "loading data..."}
        </div>
    );
}