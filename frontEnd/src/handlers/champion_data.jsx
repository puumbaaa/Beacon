
const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: {}
}

export const Descriptor = {
    NAME : "champName",
    PRESENTATION : "presentation",
    ROLE : "role",
    POSITION : "position",
    DETAILS : "details",
    FORCES : "forces",
    WEAKNESS : "weakness",
    EARLY : "early",
    MID : "mid",
    LATE : "late",
    GOODMU : "goodMU",
    BADMU : "badMU",
    TIPS : "tips"
}

export class Champion {

    constructor(name) {
        this.name = name;
        this.games = []
    }

    async FetchChampionInfos(columns) {

        let bodyContent = {
            name: this.name,
            columns: columns.join(",")
        };

        requestOptions.body = JSON.stringify(bodyContent);

        return await fetch('http://localhost:8081/champions/description', requestOptions)
            .catch(err => console.log('Fetch error:', err))
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