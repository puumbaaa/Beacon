import {createRef, useState} from 'react';
import "./test.css"
import moment from "moment";
import * as riot from "./riot_handler";

export default function UserSearching() {

    const regionEnd = {
        eu: "EUW",
        na: "NA1",
        jp: "JP1",
        kr: "KR",
        br: "BR1",
        oc: "OCE",
    }

    const key = "RGAPI-34c7babd-ac70-42e5-8c71-f324e134f0b1";

    const [matchDisplay, setMatchDisplay] = useState(null);

    const inputRef = createRef();
    const regionRef = createRef();

    function handleSubmit() {

        updateMatchData(inputRef.current.value.split("#"), regionEnd[regionRef.current.value], key);

    }

    function addArrayItem(item, func) {
        func(prevItems => [...prevItems, item]);
    }

    async function updateSearchData(userName, gameTag, apiKey) {

        if (userName == null || gameTag == null || apiKey == null) {
            return null;
        }

        await riot.getUserByNameTag(userName, gameTag, apiKey).then(result => {
            localStorage.setItem("search_puuid", result["puuid"])
            localStorage.setItem("search_username", result["gameName"])
            localStorage.setItem("search_tag", result["tagLine"])
        })

    }

    async function getSearchData(search, region, apikey) {

        if (search.length > 1) {
            await updateSearchData(search[0], search[1], apikey)
        } else {
            await updateSearchData(search[0], region, apikey)
        }

    }

    async function updateMatchData(search, region, apiKey) {
        await getSearchData(search, region, apiKey);

        let matches = await riot.getPlayerLastMatches(localStorage.getItem("search_puuid"), 7, 5, apiKey)

    }

    async function displayMatch() {
        /*
        return (
                <div id="card-container">
                    {matches.map(match => {
                        if (!match.info) return null;
                        let date = moment(new Date(match.info.gameCreation)).format("L LTS");

                        return (
                            <div id="match-card">
                                <h1> {date} </h1>
                                <h2> {participantNames.map(name => {
                                    console.log(name)
                                    return name + " "
                                })}
                                </h2>
                            </div>
                        )
                    })}
                </div>
            );*/
        }

    return (

        <div>

            <select name="options" id="options" ref={regionRef}>
                <option value="na">North America</option>
                <option value="eu">Europe West</option>
                <option value="jp">Japan</option>
                <option value="kr">Korean</option>
                <option value="br">Brazil</option>
                <option value="oc">Oceania</option>
            </select>

            <div>

                <h1> {localStorage.getItem("search_puuid")} </h1>
                <h1> {localStorage.getItem("search_username")} </h1>

            </div>

            <input type="search" ref={inputRef}/>
            <button onClick={handleSubmit}> Rechercher le joueur</button>

            <div id="match-root">

            </div>

        </div>
    );
}