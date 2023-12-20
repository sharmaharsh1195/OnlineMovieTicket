/* global Razorpay */
import React, { useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Payment = () => {
  const location = useLocation();
  const totalPayment = new URLSearchParams(location.search).get('totalPayment');

  console.log(totalPayment);

  useEffect(() => {
    if (totalPayment !== null) {
      const backendresponse=axios.post(
        'http://localhost:9090/user/create_order',
        {
          amount: totalPayment,
          info: 'order_request',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
        .then(response => {
          console.log(response.data);

          if(response.data.status=="created")
          {
            //open payment form 
            let options={
              key:'rzp_test_7wYcvB96CX6ZGp',
              amount:response.data.amount,
              currency:'INR',
              name:"MovieEmbassy",
              description:"payment for ticket",
              image:"https://as1.ftcdn.net/v2/jpg/02/77/43/16/500_F_277431683_6hPoMBAo81iiEjlaTyXfzfrms4oaZvgW.jpg",
              order_id:response.data.id,
              handler: function (response) {
                if (response.error) {
                  console.error('Razorpay Payment Error:', response.error);
                } else {
                  console.log('Payment successful');
                  console.log('Razorpay Payment ID:', response.razorpay_payment_id);
                }
              },
              
              prefill: { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                name: "harsh", //your customer's name
                email: "h@gmail.com",
                contact: "9876543210" //Provide the customer's phone number for better conversion rates 
            },
            notes: {
                address: "Razorpay Corporate Office"
            },
            theme: {
                color: "#3399cc"
            }




            };
            let rzp=new Razorpay(options);
            rzp.open()
          }
        })
        .catch(error => {
          console.error("error"+error);
          alert('Something went wrong!!');
        });
    }
  }, [totalPayment]);

  return (
    <div>
    
    </div>
  );
};

export default Payment;
