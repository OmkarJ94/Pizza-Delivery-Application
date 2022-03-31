import React, { useState, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import swal from "sweetalert";
import Loading from "./Loading";
import "./login.css";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const History = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,

      }),
    });

    setLoading(false);
    if (res.status === 203) {
      swal("Log in successfully");
      History("/admin")
      dispatch({ type: "ADMIN", payload: true });
    }
    else if (res.status !== 200 || !res) {
      swal("Invalid Creadentials");

    } else {
      swal("Log in successfully");
      dispatch({ type: "USER", payload: true });
      History("/");
    }
  };
  return (
    <div className="parent">
      <div className="container con">
        <div className="card crd">
          <h4 class="card-title mb-4 mt-1">Sign in</h4>
          {loading && <Loading />}
          <div className="card-body">
            <div class="form-group">
              <label className="lab">Your email</label>
              <input

                class="form-control"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Email"
                type="email"
              />
            </div>
            <div class="form-group">
              <label className="my-2 lab">Your password</label>
              <input
                class="form-control"
                placeholder="******"
                type="password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            <p className="my-2">
              <span style={{ color: "black" }}> Don't have an account?</span>
              <NavLink to="/signup" style={{ color: "red" }}>
                Register
              </NavLink>
            </p>
            <NavLink to="/changepassword" style={{ color: "red" }}>
              Forget Password
            </NavLink>
            <div class="frm">
              <button
                type="submit"
                class="btn btn-primary btna"
                onClick={loginUser}
              >
                {" "}
                LOGIN{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
