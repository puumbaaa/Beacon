import React, {require, useEffect, useState} from 'react';
import bcrypt from 'bcryptjs'

const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
}

export class User {

    constructor(mail) {
        this.mail = mail;
    }

    register(saltRounds, password) {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                let options = requestOptions
                options.body = '{"mail":"' + this.mail + '", "hash":"' + hash + '"}'
                fetch('http://localhost:8081/user/register', options)
                    .then(response => console.log(response))
                    .catch(err => console.log(err))
            });
        });
    }

    async login(password) {
        let options = requestOptions
        options.body = '{"mail":"' + this.mail + '", "password":"' + password + '"}'
        await fetch('http://localhost:8081/user/register', options)
            .then(response => console.log(response))
            .catch(err => console.log(err))
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

export async function RegisterUser(user, password) {

    let isUser = await IsUserExist(user);

    if (isUser) {
        console.log("Log user")
        user.login(password)
    } else {
        console.log("Create user")
        user.register(10, password)
    }

}