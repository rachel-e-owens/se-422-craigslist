//@ts-check
import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn = ({ onSignIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const signIn = async () => {
        try {
            const user = await Auth.signIn(username, password);
            onSignIn();
            navigate('/home');
        } catch (error) {
            console.log('error signing in', error);
            toast.error(error.message, {position: toast.POSITION.TOP_CENTER});

        }
    };

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
            <ToastContainer />
        </div>
    );
};

export default SignIn;