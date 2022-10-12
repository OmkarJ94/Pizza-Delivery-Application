import { useSelector, useDispatch } from 'react-redux'
import "./cart.css"
import { useParams, useNavigate } from "react-router-dom"
import CartItems from "./CartItems"
import axios from 'axios'
import swal from "sweetalert";
import { useEffect, useState } from 'react';
const Cart = () => {
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
      history("/signin");
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



  const displayRazorPay = async (amount, e) => {
    e.preventDefault()
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

      swal("Something went wrong")
    }


  }

  const showOrderdetails = () => {

  }




  useEffect(() => {
    handleClick()
    const data = localStorage.getItem("pizzas")
    console.log(data)

  }, [])
  return (
    <>
      <div className="container">
        <h4><b>Shopping Cart</b></h4>
        {

          pizzas.map((ele) => {


            return (
              <>
                <div>
                  <div class="card my-3">
                    <div class="row">
                      <div class="col-md-8 cart">

                        <div class="row border-top border-bottom">
                          <div class="row main align-items-center">
                            <div class="col-4"><img class="img-fluid" src={ele.image} /></div>
                            <div class="col">
                              <div class="row text-muted">{ele.name}</div>

                            </div>

                            <div className="col-2">
                              <p>Varient <b>{(ele.varient)}</b></p>

                            </div>


                            <div class="col-2">
                              <img src="https://img.icons8.com/material-rounded/24/000000/plus--v2.png" onClick={() => {

                                dispatch({ type: "INC", payload: { _id: ele._id, cate: "pizza" } })
                                setCounter(counter + 1)

                              }}
                              />

                              {ele.count}
                              <img src="https://img.icons8.com/metro/26/000000/minus.png" onClick={() => {
                                setCounter(counter + 1)
                                dispatch({ type: "DEC", payload: { _id: ele._id, cate: "pizza" } })

                              }} />
                            </div>
                            <div class="col">Rs. {ele.price * ele.count}</div>


                            <div class="col"><span class="close"></span>
                              <img src="https://img.icons8.com/ios-glyphs/30/000000/filled-trash.png"
                                onClick={() => {
                                  dispatch({ type: "REMOVE", payload: { _id: ele._id, cate: "pizza", count: ele.count } })
                                }}
                              />
                            </div>
                          </div>
                        </div>


                      </div>
                    </div>
                  </div>
                </div >
              </>
            )

          })



        }
        {
          sauces.map((ele) => {


            return (
              <>
                <div>
                  <div class="card my-3">
                    <div class="row">
                      <div class="col-md-8 cart">
                        <div class="row border-top border-bottom">
                          <div class="row main align-items-center">
                            <div class="col-4"><img class="img-fluid" src={ele.sauce.image} /></div>
                            <div class="col-2">
                              <p style={{ textAlign: "center" }}>Sauce : {ele.sauce.name}</p>
                              {/* <div class="row text-muted">{ele.pizza.name}</div> */}

                            </div>
                            <div class="col-2">
                              <img src="https://img.icons8.com/material-rounded/24/000000/plus--v2.png" onClick={() => {
                                setorderid(ele._id)
                                dispatch({ type: "INC", payload: { _id: ele.sauce._id, cate: "sauce" } })

                                setCounter(counter + 1)

                              }}
                              />
                              {ele.count}
                              <img src="https://img.icons8.com/metro/26/000000/minus.png" onClick={() => {
                                setorderid(ele._id)

                                setCounter(counter + 1)
                                dispatch({ type: "DEC", payload: { _id: ele.sauce._id, cate: "sauce" } })

                              }} />
                            </div>
                            <div class="col">Rs. {ele.sauce.price * ele.count}</div>

                            <div class="col"><span class="close"></span>
                              <img src="https://img.icons8.com/ios-glyphs/30/000000/filled-trash.png"
                                onClick={() => {
                                  dispatch({ type: "REMOVE", payload: { _id: ele.sauce._id, cate: "sauce" } })
                                }}
                              />
                            </div>
                          </div>
                        </div>


                      </div>
                    </div>
                  </div>
                </div >
              </>
            )

          })



        }
        {
          cheeses.map((ele) => {


            return (
              <>
                <div>
                  <div class="card my-3">
                    <div class="row">
                      <div class="col-md-8 cart">

                        <div class="row border-top border-bottom">
                          <div class="row main align-items-center">
                            <div class="col-4"><img class="img-fluid" src={ele.cheese.image} /></div>
                            <div class="col">
                              <div class="row text-muted">{ele.cheese.name}</div>

                            </div>
                            <div class="col-2">
                              <img src="https://img.icons8.com/material-rounded/24/000000/plus--v2.png" onClick={() => {
                                setorderid(ele._id)
                                dispatch({ type: "INC", payload: { _id: ele.cheese._id, cate: "cheese" } })

                                setCounter(counter + 1)

                              }}
                              />
                              {ele.count}
                              <img src="https://img.icons8.com/metro/26/000000/minus.png" onClick={() => {
                                setorderid(ele._id)

                                setCounter(counter + 1)
                                dispatch({ type: "DEC", payload: { _id: ele.cheese._id, cate: "cheese" } })

                              }} />
                            </div>
                            <div class="col">Rs. {ele.cheese.price * ele.count}</div>


                            <div class="col"><span class="close"></span>
                              <img src="https://img.icons8.com/ios-glyphs/30/000000/filled-trash.png"
                                onClick={() => {
                                  dispatch({ type: "REMOVE", payload: { _id: ele.cheese._id, cate: "cheese", count: ele.count } })
                                }}
                              />
                            </div>
                          </div>
                        </div>


                      </div>
                    </div>
                  </div>
                </div >
              </>
            )

          })



        }

        <div class="container">

          <h2>Your Bill</h2>
          <div class="card p-3 mb-5">
            <div class="card-body">Total Items : {totalQuantity}</div>
            <div class="card-body">Total Ammount : {totalPrice}</div>
            <div class="card-body">Delivering At : {data.address}</div>

            {totalQuantity === 0 || totalPrice === 0 ? " " : <button class="btn btn-primary" style={{ width: "200px" }} onClick={(e) => {
              displayRazorPay(totalPrice, e)
              showOrderdetails()
            }}>Buy Now</button>}

          </div>

        </div>
        {/* <h1>Subtotal : {totalprice}</h1> */}
      </div >

    </>





  )
}

export default Cart