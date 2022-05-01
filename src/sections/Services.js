import React from "react";
import { Navigate, useNavigate, } from "react-router-dom";

function Services() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Services Categories</h1>
            <p><button onClick={() => navigate('/automotive')}> Automotive </button></p>
            <p><button onClick={() => navigate('/beauty')}> Beauty </button></p>
            <p><button onClick={() => navigate('/labormoving')}> Labor & Moving </button></p>
            <p><button onClick={() => navigate('/computer')}> Computer </button></p>
            <p><button onClick={() => navigate('/household')}> Household </button></p>
        </div>
    );
};

export default Services;