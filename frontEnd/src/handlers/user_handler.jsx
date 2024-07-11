import bcrypt from 'bcryptjs'
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {getUserByNameTag} from "./riot_handler.jsx";

const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
}

export class User {

    constructor(mail, riotUsername, riotTag) {
        this.mail = mail;
        this.riotUsername = riotUsername
        this.riotTag = riotTag
        this.puuid = null;
    }

    async register(saltRounds, password) {
        if (!this.puuid) return
        await bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                let options = requestOptions
                options.body = '{"mail":"' + this.mail + '", "hash":"' + hash + '", "riotUsername":"' + this.riotUsername + '", "riotTag":"' + this.riotTag + '", "riotPuuid":"' + this.puuid + '"}';
                fetch('http://localhost:8081/user/register', options)
                    .then(response => {
                        localStorage.setItem("email", this.mail)
                        localStorage.setItem("riotTag", this.riotTag)
                        localStorage.setItem("riotName", this.riotUsername)
                        localStorage.setItem("riotPuuid", this.puuid)
                    })
                    .catch(err => console.log(err))
            });
        });
    }

    async login(password) {
        let options = requestOptions
        options.body = '{"mail":"' + this.mail + '"}'
        await fetch('http://localhost:8081/user/login', options)
            .then(response => response.json())
            .then(data => {
                bcrypt.compare(password, data[0].hash, function(err, result) {
                    if (result) {
                        localStorage.setItem("email", data[0].mail)
                        localStorage.setItem("riotTag", data[0].riotTag)
                        localStorage.setItem("riotName", data[0].riotName)
                        localStorage.setItem("riotPuuid", data[0].riotPuuid)
                    }
                });
            }).catch(err => console.log(err))
    }

    SetPuuid(puuid) {
        this.puuid = puuid;
    }

    getMail() {
        return this.mail
    }

}

export async function IsUserExist(user) {

    requestOptions.body = JSON.stringify({mail: user.getMail()});

    let playerExists = false

    await fetch('http://localhost:8081/user/exist', requestOptions)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                playerExists = true;
            }
        })
        .catch(err => console.log(err))

    console.log(playerExists)

    return playerExists

}

export async function Disconnect() {

    localStorage.removeItem('email')
    localStorage.removeItem('riotPuuid')
    localStorage.removeItem('riotTag')
    localStorage.removeItem('riotName')

}

export async function TryToRegister(user, password) {

    let isUser = await IsUserExist(user);

    if (isUser) return false

    let userData = await getUserByNameTag(user.riotUsername, user.riotTag, import.meta.env.VITE_API_KEY_RIOT)
    if (userData.puuid !== undefined) {
        user.SetPuuid(userData.puuid)
        await user.register(10, password)
        return true
    } else {
        return false
    }

}

export async function TryToLogin(user, password) {

    let isUser = await IsUserExist(user);

    if (!isUser) return false

    await user.login(password)
    return true;

}