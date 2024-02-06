import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <nav className="fixed top-0 w-screen bg-slate-800 text-white text-xl">
            <ul className='flex py-4 pl-2'>
                <li className='mx-2 px-2 py-1 border-2 rounded-md'>
                    <Link to="/">Home</Link>
                </li>
                <li className='mx-2 px-2 py-1 border-2 rounded-md'>
                    <Link to="login">Login</Link>
                </li>
                <li className='mx-2 px-2 py-1 border-2 rounded-md'>
                    <Link to="register">Register</Link>
                </li>
                <li className='mx-2 px-2 py-1 border-2 rounded-md'>
                    <Link to="logout">Logout</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
