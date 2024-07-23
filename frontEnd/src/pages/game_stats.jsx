import "../pages_style/login.css"
import {GetUserSession, User} from "../handlers/user_handler.jsx";
import {Champion} from "../handlers/champion_data.jsx";
import {useEffect, useState} from "react";
import {GetMatchData, GetPlayerLastMatches} from "../handlers/riot_handler.jsx";
import {Button, Card, CardBody, CardHeader} from "react-bootstrap";
import {Title} from "react-head";

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

        return (
            keySorted.map(keys => {
                let champ = this.playedChampions[keys]
                console.log(champ)
                return (
                    <div key={champ.name}>
                        <a href={"/guide/" + champ.name}>
                        <Card>
                            <CardHeader>
                                <h1> {champ.name} </h1>
                            </CardHeader>
                            <CardBody>
                                <p>
                                    Joué le 10
                                </p>
                            </CardBody>
                        </Card>
                        </a>
                    </div>
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
                    console.log(userDataSet)
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
                <div> { content === null ? "" : content } </div>
            </div>
        </div>
    );
}