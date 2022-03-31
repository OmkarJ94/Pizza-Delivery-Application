import swal from 'sweetalert'
import PizzaList from "./PizzaList.js"
import SausList from "./SausList.js"
import Pizza from './Pizza.js'
import Sauce from "./Sauce.js"
import CheeseList from "./CheeseList.js"
import Cheese from "./Cheese.js"
import { useEffect, useState } from 'react'
// import "./Pizza.css"
const Home = () => {
    const [pizzalist, setPizzalist] = useState([])
    const fetchdata = async () => {
        try {
            const result = await fetch("/pizza",
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                })
            const data = await result.json()

            if (result.status !== 200) {

                swal("something went wrong");
            } else {
                setPizzalist(data)


            }
        }
        catch (err) {
            swal("something went wrong");
            console.log(err.message);
        }
    }

    useEffect(() => {
        fetchdata()
    }, [])
    return (
        <>
            <div className="container">

                <div className="row">

                    {
                        pizzalist.map((ele) => {

                            return (
                                <>
                                    <div className="col-md-4 my-1" style={{
                                        display: "flex", justifyContent: "center", alignItems: "center"
                                    }}>
                                        {ele.category === "pizza" ?
                                            <Pizza pizza={ele} />
                                            : ele.category === "sauce" ?
                                                <Sauce sauce={ele} /> :
                                                ele.category === "cheese" ?
                                                    <Cheese cheese={ele} /> : ""

                                        }
                                    </div>

                                </>
                            )

                        })
                    }

                </div>


            </div >
            {/* <div className="container">

                <div className="row">
                    <h1>Sauce</h1><hr />
                    {
                        SausList.map((ele) => {
                            return (
                                <>
                                    <div className="col-md-4 my-1" >
                                        <Sauce sauce={ele} />
                                    </div>

                                </>
                            )

                        })
                    }

                </div>


            </div > */}
            {/* <div className="container">

                <div className="row">
                    <h1>Cheese</h1><hr />
                    {
                        CheeseList.map((ele) => {
                            return (
                                <>
                                    <div className="col-md-4 my-1" >
                                        <Cheese cheese={ele} />
                                    </div>

                                </>
                            )

                        })
                    }

                </div>


            </div > */}
        </>
    )
}

export default Home