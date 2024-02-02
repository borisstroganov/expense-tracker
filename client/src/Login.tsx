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
        <div>
            <div>
                <label htmlFor="email">Email:</label>
                <input autoFocus type="email" name="email" value={emailValue} onChange={(e) => setEmailValue(e.target.value)} />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <div>
                    <input type={togglePasswordValue ? "password" : "text"} className="text-input" value={passwordValue}
                        onChange={(e) => setPasswordValue(e.target.value)} />
                    {togglePasswordValue ? <div style={{ position: "absolute", right: "10px", top: "5px" }}
                        onClick={() => setTogglePasswordValue(!togglePasswordValue)}>View</div>
                        : <div style={{ position: "absolute", right: "10px", top: "5px" }}
                            onClick={() => setTogglePasswordValue(!togglePasswordValue)}>Hide</div>}
                </div>
            </div>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;

// type LoginProps = {
//     onClick: (email: string, password: string) => void;
//     onSignUpClick: () => void;
//     role: string;
// }

// function Login({ onClick, onSignUpClick, role }: LoginProps) {

//     return (
//         <div className="Login">
//             <div className="login-title">{role === "patient" ? "Login" : "Therapist Login"}</div>
//             <div className="login-card">
//                 <div className="login-input-container">
//                     <div className="login-input">
//                         <label htmlFor="email">Email:</label>
//                         <input autoFocus type="email" name="email" value={emailValue} onChange={(e) => setEmailValue(e.target.value)} />
//                     </div>
//                     <div className="login-input">
//                         <label htmlFor="password">Password:</label>
//                         <div className="password-input">
//                             <input type={togglePasswordValue ? "password" : "text"} className="text-input" value={passwordValue}
//                                 onChange={(e) => setPasswordValue(e.target.value)} />
//                             {togglePasswordValue ? <AiOutlineEye style={{ position: "absolute", right: "10px", top: "5px" }}
//                                 onClick={() => setTogglePasswordValue(!togglePasswordValue)} />
//                                 : <AiOutlineEyeInvisible style={{ position: "absolute", right: "10px", top: "5px" }}
//                                     onClick={() => setTogglePasswordValue(!togglePasswordValue)} />}
//                         </div>
//                     </div>
//                     <button className="login-button" onClick={() => onClick(emailValue, passwordValue)}>Login</button>
//                 </div>
//                 <div className="login-sign-up">
//                     Don't have an account yet? <a onClick={onSignUpClick} style={{ fontWeight: "bold", textDecoration: "underline" }}>
//                         Sign-Up
//                     </a>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Login
