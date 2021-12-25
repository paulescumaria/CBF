import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

function Home(props) {

    const navigate = useNavigate()

    useEffect(() => {
        if (props.manager === false) {
            navigate("/")
        }
    }, [navigate, props.manager])

    return (
        <div className="background-home">
            <Navbar stateManager={props.stateManager}/>
            <h2 className="home-text">WELCOME TO MY COOKBOOK APP!</h2>
        </div>
    )
}

export default Home 