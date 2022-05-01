import React from "react";
import { Navigate, useNavigate, } from "react-router-dom";

function Housing() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Housing Categories</h1>
            <p><button onClick={() => navigate('/apthousing')}> Apartments & Housing </button></p>
            <p><button onClick={() => navigate('/commercial')}> Commercial </button></p>
            <p><button onClick={() => navigate('/storageparking')}> Storage & Parking </button></p>
            <p><button onClick={() => navigate('/sublets')}> Sublets </button></p>
            <p><button onClick={() => navigate('/vacationrentals')}> Vacation Rentals </button></p>
        </div>
    );
};

export default Housing;