//@ts-check
import React, { useState } from 'react';
import { Paper, Button, TextField } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const SignIn = ({ onSignIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const signIn = async () => {

    };

    //add Auth.signUp

    return (
        <div className="SignIn">
            <input
                id="username"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
            <input
                id="password"
                placeholder="Password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <button id="signinButton" color="primary" onClick={signIn}>
                Sign In
            </button>
            <button onClick={() => navigate('/register')}> Register </button>
        </div>
    );
};

export default SignIn;