import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './SeatBook.css';
import OrderSummary from '../OrderSummary/OrderSummary';

const SeatBook = () => {
  const [totalSeats, setTotalSeats] = useState([]);
  const [selectedSeatIds, setSelectedSeatIds] = useState([]);
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const navigate = useNavigate();
  const { showId } = useParams();
  console.log(showId);

  useEffect(() => {
    const url = `http://localhost:9090/admin/showdetail/${showId}`;
    axios
      .get(url)
      .then((response) => {
        console.log(response);
        const seats = response.data?.seats;
        if (Array.isArray(seats)) {
          setTotalSeats(seats);
        } else {
          console.error('Invalid seat details structure:', response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching seat details:', error);
      });
  }, [showId]);

  const handleSeatClick = (seat) => {
    if (seat.available && !seat.locked) {
      const seatElement = document.getElementById(`seat-${seat.id}`);
      if (seatElement) {
        seatElement.classList.toggle('booking-selected');
      }
  
      setSelectedSeatIds((prevSelectedSeatIds) => {
        const seatNumber = seat.seatNumber;
        if (prevSelectedSeatIds.includes(seatNumber)) {
          return prevSelectedSeatIds.filter((id) => id !== seatNumber);
        } else {
          return [...prevSelectedSeatIds, seatNumber];
        }
      });
  
      
      axios
        .post('http://localhost:9090/admin/lockseat', {
          showId: Number(showId),
          seatNumber: seat.seatNumber,
        })
        .then((response) => {
          console.log('Seat locked successfully', response);
          
          if (response.data === 'Seat locked successfully') {
            console.log('Adding class for locked seat');
            seatElement.classList.add('booking-locked');
  
            // i am here trying to fetch updated seat details after locking
            axios
              .get(`http://localhost:9090/admin/showdetail/${showId}`)
              .then((response) => {
                const seats = response.data?.seats;
                if (Array.isArray(seats)) {
                  // Update the state with the new seat details
                  setTotalSeats(seats);
                } else {
                  console.error('Invalid seat details structure:', response.data);
                }
              })
              .catch((error) => {
                console.error('Error fetching updated seat details:', error);
              });
          }
        })
        .catch((error) => {
          console.error('Error locking seat:', error);
        });
    }
  };
  
  
  

  useEffect(() => {
    const container = document.querySelector('.booking-container');
    container.addEventListener('click', handleSeatClick);

    return () => {
      container.removeEventListener('click', handleSeatClick);
    };
  }, []);

  const seatsPerRow = 10;

  const groupedSeats = Array.from(
    { length: Math.ceil(totalSeats.length / seatsPerRow) },
    (_, rowIndex) =>
      totalSeats.slice(rowIndex * seatsPerRow, (rowIndex + 1) * seatsPerRow)
  );

  const handlePaymentContinue = () => {
    setShowOrderSummary(true);
  };

  const bookSeatHandler = () => {
    // Ensure that there are selected seats before making the request
    if (selectedSeatIds.length > 0) {
      // Extract only seat numbers from selectedSeatIds
      // Send a POST request to your backend with showId and selectedSeatNumbers
      axios.post('http://localhost:9090/admin/seatbooking', {
        showId: Number(showId),
        selectedSeats: selectedSeatIds,
      })
        .then((response) => {
         
          console.log('Seats booked successfully', response);
        })
        .catch((error) => {
          
          console.error('Error booking seats:', error);
        });
    } else {
      console.warn('No seats selected. Cannot book seats.');
    }
  };

  return (
    <>
      <div className="booking-seatbody">
        <div className="booking-container">
          <div className="booking-screen"></div>
         

{groupedSeats.map((rowSeats, rowIndex) => (
  <div key={rowIndex} className="booking-row">
    {rowSeats.map((seat) => (
      <div
        key={seat.id}
        id={`seat-${seat.id}`}
        className={`
          booking-seat
          ${seat.available ? 'booking-available' : 'booking-occupied'}
          ${selectedSeatIds.includes(seat.seatNumber) ? 'booking-selected' : ''}
          ${seat.locked ? 'booking-locked' : ''}  // Check the lock status
        `}
        onClick={() => handleSeatClick(seat)}
      ></div>
    ))}
  </div>
))}

        </div>
        <p className="booking-text">
          You have selected <span id="count">{selectedSeatIds.length}</span> seats.
        </p>
        <div>
        <Link
  to={`/ordersummary/${showId}${selectedSeatIds.length > 0 ? `?selectedSeats=${selectedSeatIds.join(',')}` : ''}`}
  className="booking-btn booking-btn-primary booking-btn-lg booking-btn-block"
  onClick={() => {
    console.log('Navigating to OrderSummary with showId:', showId); 
    bookSeatHandler();
  }}
>
            Click Here to Book Tickets
          </Link>
        </div>
      </div>

      {showOrderSummary && (
        <OrderSummary
          selectedSeats={selectedSeatIds}
          onContinueToPayment={handlePaymentContinue}
          showId={showId}
        />
      )}
    </>
  );
};

export default SeatBook;
