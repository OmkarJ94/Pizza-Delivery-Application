import React, { useEffect, useState } from 'react'
import { NavLink } from "react-router-dom"
import swal from 'sweetalert'
import Orderslist from "./Orderlist"
import Addproduct from "./Addproduct"
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import Userlist from './Userlist'
const Admin = () => {
  const state = useSelector(state => state.cardItems)
  console.log(state)
  const [userdata, setUserData] = useState()
  const History = useNavigate();
  const checkUser = async () => {
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
        console.log(process.env.REACT_APP_EMAIL !== Data.email)
        if (Data.email !== process.env.REACT_APP_EMAIL) {
          swal("Only admin can access admin pannel");
          History("/")
        }

      }

    } catch (error) {
      swal("you must be login to access admin pannel");
      History("/")

    }
  }
  useEffect(() => {
    checkUser();
  }, [])
  return (
    <div>
      <div className="row justify-content-center p-">
        <div className="col-md-10">
          <h2 style={{ fontSize: "35px" }}>Admin Panel</h2>

          <ul className="adminfunctions">
            <li>
              <NavLink to='/admin/userlist' style={{ color: 'white' }}>Users List</NavLink>
            </li>

            <li>
              <NavLink to={'/admin/addproduct'} style={{ color: 'white' }}>Add Product</NavLink>
            </li>
            <li>
              <NavLink to={'/admin/orderslist'} style={{ color: 'white' }}>Orders List</NavLink>
            </li>


          </ul>

        </div>
      </div>
    </div>
  )
}

export default Admin