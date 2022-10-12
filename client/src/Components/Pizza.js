import { addtoCart } from "../actions/action";
import { useSelector, useDispatch } from "react-redux";
import swal from "sweetalert";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Pizza = ({ pizza }) => {

    const history = useNavigate();
    const [count, setCount] = useState(1);
    const state = useSelector((state) => state.cardItems);

    const [varient, setVarient] = useState("Small");
    const dispatch = useDispatch();
    const [pizzalist, setPizzalist] = useState([]);
    const { id } = useParams();
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
            } else {
                if (pizza.category === "pizza") {
                    dispatch({
                        type: "Add to cart",
                        payload: { pizza, count, varient, category: "pizza" },
                    });
                } else {
                    dispatch({ type: "sauce", payload: { pizza, count } });
                }
            }
        } catch (error) {

            history("/signin");
            swal("Please Log in to add item in cart");
        }
    };

    return (
        <div>
            <div
                class="card my-3"
                style={{
                    width: "18rem",
                    height: "500px",

                    boxShadow: " 0 12px 16px 0 rgba(0, 0, 0, 0.2)",
                }}
            >
                <img
                    class="card-img-top"
                    src={pizza.image}
                    alt="Card image cap"
                    style={{ height: "300px" }}
                />
                <div class="card-body">
                    <h5 class="card-title">{pizza.name}</h5>
                    <p class="card-text">{pizza.description}</p>
                    {/* <p>Price : Rs.{pizzas.price}</p> */}
                    <div className="w-100 m-1">
                        {pizza.category === "pizza" ? (
                            <>
                                <p>Varient </p>
                                <select
                                    className="form-control my-2"
                                    value={varient}
                                    onChange={(e) => {
                                        setVarient(e.target.value);
                                    }}
                                >
                                    return <option value="Small">Regular</option>; return{" "}
                                    <option value="Medium">Mediun</option>; return{" "}
                                    <option value="Large">Large</option>;
                                </select>
                            </>
                        ) : (
                            " "
                        )}

                        <img
                            src="https://img.icons8.com/material-rounded/24/000000/plus--v2.png"
                            onClick={() => {
                                setCount(count + 1);
                            }}
                        />
                        {count}
                        <img
                            src="https://img.icons8.com/metro/26/000000/minus.png"
                            onClick={() => {
                                count <= 1 ? setCount(1) : setCount(count - 1);
                            }}
                        />

                        {pizza.category === "pizza" ? (
                            <p class="card-text">Rs. {pizza[varient] * count}</p>
                        ) : (
                            <p class="card-text">Rs. {pizza.price * count}</p>
                        )}
                    </div>
                    <button

                        class="btn btn-primary my-2"
                        onClick={() => {
                            handleClick();
                        }}
                    >
                        Add To Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Pizza;