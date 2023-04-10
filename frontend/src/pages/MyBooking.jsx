import React, {useContext} from "react";
import "../styles/my-bookings.css";
import useFetch from "../components/hooks/useFetch";
import { BASE_URL } from "../utils/config";
import { AuthContext } from "../context/AuthContext";

const MyBooking = () => {
  const { data: bookings, error, loading } = useFetch(`${BASE_URL}/booking/user`);

  const {user} = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <div>
      {(!user || user===undefined||user===null) ? (
        <div className="request__login">Please log in to view your bookings</div>
      ) : (
        <>
          <div className="my-bookings-container">
          <h1>My Bookings</h1>
          <div className="book" >
            {bookings?.map((booking) => (
              <div className="bookings-container" key={booking._id}>
                <h3>{booking.tourName}</h3>
                <div className="my-booking-card">
                  <img src={booking.photo} alt="" />
                  <div className="details__box">
                <p><strong>Date:</strong> {new Date(booking.bookAt).toLocaleDateString("en-GB")}</p>
                <p><strong>Guest Size:</strong> {booking.guestSize}</p>
                </div>
                </div>
              </div>
          ))}
          </div>
          </div>
          </>
                  )}
    </div>
  );
};

export default MyBooking;
