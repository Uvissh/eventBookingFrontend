import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation
} from "react-router-dom";

import { useState } from "react";

import Register from "./components/Regsiter";
import Login from "./components/Login";
import SeatGrid from "./components/seat.Grid";
import Profile from "./components/Profile";
import ConcertGrid from "./components/ConcertGrid";

import "./App.css";


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );


  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("username");

    setIsLoggedIn(false);
    setUsername("");
  };


  return (

    <BrowserRouter>

      <Navbar
        isLoggedIn={isLoggedIn}
        username={username}
        handleLogout={handleLogout}
      />


      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/login"
          element={
            <Login
              setIsLoggedIn={setIsLoggedIn}
              setUsername={setUsername}
            />
          }
        />

        <Route
          path="/seats"
          element={<SeatGrid />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/concert"
          element={<ConcertGrid />}
        />

      </Routes>

    </BrowserRouter>
  );
}


/* =========================
   NAVBAR
========================= */

function Navbar({
  isLoggedIn,
  username,
  handleLogout
}) {

  const location = useLocation();


  return (

    <nav className="navbar">

      <div className="navbar-container">


        {/* Logo */}

        <Link
          to="/"
          className="logo"
        >

          <span className="logo-icon">
            🎟️
          </span>

          <span>
            Seat<span className="logo-highlight">Book</span>
          </span>

        </Link>


        {/* Navigation */}

        <div className="nav-links">


          <Link
            to="/"
            className={`nav-link ${
              location.pathname === "/"
                ? "active"
                : ""
            }`}
          >
            Home
          </Link>


          <Link
            to="/seats"
            className={`nav-link ${
              location.pathname === "/seats"
                ? "active"
                : ""
            }`}
          >
            🎬 Movies
          </Link>


          <Link
            to="/concert"
            className={`nav-link ${
              location.pathname === "/concert"
                ? "active"
                : ""
            }`}
          >
            🎤 Concerts
          </Link>


          {isLoggedIn ? (

            <>

              <Link
                to="/profile"
                className={`nav-link ${
                  location.pathname === "/profile"
                    ? "active"
                    : ""
                }`}
              >
                👤 Profile
              </Link>

            


              <div className="user-section">

                <span className="welcome-text">
                  Hi, {username} 👋
                </span>

                <button
                  className="logout-button"
                  onClick={handleLogout}
                >
                  Logout
                </button>

              </div>

            </>

          ) : (

            <>

              <Link
                to="/login"
                className="login-link"
              >
                Login
              </Link>


              <Link
                to="/register"
                className="register-link"
              >
                Get Started
              </Link>

            </>

          )}

        </div>

      </div>

    </nav>
  );
}


/* =========================
   HOME
========================= */

function Home() {

  return (

    <div className="home-page">

      <div className="home-background">

        <div className="glow glow-one"></div>
        <div className="glow glow-two"></div>

      </div>


      <div className="home-overlay"></div>


      <div className="home-content">


        {/* Ticket */}

        <div className="home-icon">
          🎟️
        </div>


        {/* Small heading */}

        <p className="home-small-text">
          ✦ YOUR NEXT EXPERIENCE STARTS HERE ✦
        </p>


        {/* Main heading */}

        <h1>

          What do you want to

          <span>
            experience?
          </span>

        </h1>


        {/* Description */}

        <p className="home-description">

          Discover amazing movies, unforgettable concerts,
          and live events. Choose your experience and
          find the perfect seat.

        </p>


        {/* Experience cards */}

        <div className="home-options">


          {/* Movie */}

          <Link
            to="/seats"
            className="experience-card movie-card"
          >

            <div className="experience-icon">
              🎬
            </div>


            <div className="experience-text">

              <span className="card-label">
                ENTERTAINMENT
              </span>

              <h2>
                Movies
              </h2>

              <p>
                Watch something amazing
              </p>

            </div>


            <span className="arrow">
              →
            </span>

          </Link>


          {/* Concert */}

          <Link
            to="/concert"
            className="experience-card concert-card"
          >

            <div className="experience-icon">
              🎤
            </div>


            <div className="experience-text">

              <span className="card-label">
                LIVE EVENTS
              </span>

              <h2>
                Concerts
              </h2>

              <p>
                Feel the live energy
              </p>

            </div>


            <span className="arrow">
              →
            </span>

          </Link>

        </div>


        {/* Features */}

        <div className="home-features">

          <span>
            ✓ Easy Booking
          </span>

          <span>
            ✓ Secure Payments
          </span>

          <span>
            ✓ Best Seats
          </span>

        </div>


      </div>

    </div>
  );
}


export default App;