/*
 * Get a user infos with user puuid
 */
export async function getUserByPuuid(puuid, apiKey) {
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
 * Get a user infos with user name and game tag
 */
export async function getUserByNameTag(userName, gameTag, apiKey) {
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

export async function getMatchData(matchId, apiKey) {

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
 * Get player last matches in a period (in days) with a maximum of count
 * @param puuid id of player
 * @param period in days
 * @param count number of matches
 * @param apikey the API key
 */
export async function getPlayerLastMatches(puuid, period, count, apiKey) {

    let end_point = Math.floor(Date.now() / 1000)
    let start_point = end_point - 60 * 60 * 24 * period

    let query = "https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/" + puuid + "/ids?startTime=" + start_point + "&endTime=" + end_point + "&start=0&count=10&api_key=" + apiKey;

    let matchesData = [];

    console.log(puuid)

    await fetch(query)
        .then(response => response.json())
        .then(async matchIds => {

            console.log(matchIds)

            for (const matchId of matchIds) {
                matchesData.push(await getMatchData(matchId, apiKey))
            }

        }).catch(error => {
            console.log(error);
            window.stop();
        });

    return matchesData

}