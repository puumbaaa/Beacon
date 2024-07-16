import "../pages_style/login.css"
import {GetUserSession} from "../handlers/user_handler.jsx";
import {Champion} from "../handlers/champion_data.jsx";
import data from "bootstrap/js/src/dom/data.js";
import {useState} from "react";


export default function InGameProfile() {

    let user = GetUserSession()
    const [content, setContent] = useState(null);
    const [firstLoad, setFirstLoad] = useState(true);

    async function LoadPage() {
        if (firstLoad) {
            await DisplayPlayedChampions()
            setFirstLoad(false)
        }

        console.log("Loaded")
    }

    async function DisplayPlayedChampions() {
        let champData = new Champion("aatrox")
        let champ = null
        await champData.FetchChampionData().then(data => {
            champ = data
        })

        console.log(champ[0].kda)

        setContent((
            <h1> champ : {champ[0].kda} </h1>
        ))
    }

    return (
        <div style={{display: "flex", marginTop: "100px"}}>
            <div style={{margin: "0 auto"}}>
                <h1 className="beacon-font">Votre profil League of Legends</h1>
                <h2> Profil selectionné : { user.riotUsername + "#" + user.riotTag } </h2>
                {firstLoad ? LoadPage() : ""}
                <h2> { content } </h2>
            </div>
        </div>
    );
}