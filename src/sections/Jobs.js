import React from "react";
import { Navigate, useNavigate, } from "react-router-dom";

function Jobs() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Job Categories</h1>
            <p><button onClick={() => navigate('/finance')}> Finance </button></p>
            <p><button onClick={() => navigate('/software')}> Software </button></p>
            <p><button onClick={() => navigate('/customerservice')}> Customer Service </button></p>
            <p><button onClick={() => navigate('/realestate')}> Real Estate </button></p>
            <p><button onClick={() => navigate('/legal')}> Legal </button></p>
        </div>
    );
};

export default Jobs;