import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../../components/Auth/Login/Login";
import Signup from "../../components/Auth/Signup/Signup";
import "./Auth.css";

export default function Auth() {
  return (
    <div
      className="auth__page w-100 flex-col-center"
      style={{
        backgroundImage: "url('/assets/Auth/auth_background.jpg')",
      }}
    >
      <div className="container ">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </div>
  );
}
