import React, { useState } from 'react';
import { useAuth } from '../AuthContext';

import { register } from '../services/register'

const Register: React.FC = () => {
    const { loginContext } = useAuth();
    const [emailValue, setEmailValue] = useState("");
    const [nameValue, setNameValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [togglePasswordValue, setTogglePasswordValue] = useState<boolean>(true);
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
    const lengthRegex = /^.{8,}$/;
    const nameLengthRegex = /^.{5,}$/;
    const uppercaseRegex = /^(?=.*[A-Z])/;
    const lowercaseRegex = /^(?=.*[a-z])/;
    const numbersRegex = /^(?=.*\d)/;

    const handleRegister = async () => {
        const response = await register(emailValue, nameValue, passwordValue);

        if ('message' in response) {
            console.log(response);
            return;
        } else {
            const token = response.token;
            loginContext(token);
        }
    };

    return (
        <div className='bg-slate-700 h-screen flex flex-col justify-center items-center'>
            <div className='flex flex-col items-center bg-slate-800 w-fit px-8 pb-4 m-6 rounded-lg shadow-lg text-white font-medium'>
                <h1 className='text-2xl font-bold pt-4'>
                    <span>Create a New Account</span>
                </h1>
                <div className='flex flex-col items-center mt-4'>
                    <label className='p-2 mr-auto' htmlFor="email">Email:</label>
                    <input className='input' autoFocus type="email" name="email"
                        value={emailValue} onChange={(e) => setEmailValue(e.target.value)} placeholder='name@company.com' required={true} />
                    <div className='regex bg-slate-700 rounded-md'>
                        <span className={`opacity-80 ${emailRegex.test(emailValue) ? 'text-green-500' : ''}`}>
                            Valid Email Address
                        </span>
                        {emailRegex.test(emailValue)
                            ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                className="w-5 h-5 stroke-green-500 stroke-[1.5]">
                                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                            </svg>
                            : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                className="w-5 h-5 mt-1 stroke-rose-500 stroke-[1.5]">
                                <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                            </svg>}
                    </div>
                </div>
                <div className='flex flex-col items-center mt-4'>
                    <label className='p-2 mr-auto' htmlFor="email">Name:</label>
                    <input className='input' type="email" name="email"
                        value={nameValue} onChange={(e) => setNameValue(e.target.value)} placeholder='John Doe' required={true} />
                    <div className='regex bg-slate-700 rounded-md'>
                        <span className={`opacity-80 ${nameLengthRegex.test(nameValue) ? 'text-green-500' : ''}`}>
                            5 Characters
                        </span>
                        {nameLengthRegex.test(nameValue)
                            ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                className="w-5 h-5 stroke-green-500 stroke-[1.5]">
                                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                            </svg>
                            : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                className="w-5 h-5 mt-1 stroke-rose-500 stroke-[1.5]">
                                <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                            </svg>}
                    </div>
                </div>
                <div className='flex flex-col items-center mt-4'>
                    <label className='p-2 mr-auto' htmlFor="password">Password:</label>
                    <div className='flex flex-col items-center relative'>
                        <input className='input'
                            type={togglePasswordValue ? "password" : "text"} value={passwordValue}
                            onChange={(e) => setPasswordValue(e.target.value)}
                            placeholder={togglePasswordValue ? '••••••••' : 'Password123'} required={true} />
                        {togglePasswordValue
                            ? <div className='flex justify-end px-1 mr-1 bg-gray-500 hover:bg-gray-600 transform hover:scale-105 
                        rounded-full text-gray-300 text-xs absolute top-1.5 right-2 transition ease-out duration-300'
                                onClick={() => setTogglePasswordValue(!togglePasswordValue)}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                    className="w-4 h-4 cursor-pointer">
                                    <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                                    <path fillRule="evenodd" d="M1.38 8.28a.87.87 0 0 1 0-.566 7.003 7.003 0 0 1 13.238.006.87.87 0 0 1 0 .566A7.003 7.003 0 0 1 1.379 8.28ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" clipRule="evenodd" />
                                </svg>
                            </div>
                            : <div className='flex justify-end px-1 mr-1 bg-gray-500 hover:bg-gray-600 transform hover:scale-105 
                        rounded-full text-gray-300 text-xs absolute top-1.5 right-2 transition ease-out duration-300'
                                onClick={() => setTogglePasswordValue(!togglePasswordValue)}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                    className="w-4 h-4 cursor-pointer">
                                    <path fillRule="evenodd" d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l10.5 10.5a.75.75 0 1 0 1.06-1.06l-1.322-1.323a7.012 7.012 0 0 0 2.16-3.11.87.87 0 0 0 0-.567A7.003 7.003 0 0 0 4.82 3.76l-1.54-1.54Zm3.196 3.195 1.135 1.136A1.502 1.502 0 0 1 9.45 8.389l1.136 1.135a3 3 0 0 0-4.109-4.109Z" clipRule="evenodd" />
                                    <path d="m7.812 10.994 1.816 1.816A7.003 7.003 0 0 1 1.38 8.28a.87.87 0 0 1 0-.566 6.985 6.985 0 0 1 1.113-2.039l2.513 2.513a3 3 0 0 0 2.806 2.806Z" />
                                </svg>
                            </div>}
                        <div className='flex flex-col w-11/12 justify-center items-center mt-2 bg-slate-700 rounded-md'>
                            <div className='flex justify-between items-center w-11/12 mt-1 px-1 border-b-2 border-slate-500'>
                                <span className={`opacity-80 ${lengthRegex.test(passwordValue) ? 'text-green-500' : ''}`}>
                                    8 Characters
                                </span>
                                {lengthRegex.test(passwordValue)
                                    ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                        className="w-5 h-5 stroke-green-500 stroke-[1.5]">
                                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                                    </svg>
                                    : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                        className="w-5 h-5 mt-1 stroke-rose-500 stroke-[1.5]">
                                        <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                                    </svg>}
                            </div>
                            <div className='flex justify-between items-center w-11/12 mt-1 px-1 border-b-2 border-slate-500'>
                                <span className={`opacity-80 ${uppercaseRegex.test(passwordValue) ? 'text-green-500' : ''}`}>
                                    Uppercase Letter
                                </span>
                                {uppercaseRegex.test(passwordValue)
                                    ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                        className="w-5 h-5 stroke-green-500 stroke-[1.5]">
                                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                                    </svg>
                                    : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                        className="w-5 h-5 mt-1 stroke-rose-500 stroke-[1.5]">
                                        <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                                    </svg>}
                            </div>
                            <div className='flex justify-between items-center w-11/12 mt-1 px-1 border-b-2 border-slate-500'>
                                <span className={`opacity-80 ${lowercaseRegex.test(passwordValue) ? 'text-green-500' : ''}`}>
                                    Lowercase Letter
                                </span>
                                {lowercaseRegex.test(passwordValue)
                                    ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                        className="w-5 h-5 stroke-green-500 stroke-[1.5]">
                                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                                    </svg>
                                    : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                        className="w-5 h-5 mt-1 stroke-rose-500 stroke-[1.5]">
                                        <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                                    </svg>}
                            </div>
                            <div className='flex justify-between items-center w-11/12 my-1 px-1'>
                                <span className={`opacity-80 ${numbersRegex.test(passwordValue) ? 'text-green-500' : ''}`}>
                                    Number
                                </span>
                                {numbersRegex.test(passwordValue)
                                    ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                        className="w-5 h-5 stroke-green-500 stroke-[1.5]">
                                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                                    </svg>
                                    : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                        className="w-5 h-5 mt-1 stroke-rose-500 stroke-[1.5]">
                                        <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                                    </svg>}
                            </div>
                        </div>
                    </div>
                </div>
                <button className='btn'
                    onClick={handleRegister}>Register</button>
            </div>
        </div>
    );
};

export default Register;
