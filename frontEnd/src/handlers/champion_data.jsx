
const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
}

export class Champion {

    constructor(name) {
        this.name = name;
        this.games = []
    }

    async FetchChampionData() {
        return await fetch('http://localhost:8081/champions/data/' + this.name, requestOptions)
            .then(response => response.json())
            .catch(err => console.log(err))
    }

    InsertGameData(data) {

        this.games.push(data)

    }

}