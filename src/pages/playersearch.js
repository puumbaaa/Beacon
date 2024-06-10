import { createRef, useState } from 'react';
import '../pages_style/test.css';
import moment from 'moment';
import * as riot from './riot_handler';

export default function UserSearching() {
    const regionEnd = {
        eu: 'EUW',
        na: 'NA1',
        jp: 'JP1',
        kr: 'KR',
        br: 'BR1',
        oc: 'OCE',
    };

    const key = 'RGAPI-34c7babd-ac70-42e5-8c71-f324e134f0b1';

    const [content, setContent] = useState(null);

    const inputRef = createRef();
    const regionRef = createRef();

    async function handleSubmit() {
        await updateMatchData(inputRef.current.value.split('#'), regionEnd[regionRef.current.value], key).then(result => {
            setContent(result);
            console.log(result);
        });
    }

    async function updateSearchData(userName, gameTag, apiKey) {
        if (userName == null || gameTag == null || apiKey == null) {
            return null;
        }

        await riot.getUserByNameTag(userName, gameTag, apiKey).then(result => {
            localStorage.setItem('search_puuid', result.puuid);
            localStorage.setItem('search_username', result.gameName);
            localStorage.setItem('search_tag', result.tagLine);
        });
    }

    async function getSearchData(search, region, apiKey) {
        if (search.length > 1) {
            await updateSearchData(search[0], search[1], apiKey);
        } else {
            await updateSearchData(search[0], region, apiKey);
        }
    }

    async function updateMatchData(search, region, apiKey) {
        await getSearchData(search, region, apiKey);

        let matches = await riot.getPlayerLastMatches(localStorage.getItem('search_puuid'), 7, 5, apiKey);

        console.log(matches);
        return displayMatches(matches);
    }

    function displayMatches(matches) {
        return (
            <div id="card-container">
                {matches.map(match => {
                    let date = moment(new Date(match.info.gameCreation)).format('L LTS');

                    return (
                        <div id="match-card" key={match.metadata.matchId}>
                            <h1> {date} </h1>
                            {match.info.participants.map(participantInfos => (
                                <div key={participantInfos.puuid}>
                                    <h2> {participantInfos.riotIdGameName} </h2>
                                    <h5> KDA: {participantInfos.challenges.kda} </h5>
                                    <h5> Kill Participation: {Math.ceil(participantInfos.challenges.killParticipation * 100)}% </h5>
                                    <h5> Unseen Recalls: {participantInfos.challenges.unseenRecalls} </h5>
                                    <h5> Champion: {participantInfos.championName} </h5>
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>
        );
    }

    return (
        <div>
            <select name="options" id="options" ref={regionRef}>
                <option value="na">North America</option>
                <option value="eu">Europe West</option>
                <option value="jp">Japan</option>
                <option value="kr">Korea</option>
                <option value="br">Brazil</option>
                <option value="oc">Oceania</option>
            </select>

            <div>
                <h1> {localStorage.getItem('search_puuid')} </h1>
                <h1> {localStorage.getItem('search_username')} </h1>
            </div>

            <input type="search" ref={inputRef} />
            <button onClick={handleSubmit}> Rechercher le joueur</button>

            <div id="match-root">
                {content ? content : 'Loading data...'}
            </div>
        </div>
    );
}
