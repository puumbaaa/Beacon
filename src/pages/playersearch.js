import { createRef, useState } from 'react';
import '../pages_style/search.css';
import moment from 'moment';
import { Card, Button, CardGroup, Container, Row, Col } from 'react-bootstrap';
import * as riot from '../handlers/riot_handler';

export default function UserSearching() {
    const regionEnd = {
        eu: 'EUW',
        na: 'NA1',
        jp: 'JP1',
        kr: 'KR',
        br: 'BR1',
        oc: 'OCE',
    };

    const key = process.env.REACT_APP_RIOT_KEY

    const [content, setContent] = useState(null);
    const [firstLoad, setFirstLoad] = useState(true);

    const inputRef = createRef();
    const regionRef = createRef();

    function handleSubmit() {

        console.log("called")

        if (firstLoad) {
            setFirstLoad(false)
            console.log("blbl")
            updateMatchData(localStorage.getItem("search_username"), localStorage.getItem("search_tag"), key).then(result => {
                setContent(result);
                console.log(content);
            })
            return;
        }

        updateMatchData(inputRef.current.value.split("#"), regionEnd[regionRef.current.value], key).then(result => {
            setContent(result);
            console.log(content);
        })

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

    async function getSearchData(search, region, apikey) {

        console.log(search)

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

        let matches = await riot.getPlayerLastMatches(localStorage.getItem('search_puuid'), 7, 5, apiKey);

        console.log(matches)
        return displayMatches(matches)

    }

    function displayMatches(matches) {

        return (
            <div id="card-container">
                {
                    matches.map(match => {
                        let date = moment(new Date(match.info.gameCreation)).format("L LTS");
                        let other = []

                        return (
                            <Card id="match-card" className="text-center"  border="primary" style={{ width: '50rem' }}>
                                <Card.Header> Match du {date} </Card.Header>
                                <CardGroup>
                                    {
                                        match.info.participants.map(participantInfos => {

                                            if (participantInfos.puuid == localStorage.getItem('search_puuid')) {

                                                return (
                                                    <Card>
                                                        <Card.Body>
                                                            <Card.Title> {participantInfos.riotIdGameName} </Card.Title>
                                                            <Card.Text> {"KDA: " + participantInfos.challenges.kda} </Card.Text>
                                                            <Card.Text> {"Kill Part." + Math.ceil(participantInfos.challenges.killParticipation * 100)} </Card.Text>
                                                            <Card.Text> {participantInfos.challenges.unseenRecalls} </Card.Text>
                                                            <Card.Text> {participantInfos.championName} </Card.Text>
                                                            <Card.Img className="item-display"
                                                                      src={"https://ddragon.leagueoflegends.com/cdn/14.11.1/img/item/" + participantInfos.item0 + ".png"}/>
                                                            <Card.Img className="item-display"
                                                                      src={"https://ddragon.leagueoflegends.com/cdn/14.11.1/img/item/" + participantInfos.item1 + ".png"}/>
                                                            <Card.Img className="item-display"
                                                                      src={"https://ddragon.leagueoflegends.com/cdn/14.11.1/img/item/" + participantInfos.item2 + ".png"}/>
                                                            <Card.Img className="item-display"
                                                                      src={"https://ddragon.leagueoflegends.com/cdn/14.11.1/img/item/" + participantInfos.item3 + ".png"}/>
                                                            <Card.Img className="item-display"
                                                                      src={"https://ddragon.leagueoflegends.com/cdn/14.11.1/img/item/" + participantInfos.item4 + ".png"}/>
                                                            <Card.Img className="item-display"
                                                                      src={"https://ddragon.leagueoflegends.com/cdn/14.11.1/img/item/" + participantInfos.item5 + ".png"}/>
                                                        </Card.Body>
                                                    </Card>
                                                )
                                            } else {
                                                other.push(participantInfos)
                                            }
                                        })
                                    }
                                    <Card>
                                        {
                                            other.map((participant => {
                                                return (
                                                    <div>
                                                        { participant.riotIdGameName }
                                                    </div>
                                                )
                                            }))
                                        }
                                    </Card>
                                </CardGroup>
                            </Card>
                        )
                    })
                }
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

                <h5> {localStorage.getItem("search_puuid")} </h5>
                <h5> {localStorage.getItem("search_username")} </h5>
                <h5> {firstLoad ? "No" : "Loaded"} </h5>

            </div>

            <input type="search" ref={inputRef} />
            <Button onClick={handleSubmit}> Rechercher le joueur</Button>

            <Container id="match-root" className="col-md-5 mx-auto" >
                {content ? content : "Loading data..."}
                {firstLoad && localStorage.getItem("search_puuid") ? handleSubmit() : ""}
            </Container>
        </div>
    );
}
