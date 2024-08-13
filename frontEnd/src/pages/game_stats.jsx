import "../pages_style/login.css"
import {GetUserSession, User} from "../handlers/user_handler.jsx";
import {Champion} from "../handlers/champion_data.jsx";
import {useEffect, useState} from "react";
import {GetMatchData, GetPlayerLastMatches} from "../handlers/riot_handler.jsx";
import {Button, Card, CardBody, CardHeader, Col, Container, ProgressBar, Row} from "react-bootstrap";
import {Title} from "react-head";

const HIGHLIGHTED_CHAMP = 3
const CHAMP_POSITION = {
    1: "center",
    2: "left",
    3: "right"
}

class PlayerGameProfile {

    constructor() {

        this.playedChampions = {}

    }

    UpdateChampion(name, game) {
       if (this.playedChampions[name] === undefined) {
           let champ = new Champion(name)
           champ.InsertGameData(game)
           this.playedChampions[name] = champ
       } else {
           this.playedChampions[name].InsertGameData(game)
       }
    }

    GetChampionStatDisplay() {

        let keys = Object.keys(this.playedChampions)

        const keySorted = [...keys]
            .sort((a, b) => this.playedChampions[b].games.length - this.playedChampions[a].games.length);

        let pass = 0
        return (
            keySorted.map(keys => {
                let CustomType = Row;
                if (pass < HIGHLIGHTED_CHAMP) {
                    pass ++
                    console.log(pass)
                    CustomType = Col
                } else {
                    pass ++
                }
                let champ = this.playedChampions[keys]
                console.log(champ)
                let data = champ.CompileData()
                console.log(data)

                // All calc used for stats

                let totalDmgDealtAndTaken = data.totalDamageDealtToChampions + data.totalDamageTaken
                let percentTaken = (data.totalDamageTaken / totalDmgDealtAndTaken) * 100
                let percentDealt = (data.totalDamageDealtToChampions / totalDmgDealtAndTaken) * 100

                return (

                    <CustomType className={"justify-content-md-center"} style={{margin: ".3rem"}} md={ pass <= HIGHLIGHTED_CHAMP ? 0 : 2} key={champ.name}>
                        <a href={"/guide/" + champ.name} style={{textDecoration: "none"}}>
                        <Card>
                            <CardHeader>
                                <h2 style={{textAlign:"center"}}> {pass <= HIGHLIGHTED_CHAMP ? "Top " + pass : ""} </h2>
                                <h1> {champ.name + " joué " + champ.games.length + " fois !"} </h1>
                            </CardHeader>
                            <CardBody>
                                <h3>Kill/G : {Math.round(data.kills)}</h3>
                                <h3>Death/G : {Math.round(data.deaths)}</h3>
                                <h3>Assists/G : {Math.round(data.assists)}</h3>
                                <h3>Dégats aux champions moyen : {Math.round(data.totalDamageDealtToChampions)}</h3>
                                <h3>Dégats subit moyen : {Math.round(data.totalDamageTaken)}</h3>
                                <ProgressBar>
                                    <ProgressBar striped variant="success" now={percentDealt} key={1} />
                                    <ProgressBar striped variant="danger" now={percentTaken} key={3} />
                                </ProgressBar>
                            </CardBody>
                        </Card>
                        </a>
                    </CustomType>

                )
            })
        )

    }

    SetChampion(champion) {
        return this.playedChampions[champion.name] = champion
    }

}


export default function InGameProfile() {

    let user = GetUserSession()
    let userLol = new PlayerGameProfile();

    const [content, setContent] = useState(null);
    const [isLoaded, setLoaded] = useState(false);

    async function UpdateUserProfile() {

        setLoaded(true)
        await UpdateUserLoLProfile()

        setContent(userLol.GetChampionStatDisplay())

    }

    async function UpdateUserLoLProfile() {

        let lastMatches = await GetPlayerLastMatches(user.puuid, 30, 20, import.meta.env.VITE_API_KEY_RIOT)


        for (const matchData of lastMatches) {

            for (const userDataSet of matchData.data.participants) {

                if (userDataSet.puuid === user.puuid) {

                    console.log("user game profile find in game : " + matchData.id)
                    userLol.UpdateChampion(userDataSet.championName, userDataSet)

                }

            }

        }

    }

    return (
        <div style={{display: "flex", marginTop: "100px"}}>
            <div style={{margin: "0 auto"}}>
                <Button onClick={UpdateUserProfile}> Actualisé votre profile pour l'affiné </Button>
                <h1 className="beacon-font">Votre profil League of Legends</h1>
                <h2> Profil selectionné : { user.riotUsername + "#" + user.riotTag } </h2>
                <Container fluid style={{marginTop: "50px"}}>
                    <Row className={"justify-content-md-center"}>
                        { content === null ? "" : content }
                    </Row>
                </Container>
            </div>
        </div>
    );
}