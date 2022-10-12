import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import "./Navbar.css"
import Sauce from './Sauce'
const Navbar = () => {
    const state = useSelector(state => state.cardItems)
   
    if (state.status && state.type === process.env.REACT_APP_type) {
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
                                <NavLink className="nav-link" to="/logout">
                                    LOG OUT
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/addtocart">
                                    Cart {state.pizzas.length + state.sauces.length + state.cheeses.length}
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