import React, { useState, useEffect } from 'react'
import {  useNavigate, NavLink } from "react-router-dom"
import { useSelector } from 'react-redux'
import swal from "sweetalert";
import "./Navbar.css"
import Sauce from './Sauce'
const Navbar = () => {
    const history = useNavigate();
    const state = useSelector(state => state.cardItems)
    console.log(state)
    const [display, setDisplay] = useState(false)
    const chk = async () => {
        try {
            const res = await fetch("/profilepage", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            const Data = await res.json();

            if (!res.status === 200) {
                swal("error");
            }
            else {
                setDisplay(true)

            }

        } catch (error) {
            history("/signin");
            swal("You Must Be Logged In To View About Page");

        }
    }
    useEffect(() => {
        chk()
    }, []);
    if (display && state.type === process.env.REACT_APP_type) {
        return (
            <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
                <div class="container-fluid">
                    <li className="nav-item" style={{ listStyle: "none" }}>
                        <NavLink className="nav-link" to="/" style={{ color: "black" }}>
                            PizzaHub
                        </NavLink>
                    </li>
                    <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarCollapse">

                        <div class="navbar-nav ms-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/logout">
                                    LOG OUT
                                </NavLink>
                            </li>

                        </div>
                    </div>
                </div>
            </nav>
        )
    }

    else if (state.status) {

        return (
            <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
                <div class="container-fluid">
                    <li className="nav-item" style={{ listStyle: "none" }}>
                        <NavLink className="nav-link" to="/" style={{ color: "black" }}>
                            PizzaHub
                        </NavLink>
                    </li>
                    <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarCollapse">

                        <div class="navbar-nav ms-auto">

                            <li className="nav-item">
                                <NavLink className="nav-link" to="/addtocart">
                                    Cart {state.pizza.length + state.sauces.length + state.cheeses.length}
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/logout">
                                    LOG OUT
                                </NavLink>
                            </li>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }

    else {
        return (
            <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
                <div class="container-fluid">
                    <li className="nav-item" style={{ listStyle: "none" }}>
                        <NavLink className="nav-link" to="/" style={{ color: "black" }}>
                            PizzaHub
                        </NavLink>
                    </li>
                    <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarCollapse">

                        <div class="navbar-nav ms-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/signin">
                                    LOG IN
                                </NavLink>
                            </li>

                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar