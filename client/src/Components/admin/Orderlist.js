import React, { useEffect, useState } from 'react'
import swal from 'sweetalert'
import Admin from './Admin'

const Orderlist = () => {
  const [orders, setOrder] = useState([])

  const [id, setid] = useState()
  const fetchOrder = async () => {
    try {
      const res = await fetch("/orders",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
      const data = await res.json();
      if (res.status === 200) {
        setOrder(data)

      }
      else {
        swal("something went wrong")
      }
    } catch (error) {

    }
  }
  const changeStataus = async (id) => {

    try {
      console.log(id)

      const res = await fetch(`/status/${id}`,
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
          },

        }

      )
      const data = await res.json();
      console.log(data)
      if (res.status !== 200) {

      }
    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(() => {
    fetchOrder();
  })
  return (
    <div>
      <Admin />
      <div className="container">


        <table className="table table-striped table-bordered table-responsive-sm">
          <thead className="thead-dark">
            <tr>
              <th>Order Id</th>
              <th>Email</th>
              <th>User Id</th>
              <th>Amount</th>
              <th>Date</th>
              <th>status</th>

            </tr>
          </thead>

          <tbody>
            {
              orders.map((order) => {
                return (
                  <tr>
                    <td>{order.orderid}</td>
                    <td>{order.email}</td>
                    <td>{order.user}</td>
                    <td>{order.amount}</td>
                    <td>{order.time}</td>
                    <td>
                      {order.status === "delivered" ? <h6>Delivered</h6>
                        :
                        <button className=" btn-danger" onClick={(e) => {
                          changeStataus(order._id)

                        }}>Deliver</button>

                      }
                    </td>

                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div >
  )
}

export default Orderlist

//  dispatch(deliverOrder(order._id)