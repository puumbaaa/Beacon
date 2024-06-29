import React, {require, useEffect, useState} from 'react';
import bcrypt from 'bcryptjs'

const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: {mail: "momo110105@gmail.com"}
}

export class User {

    constructor(mail, password) {
        this.mail = mail;
        this.hashPassword(10, password);
    }

    hashPassword(saltRounds, password) {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                // Store hash in DB
            });
        });
    }

    getMail() {
        return this.mail
    }

    toJson() {
        return {mail: this.mail}
    }

}

export async function CreateUser(user) {

    requestOptions.body = user.toJson()

    await fetch('http://localhost:8081/user/register', requestOptions)
        .then(response => response.json())
        .catch(err => console.log(err))

}

export async function IsUserExist(user) {

    requestOptions.body = JSON.stringify({mail: user.getMail()});

    let playerExists = false

    await fetch('http://localhost:8081/user/exist', requestOptions)
        .then(response => console.log(response))
        .then(data => playerExists = data.exist)
        .catch(err => console.log(err))

    return playerExists

}

export async function RegisterUser(user) {

    let isUser = await IsUserExist(user);

    if (isUser) {
        console.log("User already exists")
    } else {
        CreateUser(user)
        console.log("user created")
    }

    return await IsUserExist(user)

}