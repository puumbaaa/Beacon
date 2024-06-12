import React from 'react';
import {database} from "../index";

export class SQLHandler extends React.Component {
    onClick() {
        database.select().from("users")
            .then(data => console.log(data))
    }

    render() {
        return (
            <button onClick={this.onClick}> BLBLBLBL </button>
        );
    }
}