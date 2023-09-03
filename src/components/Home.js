import React from "react";
import { useNavigate, } from "react-router-dom";

function Home() {

    const navigate = useNavigate();

    return (
        <div>
            <h1>Sections</h1>
            <p><button onClick={() => navigate('/forsale')}> For Sale </button></p>
            <p><button onClick={() => navigate('/housing')}> Housing </button></p>
            <p><button onClick={() => navigate('/community')}> Community </button></p>
            <p><button onClick={() => navigate('/jobs')}> Jobs </button></p>
            <p><button onClick={() => navigate('/services')}> Services </button></p>
        </div>
    );
};

export default Home;