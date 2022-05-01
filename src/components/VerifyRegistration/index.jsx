//@ts-check
import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';

const VerifyRegistration = () => {
    const [username, setUsername] = useState('');
    const [code, setCode] = useState('');
    const navigate = useNavigate();

    const verify = async () => {
        try {
            await Auth.confirmSignUp(username, code);
            navigate('/signin');
        } catch (error) {
            console.log('error confirming sign up', error);
        }
    };

    //add Auth.signUp

    return (
        <div className="VerifyRegistration">
            <input
                id="username"
                placeholder="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
            <input
                id="code"
                placeholder="verification code"
                value={code}
                onChange={e => setCode(e.target.value)}
            />
            <button id="register" color="primary" onClick={verify}>
                Verify
            </button>
        </div>
    );
};

export default VerifyRegistration;