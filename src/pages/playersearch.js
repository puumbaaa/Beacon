import React, { createRef, useState } from 'react';
import '../pages_style/home_style.css';
import moment from 'moment';
import {Card, Button, CardGroup, Container, Row, Col, Navbar, Nav, Form, FormControl, Dropdown} from 'react-bootstrap';
import * as riot from '../handlers/riot_handler';
import {Helmet} from "react-helmet";
import {SearchBar} from "../components/searchbar";

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

    function updatePageData() {

        if (firstLoad) {
            setFirstLoad(false)
            console.log("blbl")
            updateMatchData(localStorage.getItem("search_username"), localStorage.getItem("search_tag"), key).then(result => {
                setContent(result);
                console.log(content);
            })
        }

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
            <Row id="card-container">
                {
                    matches.map(match => {
                        let date = moment(new Date(match.info.gameCreation)).format("L LTS");
                        let other = []

                        return (
                            <Col>
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
                            </Col>
                        )
                    })
                }
            </Row>
        );
    }

    return  (
        <>
            <Helmet>
                <title>Beacon</title>
                <meta name="description" content="This is a website to improve your level on League of Legends" />
                <meta http-equiv="pragma" content="no-cache" />
                <meta charSet="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="shortcut icon" href="/img/logo_beacon.png" />
            </Helmet>

            <SearchBar />

            <Container id="match-root" className="col-md-5 mx-auto justify-content-center text-center">
                <h1 style={{color: "red"}}> Les 10 dernier match de {localStorage.getItem("search_username")} </h1>
                {content ? content : "Loading data..."}
                {firstLoad && localStorage.getItem("search_puuid") ? updatePageData() : ""}
            </Container>

        </>
    );
}
