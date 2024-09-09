
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
    GOOD_MATCH_UPS : "good-match-ups",
    BAD_MATCH_UPS : "bad-match-ups",
    TIPS_TRICKS : "tips-tricks"
}

export class Champion {

    constructor(name) {
        this.name = name;
        this.games = []
    }

    async FetchChampionInfos(columns) {
        requestOptions.body.name = this.name.toLowerCase()
        let col = columns[0]
        for (let i = 1; i < columns.length; i++) {
            col += "," + columns[i]
        }
        requestOptions.body.columns = col
        requestOptions.body = JSON.stringify(requestOptions.body)
        console.log(requestOptions)
        return await fetch('http://localhost:8081/champions/description', requestOptions)
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