function ConcertSeat({seat,status,onSeatClick}){
    console.log(seat);
    
    const handleClick = ()=>{
        if(status == 'BOOKED'){
            return;
        }
        onSeatClick(seat);
    }
    return(
         <button
            onClick={handleClick}
            disabled={status === "BOOKED"}
            className={`seat ${
                status === "BOOKED" ? "booked" : "available"
            }`}
        >
            <div className="seat-number">
                {seat.row}{seat.number}
            </div>

            <div className="seat-status">
                {status || "LOADING..."}
            </div>
        </button>
    );


}

export default ConcertSeat;