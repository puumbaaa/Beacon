
const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
}

export class Champion {

    constructor(name) {
        this.name = name;
    }

    async FetchChampionData(body) {
        let options = requestOptions
        return await fetch('http://localhost:8081/champions/data/' + this.name, options)
            .then(response => response.json())
            .catch(err => console.log(err))
    }

}