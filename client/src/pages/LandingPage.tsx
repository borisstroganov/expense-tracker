import React from 'react';
import { useAuth } from '../AuthContext';

const LandingPage: React.FC = () => {
    const { isAuthenticated, userToken } = useAuth();

    return (
        <div className='bg-slate-700 h-screen flex flex-col items-center'>
            <h1 className='text-purple-500 text-3xl font-bold uppercase p-4 mt-20'>
                <span>Expense Tracker</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                    className="w-8 h-8 hidden md:inline-block ml-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </h1>
            <div className='text-gray-200'>
                <div>
                    {isAuthenticated ? (
                        <div className='flex items-center'>
                            <p className='flex justify-center text-xl font-semibold p-2'>User is Authenticated with Token: {userToken}</p>
                        </div>
                    ) : (
                        <div className='lex items-center'>
                            <p className='flex justify-center text-xl font-semibold p-2'>User is Not Authenticated</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LandingPage;