import { useState, createRef } from 'react';
import "./test.css"

export default function Gallery() {

    const regionEnd = {
        eu: "EUW",
        na: "NA1",
        jp: "JP1",
        kr: "KR",
        br: "BR1",
        oc: "OCE",
    }

    const key = "RGAPI-df78a024-995e-47c3-bc13-219bd38effce";

    const [data, setData] = useState(null);
    const [matchIds, setMatchIds] = useState(null);

    const [search, setSearch] = useState(null)
    const [region, setRegion] = useState(null)

    const inputRef = createRef();
    const regionRef = createRef();

    function handleSubmit() {
        setSearch(inputRef.current.value.split("#"))
        setRegion(regionEnd[regionRef.current.value])
    }

    function UpdateSearchData(url, userName, gameTag, apiKey) {

        if (userName == null || gameTag == null || apiKey == null) {
            return;
        }

        console.log(url + "/" + userName + '/' + gameTag + '?api_key=' + apiKey)
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

    function GetSearchInfos(search, url, apikey) {

        if (search.length > 1) {
            UpdateSearchData(url, search[0], search[1], apikey)
        } else {
            UpdateSearchData(url, search[0], region, apikey)
        }

        setSearch(null)

    }

    function DisplayLastMatches(puuid, period, match_type, url, count, apikey) {
        GetLastMatches(puuid, period, match_type, url, count, apikey)
    }

    function GetLastMatches(puuid, period, match_type, url, count, apikey) {

        let end_point = Math.floor(Date.now() / 1000)
        let start_point = end_point - 60 * 60 * 24 * period

        let query = url + "/" + puuid + "/ids?startTime=" + start_point + "&endTime=" + end_point + "&queue=" + match_type + "&start=0&count=" + count + "&api_key=" + apikey

        fetch(query)
            .then(response => response.json())
            .then(result => {
                setMatchIds(result)
            })
            .catch(error => {
                console.log(error);
                window.stop();
            });

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

                <h1> { localStorage.getItem("search_puuid") } </h1>
                <h1> { localStorage.getItem("search_username") } </h1>

            </div>

            <input type="search" ref={inputRef}/>
            <button onClick={handleSubmit}> Rechercher le joueur</button>

            <div>
                {
                    search ?
                        GetSearchInfos(search,
                            "https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id", key)
                        : ""
                }

                {
                    search ?
                        GetLastMatches(localStorage.getItem("search_puuid"), 30, 420, "https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid", 20, key)
                        : ""
                }
                <h1>
                    {
                        matchIds ? JSON.stringify(matchIds) : "Loading matches..."
                    }
                </h1>
            </div>



        </div>
    );
}