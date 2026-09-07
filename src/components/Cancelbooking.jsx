
import { useState } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import api from "../api/axios";

import "./Cancelbooking.css";

function Cancelbooking({ booking }) {

    const [cancel, setCancel] = useState(null);
    const [loading, setLoading] = useState(false);

    // Controls popup
    const [show, setShow] = useState(false);


    // Open popup
    const handleShow = () => {
        setShow(true);
    };


    // Close popup
    const handleClose = () => {
        if (!loading) {
            setShow(false);
        }
    };


    // Actually cancel booking
    const handleCancel = async () => {

        try {

            setLoading(true);


            const response = await api.delete(`/bookings/${booking.id}`)
                 console.log(response.data);

            setCancel(response.data);

            // Close popup
            setShow(false);

        } catch (err) {

            console.error(
                err.response?.status,
                err.response?.data || err.message
            );

        } finally {

            setLoading(false);

        }
    };


    return (
        <>

            {/* =================================
                CANCEL BOOKING CARD
            ================================== */}

            {!cancel && (

                <div className="seat-cancel-wrapper">

                    <div className="seat-cancel-card">

                        <div className="seat-cancel-icon">
                            ⚠
                        </div>


                        <div className="seat-cancel-content">

                            <span className="seat-cancel-label">
                                BOOKING OPTIONS
                            </span>

                            <h3>
                                Cancel Your Booking?
                            </h3>

                            <p>
                                No longer need this seat?
                                You can cancel your booking here.
                            </p>

                        </div>


                        {/* ONLY ONE CANCEL BUTTON */}

                        <button
                            className="seat-cancel-main-button"
                            onClick={handleShow}
                            disabled={loading}
                        >
                            Cancel Booking
                        </button>

                    </div>

                </div>

            )}


            {/* =================================
                CONFIRMATION POPUP
            ================================== */}

            <Modal
                show={show}
                onHide={handleClose}
                centered
                dialogClassName="seat-cancel-modal"
            >

                <Modal.Header
                    closeButton
                    className="seat-cancel-modal-header"
                >

                    <div>

                        <span className="seat-cancel-modal-label">
                            CANCEL RESERVATION
                        </span>

                        <Modal.Title>
                            Cancel Your Booking?
                        </Modal.Title>

                    </div>

                </Modal.Header>


                <Modal.Body className="seat-cancel-modal-body">

                    {/* Warning icon */}

                    <div className="seat-cancel-modal-icon">
                        ⚠
                    </div>


                    <h3>
                        Are you sure?
                    </h3>


                    <p className="seat-cancel-question">
                        This will cancel your current seat reservation.
                    </p>


                    {/* Booking information */}

                    <div className="seat-cancel-details">

                        <div>

                            <span>
                                BOOKING
                            </span>

                            <strong>
                                #{booking?.id}
                            </strong>

                        </div>


                        <div>

                            <span>
                                SEAT
                            </span>

                            <strong>
                                #{booking?.seat_id}
                            </strong>

                        </div>

                    </div>


                    {/* Warning */}

                    <div className="seat-cancel-warning">

                        <span>
                            !
                        </span>

                        <p>
                            Your seat will become available for other users.
                        </p>

                    </div>

                </Modal.Body>


                <Modal.Footer className="seat-cancel-modal-footer">

                    {/* NO */}

                    <Button
                        className="seat-cancel-no-button"
                        onClick={handleClose}
                        disabled={loading}
                    >
                        No, Keep Booking
                    </Button>


                    {/* YES */}

                    <Button
                        className="seat-cancel-yes-button"
                        onClick={handleCancel}
                        disabled={loading}
                    >

                        {loading ? (
                            <>
                                <span className="seat-cancel-spinner"></span>
                                Cancelling...
                            </>
                        ) : (
                            <>
                                Yes, Cancel Booking
                            </>
                        )}

                    </Button>

                </Modal.Footer>

            </Modal>


            {/* =================================
                SUCCESS
            ================================== */}

            {cancel && (

                <div className="seat-cancel-success">

                    <div className="seat-cancel-success-icon">
                        ✓
                    </div>

                    <div>

                        <span className="seat-cancel-success-label">
                            RESERVATION UPDATED
                        </span>

                        <h3>
                            Booking Cancelled
                        </h3>

                        <p>
                            Your booking has been successfully cancelled.
                        </p>

                    </div>

                </div>

            )}

        </>
    );
}

export default Cancelbooking;