import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import "./Login.css";


function Login({ setIsLoggedIn, setUsername }) {

    const [email, setEmail] = useState("");
    const [password_hash, setPassword] = useState("");
    const[message,setMessage]= useState("");
    const[showMessage,setShowMessage] = useState(false);

    const navigate = useNavigate();
    const showPopup = (text)=>{
        setMessage(text);
        setShowMessage(true);
        setTimeout(()=>{
            setShowMessage(false);

        },2000);
    }


    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                "https://eventbookingbackend-dhdr.onrender.com/api/auth/login",
                {
                    email: email,
                    password_hash: password_hash
                },
                {
                    withCredentials: true
                }
            );


            console.log(response.data);


            const token = response.data.token;

            localStorage.setItem(
                "token",
                token
            );


            // Create username from email

            const emailName = email.split("@")[0];

            const formattedUsername = emailName
                .split(".")
                .map(
                    word =>
                        word.charAt(0).toUpperCase() +
                        word.slice(1)
                )
                .join(" ");


            localStorage.setItem(
                "username",
                formattedUsername
            );


            setIsLoggedIn(true);

            setUsername(formattedUsername);
            showPopup("Login successful");
  setTimeout(() => {
    navigate("/");
    
  },1000);
         


        } catch (error) {

            console.log(error.response?.data);

            showPopup(
                error.response?.data?.error ||
                error.response?.data?.message ||
                "Login failed"
            );

        }
    };


    return (

        <div className="login-page">
            {showMessage && (
                <div className="popup-messagel">
                    {message}
                    </div>
            )}

            {/* Background glow */}

            <div className="login-glow login-glow-one"></div>

            <div className="login-glow login-glow-two"></div>


            <div className="login-card">


                {/* Logo */}

                <div className="login-logo">
                    🎟️
                </div>


                {/* Header */}

                <div className="login-header">

                    <p className="login-small-text">
                        WELCOME BACK
                    </p>

                    <h1>
                        Sign in to
                        <span> SeatBook</span>
                    </h1>

                    <p className="login-description">
                        Book your perfect seat and enjoy
                        your next experience.
                    </p>

                </div>


                {/* Login form */}

                <form onSubmit={handleLogin}>


                    {/* Email */}

                    <div className="login-input-group">

                        <label>
                            Email Address
                        </label>

                        <div className="login-input-wrapper">

                            <span>
                                ✉️
                            </span>

                            <input
                                type="email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                placeholder="you@example.com"
                                required
                            />

                        </div>

                    </div>


                    {/* Password */}

                    <div className="login-input-group">

                        <label>
                            Password
                        </label>

                        <div className="login-input-wrapper">

                            <span>
                                🔒
                            </span>

                            <input
                                type="password"
                                value={password_hash}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                placeholder="Enter your password"
                                required
                            />

                        </div>

                    </div>


                    {/* Login button */}

                    <button
                        type="submit"
                        className="login-button"
                    >

                        <span>
                            Login
                        </span>

                        <span className="login-arrow">
                            →
                        </span>

                    </button>


                </form>


                {/* Divider */}

                <div className="login-divider">

                    <span></span>

                    <p>
                        OR CONTINUE WITH
                    </p>

                    <span></span>

                </div>


                {/* Google */}

                <div className="google-login">

                    <GoogleLogin
                        onSuccess={async (credentialResponse) => {

                            console.log(
                                "GOOGLE RESPONSE:"
                            );

                            console.log(
                                credentialResponse
                            );


                            try {

                                const response =
                                    await axios.post(
                                        "http://localhost:3000/api/auth/google",
                                        {
                                            credential:
                                                credentialResponse.credential
                                        }
                                    );


                                console.log(
                                    response.data
                                );


                                const token =
                                    response.data.token;

                                const googleEmail =
                                    response.data.email;


                                const emailName =
                                    googleEmail.split("@")[0];


                                const formattedUsername =
                                    emailName
                                        .split(".")
                                        .map(
                                            word =>
                                                word.charAt(0).toUpperCase() +
                                                word.slice(1)
                                        )
                                        .join(" ");


                                localStorage.setItem(
                                    "token",
                                    token
                                );


                                localStorage.setItem(
                                    "username",
                                    formattedUsername
                                );


                                setIsLoggedIn(true);

                                setUsername(
                                    formattedUsername
                                );


                                navigate("/seats");


                                console.log(
                                    "Google login successful"
                                );


                            } catch (error) {

                                console.log(
                                    "BACKEND ERROR:"
                                );

                                console.log(
                                    error.response?.data
                                );

                            }

                        }}

                        onError={() => {

                            console.log(
                                "Google login failed"
                            );

                        }}

                    />

                </div>


                {/* Signup */}

                <div className="login-signup">

                    <span>
                        Don't have an account?
                    </span>

                    <button
                        onClick={() =>
                            navigate("/register")
                        }
                    >
                        Create account
                    </button>

                </div>


                {/* Security */}

                <div className="login-security">

                    🔒 Secure login &nbsp; • &nbsp;
                    Your data is protected

                </div>


            </div>

        </div>

    );
}


export default Login;