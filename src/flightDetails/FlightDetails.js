import React from 'react';
import './FlightDetails.css';
import Button from '@material-ui/core/Button';

export default function FlightDetails(props) {
    return (
        <div className="Flight-details">
            <div className="Flight-info">
                <h1>{props.fare}</h1>
                <p>{props.flightId}</p>
                <h3>{`${props.srcCode} > ${props.destCode}`}</h3>
                <p>{`Remaining Seats: ${props.remainingSeats}`}</p>
                <h3>{`Depart at: ${new Date(props.departureDate).toLocaleDateString()} ${props.departure}`}</h3>
                <h3>{`Arrival at: ${props.arrival}`}</h3>
            </div>
            <div className="Book-Block">
                <div className='Flight-Ad'></div>
                <Button variant="contained" color="primary">Book Flight</Button>
            </div>
        </div>
    );
}