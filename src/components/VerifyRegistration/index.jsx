//@ts-check
import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VerifyRegistration = () => {
    const [username, setUsername] = useState('');
    const [code, setCode] = useState('');

    const navigate = useNavigate();

    const register = async () => {
        try {
            await Auth.confirmSignUp(username, code);
            navigate('/signin');
          } catch (error) {
              console.log('error confirming sign up', error);
              toast.error(error.message, {position: toast.POSITION.TOP_CENTER});

          }
    };


    return (
        <div className="VerifyRegistration">
            <input
                id="username"
                placeholder="Username Should Be an Email"
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
            <input
                id="code"
                placeholder="code"
                value={code}
                onChange={e => setCode(e.target.value)}
            />
            <button id="register" color="primary" onClick={register}>
                Verify Me
            </button>
            <ToastContainer />
        </div>
    );
};

export default VerifyRegistration;