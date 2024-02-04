import React, { useState } from 'react';
import { useAuth } from './AuthContext';

import { login } from './services/login'

const Login: React.FC = () => {
    const { loginContext } = useAuth();
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [togglePasswordValue, setTogglePasswordValue] = useState<boolean>(true);

    const handleLogin = async () => {
        const response = await login(emailValue, passwordValue);

        if ('message' in response) {
            console.log(response);
            return;
        } else {
            const token = response.token;
            loginContext(token);
        }
    };

    return (
        <div className='flex flex-col items-center bg-slate-800 w-fit px-4 pb-4 m-6 rounded-lg shadow-lg'>
            <div className='flex flex-col items-center mt-4'>
                <label className='p-2' htmlFor="email">Email:</label>
                <input className='input' autoFocus type="email" name="email"
                    value={emailValue} onChange={(e) => setEmailValue(e.target.value)} />
            </div>
            <div className='flex flex-col items-center mt-4'>
                <label className='p-2' htmlFor="password">Password:</label>
                <div className='flex flex-col relative'>
                    <input className='input'
                        type={togglePasswordValue ? "password" : "text"} value={passwordValue}
                        onChange={(e) => setPasswordValue(e.target.value)} />
                    {togglePasswordValue
                        ? <div className='flex justify-end px-1 mr-1 bg-gray-500 hover:bg-gray-600 rounded-full text-gray-300 text-xs 
                        absolute top-1/4 right-0'
                            onClick={() => setTogglePasswordValue(!togglePasswordValue)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                className="w-4 h-4 cursor-pointer">
                                <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                                <path fillRule="evenodd" d="M1.38 8.28a.87.87 0 0 1 0-.566 7.003 7.003 0 0 1 13.238.006.87.87 0 0 1 0 .566A7.003 7.003 0 0 1 1.379 8.28ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" clipRule="evenodd" />
                            </svg>
                        </div>
                        : <div className='flex justify-end px-1 mr-1 bg-gray-500 hover:bg-gray-600 rounded-full text-gray-300 text-xs 
                        absolute top-1/4 right-0'
                            onClick={() => setTogglePasswordValue(!togglePasswordValue)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                className="w-4 h-4 cursor-pointer">
                                <path fillRule="evenodd" d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l10.5 10.5a.75.75 0 1 0 1.06-1.06l-1.322-1.323a7.012 7.012 0 0 0 2.16-3.11.87.87 0 0 0 0-.567A7.003 7.003 0 0 0 4.82 3.76l-1.54-1.54Zm3.196 3.195 1.135 1.136A1.502 1.502 0 0 1 9.45 8.389l1.136 1.135a3 3 0 0 0-4.109-4.109Z" clipRule="evenodd" />
                                <path d="m7.812 10.994 1.816 1.816A7.003 7.003 0 0 1 1.38 8.28a.87.87 0 0 1 0-.566 6.985 6.985 0 0 1 1.113-2.039l2.513 2.513a3 3 0 0 0 2.806 2.806Z" />
                            </svg>

                        </div>}
                </div>
                <div className='flex flex-col md:flex-row justify-center items-center mt-6 mb-2 text-sm font-light'>
                    <span>
                        Don't have an account yet?
                    </span>
                    <a className='ml-2 font-bold underline cursor-pointer'>
                        Sign-Up
                    </a>
                </div>
            </div>
            <button className='btn'
                onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
