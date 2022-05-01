//@ts-check
import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';

const SignIn = ({ onSignIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const register = async () => {
        try {
            const { user } = await Auth.signUp({
                username,
                password,
            });
            console.log(user);
            navigate('/verifyregistration');
        } catch (error) {
            console.log('error signing up', error);
        }
    };

    //add Auth.signUp

    return (
        <div className="SignIn">
            <input
                id="username"
                placeholder="Username Should Be an Email"
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
            <button id="register" color="primary" onClick={register}>
                Sign Me Up!
            </button>
        </div>
    );
};

export default SignIn;