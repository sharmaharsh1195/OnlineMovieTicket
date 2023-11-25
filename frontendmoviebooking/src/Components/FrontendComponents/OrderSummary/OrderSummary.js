import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

const OrderSummary = ({ onContinueToPayment }) => {
    const location = useLocation();
    const { showId } = useParams();
    const searchParams = new URLSearchParams(location.search);
    const selectedSeats = searchParams.get('selectedSeats');
  
    // Split the selectedSeats string into an array
    const selectedSeatArray = selectedSeats ? selectedSeats.split(',') : [];

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Order Summary</h5>
          <p>Seats: {selectedSeatArray.join(', ')}</p>
          <div className="d-flex justify-content-between">
            <span className="fw-bold">Ticket Price:</span>
            <span>Rs. 250</span>
          </div>
          <div className="d-flex justify-content-between">
            <span className="fw-bold">Total Price:</span>
            <span>Rs. {selectedSeatArray.length * 250}</span>
          </div>
          <button className="btn btn-primary mt-3" onClick={onContinueToPayment}>
            Continue to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
