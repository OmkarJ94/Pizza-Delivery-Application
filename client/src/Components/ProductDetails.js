import React, { useEffect, useState } from 'react'
import { useParams, NavLink } from "react-router-dom";
import swal from "sweetalert";
import "./ProductDetails.css"
const ProductDetails = () => {
    const { id } = useParams();
    const [data, setData] = useState([])
    const fetchdata = async () => {
        try {
            const result = await fetch(`/particularproduct/${id}`,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                })
            const data = await result.json()
            console.log(data)

            if (result.status !== 200) {

                swal("something went wrong");
            } else {
                setData(data)


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
            <div class="super_container">
                <header class="header" style={{display: "none"}}>
                    <div class="header_main">
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-6 col-12 order-lg-2 order-3 text-lg-left text-right">
                                    <div class="header_search">
                                        <div class="header_search_content">
                                            <div class="header_search_form_container">
                                                <form action="#" class="header_search_form clearfix">
                                                    <div class="custom_dropdown">
                                                        <div class="custom_dropdown_list"> <span class="custom_dropdown_placeholder clc">All Categories</span> <i class="fas fa-chevron-down"></i>
                                                            <ul class="custom_list clc">
                                                                <li><a class="clc" href="#">All Categories</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <div class="single_product">
                    <div class="container-fluid" style={{backgroundColor:" #fff", padding: "11px"}}>
                        <div class="row">
                           
                            <div class="col-lg-4 order-lg-2 order-1">
                                <div class="image_selected"><img src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1565713229/single_4.jpg" alt="" /></div>
                            </div>
                            <div class="col-lg-6 order-3">
                                <div class="product_description">
                                    <nav>
                                        <ol class="breadcrumb">
                                            <li class="breadcrumb-item"><a href="#">Home</a></li>
                                            <li class="breadcrumb-item"><a href="#">Products</a></li>
                                            <li class="breadcrumb-item active">Accessories</li>
                                        </ol>
                                    </nav>
                                    <div class="product_name">Acer Aspire 3 Celeron Dual Core - (2 GB/500 GB HDD/Windows 10 Home) A315-33 Laptop (15.6 inch, Black, 2.1 kg)</div>
                                    <div class="product-rating"><span class="badge badge-success"><i class="fa fa-star"></i> 4.5 Star</span> <span class="rating-review">35 Ratings & 45 Reviews</span></div>
                                    <div> <span class="product_price">₹ 29,000</span> <strike class="product_discount" > <span style={{color:'black'}}>₹ 2,000</span> </strike> </div>
                                    <div> <span class="product_saved">You Saved:</span> <span style={{color:'black'}}>₹ 2,000</span> </div>
                                    <hr class="singleline" />

                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>


    )
}

export default ProductDetails