import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Ensure axios is imported
import Hero from "../components/Hero";
import NewAppo from "../components/NewAppo";

const Appointment = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Retrieved token:', token);

    if (token) {
        axios.post('http://localhost:4000/check-token', { token })
            .then((response) => {
                console.log('Token validation response:', response.data);

                if (response.data.valid) {
                    // Extract userName from the response and update state
                    setUserName(response.data.user.name);
                } else {
                    // Handle invalid token
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            })
            .catch((error) => {
                console.error('Error validating token:', error);
                localStorage.removeItem('token');
                navigate('/login');
            });
    } else {
        // Redirect if no token is found
        navigate('/login');
    }
  }, [navigate]);

  return (
    <>
      <Hero
        title="Schedule Your Appointment | Medchain"
        imageUrl="/signin.png"
      />
      <NewAppo userName={userName} />
    </>
  );
};

export default Appointment;
