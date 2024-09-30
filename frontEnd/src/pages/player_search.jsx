// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import '../pages_style/home_style.css';
import '../pages_style/search.css';
import moment from 'moment';
import {Container} from 'react-bootstrap';
import * as riot from '../handlers/riot_handler.jsx';
import {SearchBar} from "../components/searchbar.jsx";
import '../pages_style/sprite.css'

export default function UserSearching() {
    const regionEnd = {
        eu: 'EUW',
        na: 'NA1',
        jp: 'JP1',
        kr: 'KR',
        br: 'BR1',
        oc: 'OCE',
    };

    const key = import.meta.env.VITE_API_KEY_RIOT

    const [content, setContent] = useState(null);
    const [firstLoad, setFirstLoad] = useState(true);


    /*async function getrune(version, language, idMain, idRune) {
        const link = "https://ddragon.leagueoflegends.com/cdn/"+ version +"/data/"+ language +"/runesReforged.json";
        const response = await fetch(link);
        let linkrune = "https://ddragon.leagueoflegends.com/cdn/img/"
        if (!response.ok) {
            throw new Error(`Error fetching rune data: ${response.statusText}`);
        }
        const rune = await response.json();
        linkrune += pain(rune, idMain, idRune)
        return linkrune;
    }

    function pain(rune, idMain, idRune){
        let add
        if(idMain === idRune) {
            rune.map(id =>{
            if(id.id === idMain) {
                add = id.icon
                }
            })
        }
        rune.map(id => {
            if (id.id === idMain) {
                id.slots.map(id2 =>{
                    id2.runes.map(id3 =>
                    {
                        if(id3.id === idRune){
                            add = id3.icon
                        }
                    })
                })
            }})
        return add
    }*/

    async function updatePageData() {

        if (firstLoad) {
            setFirstLoad(false)
            updateMatchData(localStorage.getItem("search_username"), localStorage.getItem("search_tag"), key).then(result => {
                setContent(result);
            })
        }

    }
    async function updateSearchData(userName, gameTag, apiKey) {
        if (userName == null || gameTag == null || apiKey == null) {
            return null;
        }

        await riot.GetUserByNameTag(userName, gameTag, apiKey).then(result => {
            localStorage.setItem('search_puuid', result.puuid);
            localStorage.setItem('search_username', result.gameName);
            localStorage.setItem('search_tag', result.tagLine);
        });
    }

    async function getSearchData(search, region, apikey) {
        if (typeof search == "string") {
            await updateSearchData(search, region, apikey);
        } else if (search.length > 1) {
            await updateSearchData(search[0], search[1], apikey);
        } else {
            await updateSearchData(search[0], region, apikey);
        }
    }

    async function updateMatchData(search, region, apiKey) {

        await getSearchData(search, region, apiKey);

        let matches = await riot.GetPlayerLastMatches(localStorage.getItem('search_puuid'), 30, 10, -1, apiKey);
        return displayMatches(matches)

    }

    async function reload(userName, gameTag, apiKey){
        await updateSearchData(userName, gameTag, apiKey);
        window.location.reload();
    }

    function queuename(queueID){
        /*https://static.developer.riotgames.com/docs/lol/queues.json*/
        switch(queueID){
            case 400:
                return "Draft"
                
            case 420:
                return "Ranked Solo/Duo"
                
            case 440:
                return "Ranked Flex"
                
            case 450:
                return "ARAM"
                
            case 490:
                return "Quickplay"
                
            case 700:
                return "Clash (Summoner's Rift)"
                
            case 720:
                return "Clash (ARAM)"
                
            case 870:
                return "Co-op vs. AI (Intro)"
                
            case 880:
                return "Co-op vs. AI (Beginner)"
                
            case 890:
                return "Co-op vs. AI (Intermediate)"
                
            case 900:
                return "ARURF"
                
            default:
                return "ERROR"
        }
    }

    function displayMatches(matches) {
        return (
            <div id="card-container">
                {
                    matches.map(match => {
                        try {
                            let date = moment(new Date(match.data.gameCreation)).format("L LTS");
                            let players = []
                            let team1 = []
                            let team2 = []
                            let win
                            if(match.data.queueId === 1810 || match.data.queueId === 1820 || match.data.queueId === 1830 || match.data.queueId === 1840 || match.data.queueId === 1710 || match.data.queueId === 1700) {
                                return (<div>Swarm and arena not supported</div>)
                            }
                            else{
                                return(
                                <div>
                                    <div className="CardHeader"> Match du {date} </div>
                                    <div className="CardContent">
                                        {
                                            match.data.participants.map(participantInfos=>{
                                                if (participantInfos.puuid === localStorage.getItem('search_puuid')) {
                                                    players.push(participantInfos)
                                                    win = participantInfos.win
                                                    return (
                                                        // eslint-disable-next-line react/jsx-key
                                                        <div className={"CardPlayer win" + [win]}>
                                                            <div className={"Player-info"}>
                                                                <p>{queuename(match.data.queueId)}</p>
                                                                <p> {participantInfos.riotIdGameName}</p>
                                                                <div>
                                                                    <div className={"champion"}>
                                                                        <div className={"champ" + win}>
                                                                            <img className={"item-display"}
                                                                                 alt={"icon" + participantInfos.championName}
                                                                                 src={"https://ddragon.leagueoflegends.com/cdn/14.19.1/img/champion/" + participantInfos.championName + ".png"}
                                                                                 onError={({currentTarget}) => {
                                                                                     currentTarget.onerror = null; // prevents looping
                                                                                     currentTarget.style.display = "none";
                                                                                 }}/>
                                                                        </div>
                                                                        <span className={"summonerspell"}>
                                                                            <span className={"sum" + win}>
                                                                                <span
                                                                                    className={"summoner summonerID" + participantInfos.summoner1Id}></span>
                                                                                <span
                                                                                    className={"summoner summonerID" + participantInfos.summoner2Id}></span>

                                                                            </span>
                                                                            <span className={"rune" + win}>
                                                                                <span
                                                                                    className={"summoner runesID" + participantInfos.perks.styles[0].selections[0].perk}></span>
                                                                                <span
                                                                                    className={"summoner runesID" + participantInfos.perks.styles[1].style}></span>
                                                                            </span>
                                                                        </span>
                                                                        <span
                                                                            id={"champname"}>{participantInfos.championName}</span>
                                                                    </div>
                                                                </div>
                                                                <p> {"KDA: " + participantInfos.kills + "/" + participantInfos.deaths + "/" + participantInfos.assists}
                                                                    {" " + Number.parseFloat(participantInfos.challenges.kda).toFixed(2)}</p>
                                                                <p>{" Kill Participation: " + Math.ceil(participantInfos.challenges.killParticipation * 100) + "%"} </p>
                                                                <p> {"Dégâts totaux aux champions: " + participantInfos.totalDamageDealtToChampions} </p>
                                                            </div>
                                                            <div className={"item-list"}>
                                                                <div>
                                                                    <div className={"item" + win}>
                                                                        <img className={"item-display"}
                                                                             alt={"item" + participantInfos.item0}
                                                                             src={"https://ddragon.leagueoflegends.com/cdn/14.19.1/img/item/" + participantInfos.item0 + ".png"}
                                                                             onError={({currentTarget}) => {
                                                                                 currentTarget.onerror = null; // prevents looping
                                                                                 currentTarget.style.display = "none";
                                                                             }}/>
                                                                    </div>
                                                                    <div className={"item" + win}>
                                                                        <img className={"item-display"}
                                                                             alt={"item" + participantInfos.item1}
                                                                             src={"https://ddragon.leagueoflegends.com/cdn/14.19.1/img/item/" + participantInfos.item1 + ".png"}
                                                                             onError={({currentTarget}) => {
                                                                                 currentTarget.onerror = null; // prevents looping
                                                                                 currentTarget.style.display = "none";
                                                                             }}/>
                                                                    </div>
                                                                    <div className={"item" + win}>
                                                                        <img className={"item-display"}
                                                                             alt={"item" + participantInfos.item2}
                                                                             src={"https://ddragon.leagueoflegends.com/cdn/14.19.1/img/item/" + participantInfos.item2 + ".png"}
                                                                             onError={({currentTarget}) => {
                                                                                 currentTarget.onerror = null; // prevents looping
                                                                                 currentTarget.style.display = "none";
                                                                             }}/>
                                                                    </div>
                                                                    <div className={"item" + win}>
                                                                        <img className={"item-display"}
                                                                             alt={"item" + participantInfos.item6}
                                                                             src={"https://ddragon.leagueoflegends.com/cdn/14.19.1/img/item/" + participantInfos.item6 + ".png"}
                                                                             onError={({currentTarget}) => {
                                                                                 currentTarget.onerror = null; // prevents looping
                                                                                 currentTarget.style.display = "none";
                                                                             }}/>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className={"item" + win}>
                                                                        <img className={"item-display"}
                                                                             alt={"item" + participantInfos.item3}
                                                                             src={"https://ddragon.leagueoflegends.com/cdn/14.19.1/img/item/" + participantInfos.item3 + ".png"}
                                                                             onError={({currentTarget}) => {
                                                                                 currentTarget.onerror = null; // prevents looping
                                                                                 currentTarget.style.display = "none";
                                                                             }}/>
                                                                    </div>
                                                                    <div className={"item" + win}>
                                                                        <img className={"item-display"}
                                                                             alt={"item" + participantInfos.item4}
                                                                             src={"https://ddragon.leagueoflegends.com/cdn/14.19.1/img/item/" + participantInfos.item4 + ".png"}
                                                                             onError={({currentTarget}) => {
                                                                                 currentTarget.onerror = null; // prevents looping
                                                                                 currentTarget.style.display = "none";
                                                                             }}/>
                                                                    </div>
                                                                    <div className={"item" + win}>
                                                                        <img className={"item-display"}
                                                                             alt={"item" + participantInfos.item5}
                                                                             src={"https://ddragon.leagueoflegends.com/cdn/14.19.1/img/item/" + participantInfos.item5 + ".png"}
                                                                             onError={({currentTarget}) => {
                                                                                 currentTarget.onerror = null; // prevents looping
                                                                                 currentTarget.style.display = "none";
                                                                             }}/>
                                                                    </div>
                                                                    <div className={"item" + win}
                                                                         style={{opacity: "0%"}}>
                                                                        <img className={"item-display"}
                                                                             alt={"item" + participantInfos.item6}
                                                                             src={"https://ddragon.leagueoflegends.com/cdn/14.19.1/img/item/" + participantInfos.item5 + ".png"}
                                                                             onError={({currentTarget}) => {
                                                                                 currentTarget.onerror = null; // prevents looping
                                                                                 currentTarget.style.display = "none";
                                                                             }}/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                } else {
                                                    players.push(participantInfos)
                                                }
                                            })
                                        }
                                            {
                                                players.map(participant => {
                                                    if (participant.teamId === 100) {
                                                        team1.push(participant)
                                                    } else {
                                                        team2.push(participant)
                                                    }
                                                })
                                            }
                                            <div className={"CardOther win" + [win]}>
                                                <div className={"Team1"}>
                                                    {team1.map(participant => {
                                                        return (
                                                            // eslint-disable-next-line react/jsx-key
                                                            <span>
                                                                <img className={"item-display-team"}
                                                                     alt={"icon" + participant.championName}
                                                                     src={"https://ddragon.leagueoflegends.com/cdn/14.19.1/img/champion/" + participant.championName + ".png"}
                                                                     onError={({currentTarget}) => {
                                                                         currentTarget.onerror = null; // prevents looping
                                                                         currentTarget.style.display = "none";
                                                                     }}/>
                                                                <a href="#" onClick={() => {
                                                                    reload(participant.riotIdGameName, participant.riotIdTagline, key);
                                                                }}> {participant.riotIdGameName}</a>
                                                            </span>
                                                        )
                                                    })}
                                                </div>
                                                <div className={"Team2"}>
                                                    {team2.map(participant => {
                                                        return (
                                                            // eslint-disable-next-line react/jsx-key
                                                            <span>
                                                                <img className={"item-display-team"}
                                                                     alt={"icon" + participant.championName}
                                                                     src={"https://ddragon.leagueoflegends.com/cdn/14.19.1/img/champion/" + participant.championName + ".png"}
                                                                     onError={({currentTarget}) => {
                                                                         currentTarget.onerror = null; // prevents looping
                                                                         currentTarget.style.display = "none";
                                                                     }}/>
                                                                <a href="#" onClick={() => {
                                                                    reload(participant.riotIdGameName, participant.riotIdTagline, key);
                                                                }}> {participant.riotIdGameName}</a>
                                                            </span>
                                                        )
                                                    })}
                                                    </div>
                                            </div>
                                                    </div>
                                    </div>
                            )}
                        } catch (e) {
                            console.log("API Speed Exceeded : Game may be not displayed yet !")
                            return (
                                <div>
                                    <h2>API Speed Exceeded : Game may be not displayed yet !</h2>
                                </div>
                            )
                        }
                    })
                }
            </div>
        );
    }

    return  (
        <>

            <div style={{margin: "0 auto", height: "100px", width: "900px"}}>
                <SearchBar />
            </div>
            <Container id="match-root" className="mx-auto justify-content-center text-center">
                <h1 className={"search-name"} style={{color: "white"}}> Matchs de {localStorage.getItem("search_username")}#{localStorage.getItem("search_tag")} </h1>
                {content ? content : "Recherche en cours de chargement."}
                {firstLoad ? updatePageData() : ""}
            </Container>
        </>
    );
}
