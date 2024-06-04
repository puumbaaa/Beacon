import { useState, createRef } from 'react';
import "./test.css"

export default function Gallery() {

    const [data, setData] = useState(null);
    const [search, setSearch] = useState(null)
    const inputRef = createRef();

    function handleSubmit() {
        setSearch(inputRef.current.value.split("#"))
    }

    function UpdateSearchData(url, userName, gameTag, apiKey) {

        fetch(url + "/" + userName + '/' + gameTag + '?api_key=' + apiKey)
            .then(response => response.json())
            .then(result => {
                setData(result)

                localStorage.setItem("puuid", data["puuid"])
                localStorage.setItem("username", data["gameName"])
                localStorage.setItem("tag", data["tagLine"])
            })
            .catch(error => {
                console.log(error);
                window.stop();
            });

    }

    function GetSearchInfos(search, url, apikey) {

        console.log("Nique ta mere")
        UpdateSearchData(url, search[0], search[1], apikey)

    }

    return (
        <div>

            <input type="search" ref={inputRef} />
            <button onClick={handleSubmit}> Rechercher le joueur </button>

            <div>
                <h2> {localStorage.getItem("username")} </h2>
                <h2> {localStorage.getItem("tag")} </h2>
                <h2> {localStorage.getItem("puuid")} </h2>
            </div>

            <div>
                {
                    search && !localStorage.getItem("puuid") ?
                        GetSearchInfos(search,
                            "https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id",
                            "RGAPI-df78a024-995e-47c3-bc13-219bd38effce")
                        : "Pas de recherche"
                }
            </div>

            {localStorage.getItem("puuid") != null ? <div>{ localStorage.getItem("username") }</div> : <div>Loading...</div>}

        </div>
    );
}