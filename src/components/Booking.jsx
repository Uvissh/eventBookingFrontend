import { useState } from "react";
import axios from "axios";
import Cancelbooking from "./Cancelbooking";
import api from "../api/axios";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

import "./Booking.css";

function Booking({ seat, status, show, onClose }) {
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState("");

  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();

  // Open confirmation popup
  const handleShowConfirm = () => {
    setShowConfirm(true);
  };

  // Close confirmation popup
  const handleCloseConfirm = () => {
    if (!loading) {
      setShowConfirm(false);
    }
  };

  // Book seat
  const handleBooking = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first!");
        navigate("/Login");
        return;
      }

      const response = await api.post("/bookings",
        {
          seat_id: seat.id,
        },
    
      );

      console.log(response.data);

      setBooking(response.data.booking);

      // Close confirmation popup
      setShowConfirm(false);

    } catch (error) {
      console.log(error);

      if (error.response) {
        setError(
          error.response.data.error ||
          error.response.data.message ||
          "Booking failed"
        );
      } else {
        setError("Something went wrong");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* =========================================
          MAIN BOOKING POPUP
      ========================================= */}

      <Modal
        show={show}
        onHide={onClose}
        centered
        dialogClassName="seat-booking-main-modal"
      >

        {!booking ? (
          <>
            {/* HEADER */}

            <Modal.Header
              closeButton
              className="seat-booking-popup-header"
            >

              <div className="seat-booking-header">

                <div className="seat-booking-ticket-icon">
                  🎫
                </div>

                <div>

                  <span className="seat-booking-label">
                    RESERVATION
                  </span>

                  <h2>
                    Book Your Seat
                  </h2>

                  <p>
                    Secure your preferred seat
                  </p>

                </div>

              </div>

            </Modal.Header>


            {/* BODY */}

            <Modal.Body className="seat-booking-popup-body">

              {/* Seat information */}

              <div className="seat-booking-info">

                <div className="seat-booking-info-box">

                  <span>
                    SEAT
                  </span>

                  <strong>
                    #{seat?.id}
                  </strong>

                </div>


                <div className="seat-booking-info-box">

                  <span>
                    STATUS
                  </span>

                  <strong className="seat-booking-available">
                    {status}
                  </strong>

                </div>

              </div>


              {/* Error */}

              {error && (
                <div className="seat-booking-error">
                  {error}
                </div>
              )}


              {/* Book button */}

              <button
                className="seat-booking-main-button"
                onClick={handleShowConfirm}
                disabled={loading || status === "BOOKED"}
              >

                <span>
                  Book Seat
                </span>

                <span className="seat-booking-arrow">
                  →
                </span>

              </button>

            </Modal.Body>

          </>
        ) : (

          /* =========================================
             SUCCESS
          ========================================= */

          <Modal.Body className="seat-booking-success-popup">

            <div className="seat-booking-success-icon">
              ✓
            </div>

            <span className="seat-booking-success-label">
              RESERVATION COMPLETE
            </span>

            <h2>
              Booking Confirmed
            </h2>

            <p>
              Your seat has been successfully reserved.
            </p>


            <div className="seat-booking-success-details">

              <div>
                <span>
                  BOOKING ID
                </span>

                <strong>
                  {booking.id}
                </strong>
              </div>


              <div>
                <span>
                  SEAT
                </span>

                <strong>
                  #{booking.seat_id}
                </strong>
              </div>


              <div>
                <span>
                  PAYMENT
                </span>

                <strong>
                  {booking.payment_status}
                </strong>
              </div>

            </div>


            <Cancelbooking
              booking={booking}
            />

          </Modal.Body>
        )}

      </Modal>


      {/* =========================================
          CONFIRMATION POPUP
      ========================================= */}

      <Modal
        show={showConfirm}
        onHide={handleCloseConfirm}
        centered
        dialogClassName="seat-booking-modal"
      >

        <Modal.Header
          closeButton
          className="seat-booking-modal-header"
        >

          <div>

            <span className="seat-booking-modal-label">
              CONFIRM RESERVATION
            </span>

            <Modal.Title>
              Ready to book?
            </Modal.Title>

          </div>

        </Modal.Header>


        <Modal.Body className="seat-booking-modal-body">

          <div className="seat-booking-modal-icon">
            💺
          </div>


          <h3>
            Seat #{seat?.id}
          </h3>


          <p className="seat-booking-modal-question">
            You're about to reserve this seat.
          </p>


          <div className="seat-booking-modal-details">

            <div>

              <span>
                SEAT NUMBER
              </span>

              <strong>
                #{seat?.id}
              </strong>

            </div>


            <div>

              <span>
                CURRENT STATUS
              </span>

              <strong className="seat-booking-modal-status">
                {status}
              </strong>

            </div>

          </div>


          <div className="seat-booking-modal-note">

            <span>
              ✓
            </span>

            <p>
              Please confirm to continue with your booking.
            </p>

          </div>

        </Modal.Body>


        <Modal.Footer className="seat-booking-modal-footer">

          <Button
            className="seat-booking-cancel-button"
            onClick={handleCloseConfirm}
            disabled={loading}
          >
            Cancel
          </Button>


          <Button
            className="seat-booking-confirm-button"
            onClick={handleBooking}
            disabled={loading}
          >

            {loading ? (
              <>
                <span className="seat-booking-spinner"></span>
                Booking...
              </>
            ) : (
              <>
                Confirm Booking
                <span>→</span>
              </>
            )}

          </Button>

        </Modal.Footer>

      </Modal>

    </>
  );
}

export default Booking;