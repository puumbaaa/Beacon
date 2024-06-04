import { useState, createRef } from 'react';
import "./test.css"
import GetUserData from "./test";

export default function Gallery() {
    const sculptureList = [
        {
            name: "Ethan Le plus beau", artist: "Mathis",
            description: "This sculpture is the most beautiful sculpture I have ever seen.",
            url: "https://picsum.photos/200/200", alt: "Moi"
        },
        {
            name: "Mathis Le plus moche", artist: "Ethan",
            description: "This sculpture is the shittest sculpture I have ever seen.",
            url: "https://picsum.photos/210/200", alt: "Lui"
        }
    ]
    const [index, setIndex] = useState(0);
    const [showMore, setShowMore] = useState(false);

    function handleNextClick() {
        if (index < sculptureList.length-1) {
            setIndex(index + 1);
        }
    }
    function handlePreviousClick() {
        if (index > 0) {
            setIndex(index - 1);
        }
    }

    function handleMoreClick() {
        setShowMore(!showMore);
    }

    const inputRef = createRef();

    function handleSubmit() {
        console.log(inputRef.current.value);
    }

    let sculpture = sculptureList[index];
    return (
        <div>
            { GetUserData("MomoCrash", "0666", "RGAPI-402add38-a8b8-476a-97f4-29c4b91f4ae6") }
            {localStorage.getItem("puuid") != null ? <div>{ localStorage.getItem("username") }</div> : <div>Loading...</div>}
            <p>
                {index > 0 ?
                    <button onClick={handlePreviousClick}>
                        Previous
                    </button>
                    :
                    <div></div>
                }

                {index < sculptureList.length - 1 ?
                    <button onClick={handleNextClick}>
                        Next
                    </button>
                    :
                    <div></div>
                }

                <h2>
                    <i>{sculpture.name} </i>
                    by {sculpture.artist}
                </h2>
                <button onClick={handleMoreClick}>
                    {showMore ? 'Hide' : 'Show'} details
                </button>
                <h3>
                    ({index + 1} of {sculptureList.length})
                </h3>
                {showMore && <p>{sculpture.description}</p>}
                <img
                    src={sculpture.url}
                    alt={sculpture.alt}
                />
            </p>
        </div>
    );
}