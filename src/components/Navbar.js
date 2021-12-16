import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {

    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            {/* <a class="navbar-brand" href="#">Navbar</a> */}
            <NavLink to="/" className="navbar-brand">ConverzAI</NavLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                <NavLink to="/" className="nav-link">Home</NavLink>
                </li>
                <li class="nav-item">
                {/* <a class="nav-link" href="#">Features</a> */}
                <NavLink to="/bookings" className="nav-link">Operator Bookings</NavLink>
                </li>
                <li class="nav-item">
                <NavLink to="/history" className="nav-link">Customer Booking</NavLink>
                </li>
               
            </ul>
            </div>
        </div>
        </nav>
    )
}