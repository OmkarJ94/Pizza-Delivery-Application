import React, { useState } from 'react'
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
const ConfirmedPassword = (props) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        Otp: "",
        email: props.email,
        password: "",
        cpassword: "",
    });

    const History = useNavigate();
    const handleInputs = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setData({ ...data, [name]: value });
    };
    const changePassowrd = async (e) => {
        e.preventDefault();
        try {
            if (
                data.password !== data.cpassword ||
                !data.cpassword ||
                !data.password ||
                isNaN(data.Otp)
            ) {

                swal("Enter Valid Data Check All Fields")
            } else {

                setLoading(true);
                const response = await fetch("/changepassword", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        Otp: data.Otp,
                        email: data.email,
                        password: data.password,
                    }),
                });

                if (response.status === 404 || !response) {

                    setLoading(false);

                    swal("Enter Valid Data Check All Fields")
                } else if (response.status === 401) {
                    setLoading(false);
                    swal("Your OTP Expired! Please Try Again")
                } else if (response.status === 200) {
                    setLoading(false);

                    swal("Your Password has been updated successfully")
                    History("/signin");
                }
            }
        } catch (error) {
            swal("Enter Valid Data Check All Fields")
            swal("something went wrong");
        }
    };
    return (
        <>
            <div className="parent">
                <div className="container con">
                    <div className="card crd">
                        <h4 class="card-title mb-4 mt-1">Forgot your password?</h4>
                        {loading && <Loading />}
                        <div className="card-body">


                            <div class="form-group my-3">
                                <label className="lab">Enter Your OTP</label>
                                <input
                                    class="form-control"
                                    name="Otp"
                                    type="text"
                                    value={data.Otp}
                                    onChange={handleInputs}
                                />
                                <label className="lab">Enter Password</label>
                                <input
                                    class="form-control"
                                    name="password"
                                    type="password"
                                    value={data.password}
                                    onChange={handleInputs}
                                /><label className="lab">Confirm Password</label>
                                <input
                                    class="form-control"
                                    name="cpassword"
                                    type="password"
                                    value={data.cpassword}
                                    onChange={handleInputs}
                                />
                            </div>


                            <div class="frm">
                                <button
                                    type="submit"
                                    class="btn btn-primary btna"
                                    onClick={changePassowrd}
                                >
                                    {" "}
                                    Submit{" "}
                                </button>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <button
                                    type="submit"
                                    class="btn btn-primary btna"
                                    onClick={() => { History("/signin") }}
                                >
                                    {" "}
                                    Back To Login{" "}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ConfirmedPassword