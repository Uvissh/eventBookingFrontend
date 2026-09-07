import { useEffect, useState } from "react";
import axios from "axios";
import Seat from "./Seat";
import Booking from "./Booking";
import Screen from "./Screen";
import "./seatGrid.css";

function SeatGrid() {

   
    const seats = [
        { id: 1, row: "A", number: 1 },
        { id: 2, row: "A", number: 2 },
        { id: 3, row: "A", number: 3 },
        { id: 4, row: "A", number: 4 },
        { id: 5, row: "B", number: 1 },
        { id: 6, row: "B", number: 2 },
        { id: 7, row: "B", number: 3 },
        { id: 8, row: "B", number: 4 }
    ];




    const [seatStatus, setSeatStatus] = useState([]);



    const [selectedSeat, setSelectedSeat] = useState(null);



    const getSeatStatus = async () => {

        try {

            const response = await axios.get(
                "http://localhost:3000/api/seats/status"
            );

            setSeatStatus(response.data.seats);

        } catch (error) {

            console.log(error);

        }

    };


 

    useEffect(() => {

        getSeatStatus();

    }, []);




    const handleSeatClick = (seat) => {

        const status = seatStatus.find(
            (s) => s.id === seat.id
        );

        // Don't open popup for booked seat
        if (status?.status === "BOOKED") {
            return;
        }

        // Store clicked seat
        setSelectedSeat(seat);

    };



    const handleCloseBooking = () => {

        setSelectedSeat(null);

        // Get latest seat status
        getSeatStatus();

    };


    return (

        <div className="seat-page">

            <div className="seat-section">

                {/* SCREEN */}

                <Screen />


                {/* TITLE */}

                <h2 className="seat-title">
                    Select Your Seat
                </h2>


                <p className="seat-subtitle">
                    Choose an available seat to continue
                </p>


                {/* =================================
                    SEAT GRID
                ================================= */}

                <div className="seat-grid">

                    {seats.map((item) => {

                        const status = seatStatus.find(
                            (s) => s.id === item.id
                        );

                        return (

                            <Seat
                                key={item.id}
                                seat={item}
                                status={status?.status}
                                onSeatClick={handleSeatClick}
                            />

                        );

                    })}

                </div>


            

                <div className="seat-legend">

                    <div className="legend-item">

                        <span className="legend-box available-box"></span>

                        <span>
                            Available
                        </span>

                    </div>


                    <div className="legend-item">

                        <span className="legend-box booked-box"></span>

                        <span>
                            Booked
                        </span>

                    </div>

                </div>

            </div>


       

            {selectedSeat && (

                <Booking

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

export default SeatGrid;