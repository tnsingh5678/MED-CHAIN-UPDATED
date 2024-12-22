import React, { useContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import Home from "./Pages/tripurariEdit/Home";
import Appointment from "./Pages/Appointment";
import AboutUs from "./Pages/AboutUs";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Context } from "./main";

import UserDetails2 from "./Pages/tripurariEdit/Userdetails2";
import FileUpload from "./Pages/tripurariEdit/FileUpload";
import HospitalDetails from "./Pages/tripurariEdit/HospitalDetails";

import Chat from "./components/Chat";

// Tripurari pages
import Login from "./Pages/tripurari/login";
import SignUp from "./Pages/tripurari/SignUP";
import NotFound from "./Pages/tripurari/NotFound";
import HospitalList from "./Pages/tripurari/HospitalList";
import HospitalDetail from "./Pages/tripurari/UserViewHospital";
import { CheckoutForm, Return } from "./Pages/tripurari/Payment";

import HospitalSendResponsePage from "./Pages/tripurari/OCR";

import { GoogleOAuthProvider } from "@react-oauth/google";

const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } =
    useContext(Context);
  const clientID = '753532737312-qlvo5g68kuoe2gmukm19cbnk951pich9.apps.googleusercontent.com';
  return (
    <>
      <Router>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/about" element={<AboutUs />} />
          <Route path="/appointment1" element={<Appointment/>}/>
          <Route path="/appointment-status1" element={<UserDetails2/>} />
          <Route path="/fileUpload" element={<FileUpload/>}/>
          <Route path="/hospital" element={<HospitalDetails/>}/>
          <Route path="/chat" element={<Chat/>}/>

        {/* Tripurari pages */}
        {/* Only wrap the SignUp page  and login page with GoogleOAuthProvider */}
        <Route
          path="/signup"
          element={
            <GoogleOAuthProvider clientId={clientID}>
              <SignUp />
            </GoogleOAuthProvider>
          }
        />
        <Route
          path="/login"
          element={
            <GoogleOAuthProvider clientId={clientID}>
              <Login />
            </GoogleOAuthProvider>
          }/>
        <Route path="/hospital/:name" element={<HospitalDetails />}/>
        <Route path="/user/:name" element={<UserDetails2/>}/>
        <Route path="*" element={<NotFound/>}/>
        <Route path="/HospitalList" element={<HospitalList/>}/>
        <Route path="/HospitalList/:hospitalname" element={<HospitalDetail/>}/>
        <Route path="/checkout" element={<CheckoutForm/>}/>
        <Route path="/return" element={<Return/>}/>
        <Route path="/ocrspace" element={<HospitalSendResponsePage/>}/>
 

        </Routes>
        {/* <Footer /> */}
        <ToastContainer position="top-center" />
      </Router>
    </>
  );
};

export default App;


