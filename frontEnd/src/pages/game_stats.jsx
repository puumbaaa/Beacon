import "../pages_style/login.css"

export default function InGameProfile() {

    return (
        <div>
            {localStorage.getItem("riotPuuid")}
        </div>
    );
}