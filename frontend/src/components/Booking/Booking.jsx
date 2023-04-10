import React, {useState, useContext} from 'react';
import "./booking.css";
import {Form, FormGroup, ListGroup, ListGroupItem, Button} from "reactstrap";
import { AuthContext } from '../../context/AuthContext';
import {loadStripe} from "@stripe/stripe-js";

import {BASE_URL} from "../../utils/config";

const Booking = ({tour, avgRating}) => {
    const {price, reviews, title, photo} = tour;

    const {user} = useContext(AuthContext);

    const [booking, setBooking] = useState({
        userId: user && user._id,
        userEmail: user && user.email,
        tourName:title,
        fullName:'',
        phone: '',
        guestSize:1,
        bookAt: '',
        photo: photo
    });
    const stripePromise = loadStripe("pk_test_51Mv1TuSB5S2Tmnfl10IzoeX7b5zvsASXXfHq9plE1PjSoXm8dkXGtViIsylIi3Xn6K1CQRqvRlw3U2GUVUTlItD8001OQWL4cr")

    const handleChange = e => {
        setBooking(prev => ({...prev, [e.target.id]: e.target.value}))
    }

    const serviceFee = 799;
    const totalAmount = Number(price) * Number(booking.guestSize) + Number(serviceFee);

    // send booking data to server
    const handleClick = async (e) => {
        e.preventDefault();
        try{
           if(!user || user===undefined||user===null){
            return alert("Please sign in")
           }
        //    create checkout session
        const stripe = await stripePromise;
        const res = await fetch(`${BASE_URL}/booking`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            credentials:'include',
            body: JSON.stringify({...booking, totalAmount}),
        });
        //    const res = await fetch(`${BASE_URL}/booking`,{
        //     method: 'POST',
        //     headers: {
        //         'content-type': 'application/json'
        //     },
        //     credentials:'include',
        //     body: JSON.stringify(booking)
        //    })
           const result = await res.json()

           if(!res.ok){
            return alert(result.message)
           }
        //    navigate("/thank-you");
        // Redirect to Stripe Checkout Page
        await stripe.redirectToCheckout({sessionId: result.session.id});
    }catch(err){
        alert(err.message);

    }     
    }

  return (
    <div className='booking'>
        <div className="booking__top d-flex align-items-center justify-content-between">
            <h3>₹{price} <span>/per person</span></h3>
            <span className="tour__rating d-flex align-items-center">
                <i className="ri-star-s-fill" ></i>
                {avgRating === 0 ? null : avgRating} ({reviews ?.length}) 
            </span>
        </div>

        {/* booking form start */}
        <div className='booking__form'>
            <h5>Information</h5>
            <Form className='booking__info-form' onSubmit={handleClick}>
                <FormGroup>
                    <input type="text" placeholder='Full Name' id='fullName' required onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <input type="number" placeholder='Phone' id='phone' required onChange={handleChange} />
                </FormGroup>
                <FormGroup className='d-flex align-items-center gap-3'>
                    <input type="date" placeholder='' id='bookAt' required onChange={handleChange} />
                    <input type="number" placeholder='Guest' id='guestSize' min='1' required onChange={handleChange} />
                </FormGroup>
            </Form>
        </div>
        {/* booking form end */}

        {/* booking bottom */}
        <div className='booking__bottom'>
            <ListGroup>
                <ListGroupItem className='border-0 px-0'>
                    <h5 className='d-flex align-items-center gap-1'>₹{price} <i className='ri-close-line'></i> 1 person </h5>
                    <span>₹{price}</span>
                </ListGroupItem>
                <ListGroupItem className='border-0 px-0'>
                    <h5>Service charge</h5>
                    <span>₹{serviceFee}</span>
                </ListGroupItem>
                <ListGroupItem className='border-0 px-0 total'>
                    <h5>Total</h5>
                    <span>₹{totalAmount}</span>
                </ListGroupItem>
            </ListGroup>

            <Button className='btn primary__btn w-100 mt-4' onClick={handleClick}>Book Now</Button>
        </div>
    </div>
  )
}

export default Booking