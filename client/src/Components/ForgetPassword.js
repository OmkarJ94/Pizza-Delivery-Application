import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import ConfirmedPassword from './ConfirmedPassword';
import Loading from './Loading';
// import ConfirmedPassword from "./ConfirmedPassword";

const ForgetPassword = () => {
    const [email, setEmail] = useState();
    const [loading, setLoading] = useState(false);
    const [form, setform] = useState(true);
    const History = useNavigate();
    const checkUser = async (e) => {
        e.preventDefault();
        try {

            setLoading(true);
            const res = await fetch("/reset", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                }),
            });

            if (res.status !== 200 || !res) {
                setLoading(false);

                swal("User not found")

            } else {
                setLoading(false);
                swal("OTP Send to Your Mail Id");


                setform(false);
            }
        } catch (error) {
            setLoading(false)
            swal("Something went wrong")

        }
    };
    return (
        <div>
            {form ? <div className="parent">
                <div className="container con">
                    <div className="card crd">
                        <h4 class="card-title mb-4 mt-1">Forgot your password?</h4>
                        {loading && <Loading />}
                        <div className="card-body">

                            <li>Enter your email address below.</li>
                            <li>Our system will send you a OTP.</li>
                            <li>Use the OTP to reset your password.</li>
                            <div class="form-group my-3">
                                <label className="lab">Your email</label>
                                <input

                                    class="form-control"
                                    name="email"
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value) }}
                                    placeholder="Email"
                                    type="email"
                                />
                                <small class="form-text text-muted">
                                    Enter the email address you used during the registration
                                </small>{" "}
                            </div>


                            <div class="frm">
                                <button
                                    type="submit"
                                    class="btn btn-primary "
                                    onClick={checkUser}
                                >
                                    {" "}
                                    Get OTP{" "}
                                </button>&nbsp;&nbsp;&nbsp;&nbsp;
                                <button
                                    type="submit"
                                    class="btn btn-primary"
                                    onClick={() => { History("/signin") }}
                                >
                                    {" "}
                                    Back To Login{" "}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div> :
                <ConfirmedPassword email={email} />}
        </div>
    )
}

export default ForgetPassword