import ConcertSeat from "./Concertseat";
import Concertbooking from "./ConcertBooking";
import { useState, useEffect } from "react";
import axios from "axios";
import "./ConcertGrid.css";

function ConcertGrid() {

    const concertSeats = [
        { id: 1, row: "A", number: 1 },
        { id: 2, row: "A", number: 2 },
        { id: 3, row: "A", number: 3 },
        { id: 4, row: "A", number: 4 },

        { id: 5, row: "B", number: 1 },
        { id: 6, row: "B", number: 2 },
        { id: 7, row: "B", number: 3 },
        { id: 8, row: "B", number: 4 },

        { id: 9, row: "C", number: 1 },
        { id: 10, row: "C", number: 2 },
        { id: 11, row: "C", number: 3 },
        { id: 12, row: "C", number: 4 },

        { id: 13, row: "D", number: 1 },
        { id: 14, row: "D", number: 2 },
        { id: 15, row: "D", number: 3 }
    ];

    const [seatStatus, setSeatStatus] = useState([]);
    const [selectedSeat, setSelectedSeat] = useState(null);

    const getSeatStatus = async () => {
        try {

            const response = await axios.get(
                "http://localhost:3000/api/ConcertSeats/status"
            );

            setSeatStatus(response.data.seats);

        } catch (error) {

            console.log("Error fetching seats:", error);

        }
    };

    const handleCloseBooking = () => {

        setSelectedSeat(null);

        getSeatStatus();
    };

    useEffect(() => {

        getSeatStatus();

    }, []);

    const handleSeatClick = (seat) => {

        const status = seatStatus.find(
            (s) => s.id === seat.id
        );

        if (status?.status === "BOOKED") {
            return;
        }

        setSelectedSeat(seat);
    };


    return (

        <div className="concertSection">

            {/* Heading */}

            <div className="concertHeader">

                <h1>Concert Hall</h1>

                <p>Select your seat</p>

            </div>


            {/* Main grid */}

            <div className="concertGrid">

                {/* Stage */}

                <div className="concertStage">

                    <span>🎤 LIVE STAGE</span>

                </div>


                {/* Seats */}

                <div className="seatContainer">

                    {concertSeats.map((item) => {

                        const status = seatStatus.find(
                            (s) => s.id === item.id
                        );

                        return (

                            <ConcertSeat
                                key={item.id}
                                seat={item}
                                status={status?.status}
                                onSeatClick={handleSeatClick}
                            />

                        );

                    })}

                </div>


                {/* Legend */}

                <div className="seatLegend">

                    <div className="legendItem">

                        <span className="legendSeat available"></span>

                        <span>Available</span>

                    </div>

                    <div className="legendItem">

                        <span className="legendSeat booked"></span>

                        <span>Booked</span>

                    </div>

                </div>

            </div>


            {/* Booking modal */}

            {selectedSeat && (

                <Concertbooking
                    seat={selectedSeat}

                    status={
                        seatStatus.find(
                            (s) => s.id === selectedSeat.id
                        )?.status
                    }
                    show={true}
                    onClose={handleCloseBooking}
                />

            )}

        </div>
    );
}

export default ConcertGrid;