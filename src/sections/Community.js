import React from "react";
import { Navigate, useNavigate, } from "react-router-dom";

function Community() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Community Categories</h1>
            <p><button onClick={() => navigate('/activities')}> Activities </button></p>
            <p><button onClick={() => navigate('/childcare')}> Childcare </button></p>
            <p><button onClick={() => navigate('/volunteers')}> Volunteers </button></p>
            <p><button onClick={() => navigate('/lostfound')}> Lost & Found </button></p>
            <p><button onClick={() => navigate('/musicians')}> Musicians </button></p>
        </div>
    );
};

export default Community;