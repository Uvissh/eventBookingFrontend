import "./Seat.css";

function Seat({ seat, status, onSeatClick }) {

    // Check whether this seat is already booked
    const isBooked = status === "BOOKED";


    // Runs when user clicks the seat
    const handleClick = () => {

        // Don't allow clicking a booked seat
        if (isBooked) {
            return;
        }

        // Send the selected seat to SeatGrid
        onSeatClick(seat);
    };


    return (

        <button
            className={`seat ${isBooked ? "booked" : ""}`}
            disabled={isBooked}
            onClick={handleClick}
        >

            {/* Seat number */}
            <div className="seat-number">
                {seat.row}{seat.number}
            </div>


            {/* Seat status */}
            <small className="seat-status">
                {isBooked ? "BOOKED" : "AVAILABLE"}
            </small>

        </button>

    );
}
export default Seat;