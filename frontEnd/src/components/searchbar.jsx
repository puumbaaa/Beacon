import {Button, Dropdown, Form, FormControl} from "react-bootstrap";
import React, {createRef, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export function SearchBar() {

    const [region, setRegion] = useState('EUW');

    const navigate = useNavigate();

    const inputRef = createRef();

    useEffect(() => {
        const listener = event => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {

                event.preventDefault();
                if (inputRef.current.value === "") return;
                handleClick()

            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
    }, []);

    function handleClick() {

        let searchData = inputRef.current.value.split("#")

        if (typeof searchData == "string") {
            localStorage.setItem("search_username", searchData)
            localStorage.setItem("search_tag", region)
        } else {
            localStorage.setItem("search_username", searchData[0])
            localStorage.setItem("search_tag", searchData[1])
        }

        navigate("/usersearch")
        window.location.reload();

    }

    return (
        <Form className="search-bar">
            <FormControl
                type="search"
                placeholder="Entrez le nom d'un joueur League of Legends !"
                className="search-input"
                aria-label="Search"
                ref={inputRef}
            />
            <Dropdown className="region-dropdown">
                <Dropdown.Toggle variant="success" id="dropdown-basic" className="region-badge">
                    {region}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {['EUW', 'NA', 'KR', 'EUN', 'JP', 'LA', 'OC', 'TR', 'RU', 'PH', 'SG', 'TH', 'TW', 'VN'].map(r => (
                        <Dropdown.Item key={r} onClick={() => setRegion(r)}>
                            {r}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
            <Button onClick={handleClick} variant="outline-success" className="search-button">
                <img src="/img/loop.png" alt="loop_button_img" draggable="false" />
            </Button>
        </Form>
    )
}