import { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";
import api from "../api/axios";


function Profile() {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    const getProfile = async () => {

        try {

            const token = localStorage.getItem("token");

            if (!token) {

                setError("You are not logged in");
                setLoading(false);

                return;
            }


            const response = await api.get(
                "/api/profile",
              
            );


            console.log(response.data);

            setUser(response.data.user);


        } catch (error) {

            console.log(error);

            if (error.response) {

                setError(
                    error.response.data.message ||
                    "Failed to get profile"
                );

            } else {

                setError("Something went wrong");

            }

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        getProfile();

    }, []);


    /* =========================
       LOADING
    ========================= */

    if (loading) {

        return (

            <div className="profile-page">

                <div className="profile-card loading-card">

                    <div className="profile-spinner"></div>

                    <h2>
                        Loading profile...
                    </h2>

                    <p>
                        Getting your account information
                    </p>

                </div>

            </div>
        );
    }


    /* =========================
       ERROR
    ========================= */

    if (error) {

        return (

            <div className="profile-page">

                <div className="profile-card error-card">

                    <div className="error-icon">
                        ⚠️
                    </div>

                    <h2>
                        Profile
                    </h2>

                    <p className="profile-error">
                        {error}
                    </p>

                </div>

            </div>
        );
    }


    /* =========================
       PROFILE
    ========================= */

    return (

        <div className="profile-page">

            <div className="profile-background">

                <div className="profile-glow glow-purple"></div>

                <div className="profile-glow glow-blue"></div>

            </div>


            <div className="profile-card">


                {/* Top section */}

                <div className="profile-top">

                    <div className="profile-avatar">
                        👤
                    </div>

                    <div className="profile-status">
                        <span></span>
                        Active Account
                    </div>

                </div>


                {/* Heading */}

                <h1>
                    My Profile
                </h1>

                <p className="profile-subtitle">
                    Manage and view your account information
                </p>


                {/* User information */}

                <div className="profile-info">


                    {/* User ID */}

                    <div className="profile-row">

                        <div className="info-left">

                            <div className="info-icon">
                                🆔
                            </div>

                            <div>

                                <span>
                                    User ID
                                </span>

                                <strong>
                                    {user.id}
                                </strong>

                            </div>

                        </div>

                    </div>


                    {/* Email */}

                    <div className="profile-row">

                        <div className="info-left">

                            <div className="info-icon">
                                ✉️
                            </div>

                            <div>

                                <span>
                                    Email Address
                                </span>

                                <strong>
                                    {user.email}
                                </strong>

                            </div>

                        </div>

                    </div>


                </div>


                {/* Footer */}

                <div className="profile-footer">

                    <span>
                        🔒 Your account is secure
                    </span>

                    <span>
                        SeatBook
                    </span>

                </div>


            </div>

        </div>
    );
}


export default Profile;