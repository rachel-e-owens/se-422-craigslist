import React from "react";
import { Navigate, useNavigate, } from "react-router-dom";

function ForSale() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>For Sale Categories</h1>
            <p><button onClick={() => navigate('/carstrucks')}> Cars & Trucks </button></p>
            <p><button onClick={() => navigate('/motorcycles')}> Motorcycles </button></p>
            <p><button onClick={() => navigate('/boats')}> Boats </button></p>
            <p><button onClick={() => navigate('/books')}> Books </button></p>
            <p><button onClick={() => navigate('/furniture')}> Furniture </button></p>
        </div>
    );
};

export default ForSale;