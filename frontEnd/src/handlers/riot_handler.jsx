const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
}

/*
 * Get a user infos with user puuid
 */
export async function GetUserByPuuid(puuid, apiKey) {
    return await fetch( "https://europe.api.riotgames.com/riot/account/v1/accounts/by-puuid/" + puuid + "/?api_key=" + apiKey)
        .then(response => response.json())
        .then(result => {
            return result
        })
        .catch(error => {
            console.log(error);
            window.stop();
        });
}

/*
 * Get a user infos with username and game tag
 */
export async function GetUserByNameTag(userName, gameTag, apiKey) {
    return await fetch( "https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/" + userName + "/" + gameTag + "?api_key=" + apiKey)
        .then(response => response.json())
        .then(result => {
            return result
        })
        .catch(error => {
            console.log(error);
            window.stop();
        });
}

export async function GetMatchData(matchId, apiKey) {

    let query = "https://europe.api.riotgames.com/lol/match/v5/matches/" + matchId + "?api_key=" + apiKey;
    return await fetch(query)
        .then(response => response.json())
        .then(matchData => {
            return matchData;
        })
        .catch(error => {
            console.log(error);
            window.stop();
        });

}

/*
 * Get player last matches data in a period (in days) with a maximum of count
 * @param puuid id of player
 * @param period in days
 * @param count number of matches
 * @param apikey the API key
 */
export async function GetPlayerLastMatches(puuid, period, count, apiKey) {

    let end_point = Math.floor(Date.now() / 1000)
    let start_point = end_point - 60 * 60 * 24 * period

    let riotQuery = "https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/" + puuid + "/ids?startTime=" + start_point + "&endTime=" + end_point + "&queue=400&start=0&count=" + count + "&api_key=" + apiKey;
    let localBaseQuery = "http://localhost:8081/match/data/"

    let matchesData = [];

    console.log(puuid)

    await fetch(riotQuery)
        .then(response => response.json())
        .then(async matchIds => {

            console.log(matchIds)

            for (const matchId of matchIds) {
                let localQuery = localBaseQuery + matchId
                let loadedFromDatabase = false

                await fetch(localQuery, requestOptions)
                    .then(response => response.json())
                    .then(async matches => {
                        if (matches.length > 0) {
                            matchesData.push(matches[0])
                            loadedFromDatabase = true
                        }
                    })

                if (!loadedFromDatabase) {

                    let matchData = await GetMatchData(matchId, apiKey)

                    let options = requestOptions
                    options.body = {
                        id: matchData.metadata.matchId,
                        data: matchData.info
                    }
                    matchesData.push(options.body)
                    options.body = JSON.stringify(options.body)

                    console.log(options)

                    await fetch("http://localhost:8081/match/data/create/", options)
                        .then(result => result.json())

                }
            }

        }).catch(async error => {
            let localQuery = localBaseQuery + matchId
            let loadedFromDatabase = false

            await fetch(localQuery, requestOptions)
                .then(response => response.json())
                .then(async matches => {
                    if (matches.length > 0) {
                        matchesData.push(matches[0])
                        loadedFromDatabase = true
                    }
                })

            console.log("Le service riot est indisponible...")
        });

    return matchesData

}