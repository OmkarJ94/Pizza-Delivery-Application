import React, { useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import swal from "sweetalert"
const Sauce = ({ sauce }) => {
    const dispatch = useDispatch();
    const [count, setCount] = useState(1);
    const History = useNavigate();
    const handleClick = async () => {
        try {
            const res = await fetch("/profilepage", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            const data = await res.json();

            if (!res.status === 200) {
                swal("error");
            }
            else {
                dispatch({ type: "sauce", payload: { sauce, count } });
            }
        } catch (error) {
     
            History("/signin");
            swal("Please Log in to add item in cart");

        }
    }
    return (
        <div>
            <div>

                <div class="card my-3" style={{ width: "18rem", height: "500px", boxShadow: " 0 12px 16px 0 rgba(0, 0, 0, 0.2)", }}>
                    <img class="card-img-top" src={sauce.image} style={{ height: "300px" }} alt="Card image cap" />
                    <div class="card-body">
                        <h5 class="card-title">{sauce.name}</h5>
                        {/* <button class="btn btn-primary mx-2" onClick={() => { setCount(count + 1) }}> + </button> */}
                        <img src="https://img.icons8.com/material-rounded/24/000000/plus--v2.png" onClick={() => { setCount(count + 1) }} />
                        {count}
                        <img src="https://img.icons8.com/metro/26/000000/minus.png" onClick={() => { count <= 1 ? setCount(1) : setCount(count - 1) }} />
                        {/* <button class="btn btn-primary mx-2" onClick={() => { count <= 1 ? setCount(1) : setCount(count - 1) }}> - </button> */}
                        <h5 class="card-title">Price : Rs. {sauce.price * count}</h5>
                        <button href="#" class="btn btn-primary my-2" onClick={() => {

                            handleClick()
                        }}>Add To Cart</button>
                    </div>
                </div>

            </div >
        </div>
    )
}

export default Sauce