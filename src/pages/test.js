import { useState } from 'react';

export default function GetUserData(username, gametag, api_key) {

    const [data, setData] = useState(null);

    function GetJSONData(url) {

        fetch(url)
            .then(response => response.json())
            .then(result => {
                setData(result)

                localStorage.setItem("puuid", data["puuid"])
                localStorage.setItem("username", data["username"])
                localStorage.setItem("tag", data["tagLine"])
            })
            .catch(error => console.log(error) );

    }

    function handleClick() {
        GetJSONData('https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/' + username + '/' + gametag + '?api_key=' + api_key);
    }

    return (
        <div>
            <button onClick={handleClick}>Update</button>
            {data ? <div>{ JSON.stringify(data, null, 2) }</div> : <div>Loading...</div>}
        </div>
    );
}