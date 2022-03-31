import { useSelector, useDispatch } from 'react-redux'
import "./cart.css"
import { useParams, useNavigate, NavLink } from "react-router-dom"
import CartItems from "./CartItems"
import axios from 'axios'
import swal from "sweetalert";
import { useEffect, useState } from 'react';

const Addtocart = () => {
    const { pizzas, totalQuantity, totalPrice, sauces, cheeses } = useSelector(state => state.cardItems);

    const dispatch = useDispatch()
    const [data, setUserData] = useState({})

    const [counter, setCounter] = useState(0)

    const [orderid, setorderid] = useState()
    const history = useNavigate();
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

            const Data = await res.json();

            if (!res.status === 200) {
                swal("error");
            }
            else {
                setUserData(Data)

            }

        } catch (error) {
            // history("/signin");
            swal("You Must Be Logged In To View About Page");

        }
    }
    const storeOrder = async (amount) => {
        try {
            const res = await fetch('/razorpay',
                {
                    method: 'POST',
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        amount: amount,
                        time: new Date().toLocaleString()
                    }),
                })

            const result = await res.json();
            console.log(result)
            console.log(res)

        } catch (error) {
            console.log(error.message);
        }
    }



    const displayRazorPay = async (amount) => {

        try {
            var options = {
                "key": process.env.REACT_APP_APIKEY,
                "amount": totalPrice * 100, // 2000 paise = INR 20, amount in paisa
                "name": "PizzaHub",
                "description": "Thank You Visit Again",
                // 'order_id': "",
                "handler": function (response) {
                    storeOrder(amount)
                    swal("Your Order Placed Successfully")
                },
                "prefill": {
                    "name": data.name,
                    "email": data.email,


                },
                "theme": {
                    "color": "#528ff0"
                }
            };
            var rzp = new window.Razorpay(options);
            rzp.open()


        } catch (error) {
            console.log(error.message)
            swal("Something went wrong")
        }


    }

    useEffect(() => {
        handleClick()

    }, [])
    return (
        <div><section class="h-100 h-custom" >
            <div class="container py-5 h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-12">
                        <div class="card card-registration card-registration-2" style={{ borderRadius: "15px" }}>
                            <div class="card-body p-0">
                                <div class="row g-0" style={{ boxShadow: "0 12px 16px 0 rgba(0, 0, 0, 0.2)" }}>
                                    <div class="col-lg-8">
                                        <div class="p-5">
                                            <div class="d-flex justify-content-between align-items-center mb-5">
                                                <h1 class="fw-bold mb-0 text-black">Shopping Cart</h1>
                                                <h6 class="mb-0 text-muted">{totalQuantity} items</h6>
                                            </div>
                                            {totalQuantity === 0 || totalPrice === 0 ?
                                                <h1>Nothing in Cart...</h1>
                                                :
                                                ""
                                            }

                                            {pizzas.map((ele) => {
                                                return (
                                                    <div class="row mb-4 d-flex justify-content-between align-items-center">
                                                        <div class="col-md-2 col-lg-2 col-xl-2">
                                                            <img
                                                                src={ele.image}
                                                                class="img-fluid rounded-3" alt={ele.name} />
                                                        </div>
                                                        <div class="col-md-3 col-lg-3 col-xl-3">
                                                            <h6 class="text-muted">{ele.category}</h6>
                                                            <h6 class="text-black mb-0">{ele.varient}</h6>
                                                        </div>
                                                        <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                                                            <button class="btn btn-primary px-2"
                                                                onClick={() => {

                                                                    dispatch({ type: "DEC", payload: { _id: ele._id, cate: "pizza" } })
                                                                }}>
                                                                <i class="fas fa-minus"></i>
                                                            </button>

                                                            <input id="form1" min="0" name="quantity" value={ele.count} type="text"
                                                                class="form-control form-control-sm" />

                                                            <button class="btn btn-primary px-2"
                                                                onClick={() => {
                                                                    dispatch({ type: "INC", payload: { _id: ele._id, cate: "pizza" } })

                                                                }}>
                                                                <i class="fas fa-plus"></i>
                                                            </button>
                                                        </div>
                                                        <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                                            <h6 class="mb-0">₹ {ele.price * ele.count}</h6>
                                                        </div>
                                                        <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                                                            <img src="https://img.icons8.com/ios-glyphs/30/000000/filled-trash.png"
                                                                style={{ cursor: 'pointer' }}
                                                                onClick={() => {
                                                                    dispatch({ type: "REMOVE", payload: { _id: ele._id, cate: "pizza", count: ele.count } })
                                                                }}
                                                            />
                                                        </div>
                                                    </div>

                                                )
                                            })
                                            }

                                            {sauces.map((ele) => {
                                                return (
                                                    <div class="row mb-4 d-flex justify-content-between align-items-center">
                                                        <div class="col-md-2 col-lg-2 col-xl-2">
                                                            <img
                                                                src={ele.sauce.image}
                                                                class="img-fluid rounded-3" alt={ele.sauce.name} />
                                                        </div>
                                                        <div class="col-md-3 col-lg-3 col-xl-3">
                                                            <h6 class="text-muted">{ele.sauce.category}</h6>
                                                            <h6 class="text-black mb-0">{ele.sauce.name}</h6>
                                                        </div>
                                                        <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                                                            <button class="btn btn-primary px-2"
                                                                onClick={() => {

                                                                    dispatch({ type: "DEC", payload: { _id: ele.sauce._id, cate: "sauce" } })
                                                                }}>
                                                                <i class="fas fa-minus"></i>
                                                            </button>

                                                            <input id="form1" min="0" name="quantity" value={ele.count} type="text"
                                                                class="form-control form-control-sm" />

                                                            <button class="btn btn-primary px-2"
                                                                onClick={() => {
                                                                    dispatch({ type: "INC", payload: { _id: ele.sauce._id, cate: "sauce" } })

                                                                }}>
                                                                <i class="fas fa-plus"></i>
                                                            </button>
                                                        </div>
                                                        <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                                            <h6 class="mb-0">₹ {ele.sauce.price * ele.count}</h6>
                                                        </div>
                                                        <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                                                            <img src="https://img.icons8.com/ios-glyphs/30/000000/filled-trash.png"
                                                                style={{ cursor: 'pointer' }}
                                                                onClick={() => {
                                                                    dispatch({ type: "REMOVE", payload: { _id: ele.sauce._id, cate: "sauce", count: ele.count } })
                                                                }}
                                                            />
                                                        </div>
                                                    </div>

                                                )
                                            })}
                                            {
                                                cheeses.map((ele) => {
                                                    return (
                                                        <div class="row mb-4 d-flex justify-content-between align-items-center">
                                                            <div class="col-md-2 col-lg-2 col-xl-2">
                                                                <img
                                                                    src={ele.cheese.image}
                                                                    class="img-fluid rounded-3" alt={ele.cheese.name} />
                                                            </div>
                                                            <div class="col-md-3 col-lg-3 col-xl-3">
                                                                <h6 class="text-muted">{ele.cheese.category}</h6>
                                                                <h6 class="text-black mb-0">{ele.cheese.name}</h6>
                                                            </div>
                                                            <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                                                                <button class="btn btn-primary px-2"
                                                                    onClick={() => {

                                                                        dispatch({ type: "DEC", payload: { _id: ele.cheese._id, cate: "cheese" } })
                                                                    }}>
                                                                    <i class="fas fa-minus"></i>
                                                                </button>

                                                                <input id="form1" min="0" name="quantity" value={ele.count} type="text"
                                                                    class="form-control form-control-sm" />

                                                                <button class="btn btn-primary px-2"
                                                                    onClick={() => {
                                                                        dispatch({ type: "INC", payload: { _id: ele.cheese._id, cate: "cheese" } })

                                                                    }}>
                                                                    <i class="fas fa-plus"></i>
                                                                </button>
                                                            </div>
                                                            <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                                                <h6 class="mb-0">₹ {ele.cheese.price * ele.count}</h6>
                                                            </div>
                                                            <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                                                                <img src="https://img.icons8.com/ios-glyphs/30/000000/filled-trash.png"
                                                                    style={{ cursor: 'pointer' }}
                                                                    onClick={() => {
                                                                        dispatch({ type: "REMOVE", payload: { _id: ele.cheese._id, cate: "cheese", count: ele.count } })
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }


                                            <hr class="my-4" />
                                            <div class="pt-5">
                                                <h6 class="mb-0"><NavLink to="/" class="text-body"><i
                                                    class="fas fa-long-arrow-alt-left me-2"></i>Back to shop</NavLink></h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 bg-grey">
                                        <div class="p-5">
                                            <h3 class="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                                            <hr class="my-4" />

                                            <div class="d-flex justify-content-between mb-4">
                                                <h5 class="text-uppercase">items {totalQuantity}</h5>

                                            </div>

                                            <h5 class="text-uppercase mb-3">Shipping to {data.address}</h5>
                                            <hr class="my-4" />

                                            <div class="d-flex justify-content-between mb-5">
                                                <h5 class="text-uppercase">Total price</h5>
                                                <h5>₹ {totalPrice}</h5>
                                            </div>

                                            {totalQuantity === 0 || totalPrice === 0 ? "" : <button type="button" class="btn btn-dark btn-block btn-lg"
                                                data-mdb-ripple-color="dark"
                                                onClick={() => {
                                                    displayRazorPay(totalPrice)

                                                }}
                                            >Buy Now</button>}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section></div>
    )
}

export default Addtocart