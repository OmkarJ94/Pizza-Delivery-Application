import React, { useState } from "react";
import swal from 'sweetalert'
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
const Signup = () => {
    const History = useNavigate();
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",

        password: "",
        cpassword: "",
        address: "",
    });
    const [loading, setLoading] = useState(false)
    const handleInputs = (e) => {

        let name, value;
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value });
    }
    const postData = async (e) => {
        e.preventDefault();
        const { name, email, phone, password, cpassword, address } = user;
        try {
            setLoading(true)
            const res = await fetch("/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    phone,

                    password,
                    cpassword,
                    address
                }),
            });
            // eslint-disable-next-line
            const result = await res.json();

            if (res.status !== 201 || !res) {
                swal("Invalid Registeration");
                setLoading(false)

            } else {
                swal("Registeration succesfull");
                setLoading(false)
                History("/signin");
            }
        }
        catch (e) {
            swal("Invalid Registeration");
            setLoading(false)
        }
    };
    return (
        <div className="parent" style={{ marginTop: "20px", marginBottom: "20px" }}>
            <div className="container con">
                <div className="card crd">
                    <h4 class="card-title mb-4 mt-1">Create an Account<bt /></h4>
                    <div className="card-body">
                        {loading && <Loading />}
                        <div class="form-group">
                            <label className="lab">Your Name</label>
                            <input
                                name="name"
                                class="form-control"
                                placeholder="Name"
                                type="text"
                                value={user.name} onChange={handleInputs}
                            />
                        </div>
                        <div class="form-group my-2">
                            <label className="lab">Your email</label>
                            <input
                                name="email"
                                class="form-control"
                                placeholder="Email"
                                type="email"
                                value={user.email} onChange={handleInputs}
                            />
                        </div>
                        <div class="form-group my-2">
                            <label className="lab">Phone Number</label>
                            <input
                                name="phone"
                                class="form-control"
                                placeholder="Number"
                                type="number"
                                value={user.phone} onChange={handleInputs}
                            />
                        </div>


                        <div class="form-group my-2">
                            <label className="lab">Your password</label>
                            <input
                                class="form-control"
                                placeholder="******"
                                type="password"
                                name="password"
                                value={user.password} onChange={handleInputs}
                            />
                        </div>
                        <div class="form-group my-2">
                            <label className="lab">Confirm password</label>
                            <input
                                class="form-control"
                                placeholder="******"
                                type="password"
                                name="cpassword"
                                value={user.cpassword} onChange={handleInputs}
                            />
                        </div>
                        <div class="form-group my-2">
                            <label className="lab">Address</label>
                            <textarea
                                class="form-control"
                                placeholder="Address"
                                name="address"
                                value={user.address} onChange={handleInputs}
                            />
                        </div>
                        <p>
                            <span style={{ color: "black" }}> Already Account?</span>
                            <NavLink to="/signin" style={{ color: "red" }}>
                                LOG IN
                            </NavLink>
                        </p>
                        <div class="frm">
                            <button type="submit" class="btn btn-primary btna" onClick={postData}>
                                {" "}
                                Submit{" "}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
