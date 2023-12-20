import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const OrderSummary = () => {
  const { showId } = useParams();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const selectedSeats = searchParams.get('selectedSeats');

  // Split the selectedSeats string into an array
  const selectedSeatArray = selectedSeats ? selectedSeats.split(',') : [];

  const [amount, setAmount] = useState();

  useEffect(() => {
    setAmount(selectedSeatArray.length * 250);
  }, [selectedSeatArray]);

  const paymentGateway = () => {
    console.log('Total Payment before navigating:', amount);

    // Programmatically navigate to the payment page with totalPayment as a query parameter
    navigate(`/payment/${showId}?totalPayment=${amount}`);
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Order Summary</h5>
          <p>Seats: {selectedSeatArray.join(', ')}</p>
          <div className="d-flex justify-content-between">
            <span className="fw-bold">Ticket Price:</span>
            <span>Rs.250 </span>
          </div>
          <div className="d-flex justify-content-between">
            <span className="fw-bold">Total Price:</span>
            <span>Rs. {amount}</span>
          </div>
          <button className="btn btn-primary mt-3" onClick={paymentGateway}>
            Continue to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
