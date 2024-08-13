
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

    CompileData() {

        let compiledData = {}
        let gameNumber = this.games.length

        for (const game of this.games) {
            console.log(game)
            Object.keys(game).map(key => {
                if (compiledData[key] === undefined) {
                    compiledData[key] = game[key]
                } else if (typeof game[key] === "number") {
                    compiledData[key] = compiledData[key] + game[key]
                }
            })
        }

        Object.keys(compiledData).map(key => {

            if (typeof compiledData[key] === "number") {
                compiledData[key] = compiledData[key] / gameNumber
            }

        })

        return compiledData

    }

}