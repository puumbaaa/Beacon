export default function ChampGuid(){
    let pathname = window.location.pathname.split('/guide/');
    return(
        <div>
            <h1>{pathname}</h1>
        </div>
    )
}