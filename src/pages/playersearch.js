import {createRef, useState} from 'react';
import "./test.css"
import moment from "moment";

export default function UserSearching() {

    const regionEnd = {
        eu: "EUW",
        na: "NA1",
        jp: "JP1",
        kr: "KR",
        br: "BR1",
        oc: "OCE",
    }

    const key = "RGAPI-2f8a5bba-b35b-4e14-a14b-47a0cc848a2c";

    const [data, setData] = useState(null);
    const [matches, setMatches] = useState([]);

    const [search, setSearch] = useState(null)
    const [region, setRegion] = useState(null)

    const inputRef = createRef();
    const regionRef = createRef();

    function handleSubmit() {
        setSearch(inputRef.current.value.split("#"))
        setRegion(regionEnd[regionRef.current.value])
    }

    function addMatch(item) {
        setMatches(prevItems => [...prevItems, item]);
    }

    function updateSearchData(url, userName, gameTag, apiKey) {

        if (userName == null || gameTag == null || apiKey == null) {
            return;
        }

        fetch(url + "/" + userName + '/' + gameTag + '?api_key=' + apiKey)
            .then(response => response.json())
            .then(result => {
                setData(result)

                localStorage.setItem("search_puuid", data["puuid"])
                localStorage.setItem("search_username", data["gameName"])
                localStorage.setItem("search_tag", data["tagLine"])
            })
            .catch(error => {
                console.log(error);
                window.stop();
            });

    }

    function getSearchData(search, url, apikey) {

        if (search.length > 1) {
            updateSearchData(url, search[0], search[1], apikey)
        } else {
            updateSearchData(url, search[0], region, apikey)
        }

        setSearch(null)

    }

    function getLastMatches(puuid, period, match_type, url, count, apikey) {

        let end_point = Math.floor(Date.now() / 1000)
        let start_point = end_point - 60 * 60 * 24 * period

        let query = url + "/" + puuid + "/ids?startTime=" + start_point + "&endTime=" + end_point + "&start=0&count=" + count + "&api_key=" + apikey

        fetch(query)
            .then(response => response.json())
            .then(result => {

                for (let i = 0; i < result.length; i++) {

                    let query = "https://europe.api.riotgames.com/lol/match/v5/matches/" + result[i] + "?api_key=" + apikey
                    fetch(query)
                        .then(response => response.json())
                        .then(result => {
                            console.log(result)
                            addMatch(result)
                        })
                        .catch(error => {
                            console.log(error);
                            window.stop();
                        });

                }

            })
            .catch(error => {
                console.log(error);
                window.stop();
            });

    }

    function displayMatch() {

        return (
            <div>
                {matches.map(match => {
                    if (!match.info) return;
                    let date = moment(new Date(match.info.gameCreation)).format("L LTS")
                    return (
                        <div id="match-card">
                            <h1> {date} </h1>

                        </div>
                    )
                })}
            </div>
        )

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

            <div>
                {
                    search ?
                        getSearchData(search,
                            "https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id", key)
                        : ""
                }

                {
                    search ?
                        getLastMatches(localStorage.getItem("search_puuid"), 7, 430,
                            "https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid", 20, key)
                        : ""
                }
            </div>

            <div id="match-root">
                {matches.length > 0 ? displayMatch() : "No search"}
            </div>

        </div>
    );
}