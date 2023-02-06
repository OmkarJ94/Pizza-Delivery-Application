import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
const Cheese = ({ cheese }) => {
    const [count, setCount] = useState(1)
    const dispatch = useDispatch();
    const History = useNavigate()
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
            console.log(cheese);
            if (!res.status == 200) {
                swal("error");
            }
            else {
                if (cheese.category === "cheese") {
                    dispatch({
                        type: "cheese",
                        payload: { cheese, count, category: "cheese" },
                    });
                }

            }
        } catch (error) {
            console.log(error)
            History("/signin");
            swal("Please Log in to add item in cart");

        }
    }
    return (
        <div>
            <div>
                <div>

                    <div class="card my-3" style={{ width: "18rem", height: "480px", boxShadow: " 0 12px 16px 0 rgba(0, 0, 0, 0.2)", }}>
                        <img class="card-img-top" src={cheese.image} style={{ height: "300px" }} alt="Card image cap" />
                        <div class="card-body">
                            <h5 class="card-title">{cheese.name}</h5>
                            <img src="https://img.icons8.com/material-rounded/24/000000/plus--v2.png" onClick={() => { setCount(count + 1) }} />
                            {count}
                            <img src="https://img.icons8.com/metro/26/000000/minus.png" onClick={() => { count <= 1 ? setCount(1) : setCount(count - 1) }} />
                            <h5 class="card-title">Price : Rs. {cheese.price * count}</h5>
                            <button href="#" class="btn btn-primary my-2" onClick={() => {
                                handleClick()
                            }}>Add To Cart</button>
                        </div>
                    </div>

                </div >
            </div>
        </div>
    )
}

export default Cheese