import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import "./Register.css";

function Register() {

    const [email, setEmail] = useState("");
    const [password_hash, setPassword] = useState("");

    const navigate = useNavigate();


    const handleRegister = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                               "https://eventbookingbackend-dhdr.onrender.com//api/auth/register",

                {
                    email: email,
                    password_hash: password_hash,
                }
            );

            console.log(response.data);

            alert("Registration successful");

            navigate("/login");

        } catch (error) {

            console.log(error.response?.data);

            alert("Registration failed");
        }
    };


    return (

        <div className="register-page">

            {/* Background effects */}

            <div className="register-glow register-glow-one"></div>

            <div className="register-glow register-glow-two"></div>


            <div className="register-card">


                {/* Logo */}

                <div className="register-logo">
                    🎟️
                </div>


                {/* Header */}

                <div className="register-header">

                    <p className="register-small-text">
                        JOIN SEATBOOK
                    </p>

                    <h1>
                        Create your
                        <span> account</span>
                    </h1>

                    <p className="register-description">
                        Create an account and start booking
                        your perfect seats.
                    </p>

                </div>


                {/* Form */}

                <form onSubmit={handleRegister}>


                    {/* Email */}

                    <div className="register-input-group">

                        <label>
                            Email Address
                        </label>

                        <div className="register-input-wrapper">

                            <span>
                                ✉️
                            </span>

                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                required
                            />

                        </div>

                    </div>


                    {/* Password */}

                    <div className="register-input-group">

                        <label>
                            Password
                        </label>

                        <div className="register-input-wrapper">

                            <span>
                                🔒
                            </span>

                            <input
                                type="password"
                                placeholder="Create a password"
                                value={password_hash}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                required
                            />

                        </div>

                    </div>


                    {/* Register button */}

                    <button
                        type="submit"
                        className="register-button"
                    >

                        <span>
                            Create Account
                        </span>

                        <span className="register-arrow">
                            →
                        </span>

                    </button>

                </form>


                {/* Divider */}

                <div className="register-divider">

                    <span></span>

                    <p>
                        OR SIGN UP WITH
                    </p>

                    <span></span>

                </div>


                {/* Google */}

                <div className="register-google">

                    <GoogleLogin

                        onSuccess={async (credentialResponse) => {

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


                                localStorage.setItem(
                                    "token",
                                    token
                                );


                                console.log(
                                    "Google login successful"
                                );


                                navigate("/seats");


                            } catch (error) {

                                console.log(
                                    "Google authentication error:",
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


                {/* Login */}

                <div className="register-login">

                    <span>
                        Already have an account?
                    </span>

                    <button
                        onClick={() =>
                            navigate("/login")
                        }
                    >
                        Login
                    </button>

                </div>


                {/* Security */}

                <div className="register-security">

                    🔒 Secure registration
                    &nbsp; • &nbsp;
                    Your data is protected

                </div>


            </div>

        </div>
    );
}

export default Register;