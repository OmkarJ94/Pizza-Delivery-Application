import React, { useEffect, useState } from 'react'
import Admin from './Admin'
const Userlist = () => {
  const [users, setUser] = useState([])
  const fetchUser = async () => {
    try {
      const res = await fetch("/users",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      )
      if (res.status === 200) {
        const data = await res.json()
        setUser(data)
      }

      const data = await res.json()
    } catch (error) {

    }
  }
  useEffect(() => {
    fetchUser();
  },[])
  return (
    <div>
      <Admin />
      <div className="container">

        <h1>Users list</h1>


        <table className='table table-striped table-bordered table-responsive-sm'>
          <thead className='thead-dark'>
            <tr>
              <th>User Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
            </tr>
          </thead>

          <tbody>
            {users && users.map(user => {
              return <tr>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>

              </tr>
            })}
          </tbody>

        </table>

      </div>

    </div>
  )
}

export default Userlist